<script setup>
import { computed, onMounted, reactive, watch } from "vue"
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
  isDarkActive: $q.dark.isActive,
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

watch(
  () => $q.dark.isActive,
  (isDarkActive) => {
    state.isDarkActive = isDarkActive
  }
)

async function onSubmit() {
  state.isSendingReq = true

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
    state.isSendingReq = false
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
      :label="$t('text.videoQuality')"
      emit-value
      map-options
      filled
      dense
      options-dense
    />

    <div
      :class="{
        'dl-type-wrapper': true,
        'dl-type-wrapper-dark-bg': state.isDarkActive,
        'q-my-xs': true
      }"
    >
      <div class="dl-type">{{ $t("text.dlType") }}</div>
      <q-option-group
        v-model="state.type"
        class="dl-type-selector"
        inline
        :options="[
          {
            label: $t('text.bothAandV'),
            value: 'both'
          },
          {
            label: $t('text.audioOnly'),
            value: 'a-only'
          },
          {
            label: $t('text.videoOnly'),
            value: 'v-only'
          }
        ]"
      />
    </div>

    <cloudflare-turnstile
      class="cf-turnstile flex justify-center q-my-sm"
      :sitekey="TURNSTILE_SITE_KEY"
      @challenged="(token) => (state.turnstileToken = token)"
    />

    <q-btn
      class="submit-button"
      :loading="state.turnstileToken === null || state.isSendingReq"
      :label="$t('text.submit')"
      color="primary"
      @click.prevent="onSubmit"
    />
    <q-btn
      class="bili-button"
      no-caps
      color="bilipink"
      :label="$t('text.watchOnBili')"
      :href="`https://www.bilibili.com/video/${props.videoInfo.bvid}`"
      target="_blank"
    />
  </form>
</template>

<style lang="scss">
.dl-type-wrapper {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background: $bg1;
}

.dl-type-wrapper-dark-bg {
  background: $bg1-dark;
}

.dl-type {
  margin-left: 10px;
  font-size: 1px;
  color: #9499a0;
}

.dl-type-selector {
  margin-top: -10px;
}

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
