<script lang="ts" setup>
import { useClipboard, templateRef } from '@vueuse/core';

const { copy, copied } = useClipboard({ copiedDuring: 500 });
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
    <div class="title">
      <h4 v-if="title" v-text="title"></h4>
      <div
        v-if="!useCopy"
        class="copy-btn"
        :class="{ copied }"
        @click="copy(code)"
      >
        <SvgIcon name="content_copy" size="18px" />
      </div>
    </div>

    <pre ref="code-copy" @click="selectCode"><code v-text="code"></code></pre>
  </div>
</template>

<style lang="scss" scoped>
.code-copy {
  padding: 5px 0 0;
  background-color: #eee;
  border-radius: 5px;

  pre {
    display: flex;
    padding: 8px;
    margin-top: 10px;
    overflow: auto;
    word-break: break-all;
    background-color: #e5e5e5;
    border-radius: 5px;
    scrollbar-color: #0066ff84 transparent;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      height: 8px;
      background: #f1f1f1;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: #0066ff84;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #0066ffb6;
    }

    &:hover {
      scrollbar-color: #0066ffb6 transparent;
    }

    code {
      padding: 2px 5px;
      font-size: 0.9rem;
    }
  }

  .title {
    display: flex;
    padding-bottom: 8px;
    margin: 15px;
    margin-bottom: 5px;
    border-bottom: 1px solid #000;
    justify-content: space-between;
    align-items: center;
  }

  .copy-btn {
    position: relative;
    display: inline;
    padding: 5px;
    margin: 0 0 0 10px;
    text-align: end;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;

    &:hover {
      border: 2px solid #0066ffe7;
    }

    &.copied {
      &::before {
        position: absolute;
        top: -12.5px;
        left: 25%;
        border-color: #9cc3fd transparent transparent;
        border-style: solid;
        border-width: 10px;
        content: '';
      }

      &::after {
        position: absolute;
        top: -48px;
        right: -50%;
        padding: 8px;
        background-color: #9cc3fd;
        border-radius: 5px;
        content: 'Copied!!';
      }
    }
  }
}
</style>
