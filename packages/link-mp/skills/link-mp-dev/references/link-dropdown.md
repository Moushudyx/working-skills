# link-dropdown


## 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| model | boolean | --- | --- | 双向绑定值，控制悬浮框是否打开 |
| disabledToggleOnTapReference | boolean | --- | --- | 是否禁用点击插槽内容就开启/关闭 dropdown |
| disabledHideOnTapMask | boolean | --- | --- | 是否禁用点击遮罩关闭dropdown |

## 事件

| 事件名称 | 参数 | 说明 |
| --- | --- | --- | 
| input | val:boolean | 绑定事件 |
| change | val:boolean | 绑定值变化事件 |
| tap-reference | --- | 绑定值变化事件 |
| tap-mask | --- | 点击遮罩事件 |

## 方法

| 方法名称 | 参数 | 说明 |
| --- | --- | --- |
| methods.show | --- | 打开悬浮框 |
| methods.hide | --- | 关闭悬浮框 |

## 插槽

| 插槽名称| 说明 |
| --- | --- |
| default | 默认插槽，显示的内容 |
| dropdown | 悬浮框中的内容插槽 |

## 基本用法

```html
<link-dropdown>
    <link-button block>reference</link-button>
    <view slot="dropdown">
        <link-button block>this is dropdown content</link-button>
    </view>
</link-dropdown>
```