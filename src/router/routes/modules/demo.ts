import type { AppRouteModule } from '@/router/types';

import { getParentLayout, LAYOUT } from '@/router/constant';

const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/icon',
  meta: {
    icon: 'ion:layers-outline',
    title: '组件',
    orderNo: 100,
  },
  children: [
    {
      path: 'icon',
      name: 'IconDemo',
      component: () => import('@/views/demo/icon/index.vue'),
      meta: {
        icon: 'ion:diamond-outline',
        title: '图标',
      },
    },
    {
      path: 'countTo',
      name: 'CountToDemo',
      component: () => import('@/views/demo/countTo/index.vue'),
      meta: {
        icon: 'ion:dice-outline',
        title: '数字动画',
      },
    },
    {
      path: 'modal',
      name: 'ModalDemo',
      component: () => import('@/views/demo/modal/index.vue'),
      meta: {
        icon: 'ion:albums-outline',
        title: '弹窗扩展',
      },
    },
    {
      path: 'drawer',
      name: 'DrawerDemo',
      component: () => import('@/views/demo/drawer/index.vue'),
      meta: {
        icon: 'ion:file-tray-full-outline',
        title: '抽屉扩展',
      },
    },
    {
      path: 'form',
      name: 'FormPage',
      redirect: '/demo/form/basic',
      component: getParentLayout('FormPage'),
      meta: {
        icon: 'ion:library-outline',
        title: 'Form',
      },
      children: [
        {
          path: 'basic',
          name: 'FormBasicPage',
          component: () => import('@/views/demo/form/index.vue'),
          meta: {
            title: '基础表单',
          },
        },
        {
          path: 'useForm',
          name: 'UseFormDemo',
          component: () => import('@/views/demo/form/UseForm.vue'),
          meta: {
            title: 'useForm',
          },
        },
        {
          path: 'refForm',
          name: 'RefFormDemo',
          component: () => import('@/views/demo/form/RefForm.vue'),
          meta: {
            title: 'RefForm',
          },
        },
{
          path: 'ruleForm',
          name: 'RuleFormDemo',
          component: () => import('@/views/demo/form/RuleForm.vue'),
          meta: {
            title: '表单验证',
          },
        },
      ],
    },
  ],
};

export default demo;