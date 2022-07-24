<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Search } from 'js-search';

import { useAppStore } from '@/stores/modules/app';
import { deviconDataType } from '@/utils/data';

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
</script>

<template>
  <div class="search">
    <input v-model="searchStr" type="text" />
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  margin-top: 3em;
}
</style>
