# link-radio 单选/多选

## 示例代码

```vue
<template>
    <div>
        <link-radio v-model="single" />
        <span>{{ single }}</span>

        <link-radio-group v-model="city">
            <link-radio label="北京" val="beijing" />
            <link-radio label="上海" val="shanghai" />
            <link-radio label="广州" val="guangzhou" />
        </link-radio-group>
    </div>
</template>
<script>
export default {
    data(){
        return {
            single: false,
            city: null,
        }
    },
}
</script>
```

## 特殊使用场景

### 自定义真假值

```vue
<link-radio v-model="val" trueValue="Y" falseValue="N" />
```

### 组内多选

```vue
<link-radio-group v-model="vals" multiple>
    <link-radio label="北京" val="beijing" />
    <link-radio label="上海" val="shanghai" />
</link-radio-group>
```

## link-radio Props

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | --- | --- | --- | 双向绑定值 |
| val | --- | --- | --- | 在组中的唯一标识 |
| label | String | --- | --- | 文本 |
| color | String | primary, success, warn, error, info | info | 颜色 |
| size | String | large, default, small | default | 大小 |
| activeIcon | String | --- | --- | 激活图标 |
| inactiveIcon | String | --- | --- | 未激活图标 |
| activeColor | String | --- | --- | 激活颜色 |
| inactiveColor | String | --- | --- | 未激活颜色 |
| trueValue | --- | --- | --- | 选中真值 |
| falseValue | --- | --- | --- | 非选中值 |

## link-radio-group Props

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model | --- | --- | --- | 双向绑定值；`multiple` 为 true 时应为数组 |
| multiple | Boolean | --- | --- | 是否多选 |
| vertical | Boolean | --- | --- | 是否纵向排列 |
| afterSelect | Function | --- | --- | 选中后的回调 |
| color | String | primary, success, warn, error, info | info | 颜色 |
| size | String | large, default, small | default | 大小 |
| activeIcon | String | --- | --- | 激活图标 |
| inactiveIcon | String | --- | --- | 未激活图标 |
| activeColor | String | --- | --- | 激活颜色 |
| inactiveColor | String | --- | --- | 未激活颜色 |

## 注意事项

- 使用 `multiple` 时，`v-model` 必须是数组。
- 使用 `trueValue/falseValue` 时，绑定值类型以这两个配置为准，不再是布尔值。
