<script setup>
import { computed, reactive } from "vue"

const state = reactive({
  folded: true
})
const props = defineProps({
  videoInfo: {
    type: Object,
    default() {
      return {}
    }
  }
})
const onlyOneStaff = computed(() => {
  return props.videoInfo.total_staffs === 1 ? true : false
})

function switchFold() {
  state.folded = !state.folded
}
</script>

<template>
  <div class="staff-info-container">
    <div
      :class="{ 'staff-info-header': true, 'multiple-staff': !onlyOneStaff }"
      @click.prevent="switchFold"
    >
      <span v-if="onlyOneStaff">创作者</span>
      <span v-if="!onlyOneStaff">创作团队</span>
      <span class="total-staff"> {{ props.videoInfo.total_staffs }}人 </span>
      <q-btn
        v-if="!onlyOneStaff"
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
              loading="eager"
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
</template>

<style scoped>
a {
  text-decoration: none;
  color: #18191c;
}

.staff-info-header {
  padding: 0 16px;
  width: 100%;
  min-width: 250px;
  height: 44px;
  line-height: 44px;
  border-radius: 6px;
  background-color: #f1f2f3;
}

.multiple-staff {
  cursor: pointer;
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
</style>
