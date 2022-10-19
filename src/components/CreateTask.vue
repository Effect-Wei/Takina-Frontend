<script setup>
import { onMounted, reactive } from "vue"
import CloudflareTurnstile from "./CloudflareTurnstile.vue"

const TAKINA_API = "https://api.takina.one/task/create"

const state = reactive({
  type: "both",
  quality: props.videoInfo.accept_quality[0],
  turnstileToken: null,
  qualityOptions: []
})
const props = defineProps({
  videoInfo: {
    type: Object,
    default() {
      return {}
    }
  },
  videoUrl: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(["gotTaskHash"])

async function onSubmit() {
  let reqJsonObj = {
    url: props.videoUrl.toString(),
    video_quality: state.quality.toString(),
    audio_quality: "30280",
    require_video: true,
    require_audio: true,
    turnstile_token: state.turnstileToken.toString()
  }

  if (state.type === "v-only") {
    reqJsonObj.require_audio = false
  } else if (state.type === "a-only") {
    reqJsonObj.require_video = false
  }

  await fetch(TAKINA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqJsonObj)
  })
    .then(async (resp) => {
      let respJsonObj = await resp.json()
      return respJsonObj.task_hash
    })
    .then((taskHash) => {
      emit("gotTaskHash", taskHash)
    })
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
      bg-color="bg1"
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
      class="cf-turnstile"
      sitekey="1x00000000000000000000AA"
      @challenged="(token) => (state.turnstileToken = token)"
    />

    <q-btn
      class="submit-button q-my-xs"
      label="提交"
      color="primary"
      @click.prevent="onSubmit"
    />
  </form>
</template>

<style lang="scss">
.cf-turnstile {
  max-width: 100%;
}

.submit-button {
  width: 130px;
}

.text-bg1 {
  color: $bg1 !important;
}

.bg-bg1 {
  background: $bg1 !important;
}
</style>
