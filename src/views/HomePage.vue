<script setup lang="ts">
import IconsComponent from '@/components/home/IconsComponent.vue';
import IconInfo from '@/components/home/IconInfo.vue';
import CustomizationComponent from '@/components/home/CustomizationComponent.vue';
import FooterComponent from '@/components/base/FooterComponent.vue';
</script>

<template>
  <div class="view">
    <div class="full-page">
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
  .icons {
    width: 100%;
  }

  .full-page {
    display: flex;
    max-width: 1500px;
    margin: 0 auto;
  }
}
</style>
