// store.ts
import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    viewer: null,
  }),
  actions: {
    setViewer(newViewer:any) {
      this.viewer = newViewer;
    }
  },
  getters: {
    getViewer():any {
      return this.viewer;
    },
  },
});
