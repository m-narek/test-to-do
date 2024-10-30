<template>
  <div class="flex items-center">
    <input
      :id="dynamicId"
      class="cursor-pointer h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary dark:text-primary-dark dark:focus:ring-primary-dark dark:accent-primary-dark"
      type="checkbox"
      :checked="modelValue"
      @change="updateValue"
    />
    <label :for="dynamicId" class="ml-2 text-sm text-gray-700">{{
      label
    }}</label>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const dynamicId = ref("");

onMounted(() => {
  dynamicId.value = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
});

const updateValue = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>
