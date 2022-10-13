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
  <div class="row justify-center items-start">
    <q-img
      class="q-mt-sm q-mr-lg q-mb-lg"
      :src="props.videoInfo.pic"
      :initial-ratio="1146 / 717"
      width="600px"
      fit="contain"
      alt="Video cover"
      loading="eager"
      referrerpolicy="no-referrer"
    />

    <div class="column">
      <div class="row items-center self-lg-end">
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

      <div class="video-title text-weight-medium">
        {{ props.videoInfo.title }}
      </div>

      <div class="video-description">
        {{ props.videoInfo.desc }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-description {
  white-space: pre-line;
  font-size: 15px;
  letter-spacing: 0;
  line-height: 24px;
  overflow: hidden;
}

.video-title {
  font-size: 20px;
}
</style>
