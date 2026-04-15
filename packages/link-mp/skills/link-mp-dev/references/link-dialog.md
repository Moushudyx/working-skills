# link-dialog


## 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| model | boolean | --- | --- | 是否打开弹框双向绑定值 |
| title | string | --- | --- | 弹框标题 |
| width | string | --- | 75vw | 弹框宽度 |
| height | string | --- | --- | 弹框高度 |
| borderRadius | string | --- | 8rpx | 弹框圆角 |
| vertical | string | start,center,end | center | 弹框纵向位置 |
| horizontal | string | start,center,end | center | 弹框横向位置 |
| animation | string | scale,fade,top,bottom,left,right | --- | 弹框动画 |
| contentFlexCenter | boolean | --- | true | 内容是否居中，默认情况下，head,body,foot 都是flex居中，设置了该属性之后，改为block left； |
| verticalFootButton | boolean | --- | --- | foot 中的按钮是否纵向布局 |
| disabledHideOnClickMask | boolean | --- | --- | 是否禁用点击遮罩的时候关闭弹框 |
| position | string | top,left,right,bottom,poster,default | default | 位置，默认为default，还有 top,left,right,bottom, poster |
| maskColor | string | --- | --- | 遮罩背景色，默认为 rgba(black,0.15) |
| initial | boolean | --- | --- | 是否立即初始化弹框内容 |
| noPadding | boolean | --- | --- | 是否去掉弹框内边距 |

> 当弹框的position为bottom的时候，会自动增加一个底部的内边距，以适配iPhone X类型设备底部的安全区；

## 事件

| 事件名称 | 参数 | 说明 |
| --- | --- | --- | 
| input | val:boolean | model绑定事件 |
| change | val:boolean | model绑定值变化事件 |
| show | --- | 弹框打开事件 |
| hide | --- | 弹框关闭事件 |
| clickMask | --- | 点击遮罩事件 |
| clickClosePosterIcon | --- | 点击海报下方的关闭图标事件 |

## 方法

| 方法名称 | 参数 | 说明 |
| --- | --- | --- |
| show | --- | 打开弹框 |
| hide | --- | 关闭弹框 |

## 插槽

| 插槽名称| 说明 |
| --- | --- |
| default | 默认弹框内容插槽 |
| head | 弹框标题插槽 |
| foot | 弹框底部插槽 |

## 基本用法

```html
<template>
    <link-page>
        <link-button block :label="`openFlag:${openFlag}`" @tap="openFlag = !openFlag"/>
        <link-dialog v-model="openFlag" title="标题">
            <view>
                弹框内容
            </view>
            <link-button slot="foot">取消</link-button>
            <link-button slot="foot">确定</link-button>
        </link-dialog>
    </link-page>
</template>

<script>
    export default {
        data() {
            return {
                openFlag: false,
            }
        },
    }
</script>
```
