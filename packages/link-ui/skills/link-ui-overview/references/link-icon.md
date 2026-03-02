# link-icon 图标

link-icon 组件的图标默认使用阿里巴巴 iconfont 图标, 一般不会单独使用而是作为其他组件(如 link-button)的属性使用; 如果需要添加自定义图标, 请参考下面的示例代码和说明

## 最新版图标库源文件

下载最新版本的前端组件库图标: https://dev.linkcrm.cn/frontdoc/static/lib/release/linkicon.zip

## 基本用法

- 如果需要添加自定义图标, 首先得在[iconfont](https://www.iconfont.cn/home/index)上注册登录, 与产品UI设计师联系, 将自己拉入产品图标项目
- 已经是图标项目的一员之, 自行添加图标到项目中, 之后点击下载到本地, 然后将其中的几个文件替换工程目录static/lib/linkicon下的文件：
    1. iconfont.css
    2. iconfont.eot
    3. iconfont.js
    4. iconfont.svg
    5. iconfont.ttf
    6. iconfont.woff
    7. iconfont.woff2
- 注意, 尽量不要添加有色图标, 如果图标是纯色的, 请通过样式color设置, 如果图标是彩色的, 则不做要求; 简单图标如果不是纯色的话, 可以在iconfont上使用
批量去色功能去除图标的颜色

```vue
<template>
    <link-icon icon="icon-shuoming"/>
    <link-icon icon="icon-loading-section-one" loading/>
    <link-icon icon="icon-shuoming" style="color: #2E5BFF"/>
    <link-icon icon="link-icon-close" style="font-size: 20px"/>
    <link-icon icon="icon-shuoming" style="font-size: 20px"/>
</template>
```
## 常见图标名称

参考文档 references/link-icon-list.md 中的图标列表
