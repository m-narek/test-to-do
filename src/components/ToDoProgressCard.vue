<template>
  <div class="bg-gray-lighter dark:bg-gray-light p-4 rounded-lg w-full">
    <p class="text-gray-dark opacity-50 text-xs font-semibold">
      {{ value }} tasks
    </p>
    <p class="text-gray-dark mt-1 font-bold">{{ title }}</p>
    <UiProgress
      class="mt-3"
      :progress="progress"
      :color-class="progressColor"
    />
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

// Components
import UiProgress from "./ui/Progress.vue";

const props = defineProps({
  isCompleted: {
    type: Boolean,
    default: true,
  },
  value: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
});

const title = computed(() =>
  props.isCompleted ? "Completed" : "To be finished",
);

const progressColor = computed(() =>
  props.isCompleted ? "bg-blue dark:bg-blue-dark" : "bg-pink dark:bg-pink-dark",
);

const progress = computed(() => (props.value / props.length) * 100);
</script>
