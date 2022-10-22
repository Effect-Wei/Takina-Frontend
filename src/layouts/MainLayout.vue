<template>
  <q-layout view="hhh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      elevated
      class="bg-grey-8 text-white"
    >
      <q-toolbar>
        <q-toolbar-title
          class="toolbar-title"
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
import { useRouter } from "vue-router"
import LocaleSwitcher from "components/LocaleSwitcher.vue"

const router = useRouter()
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
</style>
