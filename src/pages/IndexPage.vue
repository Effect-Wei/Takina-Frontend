<template>
  <q-page class="flex flex-center">
    <q-input
      id="searchBox"
      v-model="state.searchUrl"
      autofocus
      clearable
      rounded
      outlined
      :label="$t('text.searchBoxLabel')"
      :loading="state.loading"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-btn
      label="搜索视频"
      color="primary"
      type="submit"
      @click="onSubmit"
    />
  </q-page>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"

const REGEX_AV_ID = /av\d+/
const REGEX_BV_ID = /BV\w+/

const $q = useQuasar()
const router = useRouter()
const state = reactive({
  searchUrl: null,
  videoId: null,
  loading: false
})

async function onSubmit() {
  let matchObj = REGEX_BV_ID.exec(state.searchUrl)
  if (matchObj == null) {
    matchObj = REGEX_AV_ID.exec(state.searchUrl)
  }
  if (matchObj == null) {
    $q.notify({
      type: "negative",
      message: "Wrong url!",
      progress: true,
      timeout: 1500
    })
    return
  }
  state.loading = true
  state.videoId = matchObj[0]
  router.push({ name: "info", params: { videoId: state.videoId } })
}
</script>
