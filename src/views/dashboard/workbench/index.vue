<template>
  <div>workbench</div>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive } from 'vue';
  export default defineComponent({
    name: 'index',
    setup() {
      const state = reactive({
        name: 'vue3 Typescript',
      });

      return { ...toRefs(state) };
    },
  });
</script>

<style lang="less" rel="stylesheet/less" scoped>
  div {
    width: 100%;
  }
</style>
