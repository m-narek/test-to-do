<template>
  <div class="temperature-switch">
    <label class="switch">
      <input
        v-model="isFahrenheit"
        type="checkbox"
        @change="toggleTemperatureUnit"
      />
      <span class="slider">
        <span class="label celsius">°C</span>
        <span class="label fahrenheit">°F</span>
      </span>
    </label>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const isFahrenheit = ref(false);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function toggleTemperatureUnit() {
  emit('update:modelValue', isFahrenheit.value ? 'fahrenheit' : 'celsius');
}

onMounted(() => {
  isFahrenheit.value = props.modelValue === 'fahrenheit';
});
</script>

<style lang="scss" scoped>
.temperature-switch {
  display: flex;
  flex-direction: column;
  align-items: center;

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      user-select: none;
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: transparent;
      border: solid 2px white;
      transition: 0.4s;
      border-radius: 34px;

      &:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 2px;
        bottom: 2.5px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .label {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-weight: bold;
        font-size: 14px;
        color: white;

        &.celsius {
          left: 10px;
        }

        &.fahrenheit {
          right: 10px;
        }
      }
    }

    input:checked + .slider {
      &:before {
        transform: translateX(26.5px);
      }
    }
  }
}
</style>
