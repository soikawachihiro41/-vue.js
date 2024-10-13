<script setup lang="ts">
import { onUnmounted} from 'vue';
import BaseButton from '@/components/BaseButton.vue';

const emit = defineEmits<{
  'add-click': [void];
}>();

onUnmounted(() => {
  console.log('onUnmounted');
});
</script>

<template>
  <BaseButton color="blue" @on-click="emit('add-click')">編集</BaseButton>
</template>
