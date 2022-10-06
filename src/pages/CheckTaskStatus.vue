<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"

const TAKINA_API = "https://api.takina.one/check"

const route = useRoute()
const state = reactive({
  isTaskDone: false,
  intervalId: null,
  dlLink: null
})

onMounted(() => {
  checkStatus(route.params.taskId)
  if (state.isTaskDone === true) {
    return
  }
  state.intervalId = setInterval(checkStatus, 5000, route.params.taskId)
})

async function checkStatus(taskHash) {
  let resp = await fetch(TAKINA_API + "/" + taskHash, { method: "GET" })
  let taskInfo = await resp.json()
  if (taskInfo.msg === "OK") {
    state.dlLink = taskInfo.dl_link
    state.isTaskDone = true
    if (state.intervalId != null) {
      clearInterval(state.intervalId)
    }
  }
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-circular-progress
      v-if="!state.isTaskDone"
      indeterminate
      rounded
      size="50px"
      color="primary"
      class="q-ma-md"
    />
    <q-btn
      v-if="state.isTaskDone"
      label="下载"
      color="primary"
      :href="state.dlLink"
    />
  </q-page>
</template>
