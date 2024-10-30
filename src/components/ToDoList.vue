<template>
  <div
    class="flex flex-col justify-center items-center mt-10 pr-2 h-[92px] overflow-auto w-full"
  >
    <div class="h-full flex flex-col w-full">
      <template v-if="!todoStore.filteredToDos.length">
        <div class="empty-block w-full h-full flex justify-center items-center">
          <p class="text-gray">No items</p>
        </div>
      </template>
      <template v-else>
        <ToDoItem
          v-for="(item, index) in todoStore.filteredToDos"
          :id="`todo-item-${item.id}`"
          :key="item.id"
          :title="item.todo"
          :finished="item.completed"
          :edit-mode="editingItemIndex === item.id"
          @delete-item="handleDelete(item.id)"
          @update-item="(field, value) => handleUpdate(item, field, value)"
          @edit-item="handleChangeEditingItem(item.id)"
          @drop-item="handleDrop(index)"
          @drag-start="handleDragStart(index)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

// Components
import ToDoItem from "./ToDoItem.vue";

// Stores
import { useTodoStore } from "@/store/useTodo";

const todoStore = useTodoStore();

const draggedIndex = ref(null);
const editingItemIndex = ref(null);

const handleDragStart = (index) => {
  draggedIndex.value = index;
};

const handleDrop = (targetIndex) => {
  if (draggedIndex.value !== targetIndex) {
    swapItems(draggedIndex.value, targetIndex);
  }
  draggedIndex.value = null;
};

const handleDelete = async (id) => {
  await todoStore.deleteTodo(id);
};

const handleUpdate = async (item, field, value) => {
  const payload = { ...item, [field]: value };
  editingItemIndex.value = null;
  if(item[field] === value) return;
  await todoStore.updateTodo(payload);
  await nextTick();

  goToEditingElement(item.id);
};

const goToEditingElement = (id) => {
  const toDoEl = document.getElementById(`todo-item-${id}`);
  toDoEl.scrollIntoView({
    block: "center",
    inline: "nearest",
  });
};

const handleChangeEditingItem = (id) => {
  editingItemIndex.value = id;
};

const swapItems = (fromIndex, toIndex) => {
  const items = [...todoStore.filteredToDos];
  const [movedItem] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, movedItem);
  todoStore.filteredToDos = items;
};
</script>
