<template>
  <Layout class="layout" theme="light">
    <LayoutHeader :collapsed="collapsed" />
    <Layout>
      <!-- <Layout.Sider
        v-model:collapsed="collapsed"
        :width="asiderWidth"
        :trigger="null"
        collapsible
        class="layout-sider"
      /> -->
      <Layout.Content class="layout-content">
        <MultipleTabs />
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import LayoutHeader from './header/index.vue';
  import MultipleTabs from './tabs/index.vue';

  const collapsed = ref<boolean>(false);
  // 自定义侧边栏菜单收缩和展开时的宽度
  const asiderWidth = computed(() => (collapsed.value ? 80 : 220));
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;

    .ant-layout {
      overflow: hidden;
    }

    .layout-content {
      flex: none;
      width: 100%;
    }
  }
</style>
