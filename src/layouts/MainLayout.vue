<template>
  <q-layout view="hhh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title
          class="cursor-pointer text-white"
          shrink
          @click="router.push({ name: 'index' })"
        >
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Takina
        </q-toolbar-title>

        <q-space />

        <dark-mode-switcher />
        <locale-switcher />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view class="q-pt-md" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router"
import DarkModeSwitcher from "components/DarkModeSwitcher.vue"
import LocaleSwitcher from "components/LocaleSwitcher.vue"

const router = useRouter()
</script>

<style lang="scss">
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
