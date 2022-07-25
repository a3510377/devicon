<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { templateRef } from '@vueuse/core';

import { useAppStore } from '@/stores/modules/app';
import { getSvgURL, getDeviconSvg } from '@/utils/data';
import { makeRepeated } from '@/utils/utils';

const appStore = useAppStore();

const downloadHref = templateRef<HTMLElement>('download-href');
const focusIcon = computed(() => appStore.focusIcon);
const focusSvg = ref('');
const focusSvgVersion = ref<string>();
const focusFontVersion = ref<string[]>();
const downloadUrl = ref('');
const downloadFileName = ref('Please-download-again');
const baseSvgVersion = computed(() => {
  return focusSvgVersion.value || focusIcon.value?.versions.svg[0];
});

watch(focusIcon, (focusIcon) => {
  if (!focusIcon) return;
  setFocusSvg(focusIcon.versions.svg[0]);
  focusFontVersion.value = [focusIcon.versions.font[0], ''];
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
  downloadUrl.value = dataURL;
  downloadFileName.value = filename;

  const loop = setInterval(() => {
    if (
      downloadHref.value?.getAttribute('href') === dataURL &&
      downloadHref.value?.getAttribute('download') === filename
    ) {
      clearInterval(loop);
      return downloadHref.value?.click();
    }
  });
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
      <CodeCopy
        code="<link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'>"
        title="Place this in your header (once per HTML file):"
      />
      <br />
      <ul class="content">
        <li
          v-for="(version, index) in makeRepeated(focusIcon.versions.font, 2)"
          :key="version"
          :class="{
            active:
              focusFontVersion?.join('-') ===
              [version, index % 2 ? 'colored' : ''].join('-'),
          }"
          @click="focusFontVersion = [version, index % 2 ? 'colored' : '']"
        >
          <i
            :class="{
              [`devicon-${focusIcon.name}-${version}`]: true,
              colored: index % 2,
            }"
          ></i>
        </li>
      </ul>
      <CodeCopy
        :code="`<i class='devicon-${focusIcon.name}-${focusFontVersion
          ?.join(' ')
          .trim()}'></i>`"
        title="Place this in your body:"
      />
    </div>
    <br />
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
      <CodeCopy
        :code="`<img src='${getSvgURL(
          focusIcon.name,
          focusSvgVersion || ''
        )}' />`"
        title="Using <img /> element:"
      />
      <br />
      <CodeCopy :code="focusSvg" title="Using Pure SVG:" />
      <div class="download-buttons">
        <button
          v-for="downloadType in ['png', 'jpg', 'webp', 'svg']"
          :key="downloadType"
          @click="svgToImgDownload(downloadType)"
        >
          <SvgIcon name="file_download" size="20px" color="#fff" />
          {{ downloadType }}
        </button>
        <a
          ref="download-href"
          :href="downloadUrl"
          :download="downloadFileName"
          hidden
        ></a>
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
  right: 15px;
  width: 320px;
  max-height: 80%;
  padding: 30px 15px;
  overflow: auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: -1px -1px 90px 6px rgb(161 161 161 / 88%);
  scrollbar-width: none;

  .font-version,
  .svg-version {
    .content {
      display: flex;
      margin-bottom: 10px;
      list-style: none;
      flex-wrap: wrap;

      li {
        width: 70px;
        max-height: 70px;
        margin: 5px;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 5px;
        transition: 0.2s;

        i {
          font-size: 70px;
        }

        &.active {
          border-color: #06f;
          transform: scale(110%);
        }

        img {
          padding: 5px;
        }
      }
    }

    > h1 {
      margin-bottom: 8px;
      border-bottom: 1px solid rgb(0 0 0);
    }
  }

  .svg-version {
    .download-buttons {
      display: flex;
      margin-top: 10px;
      list-style: none;
      flex-wrap: wrap;

      button {
        display: flex;
        padding: 5px 10px;
        margin: 2px 5px;
        font-size: 16px;
        font-weight: 300;
        color: #fff;
        text-transform: uppercase;
        cursor: pointer;
        background-color: #06f;
        border: 1px solid #06f;
        border-radius: 5px;
        transition: 0.2s;
        align-items: center;
        justify-content: space-between;

        &:hover {
          transform: scale(110%);
        }
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

  &::-webkit-scrollbar {
    display: none;
  }

  @media all and (max-width: 500px) {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    border-radius: 0;
  }
}
</style>
