<script setup lang="ts">
import IconsComponent from '@/components/home/IconsComponent.vue';
import IconInfo from '@/components/home/IconInfo.vue';
// import CustomizationComponent from '@/components/home/CustomizationComponent.vue';
import FooterComponent from '@/components/base/FooterComponent.vue';
import SearchIcon from '@/components/home/SearchIcon.vue';
</script>

<template>
  <div class="view">
    <div class="full-page">
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
  flex-direction: column;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
