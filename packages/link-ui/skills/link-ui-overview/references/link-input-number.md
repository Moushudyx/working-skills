# link-input-number 数字输入框

## 示例代码

```vue
<template>
    <div>
        <link-input-number v-model="val" :min="0" :max="100" :space="10" />
        <span>{{ val }}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            val: null,
        }
    },
}
</script>
```

## 特殊使用场景

### 限制整数输入

```vue
<link-input-number v-model="val" isInteger :max="100" />
```

## Props 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | --- | --- | --- | 双向绑定值 |
| max | Number | --- | --- | 最大可输入值 |
| min | Number | --- | --- | 最小可输入值 |
| space | Number | --- | --- | 加减间隔大小 |
| showIcon | Boolean | --- | --- | 是否显示加减图标 |
| stepStrictly | Boolean | --- | --- | 是否只能输入 `space` 的倍数 |
| precision | String, Number | --- | --- | 数值精度 |
| isInteger | Boolean | --- | --- | 是否只允许整数 |
| placeholder | String | --- | --- | 输入框空值占位符 |
| regexp | RegExp | --- | --- | 匹配到的字符会被替换为空字符串 |
| width | Number | --- | 200 | 输入框宽度 |
| inputType | String | --- | --- | 输入框类型（如 `password`） |
| clearOnClickDeleteIcon | Boolean | --- | --- | 点击清除图标时是否自动清空 |
| focusOnHover | Boolean | --- | --- | 鼠标悬浮时是否自动获取焦点 |
| hideClearIcon | Boolean | --- | --- | 是否隐藏清除图标 |
| required | Boolean | --- | --- | 是否必填 |
| rules | Array | --- | --- | 校验规则 |
| validateOnInit | Boolean | --- | --- | 初始化时是否触发校验 |

## 注意事项

- `regexp` 的行为是“替换匹配字符”，不是“仅允许匹配字符”。
- 需要严格约束输入值时，建议配合表单校验规则（`rules`）一起使用。
