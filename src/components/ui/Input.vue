<template>
  <div
    class="flex flex-col w-full"
    :style="{
      maxWidth: width,
    }"
  >
    <label v-if="label" class="mb-1 text-sm text-gray-700">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      :disabled="disabled"
      :maxlength="maxLength"
      class="h-10 border-2 border-slate-200 outline-none rounded-lg px-3 w-full focus:border-primary transition-colors dark:focus:border-primary-dark"
      :placeholder="placeholder"
      @input="(e) => emit('update:modelValue', e.target.value)"
    />
    <span v-if="errorMessage" class="mt-1 text-red-500 text-sm">{{
      errorMessage
    }}</span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Add new todo...",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: null,
  },
  width: {
    type: String,
    default: "320px",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
