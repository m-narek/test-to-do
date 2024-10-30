import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { toDoService } from "@/services/toDoSerivce";

export const useTodoStore = defineStore("todo", () => {
  const toDos = ref([]);
  const filteredToDos = ref([]);
  const filterState = ref("all");
  const loading = ref(false);
  const error = ref(null);

  const completedTodos = computed(() =>
    toDos.value.filter((todo) => todo.completed),
  );

  const nonCompletedTodos = computed(() =>
    toDos.value.filter((todo) => !todo.completed),
  );

  const isAllCompleted = computed(
    () => toDos.value.length > 0 && toDos.value.every((todo) => todo.completed),
  );

  const isAllActive = computed(
    () =>
      toDos.value.length > 0 && toDos.value.every((todo) => !todo.completed),
  );

  const updateFilteredToDos = () => {
    filterState.value = "all";
    filteredToDos.value = [...toDos.value];
  };

  const fetchToDos = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await toDoService.getAllToDos();
      toDos.value = data.todos;
      updateFilteredToDos();
    } catch (err) {
      error.value = "Failed to fetch todos";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const filterToDos = (isComplete = null) => {
    if (isComplete === null) {
      // If null, show all todos
      updateFilteredToDos();
      filterState.value = "all";
    } else {
      filteredToDos.value = toDos.value.filter(
        (todo) => todo.completed === isComplete,
      );
      filterState.value = isComplete ? "completed" : "active";
    }
  };

  const createToDo = async (toDo) => {
    loading.value = true;
    error.value = null;

    try {
      const newToDo = await toDoService.createToDo(toDo);

      // Generate a unique IDp
      const maxId = toDos.value.length
        ? Math.max(...toDos.value.map((t) => t.id)) + 1
        : 1;

      // Assign the new ID if the API returns the same ID
      newToDo.id = maxId;

      toDos.value.unshift(newToDo);
    } catch (err) {
      error.value = "Failed to create todo";
      console.error(err);
    } finally {
      updateFilteredToDos();
      loading.value = false;
    }
  };

  const updateTodo = async (updatedTodo) => {
    loading.value = true;
    error.value = null;

    try {
      const todo = await toDoService.updateToDo(updatedTodo.id, {
        todo: updatedTodo.todo,
        completed: updatedTodo.completed,
      });

      const index = toDos.value.findIndex((t) => t.id === updatedTodo.id);
      if (index !== -1) toDos.value[index] = todo;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Simulate local change if 404 error
        const index = toDos.value.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          toDos.value[index] = { ...toDos.value[index], ...updatedTodo };
          console.warn("Simulated local update due to 404.");
        }
      } else {
        error.value = "Failed to update todo";
        console.error(err);
      }
    } finally {
      updateFilteredToDos();
      loading.value = false;
    }
  };

  const deleteTodo = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      await toDoService.deleteToDo(id);
      toDos.value = toDos.value.filter((t) => t.id !== id);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Simulate local deletion if 404 error
        console.warn("Simulated local deletion due to 404.");
        toDos.value = toDos.value.filter((t) => t.id !== id);
      } else {
        error.value = "Failed to delete todo";
        console.error(err);
      }
    } finally {
      updateFilteredToDos();
      loading.value = false;
    }
  };

  const updateAllTodos = async (completed) => {
    loading.value = true;
    error.value = null;
    const payload = completed ? nonCompletedTodos.value : completedTodos.value;
    try {
      await toDoService.updateToDosStatus(payload, completed);
      toDos.value.forEach((todo) => (todo.completed = completed));
    } catch (err) {
      error.value = "Failed to update todos";
      console.error(err);
    } finally {
      updateFilteredToDos();
      loading.value = false;
    }
  };

  return {
    toDos,
    filteredToDos,
    filterState,
    loading,
    error,

    isAllCompleted,
    isAllActive,

    fetchToDos,
    filterToDos,
    createToDo,
    updateTodo,
    deleteTodo,
    updateAllTodos,
    completedTodos,
    nonCompletedTodos,
  };
});
