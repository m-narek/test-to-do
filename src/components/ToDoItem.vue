<template>
  <div
    class="bg-white p-2 rounded"
    :class="editMode ? 'cursor-default' : 'cursor-move'"
    :draggable="!editMode"
    @dragover.prevent
    @touchmove.prevent
    @dragstart="onDragStart"
    @drop="onDrop"
    @touchstart="onDragStart"
    @touchend="onDrop"
  >
    <form class="flex justify-between items-center" @submit.prevent="onEdit">
      <div class="flex items-center gap-2">
        <UiCheckbox
          :model-value="finished"
          @update:model-value="onUpdate('completed', !props.finished)"
        />
        <UiInput v-if="editMode" v-model="editInputModel" />
        <p v-else>{{ title }}</p>
      </div>
      <div class="flex items-center gap-4 cursor-pointer">
        <button>
          <img
            width="16px"
            height="16px"
            :src="
              require(
                `@/assets/images/icons/${editMode ? 'save.png' : 'pencil.svg'}`,
              )
            "
            alt="Pencil icon"
          />
        </button>
        <button @click="onDelete">
          <img src="@/assets/images/icons/bin.svg" alt="Bin icon" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";

// Components
import UiCheckbox from "./ui/Checkbox.vue";
import UiInput from "./ui/Input.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  finished: {
    type: Boolean,
    default: false,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  "dragStart",
  "dropItem",
  "deleteItem",
  "editItem",
  "updateItem",
]);

const editInputModel = ref("");

const onDragStart = (event) => {
  emits("dragStart", event);
};

const onDrop = (event) => {
  emits("dropItem", event);
};

const onDelete = () => {
  emits("deleteItem");
};

const onEdit = () => {
  if (props.editMode) {
    onUpdate("todo", editInputModel.value);
  } else {
    emits("editItem");
  }
};

const onUpdate = (field, value) => [emits("updateItem", field, value)];

watch(
  () => props.editMode,
  (newVal) => {
    editInputModel.value = newVal ? props.title : "";
  },
);
</script>
