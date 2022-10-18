<script setup>
import { onMounted } from "vue"

const props = defineProps({
  sitekey: {
    type: String,
    required: true
  }
})

const emit = defineEmits(["challenged", "expired", "failed"])

function renderTurnstile() {
  window.onloadTurnstileCallback = () => {
    window.turnstile?.render("#turnstile-box", {
      sitekey: props.sitekey,
      callback: (token) => emit("challenged", token),
      "expired-callback": emit("expired"),
      "error-callback": emit("failed")
    })
  }
}

onMounted(() => {
  if (window.turnstile === null || !window.turnstile) {
    const script = document.createElement("script")
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
  renderTurnstile()
})
</script>

<template>
  <div id="turnstile-box"></div>
</template>
