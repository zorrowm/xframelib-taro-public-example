import { createPinia } from 'pinia';
import type { App } from 'vue';

export const setupStore = (app: App) => {
  const piniaStore = createPinia();
  app.use(piniaStore);
};
export default setupStore;

export * from './modules/appStore';
export * from './modules/asyncRoute';
export * from './modules/userStore';
