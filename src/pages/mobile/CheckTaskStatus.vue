<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"

const TAKINA_API = "https://api.takina.one"

const route = useRoute()
const state = reactive({
  isTaskDone: false,
  intervalId: null,
  dlLink: null
})

onMounted(() => {
  checkStatus(route.params.taskId)
})

async function checkStatus(taskId) {
  let resp = await fetch(`${TAKINA_API}/task/${taskId}/status`, {
    method: "GET"
  })
  let taskInfo = await resp.json()
  if (taskInfo.msg === "OK") {
    state.dlLink = taskInfo.dl_link
    state.isTaskDone = true
    return
  }
  setTimeout(() => {
    checkStatus(taskId)
  }, 5000)
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
