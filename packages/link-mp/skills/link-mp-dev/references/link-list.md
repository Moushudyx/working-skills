# link-list 与 link-item

link-list 与 link-item 用于渲染一个静态的卡片列表

如果想要渲染一个有查询等操作的列表，请阅读 link-auto-list.md

## link-list 

- 自定义的link组件，在 `src/components/list/link-list.vue` 下；
- 作为link-item组件的容器使用，在使用link-item的时候，尽量使得link-item的父组件为link-list组件，否则样式可能会有问题
- 只有一个 card 属性, 控制是否为卡片式的列表样式
- 只会派发一个 `tap-item` 事件，当 link-item 被点击时，link-list 会派发这个事件，事件的参数为 {e:tapEvent, data:any}，data为传给link-item的data属性值；

## link-item

- 自定义的link组件，在 `src/components/list/link-item.vue` 下；
- 作用在于提供常用的列表排版布局以及样式，这个都是通过插槽实现的；

### 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| title | string | --- | --- | 左上角文本 |
| note | string | --- | --- | 左下角文本 |
| content | string | --- | --- | 右上角文本 |
| desc | string | --- | --- | 右下角文本 |
| arrow | boolean | --- | --- | 右侧箭头图标 |
| thumb | string | --- | --- | 缩略图图标 |
| data | --- | --- | --- | 额外用途，link-item的数据 |
| verticalAlign | string | --- | --- | 纵向对齐方式 center, between |
| disabled | --- | boolean | --- | 是否禁用，禁用则无法触发点击事件 |

### 事件

| 事件名称 | 参数 | 说明 |
| --- | --- | --- | 
| tap | event | 点击事件 |

### 插槽

| 插槽名称| 说明 |
| --- | --- |
| thumb | 左侧纵向居中的插槽，一般用来放图标、头像以及复选框 |
| title | title位置的插槽 |
| note | note位置的插槽 |
| content | content位置的插槽 |
| desc | desc位置的插槽 |
| icon | 右侧箭头图标的插槽 |

## 示例

### 基本用法

```html
<link-list card>
    <view class="list-card-title">卡片标题</view>
    <link-item v-for="item in 30"
               :key="item"
               :title="`title-${item}`"
               :content="`content-${item}`"
               :note="`note-${item}`"
               :desc="`desc-${item}`"
               :arrow="item%2 === 0"
    />
</link-list>
```