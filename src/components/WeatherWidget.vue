<template>
  <div
    class="weather-widget"
    :class="`${weatherStore.getContainerClass}-container`"
  >
    <div class="weather-widget__header">
      <h1>Weather app</h1>
      <WeatherSwitch v-model="temperatureScale" />
    </div>
    <div class="weather-widget__body">
      <WeatherAutocomplete @select:location="selectLocation" />
      <div class="location">
        <img
          src="@/assets/images/icons/location.png"
          alt="location-icon"
          width="23px"
        />
        <div>{{ weatherStore.location }}</div>
      </div>
      <div class="temperature-container">
        <div class="temperature">
          {{ convertTemperature(weatherStore.temperature, temperatureScale) }}
        </div>
        <img :src="weatherStore.weatherIcon" width="100px" alt="weather-icon" />
      </div>
    </div>
    <WeatherLastSearches @select:location="selectLocation" />
    <div class="weather-widget__actions">
      <div class="item">
        <img
          src="@/assets/images/icons/humidity.png"
          alt="humidity-icon"
          width="25px"
        />
        <p class="title">Humidity</p>
        <p class="value">{{ weatherStore.mainData.humidity }}%</p>
      </div>
      <div class="item">
        <img
          src="@/assets/images/icons/pressure.png"
          alt="pressure-icon"
          width="25px"
        />
        <p class="title">Pressure</p>
        <p class="value">{{ weatherStore.mainData.pressure }} hPa</p>
      </div>
      <div class="item">
        <img
          src="@/assets/images/icons/wind.png"
          alt="wind-icon"
          width="25px"
        />
        <p class="title">Wind Speed</p>
        <p class="value">{{ weatherStore.windData.speed }} m/s</p>
      </div>
      <div class="item">
        <img
          src="@/assets/images/icons/sunrise.png"
          alt="sunrise-icon"
          width="25px"
        />
        <p class="title">Sunrise</p>
        <p class="value">
          {{ convertTimestamp(weatherStore.sysData.sunrise) }}
        </p>
      </div>
      <div class="item">
        <img
          src="@/assets/images/icons/sunset.png"
          alt="sunset-icon"
          width="25px"
        />
        <p class="title">Sunset</p>
        <p class="value">
          {{
            convertTimestamp(weatherStore.sysData.sunset, weatherStore.timezone)
          }}
        </p>
      </div>
      <div class="item">
        <img
          src="@/assets/images/icons/visibility.png"
          alt="visibility-icon"
          width="25px"
        />
        <p class="title">Visibility</p>
        <p class="value">
          {{ metersToKilometers(weatherStore.visibility) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeatherSwitch from './WeatherSwitch.vue';
import WeatherAutocomplete from './WeatherAutocomplete.vue';
import WeatherLastSearches from './WeatherLastSearches.vue';

import { ref } from 'vue';

import {
  convertTemperature,
  convertTimestamp,
  metersToKilometers,
} from '@/helpers';

import { useWeather } from '@/store/useWeather';

const weatherStore = useWeather();

const temperatureScale = ref('celsius');

const selectLocation = ({ lat, lon }) => {
  weatherStore.fetchWeatherData({ lat, lon });
};
</script>

<style lang="scss" scoped>
.weather-widget {
  max-height: 100%;
  min-height: 100%;
  overflow-y: auto;
  padding: 25px 20px;
  border-radius: 20px;
  max-width: 576px;
  width: 100%;
  margin: 0 auto;
  transition: all 400ms;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 576px) {
    border-radius: 0;
    padding: 20px 15px;
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 6px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-weight: 600;
    }
  }
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .location {
      user-select: none;
      display: flex;
      gap: 4px;
      align-items: flex-end;
    }
    .temperature-container {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: center;
      .temperature {
        font-size: 75px;
      }
    }
  }

  &__actions {
    width: 100%;
    border-radius: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    gap: 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
    min-height: 113px;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: fit-content;
      align-items: center;
      .value {
        font-weight: 600;
      }
    }
  }
}
</style>
