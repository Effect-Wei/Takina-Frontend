<script setup>
import { onMounted, reactive } from "vue"
import { useQuasar } from "quasar"

const TAKINA_API = "https://api.takina.one"

const $q = useQuasar()
const state = reactive({
  videoId: null,
  isTaskDone: false,
  dlLink: null
})
const props = defineProps({
  taskId: {
    type: String,
    default: ""
  }
})

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
  <p>Test</p>
</template>
