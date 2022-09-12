/* eslint-disable import/no-extraneous-dependencies */

import { fileURLToPath, URL } from 'url';
import { createWriteStream } from 'fs';

import 'vite-ssg';
import { defineConfig } from 'vite';
import { SitemapStream, streamToPromise } from 'sitemap';

import vue from '@vitejs/plugin-vue';

import svgIcon from './plugin/svgIcon';
import { getDeviconData, getSvgURL } from './plugin/data';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL,
  plugins: [vue(), svgIcon()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    terserOptions: {
      compress: {
        // Prevent Infinity from being compressed to 1/0, may cause performance issues on Chrome
        keep_infinity: true,
        drop_console: false,
      },
      format: { comments: false },
    },
    minify: 'terser',
    // Speed up packing
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  ssgOptions: {
    rootContainerId: 'app-mount',
    formatting: 'minify',
    dirStyle: 'nested',
    script: 'async',
    async onFinished() {
      process.env.HOSTNAME = 'https://test/devicon';
      if (process.env.HOSTNAME) {
        const smStream = new SitemapStream({
          hostname: process.env.HOSTNAME,
          lastmodDateOnly: false,
          xmlns: { image: true, xhtml: true, news: false, video: false },
        });

        const images = [];

        await getDeviconData().then((data) => {
          Object.values(data)
            .slice(0, 1000) // https://developers.google.com/search/docs/advanced/sitemaps/image-sitemaps
            .forEach(({ versions: { svg }, name, tags }) => {
              const svgVersion = svg?.[0];
              if (svgVersion)
                images.push({
                  url: getSvgURL(name, svgVersion),
                  title: `devicon-${name}`,
                  caption: tags.join(','),
                  license: 'https://github.com/devicons/devicon',
                });
            });
        });

        smStream.pipe(createWriteStream('./dist/image-sitemap.xml'));

        smStream.write({
          url: '/',
          changefreq: 'daily',
          priority: 1,
          img: images,
        });

        smStream.end();
      }
    },
  },
});
