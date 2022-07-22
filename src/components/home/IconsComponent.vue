<script setup lang="ts">
import { reactive } from 'vue';

import { getDeviconData, deviconDataType } from '@/utils/data';

import IconsComponent from './IconComponent.vue';

const deviconData = reactive<deviconDataType[]>(await getDeviconData());

const iconClick = (name: string) => {
  console.log(name);
};
</script>

<template>
  <div class="icons">
    <IconsComponent
      v-for="icon in deviconData"
      :key="icon.name"
      :icon="icon"
      @click="iconClick(icon.name)"
    />
  </div>
</template>

<style lang="scss" scoped>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  column-gap: 16px;
  row-gap: 24px;
  justify-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
