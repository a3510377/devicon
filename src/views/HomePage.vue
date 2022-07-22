<script setup lang="ts">
import { reactive } from 'vue';
import { getDeviconData, deviconDataType } from '@/utils/data';

const deviconData = reactive<deviconDataType[]>([]);
getDeviconData().then((d) => Object.assign(deviconData, d));
</script>

<template>
  <div class="icons">
    <div v-for="icon in deviconData" :key="icon.name" class="icon">
      <i
        class="cbp-ig-icon"
        :class="{ [`devicon-${icon.name}-${icon.base}`]: true }"
      ></i>
      <h3 v-text="icon.name"></h3>
    </div>
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

  .icon {
    width: 120px;
    height: 100px;
    text-align: center;
    word-break: break-all;

    &:hover {
      background-color: rgb(232 234 237 / 4%);
    }
  }

  .cbp-ig-icon {
    display: block;
    font-size: 48px;
    transition: transform 0.2s;
  }
}
</style>
