import { defineStore } from 'pinia';
import { deviconDataType } from '@/utils/data';

export interface AppStoreType {
  focusIcon?: deviconDataType;
  colored?: boolean;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppStoreType => ({
    colored: true,
  }),
});
