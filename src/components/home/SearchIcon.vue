<script lang="ts" setup>
import { ref, watch } from 'vue';
import { onStartTyping } from '@vueuse/core';
import { Search, AllSubstringsIndexStrategy } from 'js-search';

import { useAppStore } from '@/stores/modules/app';
import { deviconDataType } from '@/utils/data';

const inputEl = ref<HTMLInputElement & { active: boolean }>();
const appStore = useAppStore();

const search = new Search('name');
search.indexStrategy = new AllSubstringsIndexStrategy();

search.addIndex('name');
search.addIndex('altnames');
search.addIndex('tags');

const searchStr = ref('');

watch(appStore.baseIcons, (data) => {
  search.addDocuments(JSON.parse(JSON.stringify(Object.values(data))));
});
watch(searchStr, (searchStr) => {
  if (!searchStr) return (appStore.nowIcons = appStore.baseIcons);
  const data: Record<string, deviconDataType> = {};

  (search.search(searchStr) as deviconDataType[]).forEach((item) => {
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
      type="search"
      list="auto-icon-search"
      placeholder="Search Material Symbols"
    />
    <datalist id="auto-icon-search">
      <option
        v-for="value in appStore.baseIcons"
        :key="value.name"
        v-text="value.name"
      />
    </datalist>
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  padding: 20px;
  margin-bottom: 2em;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 90px 6px #a1a1a151;
  align-items: center;
  justify-content: center;

  #icon-search {
    width: 450px;
    padding: 5px 10px;
    margin-left: 5px;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    outline: none;
    transition: 0.2s;

    &:hover,
    &:focus {
      box-shadow: 0 0 20px -6px #0066ff96;
    }

    &:focus {
      border: 1px solid #06f;
    }
  }

  @media all and (max-width: 1200px) {
    border-radius: initial;
  }
}
</style>
