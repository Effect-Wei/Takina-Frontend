<script setup>
import { computed, reactive } from "vue"

const TAKINA_API = "https://api.takina.one/task/create"
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
const state = reactive({
  type: "both",
  quality: computed(() => props.videoInfo.accept_quality[0])
})
const emit = defineEmits(["gotTaskHash"])

async function onSubmit(quality, type) {
  let reqJsonObj = {
    url: props.videoUrl.toString(),
    video_quality: quality.toString(),
    audio_quality: "30280",
    require_video: true,
    require_audio: true
  }

  if (type === "v-only") {
    reqJsonObj.require_audio = false
  } else if (type === "a-only") {
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

      <button @click.prevent="onSubmit(state.quality, state.type)">提交</button>
    </form>
  </main>
</template>
