<template>
  <div class="last-searches">
    <h3>Last searches</h3>
    <div class="last-searches__list">
      <template v-if="weatherStore.lastSearches.length">
        <div
          v-for="(item, i) in weatherStore.lastSearches"
          :key="`item-${item.lat}-${item.lon}-${i}`"
          class="item"
          @click="emit('select:location', item)"
        >
          <img
            src="@/assets/images/icons/location.png"
            width="20px"
            alt="location-icon"
          />
          <div>{{ item.name }}</div>
        </div>
      </template>

      <template v-else>
        <div class="empty-item">
          <span> No searches </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

import { useWeather } from '@/store/useWeather';

const emit = defineEmits(['select:location']);

const weatherStore = useWeather();
</script>

<style lang="scss" scoped>
.last-searches {
  h3 {
    font-weight: 600;
  }
  &__list {
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .item {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      border-bottom: 1px solid #ffffff80;
      padding-bottom: 10px;
    }
    .empty-item {
      color: rgba(255, 255, 255, 0.7);
      min-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
