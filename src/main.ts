// import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// Register icon sprite
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { createPinia } from 'pinia';

// Ant design components
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.variable.css';

import '/@/design/index.less';

async function bootstrap() {
  const app = createApp(App);
  const pinia = createPinia();

  // 注册Antd全局组件
  app.use(Antd);

  // 解决 injection "symbol(pinia)" not found 报错信息问题
  app.use(pinia);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  app.mount('#app');
}
void bootstrap();
