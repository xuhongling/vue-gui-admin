import type { UserConfig, ConfigEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import windiCSS from 'vite-plugin-windicss';
import path from 'path';

import { loadEnv } from 'vite';
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}

// vite config
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const viteEnv = loadEnv(mode, root);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;
  const primary = '#30a0f8';
  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue(), vueJsx(), configSvgIconsPlugin(isBuild), windiCSS()],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.vue', '.json', '.css', '.less'],
      alias: {
        '@': `${resolve(root, 'src')}`,
        '#': `${resolve(root, 'types')}`,
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
            'primary-color': primary,
            'info-color': primary,
            'processing-color': primary,
            'success-color': '#55D187', //  Success color
            'error-color': '#ED6F6F', //  False color
            'warning-color': '#EFBD47', //   Warning color
            //'border-color-base': '#EEEEEE',
            'font-size-base': '14px', //  Main font size
            'border-radius-base': '2px', //  Component/float fillet
            'link-color': primary, //   Link color
            'app-content-background': '#fafafa', //   Link color
            'text-color-base': '#333',
            'component-background': '#fff',
            'border-color-base': '#303030',
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(VITE_PORT),
      open: true,
      proxy: {
        '/api': {
          target: 'http://47.109.35.43:9999',
          changeOrigin: true,
          ws: false,
        },
        '/platform': {
          target: 'http://47.109.35.43:9999',
          changeOrigin: true,
        },
      },
    },
    build: {
      target: 'es2020',
      cssTarget: 'chrome80',
      outDir: 'dist',
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  };
};
