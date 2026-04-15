# AutoList

## 概述

- `AutoList` 对象是组件 `link-auto-list` 的内在灵魂， `link-auto-list`组件负责渲染数据，显示搜索、筛选、排序以及快速筛选栏等查询组件，
并且显示新建按钮；
- `AutoList` 对象则是负责数据查询，处理筛选，排序参数变化动作、整合筛选参数、监听页面的下拉刷新、触底事件发送请求查询数据、跳转详情页面、删除、更新数据；

关于 `link-auto-list` 组件的说明，请阅读 `link-auto-list.md` 文档；

## AutoList参数格式

## 属性

### 基础属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| module | string | --- | --- | 模块地址前缀 |
| param | object | --- | --- | 分页查询参数 |
| pageSize | number | 25 | --- | 分页查询返回记录数量 |
| url.queryByExamplePage | string | --- | --- | 请求接口地址，没有默认会使用 module + /queryByExamplePage 作为请求地址 |
| url.queryById | string | --- | --- | 根据id查询详情地址，如果是由AutoList打开详情页面，并且将页面参数传给了FormOption，则FormOption会根据这个请求地址重新查询记录详情， |
| url.insert | string | --- | --- | 保存新建的地址 |
| url.update | string | --- | --- | 保存编辑的地址 |
| url.deleteById | string | --- | --- | 删除记录地址 |
| url.preDefaultValue | string | --- | --- | 默认新建数据获取接口地址 |
| enableSortField | boolean | --- | --- | 是否启用默认排序字段 |
| sortField | string | --- | --- | 排序字段，默认根据created排序 |
| sortDesc | boolean | --- | --- | 排序方式，默认降序 |
| loadOnStart | boolean | --- | --- | 是否在页面初始化的时候自动查询数据 |
| itemPath | string | --- | --- | gotoItem跳转页面路径 |
| createPath | string | --- | --- | createItem 创建页面路径，没有则使用itemPath，都没有则不会显示新建悬浮按钮 |
| disabled.creatable | boolean,(() => boolean) | --- | --- | 是否可新建，false则不显示新建按钮 |
| disabled.updatable | boolean,(() => boolean) | --- | --- | 是否可更新，false则打开详情的时候只读 |
| disabled.deletable | boolean,(() => boolean) | --- | --- | 是否可删除，false则调用deleteItem的时候提示禁止进行删除操作 |
| renderFunc | (h: Vue.CreateElement, param: { data: any, index: number }) => VNode | --- | --- | 自定义内容的渲染函数，可以用这个来代替作用域插槽渲染 |
| slots.top | (h: Vue.CreateElement) => VNode | --- | --- | link-auto-list 顶部插槽 |
| slots.bottom | (h: Vue.CreateElement) => VNode | --- | --- | link-auto-list 底部插槽 |
| slots.other | (h: Vue.CreateElement) => VNode | --- | --- | link-auto-list 默认插槽位置内容的渲染函数（不会覆盖默认插槽），可以放一些悬浮按钮之类的内容 |
| sortOptions | SortOption[] | --- | --- | 排序选项数组，详情见下文：[sortOptions](#sortOptions) |
| searchText | string | --- | --- | 当前搜索关键字文本 |
| searchFields | string[] | --- | --- | 搜索的时候的字段 |
| filterOption | FilterOption[] | --- | --- | 筛选参数数组，详情见下文：[filterOption](#filterOption) |
| filterBar | FilterBarOption | --- | --- | link-filter-bar 参数，详情见下文：[filterBar](#filterBar) |
| hooks | AutoListHooks | --- | --- | 一些事件钩子函数配置，详情见下文：[hooks](#hooks) |
| showFetchItemLoading | boolean | true/false | true | 查询详情是否显示遮罩 |
| fetchItem | boolean |  |  | 是否根据id获取item数据 |
| stayFields | string |  |  | 控制是否只查询指定字段,兼容旧版本 |
| queryFields | string |  |  | 控制是否只查询指定字段,建议使用该字段 |
| exactSearchFields | ExactSearchField[] |  |  | 精准查询字段 |
| customClass | string \\| string[] |  |  | 自定义autolist样式 |

### sortOptions

**<span id="sortOptions">sortOptions</span>** 是一个数组，数组中对象的格式如下所示

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| field | string | --- | --- | 排序字段 |
| label | string | --- | --- | 排序显示文本 |
| desc? | boolean | --- | --- | 第一次点击排序的时候，是否为降序，默认为true |

### filterOption

**<span id="filterOption">filterOption</span>** 是一个数组，数组中对象的格式如下所示

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| field | string | --- | --- | 筛选的字段 |
| type | string | text,number,date,lov,select,oauth | 没有默认值，必填 | 筛选类型 |
| value | --- | --- | --- | 筛选值，当为类型为text，oauth的时候，类型为字符串；<br>为number、date的时候，为对象{start?:string number,end?:string number}；<br>当为lov、select的时候，类型为字符串数组； |
| label | string | --- | --- | 显示文本 |
| data | {name:string,val:string}[] | --- | --- | 自定义选项数组 |
| multiple | boolean | --- | true | 值列表筛选或者自定义选项数组的时候，是否多选，默认多选 |
| lov | string | --- | --- | 值列表类型 |
| lovOption.parentType | string | --- | --- | 父值列表类型 |
| lovOption.parentVal | string | --- | --- | 父值列表的值 |
| lovOption.excludeLovs | string[] | --- | --- | 排除的值列表 |
| lovOption.reverse | boolean | --- | --- | 是否使用值列表的显示值作为绑定值 |

### filterBar

**<span id="filterBar">filterBar</span>** 是一个对象，对象结构如下所示

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| field | string | --- | --- | 筛选的字段 |
| value | string | --- | --- | 当前值如果是值列表，则为值列表的独立源代码val，如果是自定义选项，则为自定义选项的val |
| lov | string, object | --- | --- | 值列表类型字符串，或者一个对象，对象结构 {type:string,parentType?:string,parentVal?:string,excludeLovs?:string[],reverse?:boolean}，定义值列表的一些复杂属性 |
| options | FilterBarCustomOption[] , (() => FilterBarCustomOption[] , Promise<FilterBarCustomOption[]>), | --- | --- | 自定义选项，支持异步函数初始化，FilterBarCustomOption对象结构为：{name:string,val:string,note:string}，note为筛选文本name下面显示的一个文本 |
| autoReload | boolean | --- | true | 当filterBar.value变化的时候，AutoList是否自动重新reload |
| notNull | boolean | --- | false | 是否不能为空，默认情况下，点击一个已经选中的选项时，会反选，结果就是没有选中的filterBar选项； |


### hooks

**<span id="hooks">hooks</span>** 是一个对象，对象结构如下所示

```typescript
export interface AutoListHooks<T> {
    beforeLoad?: (option: { url: string, param: T & AutoListParamType }) => void | Promise<void>    // 分页查询前钩子函数
    afterLoad?: (result: HttpResponse) => void                                                      // 分页查询后钩子函数

    beforeGotoItem?: (param: FormParam<any>) => void | Promise<void>                                // 跳转详情页之前
    beforeCreateItem?: (param: FormParam<any>) => void | Promise<void>                              // 跳转详情页之后

    beforeDeleteItem?: (config: FormRequestConfig) => void | Promise<void>                          // 删除详情前
    afterDeleteItem?: (resp: HttpResponse) => void | Promise<void>                                  // 删除详情后

    onHandlerRequestError?: (e) => void
}
```

### ExactSearchField

**<span id="hooks">ExactSearchField</span>** 是一个对象，对象结构如下所示

```typescript
interface ExactSearchField {
	field: string // 字段名,用于搜索
  showValue: string // 展示名,用于显示的字段
  exactSearch?: boolean // 精准查询,默认为true,field为"*"时无效
  searchOnChange?: boolean // 切换时直接执行搜索,默认为true
  clearOnChange?: boolean // 切换时清除搜索文字,默认为true
}
```
