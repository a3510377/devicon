<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue';

import { getDeviconData } from '@/utils/data';
import { useAppStore } from '@/stores/modules/app';

import IconsComponent from './IconComponent.vue';

const appStore = useAppStore();
const fetchDeviconData = reactive(await getDeviconData());
const deviconData = computed(() => appStore.nowIcons || fetchDeviconData);

onMounted(() => Object.assign(appStore.baseIcons, fetchDeviconData));

const iconClick = (name: string) => {
  if (appStore.focusIcon?.name === name) appStore.focusIcon = void 0;
  else appStore.focusIcon = deviconData.value[name];
};
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
