<script setup>
import { computed, onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import CloudflareTurnstile from "./CloudflareTurnstile.vue"

const TAKINA_API = "https://api.takina.one/task/create"
const TURNSTILE_SITE_KEY = "0x4AAAAAAAAw1JVzDp2feF4x"

const $q = useQuasar()
const router = useRouter()
const state = reactive({
  type: "both",
  quality: props.videoInfo.accept_quality[0],
  turnstileToken: null,
  qualityOptions: [],
  isSendingReq: false,
  bgColor: computed(() => {
    return $q.dark.isActive ? "bg1-dark" : "bg1"
  })
})
const props = defineProps({
  videoInfo: {
    type: Object,
    default() {
      return {}
    }
  }
})

async function onSubmit() {
  state.sendingReq = true

  let reqJson = {
    url: props.videoInfo.bvid.toString(),
    video_quality: state.quality.toString(),
    audio_quality: "30280",
    require_video: true,
    require_audio: true,
    turnstile_token: state.turnstileToken.toString()
  }

  if (state.type === "v-only") {
    reqJson.require_audio = false
  } else if (state.type === "a-only") {
    reqJson.require_video = false
  }

  let resp = await fetch(TAKINA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqJson)
  })
  let respJson = await resp.json()

  if (respJson.msg === "Accepted" || respJson.msg === "Task exists") {
    let taskId = respJson.task_hash
    router.push({ name: "check", params: { taskId: taskId } })
  } else {
    state.sendingReq = false
    $q.notify({
      type: "negative",
      message: respJson.msg,
      progress: true,
      timeout: 1500
    })
  }
}

onMounted(() => {
  for (let i = 0; i < props.videoInfo.accept_quality.length; i++) {
    let option = {
      label: props.videoInfo.accept_description[i],
      value: props.videoInfo.accept_quality[i]
    }
    state.qualityOptions.push(option)
  }
})
</script>

<template>
  <form>
    <q-select
      v-model="state.quality"
      class="quality-selector q-my-xs"
      :options="state.qualityOptions"
      :bg-color="state.bgColor"
      label="视频清晰度"
      emit-value
      map-options
      filled
      dense
      options-dense
    />

    <div
      class="row justify-center q-my-xs"
      style="padding-right: 10px"
    >
      <q-radio
        v-model="state.type"
        val="both"
        label="音频和视频"
      />
      <q-radio
        v-model="state.type"
        val="a-only"
        label="仅音频"
      />
      <q-radio
        v-model="state.type"
        val="v-only"
        label="仅视频"
      />
    </div>

    <cloudflare-turnstile
      class="cf-turnstile flex justify-center q-mb-sm"
      :sitekey="TURNSTILE_SITE_KEY"
      @challenged="(token) => (state.turnstileToken = token)"
    />

    <q-btn
      class="submit-button q-my-xs"
      :loading="state.turnstileToken === null || state.isSendingReq"
      label="提交"
      color="primary"
      @click.prevent="onSubmit"
    />
    <q-btn
      class="bili-button q-my-xs"
      no-caps
      color="bilipink"
      label="在 Bilibili 观看"
      :href="`https://www.bilibili.com/video/${props.videoInfo.bvid}`"
      target="_blank"
    />
  </form>
</template>

<style lang="scss">
.cf-turnstile {
  max-width: 100%;
}

.submit-button {
  width: 45%;
}

.bili-button {
  margin-left: 5%;
  width: 50%;
}
</style>
