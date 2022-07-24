<script lang="ts" setup>
import { ref, watch } from 'vue';
import { onStartTyping } from '@vueuse/core';
import { Search } from 'js-search';

import { useAppStore } from '@/stores/modules/app';
import { deviconDataType } from '@/utils/data';

const inputEl = ref<HTMLInputElement & { active: boolean }>();
const appStore = useAppStore();
const search = new Search('name');
search.addIndex('tags');

const searchStr = ref('');

watch(appStore.baseIcons, (data) => {
  search.addDocuments(JSON.parse(JSON.stringify(Object.values(data))));
});
watch(searchStr, (searchStr) => {
  if (!searchStr) return (appStore.nowIcons = appStore.baseIcons);
  const data: Record<string, deviconDataType> = {};

  (<deviconDataType[]>search.search(searchStr)).forEach((item) => {
    data[item.name] = item;
  });
  appStore.nowIcons = data;
});

onStartTyping(() => {
  if (!inputEl.value?.active) inputEl.value?.focus();
});
</script>

<template>
  <div class="search">
    <label for="icon-search">
      <SvgIcon name="search" color="black" size="24px" />
    </label>
    <input
      id="icon-search"
      ref="inputEl"
      v-model="searchStr"
      type="text"
      placeholder="Search Material Symbols"
    />
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  padding: 20px;
  margin: 2em 0;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 14px -15px #565656;

  #icon-search {
    width: 450px;
    padding: 5px 10px;
    border: 1px solid #000;
  }
}
</style>
