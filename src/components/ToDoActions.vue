<template>
  <div class="flex flex-wrap gap-2 items-center justify-center mx-auto">
    <template v-for="item in toDoActionsStore.actionsData" :key="item.id">
      <UiButton
        v-if="!item.hide"
        :class="{ 'bg-white !text-gray-dark dark:bg-white': !item.isActive }"
        @click="handleAction(item)"
      >
        {{ item.title }}
      </UiButton>
    </template>
  </div>
</template>

<script setup>
// Components
import UiButton from "./ui/Button.vue";

// Stores
import { useTodoActionsStore } from "@/store/useToDoActions";

const toDoActionsStore = useTodoActionsStore();

const handleAction = (item) => {
  if (!item.isActive) {
    item.action();
  }
};
</script>
