import apiClient from "@/axios";

const USER_ID = 13;

export const toDoService = {
  async getAllToDos() {
    const response = await apiClient.get(`/todos/user/${USER_ID}`);
    return response.data;
  },

  async getToDoById(id) {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  },

  async getRandomToDo() {
    const response = await apiClient.get("/todos/random");
    return response.data;
  },

  async getUserToDos() {
    const response = await apiClient.get(`/todos/user/${USER_ID}`);
    return response.data;
  },

  async createToDo(todo, completed = false) {
    const response = await apiClient.post("/todos/add", {
      todo,
      completed,
      userId: USER_ID,
    });
    return response.data;
  },

  async updateToDo(id, updatedData) {
    const response = await apiClient.put(`/todos/${id}`, updatedData);

    return response.data;
  },

  async deleteToDo(id) {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  },

  async updateToDosStatus(toDos, completed) {
    const updatePromises = toDos.map((toDo) =>
      apiClient.put(`/todos/${toDo.id}`, { completed }),
    );
    return Promise.all(updatePromises);
  },
};
