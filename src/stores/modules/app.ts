import { defineStore } from 'pinia';
import { deviconDataType } from '@/utils/data';

export interface AppStoreType {
  focusIcon?: deviconDataType;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppStoreType => ({}),
  getters: {
    getFocusIcon(): deviconDataType | undefined {
      return this.focusIcon;
    },
  },
});
