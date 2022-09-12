<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

import IconsComponent from '@/components/home/IconsComponent.vue';
import IconInfo from '@/components/home/IconInfo.vue';
// import CustomizationComponent from '@/components/home/CustomizationComponent.vue';
import FooterComponent from '@/components/base/FooterComponent.vue';
import SearchIcon from '@/components/home/SearchIcon.vue';

const version = ref('master');

axios
  .get('https://api.github.com/repos/devicons/devicon/tags')
  .then(({ data }) => (version.value = data[0]?.name || version.value));
</script>

<template>
  <div class="view">
    <div class="full-page">
      <h1 class="title">
        Devicon
        <a
          href="https://github.com/devicons/devicon/releases"
          target="_blank"
          v-text="version"
        ></a>
      </h1>
      <SearchIcon />
      <Suspense>
        <IconsComponent class="icons" />
      </Suspense>
      <!-- <CustomizationComponent /> -->
      <IconInfo />
    </div>
  </div>
  <FooterComponent />
</template>

<style lang="scss" scoped>
@import 'https://fonts.googleapis.com/css2?family=Damion&display=swap';

.view {
  min-height: 100%;
  padding-bottom: var(--footer-height);
  margin-bottom: calc(var(--footer-height) * -1);
}

.icons {
  width: 100%;
}

.full-page {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  flex-direction: column;
  align-content: center;

  .title {
    font-family: Damion, cursive;
    font-size: 5rem;
    text-align: center;
    user-select: none;

    a {
      font-family: Damion, cursive;
      font-size: 1.5rem;
      color: black;
      text-decoration: underline;
    }
  }
}
</style>
