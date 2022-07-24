<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { templateRef } from '@vueuse/core';

import { useAppStore } from '@/stores/modules/app';
import { getSvgURL, getDeviconSvg } from '@/utils/data';

const appStore = useAppStore();

const downloadHref = templateRef<HTMLElement>('download-href');
const focusIcon = computed(() => appStore.focusIcon);
const focusSvg = ref('');
const focusSvgVersion = ref<string>();
const baseSvgVersion = computed(() => {
  return focusSvgVersion.value || focusIcon.value?.versions.svg[0];
});
watch(focusIcon, (focusIcon) => {
  if (!focusIcon) return;
  setFocusSvg(focusIcon.base);
  // eslint-disable-next-line prefer-destructuring
  focusSvg.value = focusIcon.versions.svg[0];
});

const setFocusSvg = async (version: string) => {
  if (!focusIcon.value) return;

  focusSvg.value = '';
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

const downloadFile = (dataURL: string, filename: string) => {
  downloadHref.value?.setAttribute('href', dataURL);
  downloadHref.value?.setAttribute('download', filename);
  downloadHref.value?.click();
};

const svgToImgDownload = (ext: string) => {
  if (!focusSvgVersion.value) return;
  if (ext === 'svg') {
    return downloadFile(
      `data:image/svg+xml;charset=utf-8;base64,${btoa(focusSvg.value)}`,
      `${[
        focusIcon.value?.name || 'file',
        focusSvgVersion.value || 'original',
      ].join('-')}.svg`
    );
  }
  if (!['png', 'jpg', 'webp'].includes(ext)) return;

  const svgDiv = document.createElement('div');
  document.body.appendChild(svgDiv);
  svgDiv.innerHTML = focusSvg.value;
  const svg = <SVGSVGElement>svgDiv.querySelector('svg');

  const xmlSerializer = new XMLSerializer();
  const svgStr = xmlSerializer.serializeToString(svg);

  const img = document.createElement('img');
  img.src = `data:image/svg+xml;charset=utf-8;base64,${btoa(svgStr)}`;

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
      downloadFile(
        dataURL,
        `${[
          focusIcon.value?.name || 'file',
          focusSvgVersion.value || 'original',
        ].join('-')}.${ext}`
      );
    })
    .catch(console.error);
};
</script>

<template>
  <div v-if="focusIcon" class="icon-info">
    <div class="font-version">
      <h1>Font versions</h1>
      <ul class="content">
        <li v-for="version in focusIcon.versions.font" :key="version">
          <i :class="{ [`devicon-${focusIcon.name}-${version}`]: true }"></i>
        </li>
      </ul>
    </div>
    <div class="svg-version">
      <h1>SVG versions</h1>
      <ul class="content">
        <li
          v-for="version in focusIcon.versions.svg"
          :key="version"
          :class="{ active: baseSvgVersion === version }"
        >
          <img
            :alt="focusIcon.name"
            :src="getSvgURL(focusIcon.name, version)"
            @click="setFocusSvg(version)"
          />
        </li>
      </ul>
      <CodeCopy :code="focusSvg" />
      <div class="download-buttons">
        <button
          v-for="downloadType in ['png', 'jpg', 'webp', 'svg']"
          :key="downloadType"
          @click="svgToImgDownload(downloadType)"
        >
          <SvgIcon name="file_download" size="20px" />
          {{ downloadType }}
        </button>
        <a ref="download-href" hidden></a>
      </div>
    </div>
    <div class="close-btn" @click="appStore.focusIcon = void 0">
      <SvgIcon name="close" size="24px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-info {
  position: fixed;
  top: 10px;
  right: 0;
  width: 320px;
  padding: 30px 15px;
  background-color: rgb(224 224 224);
  border-radius: 12px;

  .font-version,
  .svg-version {
    .content {
      display: flex;
      flex-wrap: wrap;
      list-style: none;

      li {
        width: 70px;
        max-height: 70px;
        margin: 5px;
        font-size: 70px;
        border: 1px solid transparent;
        border-radius: 5px;

        &.active {
          border-color: #000;
        }

        img {
          padding: 5px;
        }
      }
    }

    > h1 {
      border-bottom: 1px solid rgb(0 0 0);
    }
  }

  .svg-version {
    .download-buttons {
      display: flex;
      flex-wrap: wrap;
      list-style: none;

      button {
        padding: 0 5px;
        margin: 2px 5px;
        font-size: 16px;
      }
    }
  }

  .show-code {
    pre {
      overflow-y: auto;
    }
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
}
</style>
