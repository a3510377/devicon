import { defineStore } from 'pinia';
import { deviconDataType, deviconDictType } from '@/utils/data';

export interface AppStoreType {
  baseIcons: deviconDictType;
  nowIcons?: deviconDictType;
  focusIcon?: deviconDataType;
  colored: boolean;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppStoreType => ({
    colored: true,
    baseIcons: {},
    focusIcon: void 0,
    nowIcons: void 0,
  }),
});
