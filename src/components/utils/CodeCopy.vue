<script lang="ts" setup>
import { useClipboard, templateRef } from '@vueuse/core';

const { copy } = useClipboard();
const codeCopy = templateRef<HTMLElement>('code-copy');

// eslint-disable-next-line vue/no-setup-props-destructure
const { copy: useCopy = true } = defineProps<{
  code: string;
  copy?: boolean;
  title?: string;
}>();

const selectCode = () => {
  const selection = window.getSelection();
  const range = document.createRange();

  selection?.removeAllRanges();
  range.selectNodeContents(codeCopy.value);
  selection?.addRange(range);
};
</script>

<template>
  <div class="code-copy">
    <h4 v-if="title" class="title" v-text="title"></h4>
    <div v-if="!useCopy" class="copy-btn" @click="copy(code)">
      <SvgIcon name="content_copy" size="20px" />
    </div>
    <pre ref="code-copy" @click="selectCode"><code v-text="code"></code></pre>
  </div>
</template>

<style lang="scss" scoped>
.code-copy {
  background-color: #eee;
  border-radius: 5px;
  padding: 5px 0 0 0;

  pre {
    display: flex;
    margin-top: 10px;
    padding: 8px;
    background-color: #e5e5e5;
    overflow: auto;
    word-break: break-all;
    border-radius: 5px;
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      height: 8px;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #0066ff84;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #0066ff;
    }
    code {
      font-size: 0.9rem;
      padding: 2px 5px;
    }
  }

  .title {
    padding-bottom: 8px;
    margin-bottom: 5px;
    border-bottom: 1px solid #000;
    margin: 15px;
  }

  .copy-btn {
    cursor: pointer;
    margin: 0 0 0 10px;
    text-align: end;
    padding: 5px;
    border-radius: 5px;
    display: inline;
    border: 2px solid transparent;
    &:hover {
      border: 2px solid #0066ffe7;
    }
  }
}
</style>
