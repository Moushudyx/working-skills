# link-fab-button


## 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| icon | string | --- | --- | 悬浮按钮图标 |
| bottom | number | --- | --- | 悬浮按钮距离底部的位置，类型为数字，单位rpx |

> 悬浮按钮会自动适配底部安全区，在iPhone x类型的设备上距离底部的距离会多出68rpx
> 当有底部的link-sticky的时候，悬浮按钮的底部又会自动多出sticky高度的距离，以防被sticky遮盖；

## 事件

| 事件名称 | 参数 | 说明 |
| --- | --- | --- | 
| tap | event:点击事件 | 点击事件 | 


## 基本用法

```html
<link-fab-button @tap="onTap"/>
```