<template>
  <q-layout view="hhh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      elevated
      :class="footerBg"
    >
      <q-toolbar>
        <q-toolbar-title
          class="toolbar-title text-white"
          shrink
          @click="router.push({ name: 'index' })"
        >
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Takina
        </q-toolbar-title>

        <q-space />

        <locale-switcher />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import LocaleSwitcher from "components/LocaleSwitcher.vue"

const $q = useQuasar()
const router = useRouter()

const footerBg = computed(() => {
  return $q.dark.isActive ? "bg-light-blue-10" : "bg-cyan-8"
})

onMounted(() => {
  let darkMode = $q.localStorage.getItem("darkMode")
  if (darkMode === null) {
    darkMode = "auto"
  }
  $q.dark.set(darkMode)
})
</script>

<style lang="scss">
.toolbar-title {
  cursor: pointer;
}

.text-bilipink {
  color: $bilipink !important;
}

.bg-bilipink {
  background: $bilipink !important;
}

.text-bg1 {
  color: $bg1 !important;
}

.bg-bg1 {
  background: $bg1 !important;
}

.text-bg1-dark {
  color: $bg1-dark !important;
}

.bg-bg1-dark {
  background: $bg1-dark !important;
}
</style>
