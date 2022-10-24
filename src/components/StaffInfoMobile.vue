<script setup>
import { computed } from "vue"

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
</script>

<template>
  <div class="staff-info-container">
    <div class="staff-info-header">
      <span v-if="onlyOneStaff">创作者</span>
      <span v-if="!onlyOneStaff">创作团队</span>
      <span class="total-staff"> {{ props.videoInfo.total_staffs }}人 </span>
      <q-icon
        v-if="!onlyOneStaff"
        class="expand-icon"
        name="expand_more"
        size="sm"
      />
    </div>

    <div class="staff-container column">
      <div
        v-for="(staff, index) in props.videoInfo.staff"
        :key="index"
        class="staff-card column items-center"
      >
        <a
          :href="`https://space.bilibili.com/${staff.mid}`"
          target="_blank"
        >
          <q-avatar
            class="q-mx-sm q-my-xs"
            size="10vmin"
          >
            <q-img
              :src="staff.face + '@48w_48h.webp'"
              loading="eager"
              referrerpolicy="no-referrer"
            />
          </q-avatar>
        </a>

        <div class="column items-center">
          <a
            class="staff-name"
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
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: #18191c;
}

.staff-info-header {
  padding: 0 16px;
  width: 100%;
  height: 34px;
  line-height: 34px;
  border-radius: 6px;
  background: $bg1;
}

.expand-icon {
  margin: 5px 0;
  float: right;
  transition: transform 0.3s;
  transform: rotate(270deg);
}

.total-staff {
  margin-left: 5px;
  color: #61666d;
}

.staff-container {
  overflow: auto;
}

.staff-card {
  width: 20vmin;
}

.staff-name {
  font-size: 1vmin;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-tag {
  font-size: 1vmin;
  color: #9499a0;
}
</style>
