import { ViteSSG } from 'vite-ssg';
import 'virtual:svg-icons-register';

import router from './router';
import store from './stores';

import '@/scss/main.scss';
import App from '@/layouts/default.vue';
import SvgIconComponent from '@/components/utils/SvgIcon.vue';
import CodeCopyComponent from '@/components/utils/CodeCopy.vue';

export const createApp = ViteSSG(
  App,
  router,
  ({ app, initialState }) => {
    app.use(store);
    app.component('SvgIcon', SvgIconComponent);
    app.component('CodeCopy', CodeCopyComponent);

    if (import.meta.env.SSR) initialState.pinia = store.state.value;
    else store.state.value = initialState.pinia || {};
  },
  { rootContainer: '#app-mount' }
);
