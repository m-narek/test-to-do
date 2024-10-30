<template>
  <button
    class="text-sm font-semibold p-2 bg-gray-300 dark:bg-gray-800 rounded text-blue dark:text-blue-dark"
    @click="themeStore.toggleTheme"
  >
    Switch to {{ themeStore.isDarkMode ? "light" : "dark" }} Mode
  </button>
</template>

<script setup>
import { useThemeStore } from "@/store/useTheme";

const themeStore = useThemeStore();
</script>
