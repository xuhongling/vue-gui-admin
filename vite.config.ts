import type { UserConfig, ConfigEnv, ProxyOptions } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock'
import dayjs from 'dayjs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ViteEnv }  from '#/config.d';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}


export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
  })
}

export function resolveProxy(proxyList: [string, string][] = []) {
  const proxy: Record<string, ProxyOptions> = {}
  for (const [prefix, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target)
    // https://github.com/http-party/node-http-proxy#options
    proxy[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return proxy
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Record<string, any>): ViteEnv {
  const viteEnv: Partial<ViteEnv> = {}

  for (const key of Object.keys(envConf)) {
    let realname = envConf[key].replace(/\\n/g, '\n')
    realname =
      realname === 'true' ? true : realname === 'false' ? false : realname

    if (key === 'VITE_PROXY' && realname) {
      try {
        realname = JSON.parse(realname.replace(/'/g, '"'))
      } catch (error) {
        realname = ''
      }
    }

    viteEnv[key] = realname
    if (typeof realname === 'string') {
      process.env[key] = realname
    } else if (typeof realname === 'object') {
      process.env[key] = JSON.stringify(realname)
    }
  }
  return viteEnv as ViteEnv
}
// vite config
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env)
  const {
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_PORT,
    VITE_USE_MOCK,
    VITE_DROP_CONSOLE,
    VITE_USE_HTTPS,
  } = viteEnv;
  const primaryColor = '#30a0f8';
  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue(), vueJsx(), configSvgIconsPlugin(isBuild), (VITE_USE_MOCK && configMockPlugin(isBuild))],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.vue', '.json', '.css', '.less'],
      alias: {
        '@': `${resolve(root, 'src')}`,
        '#': `${resolve(root, 'types')}`,
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    define: {
      __VITE_USE_MOCK__: VITE_USE_MOCK,
      // Suppress vue-i18-next warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify({
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': primaryColor,
            'border-color-base': 'hsv(0, 0, 85%)',
            'font-size-base': '14px',
            'border-radius-base': '2px',
            'text-color': 'rgba(0,0,0,0.85)',
            'modal-mask-bg': 'rgba(0,0,0,0.45)',
            'layout-body-background': '#f0f2f5',
            'background-color-light': 'hsv(0, 0, 98%)',
            'text-color-secondary': 'rgba(0,0,0,0.45)',
            'component-background': '#fff',
            'info-color': primaryColor,
            'processing-color': primaryColor,
            'success-color': '#55D187', //  Success color
            'error-color': '#ED6F6F', //  False color
            'warning-color': '#EFBD47', //   Warning color
            'link-color': primaryColor, //   Link color
            'app-content-background': '#fafafa', //   Link color
            'item-hover-bg': '#f5f5f5',
          },
        },
      },
    },
    server: {
      https: VITE_USE_HTTPS,
      open: true,
      host: true,
      port: Number(VITE_PORT),
      proxy: !VITE_USE_HTTPS ? resolveProxy(VITE_PROXY) : undefined,
    },
    build: {
      target: 'es2020',
      cssTarget: 'chrome80',
      outDir: 'dist',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            mockjs: ['mockjs'],
          },
        },
      },
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
