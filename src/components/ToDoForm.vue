<template>
  <form class="flex justify-center gap-4" @submit.prevent="hanldeAddToDo">
    <UiInput v-model="toDoValue" placeholder="Add new todo..." type="text" />
    <UiButton v-if="toDoValue"> Submit </UiButton>
  </form>
</template>

<script setup>
import { ref } from "vue";

// Components
import UiInput from "./ui/Input.vue";
import UiButton from "./ui/Button.vue";

// Stores
import { useTodoStore } from "@/store/useTodo";

const todoStore = useTodoStore();

const toDoValue = ref("");

const hanldeAddToDo = async () => {
  if (!toDoValue.value) return;
  const toDo = toDoValue.value;
  toDoValue.value = "";
  await todoStore.createToDo(toDo);
};
</script>

<style></style>
