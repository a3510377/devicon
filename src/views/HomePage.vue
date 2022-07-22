<script setup lang="ts">
import { reactive } from 'vue';
import { getDeviconData, deviconDataType } from '@/utils/data';

const deviconData = reactive<deviconDataType[]>([]);
getDeviconData().then((d) => Object.assign(deviconData, d));
</script>

<template>
  <div class="icons">
    <button
      v-for="icon in deviconData"
      :key="icon.name"
      class="icon"
      role="option"
    >
      <i
        class="cbp-ig-icon colored"
        :class="{ [`devicon-${icon.name}-${icon.base}`]: true }"
      ></i>
      <h3 v-text="icon.name"></h3>
    </button>
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
}
</style>
