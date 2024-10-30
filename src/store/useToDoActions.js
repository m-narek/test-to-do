import { defineStore } from "pinia";
import { useTodoStore } from "./useTodo";
import { computed } from "vue";

export const useTodoActionsStore = defineStore("todo-actions", () => {
  const toDoStore = useTodoStore();

  const actionsData = [
    {
      title: "Check all",
      action: () => toDoStore.updateAllTodos(true),
      isActive: false,
      hide: computed(() => toDoStore.isAllCompleted),
    },
    {
      title: "All",
      action: () => toDoStore.filterToDos(),
      isActive: computed(() => toDoStore.filterState === "all"),
      hide: false,
    },
    {
      title: "Active",
      action: () => toDoStore.filterToDos(false),
      isActive: computed(() => toDoStore.filterState === "active"),
      hide: false,
    },
    {
      title: "Complited",
      action: () => toDoStore.filterToDos(true),
      isActive: computed(() => toDoStore.filterState === "completed"),
      hide: false,
    },
    {
      title: "Clear complited",
      action: () => toDoStore.updateAllTodos(false),
      isActive: false,
      hide: computed(() => toDoStore.isAllActive),
    },
  ];

  return {
    actionsData,
  };
});
