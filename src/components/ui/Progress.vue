<template>
  <div class="progress-bar h-1 w-full rounded-lg bg-gray-light">
    <div
      :style="{
        width: `${progress}%`,
      }"
      :class="colorClass"
      class="progress-bar--progress h-full rounded-lg"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  progress: {
    type: Number,
    required: true,
  },
  colorClass: {
    type: String,
    default: "bg-blue dark:bg-blue-dark",
  },
});
</script>
