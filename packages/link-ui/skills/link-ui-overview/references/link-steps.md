# link-steps 步骤条

用于展示流程进度，支持横向/纵向、迷你尺寸、状态、描述和自定义图标。

## 基本用法

```vue
<template>
  <div>
    <link-steps
      :current="current"
      :stepItems="stepItems"
    >
      <!-- 可以直接传 title 和 description 之外, 也可以写 title description icon 三个插槽 -->
      <link-step title="步骤3" />
    </link-steps>
    <p>
      <link-button label="prev" @click="prevStep" />
      <link-button label="next" @click="nextStep" />
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 1,
      stepItems: [{title: '步骤1'}, {title: '步骤2'}], // 还可以写 icon 和 description, 其中 icon 是 JSX
    }
  },
  methods: {
    nextStep() {
      if (this.current < 2) this.current += 1
    },
    prevStep() {
      if (this.current > 0) this.current -= 1
    },
  },
}
</script>
```

## 常见场景

```html
<!-- 迷你尺寸 -->
<link-steps :current="current" :stepItems="stepItems" size="mini" />

<!-- 含状态样式 -->
<link-steps :current="current" :stepItems="stepItems" :statusDisabled="false" />

<!-- 自定义图标 -->
<link-steps :current="current" :stepItems="stepItems" :borderWidth="0">
  <link-step title="步骤3">
    <!-- 也可以使用 stepItems 上的 icon (icon 需为一个 JSX) -->
    <template v-slot:icon>
      <svg viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M12 4a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>
    </template>
  </link-step>
</link-steps>

<!-- 竖向步骤条 -->
 <!-- direction="vertical" 让整个步骤条变成竖向的 -->
 <!-- 整个步骤条变成竖向的情况下 contentPlacement 不再影响步骤的图标(步骤图标固定在左侧), 推荐改为 vertical, 否则会出现一些奇怪的样式效果 -->
<link-steps
  :current="current"
  :stepItems="stepItems"
  direction="vertical"
  contentPlacement="vertical"
  contentTextDirection="left"
  style="min-height: 350px"
>
  <!-- 也可以使用 stepItems 上的 description -->
  <link-step title="步骤3" description="这是一段描述性文字" />
</link-steps>
```

## link-steps Props

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| current | Number | - | 0 | 当前步骤索引，从 0 开始 |
| stepItems | Array | - | [] | 步骤配置数组，单项支持 title/icon/description |
| direction | String | horizontal, vertical | horizontal | 步骤条方向(横向还是纵向) |
| size | String | default, mini | default | 步骤条尺寸 |
| statusDisabled | Boolean | true, false | true | 是否禁用状态样式, 禁用后已完成的步骤图标会展示为一个打勾的状态 |
| borderWidth | Number | - | 1 | 步骤条边框宽度 |
| contentPlacement | String | vertical, horizontal | vertical | 步骤内容排列方式(步骤图标与标题的排列) |
| contentTextDirection | String | left, center, right | center | 文本对齐方式 |
| lineSpace | Number | - | 16 | 线条之间间距 |

## link-step 插槽

| 插槽名称 | 说明 |
| --- | --- |
| title | 自定义步骤标题 |
| icon | 自定义步骤图标 |
| description | 自定义步骤描述 |

## 注意事项

- stepItems 与 link-step 可混用, 顺序上 stepItems 在前 link-step 在后
- 业务里切换步骤时建议限制 current 的上下界, 避免越界
- 需要展示图标但不想要边框时, 可将 borderWidth 设为 0