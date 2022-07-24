<template>
  <div class="customization">
    <h1>customization</h1>
    <input v-model="fontSize" type="range" min="20" max="48" step="7" />
    <input v-model="appStore.colored" type="checkbox" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { useAppStore } from '@/stores/modules/app';

const appStore = useAppStore();
const fontSize = ref<number>(48);

useStyleTag(computed(() => `:root{--cbp-ig-icon-size:${fontSize.value}px}`));
</script>

<style lang="scss" scoped>
.customization {
  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 30px 15px;
}
</style>
