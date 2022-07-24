<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { useAppStore } from '@/stores/modules/app';

const appStore = useAppStore();
const fontSize = ref<number>(48);

useStyleTag(computed(() => `:root{--cbp-ig-icon-size:${fontSize.value}px}`));
</script>

<template>
  <div class="customization">
    <h1>customization</h1>
    <div>
      <label for="set-colored">colored</label>
      <input id="set-colored" v-model="appStore.colored" type="checkbox" />
    </div>
    <div>
      <label for="optical-size">Optical size</label>
      <input
        id="optical-size"
        v-model="fontSize"
        type="range"
        min="20"
        max="48"
        step="7"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.customization {
  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 30px 15px;

  label {
    font-size: 18pt;
  }
  @media all and (max-width: 760px) {
    display: none;
  }
}
</style>
