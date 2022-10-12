<script setup>
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
        loading="eager"
        referrerpolicy="no-referrer"
      />
    </div>

    <div class="column col-7 q-pa-sm">
      <div class="video-title text-weight-medium">
        {{ props.videoInfo.title }}
      </div>
      <div class="tname flex items-center">
        {{ props.videoInfo.tname }}
      </div>

      <div class="row items-center">
        <q-avatar class="q-ma-sm">
          <q-img
            :src="props.videoInfo.owner.face"
            loading="eager"
            referrerpolicy="no-referrer"
          />
        </q-avatar>
        <div>
          {{ props.videoInfo.owner.name }}
        </div>
      </div>

      <div class="video-description">
        {{ props.videoInfo.desc }}
      </div>
    </div>
  </div>
</template>

<style scope>
.header {
  height: 60px;
}

.video-info-wrapper {
  margin: 0 auto;
  width: 80%;
  max-width: 1536px;
}

.video-title {
  max-width: 100%;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tname {
  color: #9499a0;
  height: 20px;
  font-size: 13px;
  line-height: 18px;
}

.video-description {
  white-space: pre-wrap;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 24px;
  overflow: hidden;
}
</style>
