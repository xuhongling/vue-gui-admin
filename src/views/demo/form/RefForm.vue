<template>
  <div class="ref-form-demo">
    <a-page-header title="Ref操作示例" />

    <div class="mb-4">
      <a-button @click="setProps({ labelWidth: 150 })" class="mr-2">
        更改labelWidth
      </a-button>
      <a-button @click="setProps({ labelWidth: 120 })" class="mr-2">
        还原labelWidth
      </a-button>
      <a-button @click="setProps({ size: 'large' })" class="mr-2">
        更改Size
      </a-button>
      <a-button @click="setProps({ size: 'default' })" class="mr-2">
        还原Size
      </a-button>
      <a-button @click="setProps({ disabled: true })" class="mr-2">
        禁用表单
      </a-button>
      <a-button @click="setProps({ disabled: false })" class="mr-2">
        解除禁用
      </a-button>
      <a-button @click="setProps({ compact: true })" class="mr-2">
        紧凑表单
      </a-button>
      <a-button @click="setProps({ compact: false })" class="mr-2">
        还原正常间距
      </a-button>
      <a-button @click="setProps({ actionColOptions: { span: 8 } })" class="mr-2">
        操作按钮位置
      </a-button>
    </div>

    <a-card>
      <BasicForm
        :schemas="schemas"
        ref="formElRef"
        :labelWidth="100"
        @submit="handleSubmit"
        :actionColOptions="{ span: 24 }"
      />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicForm, FormSchema } from '@gui-pkg/antdcomponents'

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '字段1',
      colProps: {
        span: 8,
      },
      componentProps: {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e)
        },
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '字段2',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field3',
      component: 'DatePicker',
      label: '字段3',
      colProps: {
        span: 8,
      },
    },
    {
      field: 'field4',
      component: 'Select',
      label: '字段4',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
            key: '1',
          },
          {
            label: '选项2',
            value: '2',
            key: '2',
          },
        ],
      },
    },
    {
      field: 'field5',
      component: 'CheckboxGroup',
      label: '字段5',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
    {
      field: 'field7',
      component: 'RadioGroup',
      label: '字段7',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },
  ]

  const formElRef = ref(null)

  const handleSubmit = (values: any) => {
    console.log('click search,values:' + JSON.stringify(values));
  }

   const setProps = (props) => {
      const formEl = formElRef.value
      if (!formEl) return
      formEl.setProps(props)
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .ref-form-demo {
    width: 100%;
    height: 100%;
    padding: 16px;
  }
</style>
