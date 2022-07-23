<script setup lang="ts">
import { reactive } from 'vue';

import { getDeviconData, deviconDataType } from '@/utils/data';
import IconsComponent from '@/components/home/IconsComponent.vue';
import IconInfo from '@/components/home/IconInfo.vue';

const deviconData = reactive<deviconDataType[]>([]);
getDeviconData().then((d) => Object.assign(deviconData, d));
</script>

<template>
  <div class="view">
    <Suspense>
      <IconsComponent class="icons" />
    </Suspense>
    <IconInfo />
  </div>
</template>

<style lang="scss" scoped>
.view {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .icons {
    width: 100%;
  }
}
</style>
