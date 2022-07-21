# Vue 3 + TypeScript + Vite

基于 vite3.x + vue3.x + antd-design-vue3.x + typescript4.x 基础的后台管理系统模板

部分设计参考了 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/xuhongling/vue-gui-admin
```
- 安装依赖

```bash
cd vue-vben-admin

pnpm install

```

- 运行

```bash
pnpm serve
```

- 打包

```bash
pnpm build
```

## vscode 配置

安装项目根目录.vscode 推荐的插件，再安装 Volar，并禁用 Vetur，重启 vscode 即可。

> 使用了 Vue3.x 全家桶、ant-design-vue3.x 和 typescript4.x，实践 vue3.x 的新特性以及玩法，不得不说 vue3.x 的 Composition API 相比于 vue2.x 的 Options API 灵活很多，让我们可以灵活地组合组件逻辑，我们可以很轻松的使用 hooks 的形式去代替以前 mixins 等的写法。更多 hooks 可以参考[vueuse](https://vueuse.org/functions.html)
