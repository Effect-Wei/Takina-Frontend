<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { useQuasar } from "quasar"

const TAKINA_API = "https://api.takina.one/check"

const $q = useQuasar()
const route = useRoute()
const state = reactive({
  isTaskDone: false,
  intervalId: null,
  dlLink: null
})

onMounted(() => {
  $q.loading.show()
  checkStatus(route.params.taskId)
  if (state.isTaskDone === true) {
    $q.loading.hide()
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
    $q.loading.hide()
    if (state.intervalId != null) {
      clearInterval(state.intervalId)
    }
  }
}
</script>

<template>
  <head>
    <link
      href="https://dl.takina.one"
      rel="preconnect"
    />
  </head>
  <q-page class="flex flex-center">
    <q-btn
      v-if="state.isTaskDone"
      label="下载"
      color="primary"
      :href="state.dlLink"
    />
  </q-page>
</template>
