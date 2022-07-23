<script setup lang="ts">
import { reactive } from 'vue';

import { getDeviconData, deviconDataType } from '@/utils/data';
import IconsComponent from '@/components/home/IconsComponent.vue';
import IconInfo from '@/components/home/IconInfo.vue';

const deviconData = reactive<deviconDataType[]>([]);
getDeviconData().then((d) => Object.assign(deviconData, d));
</script>

<template>
  <Suspense>
    <IconsComponent />
  </Suspense>
  <IconInfo />
</template>

<style lang="scss" scoped></style>
