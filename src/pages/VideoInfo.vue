<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { useQuasar } from "quasar"

const TAKINA_API = "https://api.takina.one/search"

const $q = useQuasar()
const route = useRoute()
const state = reactive({
  loaded: false,
  videoInfo: null
})

onMounted(async () => {
  //$q.loading.show({ delay: 200 })

  let resp = await fetch(TAKINA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: route.params.videoId })
  })
  let jsonObj = await resp.json()

  state.videoInfo = jsonObj.video_info
  state.loaded = true
  $q.loading.hide()
})
</script>

<template>
  <div v-if="state.loaded">
    <h2 class="video-title">
      {{ state.videoInfo.title }}
    </h2>
    <br />

    <div class="video-description">
      {{ state.videoInfo.desc }}
    </div>

    <q-img
      :src="state.videoInfo.pic"
      alt="Video cover"
      loading="eager"
      referrerpolicy="no-referrer"
    />
  </div>
</template>

<style scope>
.video-description {
  white-space: pre-wrap;
}
</style>
