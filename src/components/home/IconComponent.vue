<script setup lang="ts">
import { deviconDataType } from '@/utils/data';

defineProps<{ icon: deviconDataType }>();
</script>

<template>
  <button class="icon">
    <i
      class="cbp-ig-icon colored"
      :class="{ [`devicon-${icon.name}-${icon.base}`]: true }"
    ></i>
    <h3 v-text="icon.name"></h3>
  </button>
</template>

<style lang="scss" scoped>
.icon {
  width: 120px;
  height: 120px;
  text-align: center;
  word-break: break-all;
  background-color: transparent;
  border: 0;
  border-radius: 5px;
  user-select: none;

  &:hover {
    background-color: rgb(232 234 237 / 75.5%);
  }

  &:focus {
    background-color: #0000001b;
    outline: none;
  }

  h3 {
    margin-top: 20px;
  }
}

.cbp-ig-icon {
  display: block;
  font-size: 48px;
  transition: transform 0.2s;
}

/* fix color */
.devicon-yunohost-plain.colored {
  color: #7f7f7f;
}
</style>
