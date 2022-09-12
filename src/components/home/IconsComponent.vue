<script setup lang="ts">
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { useMagicKeys } from '@vueuse/core';

import { getDeviconData } from '@/utils/data';
import { useAppStore } from '@/stores/modules/app';

import IconsComponent from './IconComponent.vue';

const { escape } = useMagicKeys();

const appStore = useAppStore();
const fetchDeviconData = reactive(await getDeviconData());
const deviconData = computed(() => appStore.nowIcons || fetchDeviconData);

onMounted(() => Object.assign(appStore.baseIcons, fetchDeviconData));
watchEffect(() => {
  if (escape.value) appStore.focusIcon = void 0;
});

const iconClick = (name: string) => {
  appStore.focusIcon = deviconData.value[name];
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
  @media all and (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, 100px);
  }
}
</style>
