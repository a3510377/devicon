<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { useClipboard, templateRef } from '@vueuse/core';

import { useAppStore } from '@/stores/modules/app';
import { getSvgURL, getDeviconSvg } from '@/utils/data';

const appStore = useAppStore();

const { copy, copied } = useClipboard();
const downloadHref = templateRef<HTMLElement>('download-href');
const focusIcon = computed(() => appStore.focusIcon);
const focusSvg = ref('');
const focusSvgVersion = ref<string>();
const baseSvgVersion = computed(() => {
  return focusSvgVersion.value || focusIcon.value?.versions.svg[0];
});

const setFocusSvg = async (version: string) => {
  if (!focusIcon.value) return;

  focusSvg.value = await getDeviconSvg(focusIcon.value.name || '', version);
  focusSvgVersion.value = version;
};

const waitForImage = (imgElem: HTMLImageElement) =>
  new Promise((resolve) => {
    // eslint-disable-next-line no-promise-executor-return
    if (imgElem.complete) return resolve(void 0);
    imgElem.onload = resolve;
    imgElem.onerror = resolve;
  });

const svgToImgDownload = (ext: string) => {
  if (!focusSvgVersion.value) return;
  if (!['png', 'jpg', 'webp', 'svg'].includes(ext)) return;

  const svgDiv = document.createElement('div');
  document.body.appendChild(svgDiv);
  svgDiv.innerHTML = focusSvg.value;
  const svg = <SVGSVGElement>svgDiv.querySelector('svg');

  const xmlSerializer = new XMLSerializer();
  const svgStr = xmlSerializer.serializeToString(svg);

  const img = document.createElement('img');
  img.src = `data:image/svg+xml;charset=utf-8;base64,${btoa(svgStr)}`;
  console.log(img.src, svgDiv.clientWidth);

  return waitForImage(img)
    .then((_) => {
      const canvas = document.createElement('canvas');
      canvas.width = svg.clientWidth;
      canvas.height = svg.clientHeight;

      canvas
        .getContext('2d')
        ?.drawImage(img, 0, 0, svg.clientWidth, svg.clientHeight);

      svgDiv.remove();
      return canvas.toDataURL(`image/${ext === 'jpg' ? 'jpeg' : ext}`, 1.0);
    })
    .then((dataURL) => {
      downloadHref.value?.setAttribute('href', dataURL);
      downloadHref.value?.setAttribute(
        'download',
        `${[
          focusIcon.value?.name || 'file',
          focusSvgVersion.value || 'original',
        ].join('-')}.${ext}`
      );
      downloadHref.value?.click();

      ({ dataURL, ext });
    })
    .catch(console.error);
};
</script>

<template>
  <div v-if="focusIcon" class="icon-info">
    <div class="svg">
      <div class="content">
        <img
          v-for="version in focusIcon.versions.svg"
          :key="version"
          :class="{ active: baseSvgVersion === version }"
          :alt="focusIcon.name"
          :src="getSvgURL(focusIcon.name, version)"
          @click="setFocusSvg(version)"
        />
      </div>
      <button @click="copy(focusSvg)">
        <span v-if="!copied">Copy</span>
        <span v-else>Copied!</span>
      </button>
    </div>

    <div>
      <button
        v-for="downloadType in ['png', 'jpg', 'webp', 'svg']"
        :key="downloadType"
        @click="svgToImgDownload(downloadType)"
        v-text="`download ${downloadType}`"
      ></button>
      <a ref="download-href" hidden></a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-info {
  .svg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: auto;
      }
    }

    button {
      padding: 0.5rem 1rem;
      margin-top: 1rem;
      font-size: 1rem;
      color: #000;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 0.25rem;

      &:hover {
        color: #fff;
        background-color: #ccc;
      }
    }
  }
}
</style>
