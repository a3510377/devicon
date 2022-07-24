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
  <div ref="code-copy" class="code-copy">
    <h4 v-if="title" class="title" v-text="title"></h4>
    <pre @click="selectCode"><code v-text="code"></code></pre>
    <div v-if="!useCopy" class="copy-btn" @click="copy(code)">
      <SvgIcon name="content_copy" size="20px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-copy {
  padding: 14px;
  background-color: #e6e6e6;
  border-radius: 11px;

  pre {
    padding: 8px;
    overflow: auto;
    word-break: break-all;
  }

  .title {
    padding-bottom: 8px;
    margin-bottom: 5px;
    border-bottom: 1px solid #000;
  }

  .copy-btn {
    margin-top: 10px;
    text-align: end;
  }
}
</style>
