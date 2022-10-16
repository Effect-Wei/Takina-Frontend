<script setup>
import { reactive } from "vue"

const state = reactive({
  folded: true
})
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

function switchFold() {
  state.folded = !state.folded
}
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

        <div class="column col-auto q-pl-lg">
          <div class="staff-info-container">
            <div
              class="staff-info-header"
              @click.prevent="switchFold"
            >
              创作团队
              <span class="total-staff">
                {{ props.videoInfo.total_staffs }}人
              </span>
              <q-btn
                class="fold-switcher"
                icon="expand_more"
                size="sm"
                round
                unelevated
                :style="state.folded ? '' : 'transform: rotate(180deg);'"
              />
            </div>

            <div
              class="staff-container"
              :style="
                state.folded
                  ? 'max-height: 208px;'
                  : `max-height: ${props.videoInfo.total_staffs * 52}px;`
              "
            >
              <div
                v-for="(staff, index) in props.videoInfo.staff"
                :key="index"
                class="staff-card row items-center self-start"
              >
                <a
                  :href="`https://space.bilibili.com/${staff.mid}`"
                  target="_blank"
                >
                  <q-avatar
                    class="q-mx-sm q-my-xs"
                    size="44px"
                  >
                    <q-img
                      :src="staff.face + '@48w_48h.webp'"
                      referrerpolicy="no-referrer"
                    />
                  </q-avatar>
                </a>

                <div class="column flex-center">
                  <div class="staff-name q-mr-sm">
                    <a
                      :href="`https://space.bilibili.com/${staff.mid}`"
                      target="_blank"
                    >
                      {{ staff.name }}
                    </a>
                    <div class="info-tag">
                      {{ staff.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="button-list">
            <q-btn
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

<style scoped>
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

.staff-info-header {
  padding: 0 16px;
  width: 100%;
  min-width: 250px;
  height: 44px;
  line-height: 44px;
  border-radius: 6px;
  cursor: pointer;
  background-color: #f1f2f3;
}

.fold-switcher {
  margin: 7px 0;
  float: right;
  transition: transform 0.3s;
}

.total-staff {
  margin-left: 5px;
  color: #61666d;
}

.staff-container {
  overflow: hidden;
}

.staff-name {
  font-size: 13px;
}

.info-tag {
  font-size: 13px;
  color: #9499a0;
}

.button-list {
  margin-top: 20px;
}

.text-bilipink {
  color: #fb7299 !important;
}
.bg-bilipink {
  background: #fb7299 !important;
}
</style>
