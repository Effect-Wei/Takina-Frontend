<script setup>
import CreateTask from "./CreateTask.vue"
import StaffInfo from "./StaffInfo.vue"

const props = defineProps({
  videoInfo: {
    type: Object,
    default() {
      return {}
    }
  },
  videoId: {
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
</script>

<template>
  <div class="header"></div>
  <div class="video-info-wrapper row justify-center items-start">
    <div class="cover-area col q-pa-sm">
      <q-img
        class="cover"
        :src="props.videoInfo.pic"
        :initial-ratio="1146 / 717"
        fit="contain"
        alt="Video cover"
        referrerpolicy="no-referrer"
      />
    </div>

    <div class="column col-7 q-pa-sm">
      <div class="row items-start">
        <div class="video-info-container col">
          <div class="title text-weight-medium">
            {{ props.videoInfo.title }}
          </div>
          <div class="tname flex items-center">
            {{ props.videoInfo.tname }}
          </div>

          <div class="description">
            {{ props.videoInfo.desc }}
          </div>
        </div>

        <div class="right-container column col-auto q-ml-lg">
          <staff-info :video-info="props.videoInfo" />

          <div class="tools-list q-pt-md">
            <create-task
              v-if="props.addons.includes('CreateTask')"
              class="task-creator"
              :video-info="props.videoInfo"
              :video-url="props.videoId"
            />
            <q-btn
              class="bili-button q-my-xs"
              no-caps
              color="bilipink"
              label="在 Bilibili 观看"
              :href="`https://www.bilibili.com/video/${props.videoId}`"
              target="_blank"
            />
          </div>
        </div>

        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #18191c;
}

.header {
  height: 60px;
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
  margin: 20px 0;
  padding: 0 30px;
  white-space: pre-wrap;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 24px;
  overflow: hidden;
}

.right-container {
  min-width: 300px;
}

.bili-button {
  width: 130px;
}

.text-bilipink {
  color: $bilipink !important;
}

.bg-bilipink {
  background: $bilipink !important;
}
</style>
