<script setup lang="ts">
import { reactive } from 'vue';

import { getDeviconData, deviconDataType } from '@/utils/data';
import IconsComponents from '@/components/home/IconsComponent.vue';

const deviconData = reactive<deviconDataType[]>([]);
getDeviconData().then((d) => Object.assign(deviconData, d));
</script>

<template>
  <Suspense>
    <IconsComponents />
  </Suspense>
</template>

<style lang="scss" scoped></style>
