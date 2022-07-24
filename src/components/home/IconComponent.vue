<script setup lang="ts">
import { useAppStore } from '@/stores/modules/app';
import { deviconDataType } from '@/utils/data';

defineProps<{ icon: deviconDataType }>();

const appStore = useAppStore();
</script>

<template>
  <button
    class="icon"
    :class="{ active: appStore.focusIcon?.name === icon.name }"
  >
    <i
      class="cbp-ig-icon"
      :class="{
        [`devicon-${icon.name}-${icon.base}`]: true,
        colored: appStore.colored,
      }"
    ></i>
    <h3 v-text="icon.name"></h3>
  </button>
</template>

<style lang="scss" scoped>
.icon {
  width: 120px;
  height: 120px;
  text-align: center;
  word-break: break-all;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 5px;
  user-select: none;

  &:hover {
    background-color: rgb(232 234 237 / 75.5%);
  }

  &.active,
  &:focus {
    background-color: #0000001b;
    outline: none;
  }

  &.active {
    border-color: blue;
  }

  h3 {
    margin-top: 20px;
  }
}

.cbp-ig-icon {
  display: block;
  font-size: var(--cbp-ig-icon-size, 48px);
  line-height: 48px;
  transition: transform 0.2s;
}

/* fix color */
.devicon-yunohost-plain.colored {
  color: #7f7f7f;
}
</style>
