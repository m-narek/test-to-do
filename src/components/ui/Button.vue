<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
import { defineProps, computed, defineEmits } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "Submit",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  return `bg-primary dark:bg-primary-dark h-10 text-white font-semibold px-4 rounded-lg ${props.className}`;
});

const handleClick = (event) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>
