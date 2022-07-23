<script setup lang="ts">
import { reactive } from 'vue';

import { getDeviconData } from '@/utils/data';
import { useAppStore } from '@/stores/modules/app';

import IconsComponent from './IconComponent.vue';

const appStore = useAppStore();
const deviconData = reactive(await getDeviconData());

const iconClick = (name: string) => (appStore.focusIcon = deviconData[name]);
</script>

<template>
  <div class="icons">
    <IconsComponent
      v-for="(icon, name) in deviconData"
      :key="name"
      :icon="icon"
      @click="iconClick(name)"
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
