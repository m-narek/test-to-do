import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from '@/axios';

import { getDayOrNight } from '@/helpers';
import { getIconUrl } from '@/helpers';

export const useWeather = defineStore('weather', () => {
  const weatherData = ref(null);
  const errorData = ref(null);
  const loading = ref(true);
  const lastSearches = ref([]);

  const getContainerClass = computed(() =>
    weatherData.value ? getDayOrNight(weatherData.value.timezone) : 'day',
  );

  const location = computed(() => weatherData.value?.name);

  const weatherIcon = computed(() =>
    weatherData.value ? getIconUrl(weatherData.value.weather[0].icon) : '',
  );

  const temperature = computed(() => weatherData.value?.main.temp);

  const mainData = computed(() => weatherData.value?.main);

  const windData = computed(() => weatherData.value?.wind);

  const sysData = computed(() => weatherData.value?.sys);

  const visibility = computed(() => weatherData.value?.visibility);

  const timezone = computed(() => weatherData.value?.timezone);

  function getCurrentPositionPromise() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const fetchWeatherData = async (coords) => {
    let weatherCoords = {};

    if (coords) {
      weatherCoords = coords;
    } else {
      try {
        const position = await getCurrentPositionPromise();
        const { latitude, longitude } = position.coords;
        weatherCoords = {
          lat: latitude,
          lon: longitude,
        };
      } catch (e) {
        weatherCoords = { lat: 0, lon: 0 };
      }
    }

    try {
      const response = await axios.weather.get('/weather', {
        params: weatherCoords,
      });
      weatherData.value = response.data;
    } catch (e) {
      errorData.value = e;
    } finally {
      loading.value = false;
    }
  };

  const searchLocation = async (query) => {
    try {
      const response = await axios.geo.get('/geocode/autocomplete', {
        params: { text: query },
      });
      return response?.data;
    } catch (e) {
      throw new Error('Not found');
    }
  };

  const loadSearchHistory = () => {
    const storedSearches = localStorage.getItem('last-searches');
    if (storedSearches) {
      lastSearches.value = JSON.parse(storedSearches);
    }
  };

  return {
    fetchWeatherData,
    getContainerClass,
    searchLocation,
    loadSearchHistory,

    mainData,
    windData,
    sysData,
    visibility,
    timezone,
    loading,
    location,
    weatherIcon,
    temperature,
    lastSearches,
  };
});
