<script setup>
import { computed, onMounted, reactive } from "vue"
import { useQuasar } from "quasar"
import CreateTask from "./CreateTask.vue"
import CheckTask from "./CheckTask.vue"
import StaffInfoMobile from "./StaffInfoMobile.vue"

const TAKINA_API = "https://api.takina.one/search"

const $q = useQuasar()
const state = reactive({
  loaded: false,
  videoInfo: $q.sessionStorage.getItem("videoInfo"),
  folded: true,
  rotate: 0,
  descHeight: computed(() => {
    return document.getElementsByClassName("description")[0].offsetHeight
  })
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

function switchFold() {
  state.folded = !state.folded
  state.rotate += 180
}

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

    <div class="video-info-wrapper hndrd-prcnt-width row">
      <staff-info-mobile
        class="staff-info hndrd-prcnt-width"
        :video-info="state.videoInfo"
      />

      <div
        class="title-area hndrd-prcnt-width"
        @click.prevent="switchFold"
      >
        <q-btn
          class="fold-switcher"
          icon="expand_more"
          size="2.25vmin"
          round
          unelevated
          :style="`transform: rotate(${state.rotate}deg);`"
        />
        <div class="title">
          {{ state.videoInfo.title }}
        </div>
        <div class="tname flex items-center">
          {{ state.videoInfo.tname }}
        </div>
      </div>

      <div
        class="desc-container"
        :style="
          state.folded ? 'max-height: 0;' : `max-height: ${state.descHeight}px;`
        "
      >
        <div class="description">
          {{ state.videoInfo.desc }}
        </div>
      </div>

      <div class="tools-list hndrd-prcnt-width q-pt-md">
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
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #18191c;
}

.video-info-wrapper {
  padding: 3.2vmin 3.5vmin 0 3.5vmin;
  max-width: 1280px;
}

.title {
  font-size: 4.5vmin;
  font-weight: 400;
  white-space: pre-wrap;
}

.tname {
  color: #9499a0;
  height: 5.5vmin;
  font-size: 2.5vmin;
  line-height: 5vmin;
}

.fold-switcher {
  margin: 0px 0;
  float: right;
  transition: transform 0.3s;
}

.desc-container {
  margin: 3vmin 0 -10px 0;
  transition: max-height 0.3s ease;
  overflow: hidden;
}

.description {
  color: #9499a0;
  white-space: pre-wrap;
  font-size: 3vmin;
  letter-spacing: 0;
  line-height: 5.1vmin;
}

.staff-info {
  margin-bottom: 3vmin;
}

.hndrd-prcnt-width {
  width: 100%;
}
</style>
