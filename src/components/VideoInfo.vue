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
      <div class="row items-start">
        <div class="col">
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

        <div class="column col-auto">
          <div class="row items-center self-start">
            <q-avatar class="q-ma-sm">
              <q-img
                :src="props.videoInfo.owner.face"
                loading="eager"
                referrerpolicy="no-referrer"
              />
            </q-avatar>
            <div class="q-mr-sm">
              {{ props.videoInfo.owner.name }}
            </div>
          </div>

          <div class="button-list">
            <q-btn
              no-caps
              color="bilipink"
              label="在 Bilibili 观看"
            />
          </div>
        </div>

        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.text-bilipink {
  color: #fb7299 !important;
}
.bg-bilipink {
  background: #fb7299 !important;
}
</style>
