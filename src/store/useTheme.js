import { defineStore } from "pinia";
import { ref, onMounted, onUnmounted } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkMode = ref(false);
  let mediaQueryList = null;

  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
  };

  const detectSystemTheme = () => {
    isDarkMode.value = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    applyTheme(isDarkMode.value);
  };

  const handleThemeChange = (event) => {
    isDarkMode.value = event.matches;
    applyTheme(isDarkMode.value);
  };

  const watchSystemTheme = () => {
    mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", handleThemeChange);
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    applyTheme(isDarkMode.value);
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      isDarkMode.value = savedTheme === "dark";
    } else {
      detectSystemTheme();
    }
    applyTheme(isDarkMode.value);
  };

  onMounted(() => {
    initTheme();
    watchSystemTheme();
  });

  onUnmounted(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener("change", handleThemeChange);
    }
  });

  return {
    isDarkMode,
    toggleTheme,
    initTheme,
  };
});
