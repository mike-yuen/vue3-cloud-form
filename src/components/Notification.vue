<template>
  <div class="notification px-6 py-2 text-left text-white leading-6">
    <strong>Notification:</strong>
    <div>{{ notification }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  state: string
  errorMessage?: string
}>()

const notification = computed(() => {
  switch (props.state) {
    case 'synced':
      return 'Form is synced with Firestore'
    case 'modifying':
      return 'From data changed, will sync with Firebase'
    case 'revoked':
      return 'From data and Firebase revoked to original data'
    case 'error':
      return `Failed to save to Firestore. ${props.errorMessage}`
    default:
      return 'Loading...'
  }
})
</script>
