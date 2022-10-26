<script setup>
import { useI18n } from "vue-i18n"
import { useQuasar } from "quasar"
import { onMounted } from "vue"

const $q = useQuasar()
const i18n = useI18n({ useScope: "global" })

function switchLocale(targetLocale) {
  i18n.locale.value = targetLocale
  $q.localStorage.set("language", targetLocale)
}

onMounted(() => {
  let targetLocale = $q.localStorage.getItem("language")
  if (targetLocale === null) {
    targetLocale = $q.lang.getLocale()
  }
  switchLocale(targetLocale)
})
</script>

<template>
  <q-fab
    direction="up"
    icon="translate"
    padding="10px"
    vertical-actions-align="right"
    flat
  >
    <q-list
      class="locale-list rounded-borders text-dark"
      bordered
      padding
      dense
    >
      <q-item
        v-for="(targetLocale, index) in i18n.availableLocales"
        :key="index"
        clickable
        @click="switchLocale(targetLocale)"
      >
        <q-item-section>
          <span v-t="{ path: 'text.lang', locale: targetLocale }"></span>
        </q-item-section>
      </q-item>
    </q-list>
  </q-fab>
</template>

<style scoped>
.locale-list {
  min-width: 128px;
  background: #ffffff;
}
</style>
