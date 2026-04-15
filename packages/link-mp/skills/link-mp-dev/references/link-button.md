# link-button


## 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| label | string | --- | --- | 按钮文本 |
| block | boolean | --- | --- | 是否为块级文本 |
| mode | string | fill,stroke,text | fill | 按钮类型，fill填充，stroke线边框，text纯文本 |
| icon | string | --- | --- | 按钮图标 |
| throttleTimer | number | --- | 500 | 点击节流时间间隔 |
| autoLoading | boolean | --- | --- | 是否自动开启加载状态 |
| tag | string | --- | button | 按钮容器标签 |
| disabled | boolean | --- | null | 是否禁用 |
| readonly | boolean | --- | null | 是否只读 |
| loading | boolean | --- | null | 是否处于加载状态 |
| shape | string | fillet,round,square | fillet | 形状 |
| size | string | normal,mini,large | normal | 大小 |
| status | string | primary,success,warn,error,info | primary | 状态 |

## 事件

| 事件名称 | 参数 | 说明 |
| --- | --- | --- | 
| tap | event：点击事件 | 点击事件 |

## 插槽

| 插槽名称| 说明 |
| --- | --- |
| default | 默认插槽 | 


## 基本用法

```html
<template>
    <link-page>
        <link-button @tap="onTap">按钮</link-button>
    </link-page>
</template>

<script>
    export default {
        methods: {
            onTap(){
                this.$message.primary('点击事件')
            },
        }   
    }
</script>
```