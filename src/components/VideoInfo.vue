<script setup>
import { onMounted, reactive } from "vue"
import { useQuasar } from "quasar"
import CreateTask from "./CreateTask.vue"
import CheckTask from "./CheckTask.vue"
import StaffInfo from "./StaffInfo.vue"

const TAKINA_API = "https://api.takina.one/search"

const $q = useQuasar()
const state = reactive({
  loaded: false,
  videoInfo: $q.sessionStorage.getItem("videoInfo")
})
const props = defineProps({
  videoId: {
    type: String,
    default: ""
  },
  taskId: {
    type: String,
    default: ""
  },
  addons: {
    type: Array,
    default() {
      return []
    }
  }
})

onMounted(async () => {
  if (state.videoInfo != null && state.videoInfo.bvid === props.videoId) {
    state.loaded = true
    return
  }

  let resp = await fetch(TAKINA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: props.videoId })
  })
  let respJson = await resp.json()

  state.videoInfo = respJson.video_info
  state.loaded = true
  $q.sessionStorage.set("videoInfo", state.videoInfo)
})
</script>

<template>
  <div v-if="state.loaded">
    <div class="video-info-wrapper row justify-center items-start">
      <div class="cover-area col">
        <q-img
          class="cover"
          :src="state.videoInfo.pic"
          :initial-ratio="1146 / 717"
          fit="contain"
          alt="Video cover"
          referrerpolicy="no-referrer"
        />

        <div class="video-info-container q-mt-md q-px-sm">
          <div class="title text-weight-medium">
            {{ state.videoInfo.title }}
          </div>
          <div class="tname flex items-center">
            {{ state.videoInfo.tname }}
          </div>

          <div class="description q-mt-md q-px-sm">
            {{ state.videoInfo.desc }}
          </div>
        </div>
      </div>

      <div class="right-container column col-auto q-ml-lg">
        <staff-info :video-info="state.videoInfo" />

        <div class="tools-list">
          <create-task
            v-if="props.addons.includes('CreateTask')"
            class="task-creator"
            :video-info="state.videoInfo"
          />
          <check-task
            v-if="props.addons.includes('CheckTask')"
            class="task-checker"
            :task-id="props.taskId"
            :video-id="props.videoId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #18191c;
}

.cover-area {
  max-width: 50%;
}

.video-info-wrapper {
  margin: 0 auto;
  width: 80%;
  max-width: 1536px;
}

.title {
  max-width: 100%;
  font-size: 20px;
  white-space: pre-wrap;
}

.tname {
  color: #9499a0;
  height: 20px;
  font-size: 13px;
  line-height: 18px;
}

.description {
  white-space: pre-wrap;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 18px;
  overflow: hidden;
}

.right-container {
  min-width: 300px;
  max-width: 300px;
}
</style>
