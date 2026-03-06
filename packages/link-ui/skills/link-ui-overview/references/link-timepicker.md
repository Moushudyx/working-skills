# link-timepicker 时间选择器

## 示例代码

```vue
<template>
    <div>
        <link-timepicker v-model="time" />
        <span>{{ time }}</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            time: null,
        }
    },
}
</script>
```

## 作用域插槽

| 插槽名称 | 作用域参数 | 说明 |
| --- | --- | --- |
| default | `{ value }` | 自定义触发区展示内容 |

```vue
<link-timepicker v-model="time">
    <template slot-scope="{ value }">
        <link-button icon="icon-clock">{{ value }}</link-button>
    </template>
</link-timepicker>
```

## Props 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | String | --- | --- | 双向绑定值 |
| max | String | --- | --- | 最大值 |
| min | String | --- | --- | 最小值 |
| type | String | line, fill, none | fill | 输入框类型 |
| color | String | primary, success, warn, error, info | info | 颜色 |
| size | String | large, default, small | default | 大小 |
| shape | String | round, none, fillet | none | 输入框形状 |
| long | Boolean | --- | --- | 是否占满一行 |
| prefixIcon | String | --- | --- | 前置图标 |
| placeholder | String | --- | 选择日期... | 空值占位符 |
| width | Number | --- | 200 | 输入框宽度 |
| focusOnHover | Boolean | --- | --- | 悬浮时是否自动获取焦点 |
| hideClearIcon | Boolean | --- | --- | 是否隐藏清除图标 |
| required | Boolean | --- | --- | 是否必填 |
| validateOnInit | Boolean | --- | --- | 初始化时是否触发校验 |

## 注意事项

- `max/min` 推荐使用 `HH:mm:ss` 格式，与组件值格式保持一致。
