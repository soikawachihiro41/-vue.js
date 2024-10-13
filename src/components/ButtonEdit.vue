<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{
  'edit-click': [void]
}>()
</script>

<template>
  <BaseButton color="blue" @on-click="emit('edit-click')">変更</BaseButton>
</template>
