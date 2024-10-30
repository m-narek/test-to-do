<template>
  <div
    class="autocomplete-container"
    :class="`${weatherStore.getContainerClass}-autocomplete`"
    @click="focusInput"
  >
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder"
      class="autocomplete-input"
      aria-autocomplete="list"
      :aria-expanded="showSuggestions.toString()"
      :aria-activedescendant="activeSuggestionId"
      @input="debouncedFetchSuggestions"
      @keydown.down="navigateSuggestions('down')"
      @keydown.up="navigateSuggestions('up')"
      @keydown.enter="selectSuggestion(selectedIndex)"
    />
    <img
      src="@/assets/images/icons/close.png"
      class="clear-icon"
      width="22px"
      :style="{
        opacity: query ? '1' : '0',
      }"
      alt="clear-icon"
      @click="deleteQuery"
    />
    <div v-if="showSuggestions" class="autocomplete-suggestions">
      <div
        v-for="(suggestion, index) in suggestions"
        :id="`suggestion-${index}`"
        :key="suggestion.place_id"
        :class="{ active: selectedIndex === index }"
        class="autocomplete-suggestion"
        @click="selectSuggestion(index)"
      >
        <span class="suggestion-text">{{
          suggestion.properties.formatted
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps } from 'vue';

import { debounce } from '@/helpers';

import { useWeather } from '@/store/useWeather';

const weatherStore = useWeather();

defineProps({
  placeholder: {
    type: String,
    default: 'Search for a location...',
  },
});

const emit = defineEmits(['select:location']);

const query = ref('');
const suggestions = ref([]);
const selectedIndex = ref(-1);

const showSuggestions = computed(() => suggestions.value.length > 0);

const activeSuggestionId = computed(() => {
  return selectedIndex.value >= 0 ? `suggestion-${selectedIndex.value}` : '';
});

const fetchSuggestions = async () => {
  if (query.value.length <= 2) {
    suggestions.value = [];
    return;
  }
  try {
    const data = await weatherStore.searchLocation(query.value);
    suggestions.value = data?.features || [];
  } catch (e) {
    console.log(e);
  }

  selectedIndex.value = -1;
};

const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

const selectSuggestion = (index) => {
  if (index >= 0 && index < suggestions.value.length) {
    const selectedItem = suggestions.value[index].properties;
    query.value = selectedItem.formatted;
    emit('select:location', selectedItem);
    suggestions.value = null;
    selectedIndex.value = -1;
    saveSearch({
      name: selectedItem.formatted,
      lat: selectedItem.lat,
      lon: selectedItem.lon,
    });
  }
};

const navigateSuggestions = (direction) => {
  if (direction === 'down') {
    selectedIndex.value = Math.min(
      selectedIndex.value + 1,
      suggestions.value.length - 1,
    );
  } else if (direction === 'up') {
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  }
};

const saveSearch = (location) => {
  weatherStore.lastSearches.unshift(location);
  if (weatherStore.lastSearches.length > 5) {
    weatherStore.lastSearches.pop();
  }

  localStorage.setItem(
    'last-searches',
    JSON.stringify(weatherStore.lastSearches),
  );
};

const focusInput = () => {
  const input = document.querySelector('.autocomplete-input');
  input && input.focus();
};

const deleteQuery = () => {
  (query.value = ''), (suggestions.value = null);
};

watch(query, (newValue) => {
  if (!suggestions.value) {
    suggestions.value = [];
  } else if (!newValue) {
    suggestions.value = [];
  } else {
    debouncedFetchSuggestions();
  }
});
</script>

<style lang="scss" scoped>
.autocomplete-container {
  position: relative;
  width: 100%;
  background-color: transparent;

  .autocomplete-input {
    width: 100%;
    padding: 12px 45px 12px 16px;
    border: 2px solid transparent;
    background-color: rgba(255, 255, 255, 0.35);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(white, 0.1);
    font-size: 16px;
    transition: all 300ms;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }

    &:focus {
      box-shadow: 0 4px 8px rgba(white, 0.2);
      border: 2px solid white;
      background-color: rgba(255, 255, 255, 0.2);
      outline: none;
    }
  }

  .autocomplete-suggestions {
    position: absolute;
    width: 100%;
    border: 1px solid white;
    border-top: none;
    background-color: #a1c4fd;
    z-index: 1000;
    border-radius: 0 0 8px 8px;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 14px 27px rgba(0, 0, 0, 0.2);

    .autocomplete-suggestion {
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.3s;
      border-bottom: 1px solid white;

      &:last-child {
        border-bottom: none;
      }

      &:hover,
      &.active {
        background-color: #89c9fa;
      }
    }
  }
  .clear-icon {
    cursor: pointer;
    user-select: none;
    position: absolute;
    top: 11.5px;
    right: 15px;
    transition: all 300ms;
  }
}
.night-autocomplete {
  .autocomplete-suggestions {
    background-color: #0d2746 !important;
    .autocomplete-suggestion {
      &:hover,
      &.active {
        background-color: #0f355e !important;
      }
    }
  }
}
</style>
