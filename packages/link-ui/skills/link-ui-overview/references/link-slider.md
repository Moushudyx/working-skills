# link-slider 图片轮播/图片预览

## link-slider 基本用法

```html
<link-slider :page-index.sync="pageIndex">
    <!-- 最好设置 key 确保性能 -->
    <div v-for="(item,index) in picList" :key="item.id">
        <!-- 可以监听 @click 来实现跳转 item.linkUrl -->
        <img :src="item.picUrl" :alt="item.id" style="width: 100%;height: auto">
    </div>
</link-slider>
<div>
pageIndex:{{pageIndex}}
</div>
```

```js
export default {
    data() {
        return {
            pageIndex:0,
            picList: [{
                linkUrl: "点击跳转链接1",
                picUrl: "图片链接1",
                id: 18892
            }, {
                linkUrl: "点击跳转链接2",
                picUrl: "图片链接2",
                id: 18888
            }, {
                linkUrl: "点击跳转链接3",
                picUrl: "图片链接3",
                id: 18868
            }, {
                linkUrl: "点击跳转链接4",
                picUrl: "图片链接4",
                id: 18288
            }, {
                linkUrl: "点击跳转链接5",
                picUrl: "图片链接5",
                id: 18871
            }],
        }
    },
}
```

## $slider 预览图片


```html
<link-button @click="useSlider">点击查看大图</link-button>
```

```js
export default {
    data(){
        return{
            picList: [{
                // linkUrl 无效
                picUrl: "图片链接1",
                id: 18892
            }, {
                picUrl: "图片链接2",
                id: 18888
            }, {
                picUrl: "图片链接3",
                id: 18868
            }, {
                picUrl: "图片链接4",
                id: 18288
            }, {
                picUrl: "图片链接5",
                id: 18871
            }],      
        }
    },
    methods:{
        useSlider() {
            this.$slider.pick({
                picData: this.picList,
                picKey: 'picUrl',
                pageIndex: 2, // 默认展示图片下标
                picInfo:'扫描二维码参与互动', // 页面底部
                previewTitle: '<span style="color:red">大标题</span>', // 页面顶部
            })
            // setInterval(()=>{
            //     this.$slider.freshTitle(`一段自定义的文本 或者 一段html`)
            // },1000)
        }
    }
}
```
</demo>


<demo>
<setting>
title: $slider服务属性
table:true
</setting>

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| :------ | :------ | :------ | :------ | :------ |
| picData | Array | --- | [] | 自定义预览图片list |
| pageIndex | Number | --- | 0 | 初始展示附件的位置索引 需要配合picData属性使用 预览只有一张图 使用此属性没有意义 |
| picInfo | String | --- | --- | 预览图片底部描述性文本 |
| maxWidth | String | --- | 85% | 默认最大宽度 |
| previewTitle | String | --- | --- | 预览标题 默认为空 不显示 一段自定义组装的html 或者 文本 |
| dragFlag | Boolean | --- | false | 是否需要拖拽功能，当图片放大超出屏幕可视区域，可以拖动遮挡部分到可视区域查看 |
| freshTitle | Function | --- | --- | 刷新预览顶部标题方法 可以使用this.$refs.xxx.freshTitle('文本/html') |

</demo>

<demo>
<setting>
title: $slider功能介绍 
table:true
</setting>

```shell script
1、图片的放大、缩小、旋转等操作；
2、按住 shirt 键，配合鼠标滚轮可放大缩小图片；
3、可使用键盘左右键切换轮播图片显示；
4、将dragFlag置为true，可以在预览界面拖拽显示图片（如果图片很大超出屏幕可视区域，可以尝试这个功能）
```
</demo>

