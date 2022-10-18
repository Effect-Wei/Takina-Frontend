<script setup>
import { computed, reactive } from "vue"
import CloudflareTurnstile from "./CloudflareTurnstile.vue"

const TAKINA_API = "https://api.takina.one/task/create"

const state = reactive({
  type: "both",
  quality: computed(() => props.videoInfo.accept_quality[0]),
  turnstileToken: null
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
</script>

<template>
  <main>
    <form>
      <label for="quality">清晰度</label>
      <select
        id="quality"
        v-model="state.quality"
        name="quality"
      >
        <option
          v-for="(quality, index) in videoInfo.accept_quality"
          :key="index"
          :value="quality"
        >
          {{ videoInfo.accept_description[index] }}
        </option>
      </select>

      <input
        id="both"
        v-model="state.type"
        type="radio"
        name="type"
        value="both"
        checked
      />
      <label for="both">音频和视频</label>
      <input
        id="a-only"
        v-model="state.type"
        type="radio"
        name="type"
        value="a-only"
      />
      <label for="a-only">仅音频</label>
      <input
        id="v-only"
        v-model="state.type"
        type="radio"
        name="type"
        value="v-only"
      />
      <label for="v-only">仅视频</label>

      <cloudflare-turnstile
        sitekey="1x00000000000000000000AA"
        @challenged="(token) => (state.turnstileToken = token)"
      />

      <button @click.prevent="onSubmit">提交</button>
    </form>
  </main>
</template>
