import 'vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CodeCopy: typeof import('./components/utils/CodeCopy.vue')['default'];
    SvgIcon: typeof import('./components/utils/SvgIcon.vue')['default'];
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];
  }
}

export {};
