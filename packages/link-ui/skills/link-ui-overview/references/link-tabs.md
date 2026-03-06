# Tabs页签

link-tabs 默认是第一次点击打开页签的时候，页签的内容才会初始化，后续切换不会重新初始化

## 基本用法

```html
<link-tabs>
  <link-tab title="页签1">
    页签1
  </link-tab>
  <link-tab title="页签2">
    页签2
  </link-tab>
</link-tabs>
<!-- 小尺寸 -->
<link-tabs size="small">
  <link-tab title="页签1">
    页签1
  </link-tab>
  <link-tab title="页签2">
    页签2
  </link-tab>
</link-tabs>
```

## 初始化与销毁

```html
<link-tabs>
  <link-tab title="tab1">
    第一页, 默认初始化
  </link-tab>
  <link-tab title="tab2">
    懒加载
  </link-tab>
  <link-tab title="tab3" initialized>
    这页会默认初始化
  </link-tab>
</link-tabs>
<!-- 用在 link-tabs 上时会让所有 tab 都默认初始化 -->
<link-tabs initialized>
	<link-tab title="tab1">
		默认初始化
	</link-tab>
	<link-tab title="tab2">
		默认初始化
	</link-tab>
	<link-tab title="tab3">
		默认初始化
	</link-tab>
</link-tabs>
<!-- 使用 destroyed-on-hide 指定某个 tab 隐藏时销毁内容 -->
<link-tabs>
  <link-tab title="tab1">
    第一页, 默认初始化
  </link-tab>
  <link-tab title="tab2">
    懒加载
  </link-tab>
  <link-tab title="tab3" destroyed-on-hide>
    懒加载, 隐藏时销毁, 重新展示时重新初始化
  </link-tab>
</link-tabs>
```

## 双向绑定

```html
<link-button label="后退" @click="index = index-1<0 ? 0 : index-1"/>
<link-button label="前进" @click="index = index+1>2 ? 2 : index+1"/>
<link-tabs v-model="index" @change="({tab})=>$msg.show(tab.title)">
  <link-tab title="用户管理1">
    manage1
  </link-tab>
  <link-tab title="用户管理2">
    manage2
  </link-tab>
  <link-tab title="用户管理3">
    manage3
  </link-tab>
</link-tabs>
```
```js
export default {
    data(){
        return{
            index:0,
        }
    },
}
```
### 使用 id 管理切换

```html
<link-select :data="['manage1','manage2','manage3']" v-model="currentTabId"/>
<link-tabs ref="tabs" :id.sync="currentTabId" @change="tabChange">
  <link-tab title="用户管理1" id="manage1">
    manage1
  </link-tab>
  <link-tab title="用户管理2" id="manage2">
    manage2
  </link-tab>
  <link-tab title="用户管理3" id="manage3">
    manage3
  </link-tab>
</link-tabs>
```

```js
export default {
  data(){
    return{
      currentTabId: 'manage2',
    }
  },
  methods:{
    tabChange({tab}) {
      this.$msg.show(tab.id)
    },
  },
}
```
## 隐藏页签头

隐藏默认的页签标题, 此时需要自行实现切换页签的功能

```html
<link-select :data="['manage1','manage2','manage3']" v-model="currentTabId"/>
<link-tabs ref="tabs" :id.sync="currentTabId" @change="tabChange" hideHeader>
  <link-tab title="用户管理1" id="manage1">
    manage1
  </link-tab>
  <link-tab title="用户管理2" id="manage2">
    manage2
  </link-tab>
  <link-tab title="用户管理3" id="manage3">
    manage3
  </link-tab>
</link-tabs>
```
```js
export default {
  data(){
    return{
      currentTabId: 'manage2',
    }
  },
  methods:{
    tabChange({tab}) {
      this.$msg.show(tab.id)
    },
  },
}
```

## 可删除的 tab

```html
<link-tabs closeButton newButton @close="handleClose" @new="handleNew" v-model="tab">
    <link-tab :title="award.title" v-for="(award) in awardsList" :key="award.id">
        {{award.title}}
    </link-tab>
</link-tabs>
```
```js
export default {
  data(){
    return{
      tab: 0,
      awardsList: [
        {title: '奖项1', id: this.$lv.$utils.uuid()},
        {title: '奖项2', id: this.$lv.$utils.uuid()},
        {title: '奖项3', id: this.$lv.$utils.uuid()},
        {title: '奖项4', id: this.$lv.$utils.uuid()},
        {title: '奖项5', id: this.$lv.$utils.uuid()},
      ],
      count: 5,
    }
  },
  methods:{
    handleClose({item, index}) {
      if(index > 0){
        this.tab = index - 1;
        this.awardsList.splice(index, 1);
      }
    },
    handleNew() {
      const tmpObj = {
        title: '奖项' + ++this.count,
        id: this.$lv.$utils.uuid()
      };
      this.$nextTick(() => {
        this.awardsList.push(tmpObj);
        setTimeout(()=>{
          this.tab = this.awardsList.length -1;
        }, 10);
      });
    },
  },
}
```
