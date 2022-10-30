<script setup>
import { onMounted, reactive, watch } from "vue"
import { useQuasar } from "quasar"

const TAKINA_API = "https://api.takina.one"

const $q = useQuasar()
const state = reactive({
  isTaskDone: false,
  dlLink: null,
  isDarkActive: $q.dark.isActive
})
const props = defineProps({
  taskId: {
    type: String,
    default: ""
  },
  videoId: {
    type: String,
    default: ""
  }
})

watch(
  () => $q.dark.isActive,
  (isDarkActive) => {
    state.isDarkActive = isDarkActive
  }
)

onMounted(async () => {
  checkStatus()
})

async function checkStatus() {
  let resp = await fetch(`${TAKINA_API}/task/${props.taskId}/status`, {
    method: "GET"
  })
  let taskInfo = await resp.json()

  if (taskInfo.msg !== "OK" && taskInfo.msg !== "Processing") {
    $q.notify({
      type: "negative",
      message: taskInfo.msg,
      progress: true,
      timeout: 1500
    })
  }
  if (taskInfo.msg === "OK") {
    state.dlLink = taskInfo.dl_link
    state.isTaskDone = true
    return
  }

  setTimeout(() => {
    checkStatus()
  }, 5000)
}
</script>

<template>
  <div>
    <div
      v-if="!state.isTaskDone"
      :class="{
        instruction: true,
        'q-mt-xs': true,
        'q-mb-sm': true,
        'instruction-dark-bg': state.isDarkActive
      }"
    >
      <span class="text-1">{{ $t("text.waitAsecond") }}</span>
      <span class="text-2">{{ $t("text.canNotWait") }}</span>
    </div>
    <div
      v-if="state.isTaskDone"
      :class="{
        instruction: true,
        'q-mt-xs': true,
        'q-mb-sm': true,
        'instruction-dark-bg': state.isDarkActive
      }"
    >
      <span class="text-1">{{ $t("text.dlAvailable") }}</span>
      <span class="text-2">{{ $t("text.takeItOut") }}</span>
    </div>
    <q-btn
      class="dl-button q-my-xs"
      :loading="!state.isTaskDone"
      :label="$t('text.download')"
      color="primary"
      :href="state.dlLink"
    />
    <q-btn
      class="bili-button q-my-xs"
      no-caps
      color="bilipink"
      :label="$t('text.watchOnBili')"
      :href="`https://www.bilibili.com/video/${props.videoId}`"
      target="_blank"
    />
  </div>
</template>

<style scoped lang="scss">
.dl-button {
  width: 130px;
}

.instruction {
  padding: 0 16px;
  width: 100%;
  min-width: 250px;
  height: 36px;
  line-height: 36px;
  border-radius: 6px;
  background: $bg1;
}

.instruction-dark-bg {
  background: $bg1-dark;
}

.text-2 {
  margin-left: 10px;
  color: #9499a0;
  text-decoration: line-through;
}

.dl-button {
  width: 45%;
}

.bili-button {
  margin-left: 5%;
  width: 50%;
}
</style>
