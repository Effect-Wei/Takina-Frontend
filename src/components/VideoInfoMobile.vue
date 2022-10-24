<script setup>
import { onMounted, reactive } from "vue"
import { useQuasar } from "quasar"
import CreateTask from "./CreateTask.vue"
import CheckTask from "./CheckTask.vue"
import StaffInfoMobile from "./StaffInfoMobile.vue"

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
    <q-img
      class="cover"
      :src="state.videoInfo.pic"
      :initial-ratio="1146 / 717"
      fit="contain"
      alt="Video cover"
      referrerpolicy="no-referrer"
    />

    <div class="video-info-wrapper row justify-center items-start">
      <div class="video-info-container">
        <staff-info-mobile
          class="staff-info"
          :video-info="state.videoInfo"
        />

        <div class="title">
          {{ state.videoInfo.title }}
        </div>
        <div class="tname flex items-center">
          {{ state.videoInfo.tname }}
        </div>

        <div class="description">
          {{ state.videoInfo.desc }}
        </div>

        <div class="tools-list q-pt-md">
          <create-task
            v-if="props.addons.includes('CreateTask')"
            class="task-creator"
            :video-info="state.videoInfo"
          />
          <check-task
            v-if="props.addons.includes('CheckTask')"
            class="task-checker"
            :task-id="props.taskId"
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

.video-info-wrapper {
  padding: 3.2vmin 3.5vmin 0 3.5vmin;
  width: 100%;
  max-width: 1536px;
}

.title {
  font-size: 4.5vmin;
  font-weight: 400;
  white-space: pre-wrap;
}

.tname {
  color: #9499a0;
  height: 20px;
  font-size: 2.77vmin;
  line-height: 18px;
}

.description {
  margin: 10px 0 -10px 0;
  color: #9499a0;
  white-space: pre-wrap;
  font-size: 3vmin;
  letter-spacing: 0;
  line-height: 5.1vmin;
  overflow: hidden;
}

.staff-info {
  width: 100%;
}

.tools-list {
  width: 100%;
}
</style>
