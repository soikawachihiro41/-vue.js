<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{
  'del-click': [void]
}>()
</script>

<template>
  <BaseButton color="blue" @on-click="emit('del-click')">削</BaseButton>
</template>
