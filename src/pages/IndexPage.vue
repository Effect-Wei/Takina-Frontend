<template>
  <q-input
    id="searchBox"
    v-model="state.searchUrl"
    rounded
    outlined
    label="$t('text.searchBoxLabel')"
    placeholder="$t('text.searchBoxPlaceholder')"
  >
    <template #after>
      <q-btn
        type="submit"
        round
        icon="search"
        @click="onSubmit"
      />
    </template>
  </q-input>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"

const REGEX_AV_ID = /av\d+/
const REGEX_BV_ID = /BV\w+/

const router = useRouter()
const state = reactive({
  searchUrl: null,
  videoId: null
})

async function onSubmit() {
  let matchObj = REGEX_BV_ID.exec(state.searchUrl)
  if (matchObj == null) {
    matchObj = REGEX_AV_ID.exec(state.searchUrl)
  }
  if (matchObj == null) {
    alert("Wrong url!")
  }
  state.videoId = matchObj[0]
  router.push({ name: "info", params: { videoId: state.videoId } })
}
</script>
