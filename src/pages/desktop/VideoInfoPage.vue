<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import VideoInfo from "components/VideoInfo.vue"

const TAKINA_API = "https://api.takina.one/search"

const route = useRoute()
const state = reactive({
  loaded: false,
  videoInfo: null,
  taskHash: null
})

onMounted(async () => {
  let resp = await fetch(TAKINA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: route.params.videoId })
  })
  let jsonObj = await resp.json()

  state.videoInfo = jsonObj.video_info
  state.loaded = true
})
</script>

<template>
  <video-info
    v-if="state.loaded"
    :video-info="state.videoInfo"
    :video-id="route.params.videoId"
    :addons="['CreateTask']"
  />
</template>
