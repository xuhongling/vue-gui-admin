import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';

import { PageEnum } from '@/setting';

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules: any = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/index.vue'),
  meta: {
    title: '登录',
  },
};

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
