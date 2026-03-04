# Input输入框

## 示例代码

```vue
<template>
    <div>
        <!-- 基本用法 -->
        <link-input v-model="val" />
        <!-- 推荐输入, 获取焦点后展开下拉框 -->
        <link-input :recommend="['京东','天猫','淘宝','拼多多']" v-model="recommendVal1" />
        <link-input recommend-lov="PUBLISH_STATUS" v-model="recommendVal2" />
    </div>
</template>
<script>
export default {
    data(){
        return{
            val: null,
            recommendVal1: null,
            recommendVal2: null,
        }
    },
}
</script>
```

## 正则表达式限制输入的文本

通过正则表达式限制输入的文本, 比如这里通过`:regexp="/[^0-9.]/g"`限制只能输入数字以及小数点

重要: 输入框会将**符合**正则表达式的字符清空

比如现在这个正则表达式, 表示**非**数字/小数点的字符, 此时输入的中文字符会被清理掉

如果希望限制输入框的内容而不是直接替换, 请使用表单验证功能, 参考 references/link-form-validate.md 文档

```vue
<link-input v-model="val" :regexp="/[^0-9.]/g" />
```

## Events 事件

| 事件名称 | 说明 | 参数 |
| --- | --- | --- |
| up | 按键向上事件 | event: 原生键盘事件对象 |
| down | 按键向下事件 | event: 原生键盘事件对象 |
| left | 按键向左事件 | event: 原生键盘事件对象 |
| right | 按键向右事件 | event: 原生键盘事件对象 |

## Slot 插槽

| 插槽名称 | 说明 |
| --- | --- |
| prepend | 输入框前置内容 |
| append | 输入框后置内容 |

## Props 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | --- | --- | --- | 双向绑定值 |
| type | String | line,fill,none | fill | 输入框类型, line 没有边框, none 纯展示 |
| color | String | primary,success,warn,error,info | info | 颜色 |
| size | String | large,default,small | default | 大小 |
| shape | String | round,none,fillet | none | 输入框形状, fillet 小圆角, round 左右两侧为半圆, none 无圆角 |
| long | Boolean | --- | --- | 是否为长组件, 占满一行  |
| prefixIcon | String | --- | --- | 输入框前置图标 |
| suffixIcon | String | --- | --- | 输入框后置图标 |
| placeholder | String | --- | --- | 输入框空值占位符 |
| regexp | RegExp | --- | --- | 如果regexp存在, 输入框会将符合正则表达式的字符换成空字符串 |
| width | Number | --- | 200 | 输入框宽度 |
| inputType | String | --- | --- | 输入框类型, 如果希望为密码输入框, 则inputType为password |
| clearOnClickDeleteIcon | Boolean | --- | --- | 是否点击清除图标自动清空input内容 |
| focusOnHover | Boolean | --- | --- | 是否在鼠标悬浮的时候自动获取焦点 |
| hideClearIcon | Boolean | --- | --- | 是否隐藏清除图标 |
| align | String | left,center,right | --- | input文本对齐方式 |
| required | Boolean | --- | --- | 是否必填 |
| rules | Array | --- | --- | 校验规则 |
| validateOnInit | Boolean | --- | --- | 初始化的时候就触发校验 |
| inputReadonly | Boolean | --- | --- | 有的组件基于link-input, 希望link-input的部分只读, 但是其他部分正常, 这时候需要设置inputReadonly为true以及readonlny为false |
| hoverDeleteIcon | Boolean | --- | true | 是否在鼠标悬浮的时候显示清除图标 |
| recommend | Array | --- | --- | 推荐输入数据数组 |
| recommendLov | String | --- | --- | 推荐输入值列表 |
| recommendFilter | Function | --- | --- | 推荐输入自定义筛选框 |
