import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

export const UserDropDown = createAsyncComponent(() => import('./user-dropdown/index.vue'), {
  loading: true,
});
