<script lang="ts" setup>
import { useClipboard, templateRef } from '@vueuse/core';

const { copy } = useClipboard();
const codeCopy = templateRef<HTMLElement>('code-copy');

// eslint-disable-next-line vue/no-setup-props-destructure
const { copy: useCopy = true } = defineProps<{
  code: string;
  copy?: boolean;
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
    <pre @click="selectCode"><code v-text="code"></code></pre>
    <div v-if="!useCopy" @click="copy(code)">
      <SvgIcon name="content_copy" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-copy {
  text-align: end;

  pre {
    padding: 8px;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
