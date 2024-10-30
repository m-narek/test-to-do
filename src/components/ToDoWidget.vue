<template>
  <div
    class="max-w-[730px] w-full h-full flex items-center rounded-3xl bg-white p-8 relative"
  >
    <div class="w-full h-fit max-h-full overflow-y-auto">
      <ThemeToggle class="sticky top-0 left-0" />
      <img class="mx-auto" src="@/assets/images/logo.svg" alt="" />
      <h1 class="text-2xl font-bold text-center my-10">Today I need to</h1>
      <div class="max-w-[450px] w-full m-auto">
        <ToDoForm />
        <div class="w-full min-h-[250px] flex items-center justify-center">
          <UiLoader v-if="todoStore.loading" />
          <div v-else class="w-full">
            <ToDoList />
            <div class="w-full mt-8 flex gap-[30px]">
              <ToDoProgressCard
                :value="todoStore.completedTodos.length"
                :length="todoStore.toDos.length"
              />
              <ToDoProgressCard
                :is-completed="false"
                :value="todoStore.nonCompletedTodos.length"
                :length="todoStore.toDos.length"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <div
          v-if="!todoStore.toDos.length"
          class="flex justify-center gap-2 items-center text-sm"
        >
          <img class="mb-0.5" src="@/assets/images/icons/check.svg" alt="" />
          <p class="text-center text-gray">
            Congrat, you have no more tasks to do
          </p>
        </div>
        <ToDoActions v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

// Components
import ToDoForm from "./ToDoForm.vue";
import ToDoList from "./ToDoList.vue";
import ToDoActions from "./ToDoActions.vue";
import ToDoProgressCard from "./ToDoProgressCard.vue";
import UiLoader from "./ui/Loader.vue";
import ThemeToggle from "./theme/ThemeToggle.vue";

// Stores
import { useTodoStore } from "@/store/useTodo";

const todoStore = useTodoStore();

onMounted(async () => {
  await todoStore.fetchToDos();
});
</script>
