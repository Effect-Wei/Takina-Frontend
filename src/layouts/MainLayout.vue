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
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Takina
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="translate"
        />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    return {}
  }
})
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
</style>
