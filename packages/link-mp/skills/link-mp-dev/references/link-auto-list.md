# link-auto-list

## 概述

`link-auto-list` 常用于列表页面，拥有以下特性：

- 能够自动监听页面的下拉刷新、触底事件，并且重新查询数据，或者加载更多数据；
- `link-auto-list` 常与 `AutoList` 结合使用。它们两个互相之间的职责明确，`link-auto-list` 负责渲染数据，接收插槽、作用域插槽，渲染额外的内容，比如筛选、排序、搜索以及悬浮新建按钮等等；而 `AutoList` 则负责查询数据，处理各种筛选参数的变化，处理跳转详情、新建以及删除记录等功能。并且在所有的请求前后增加钩子函数，以实现更为复杂的业务逻辑控制；    
- 自带有多重数据查询方式：
    - 搜索；
    - 排序；
    - 筛选；
    - 快速筛选；

关于 `AutoList` 的更详细的用法说明，请阅读 AutoList.md 文档；

## 基本用法

以下实例代码，将渲染一个列表页面。这个列表页面在组件 `link-auto-list` 的生命周期 `created` 中调用 `AutoList` 的 `reload` 函数
查询数据；

```html
<template>
    <link-page>
        <link-auto-list :option="option">
            <template v-slot="{data,index}">
                <item :title="data.name || ' '" :desc="data.val" :data="data"/>
            </template>
        </link-auto-list>
    </link-page>
</template>

<script>

    export default {
        data() {
            const option = new this.AutoList(this, {
                module: 'action/link/basic',
            })
            return {
                option,
            }
        },
    }
</script>
```    

## 用法示例

#### 带有自动跳转详情的列表

需要给item组件传递属性`data`，data的值为行数据对象， `link-auto-list` 会自动监听 item的点击事件，并且创建一个跳转参数，跳转到
`itemPath` 页面；

```html
<template>
    <link-page>
        <link-auto-list :option="option">
            <template v-slot="{data,index}">
                <item :title="data.name || ' '" :desc="data.val" :data="data"/>
            </template>
        </link-auto-list>
    </link-page>
</template>

<script>
    export default {
        data() {
            const option = new this.AutoList(this, {
                module: 'action/link/basic',
                itemPath: '/pages/components/auto-list/demo-auto-list-item-page',
            })
            return {
                option,
            }
        },
    }
</script>
```

当跳转详情的时候，会传递跳转参数，参数格式如下：

```js
interface Param {
    // AutoOption中配置的module字符串
    module: string,             
    // 行数据对象
    data: object,               
    // 当前操作符，可选值有：NEW、UPDATE、READ，分别表示新建、编辑以及只读。当进入详情页面是，如果使用FormOption初始化表单页面，则FormOption会根据这个operator执行不同的初始化逻辑
    operator: FormOperator,     
    // 如果是点击新建按钮，listHook的格式为 {onAfterSaveNew:(formData:any)=>void, onAfterSaveUpdate:(formData)=>void}，如果是跳转详情，则listHook中只有 onAfterSaveUpdate 属性；
    // 当详情页面保存新建之后，会调用listHook的 onAfterSaveNew 函数，往list数据中unshift一条数据；当详情页面保存编辑之后，会调用listHook的 onAfterSaveNew 函数，根据id更新list数据中对应的记录；
    listHook: FormHooks<any>,   
}
``` 

> 如果你在详情页面中，使用FormOption来管理逻辑，那么你无需关心listHook，如果你的详情页面中并不使用FormOption来管理页面初始化，保存逻辑，
> 则需要手动地在保存新建之后调用 onAfterSaveNew 函数，在保存编辑之后调用onAfterSaveUpdate函数；

#### 带搜索框的列表

```html
<template>
    <link-page>
        <link-auto-list :option="option">
            <template v-slot="{data,index}">
                <item :title="data.name || ' '" :desc="data.val" :data="data"/>
            </template>
        </link-auto-list>
    </link-page>
</template>

<script>
    export default {
        data() {
            const option = new this.AutoList(this, {
                module: 'action/link/basic',
                itemPath: '/pages/components/auto-list/demo-auto-list-item-page',
                searchFields: ['name', 'val'],
            })
            return {
                option,
            }
        },
    }
</script>
```

只需要配置 `searchFields` 属性即可，当用户输入搜索关键字之后，会在请求参数 `filtersRaw` 中添加一个筛选对象，该对象的结构类似：`{id: "searchValue_0", property: "[name,val]", value: "url", operator: "or like"}`

#### 自定义排序选项

```html
<template>
    <link-page>
        <link-auto-list :option="option">
            <template v-slot="{data,index}">
                <item :title="data.name || ' '" :desc="data.val" :data="data"/>
            </template>
        </link-auto-list>
    </link-page>
</template>

<script>
    export default {
        data() {
            const option = new this.AutoList(this, {
                module: 'action/link/basic',
                itemPath: '/pages/components/auto-list/demo-auto-list-item-page',
                searchFields: ['name', 'val'],
                sortOptions: [
                    {label: '编号', field: 'id'},
                    {label: '代码', field: 'val', desc: false},
                ],
            })
            return {
                option,
            }
        },
    }
</script>
```

只需要配置sortOptions选项即可，sortOptions是一个数组，对象的结构如下所示

```ts
export interface SortOption {
    // 排序的字段
    field: string,
    // 排序字段的显示文本
    label: string,
    // 第一次点击该字段排序的时候，是升序还是降序
    desc?: boolean,
}
```

#### 自定义筛选的列表

````html
<template>
    <link-page>
        <link-auto-list :option="option">
            <template v-slot="{data,index}">
                <item :title="data.name || ' '" :desc="data.val" :data="data"/>
            </template>
        </link-auto-list>
    </link-page>
</template>

<script>
    export default {
        data() {
            const option = new this.AutoList(this, {
                module: 'action/link/basic',
                itemPath: '/pages/components/auto-list/demo-auto-list-item-page',
                searchFields: ['name', 'val'],
                sortOptions: [
                    {label: '编号', field: 'id'},
                    {label: '代码', field: 'val', desc: false},
                ],
                filterOption: [
                    {
                        label: '安全性筛选',
                        type: 'oauth',
                        // field: 'myOauth',                   // 绑定字段默认为oauth，这个字段不是filtersRaw中的property，而是最终请求参数对象的oauth字段
                        // lov: 'ACCT_STAGE',                  // 默认的安全性菜单值列表类型
                        /*data: [
                            {name: '自定义安全性一', val: 'custom_1'},
                            {name: '自定义安全性二', val: 'custom_2'},
                        ]*/
                    },
                    // 普通文本模糊筛选
                    {label: '客户姓名', field: 'acctName', type: 'text'},
                    // 数字范围筛选
                    {label: '客户年龄', field: 'acctAge', type: 'number'},
                    // 日期筛选
                    {label: '客户生日', field: 'acctBirthday', type: 'date'},
                    // 值列表筛选
                    {label: '客户级别', field: 'acctLevel', type: 'lov', lov: 'ACCT_LEVEL'},
                    // 自定义筛选
                    // 可以自己通过异步函数请求数据，然后 autoList.option.filterOption.options.push(自定义筛选选项)实现异步添加自定义筛选
                    // 上面的 autoList = new AutoList({...})
                    {
                        label: '客户负责人', field: 'acctMaster', type: 'select', data: [
                            {name: 'January', val: '1'},
                            {name: 'February', val: '2'},
                            {name: 'March', val: '3'},
                            {name: 'April', val: '4'},
                            {name: 'May', val: '5'},
                            {name: 'June', val: '6'},
                            {name: 'July', val: '7'},
                            {name: 'August', val: '8'},
                            {name: 'September', val: '9'},
                            {name: 'October', val: '10'},
                            {name: 'November', val: '11'},
                            {name: 'December', val: '12'},
                        ]
                    },
                ],
            })
            return {
                option,
            }
        },
    }
</script>
````

只需要配置 filterOption 即可，filterOption 是一个数组，数组中对象的格式如下所示：

```ts
/**
 * 筛选类型
 * @author  韦胜健
 * @date    2020/7/29 15:41
 */
enum FilterOptionType {
    text = 'text',
    number = 'number',
    date = 'date',
    lov = 'lov',
    select = 'select',
    oauth = 'oauth'
}

export type LinkFilterOptionValue = undefined | string | string[] | { start?: number | string, end?: string | number }

/**
 * listFilter筛选参数类型
 * @author  韦胜健
 * @date    2020/7/29 15:43
 */
export interface FilterOption {
    field: string,                                                                                  // 筛选的字段
    type: FilterOptionType,                                                                         // 筛选类型
    value?: LinkFilterOptionValue,                                                                  // 当前筛选值
    label: string,                                                                                  // 显示文本
    data?: any[],                                                                                   // 自定义选项数组
    multiple?: boolean,                                                                             // 值列表筛选或者自定义选项数组的时候，是否多选，默认多选
    lov?: string,                                                                                   // 值列表类型
    lovOption?: {                                                                                   // 值列表的一些额外参数
        parentType?: string,
        parentVal?: string,
        excludeLovs?: string[],
        reverse?: boolean
    },
}
```

> 关于筛选类型为 oauth 的筛选选项解释：
> - 当筛选类型 type = oauth 时，这个筛选最终的输出结果，在 `link-atuo-list` 中不会转化为filtersRaw，而是作为请求参数对象的属性值，
> 参与到筛选功能中；
> - 比如oauth筛选：{label:'安全性筛选', type:'oauth'}，默认情况下，会使用值列表类型 `APP_MENU_OAUTH` 作为筛选选项，你可以理解为此时这个就是一个值列表筛选选项，并且
> 是单值选择，而不是多值选择。当用户选中了其中一个安全性选项时，这个筛选选项就多了一个值，变成了：{label:'安全性筛选', type:'oauth', value:'My'}，
> 此时最终生成的查询参数为： {page: ???, row:???, filtersRaw: [...???], oauth:'MY'}；
> - 因为oauth实质上是一个值列表筛选，你可以设置lov来替换默认的 `APP_MENU_OAUTH` 值列表类型，同时也支持 lovOption 属性控制父子值列表、排除值列表等等；
> - 关于oauth筛选还有另一个灵活的用法，比如以下这个筛选对象： 
>   ```js
>   {
>       label:'父项目',
>       type:'oauth',
>       field:'parentId',
>       data:[
>           {name: '自定义安全性一', val: 'custom_1'},
>           {name: '自定义安全性二', val: 'custom_2'},    
>       ],
>   }
>   ```
>   当用户选中了其中的一条属性，并且确定查询时，最终生成的查询对象为：{page: ???, row:???, filtersRaw: [...???], parentId:'custom_1'}；
>   通过这种方式可以实现自定义的父筛选条件，当然具体还得看实际的业务需求场景，不同的场景下，实现方式千奇百怪；

#### 带快速筛选栏的列表

```html
<template>
    <link-page>
        <link-auto-list :option="option">
            <template v-slot="{data,index}">
                <item :title="data.name || ' '" :desc="data.val" :data="data"/>
            </template>
        </link-auto-list>
    </link-page>
</template>

<script>
    export default {
        data() {
            const option = new this.AutoList(this, {
                module: 'action/link/basic',
                itemPath: '/pages/components/auto-list/demo-auto-list-item-page',
                searchFields: ['name', 'val'],
                sortOptions: [
                    {label: '编号', field: 'id'},
                    {label: '代码', field: 'val', desc: false},
                ],
                filterBar: {
                    field: 'name',
                    lov: 'BURIED_TYPE',
                    notNull: true,                  // 禁止反选为null
                }
            })
            return {
                option,
            }
        },
    }
</script>
```

只需要配置 filterBar属性即可：filterBar对象结构如下所示：

```ts
interface FilterBarCustomOption {
    name: string,
    val: string,
    note?: string
}

export interface FilterBarOption {
    field: string,                              // 筛选的字段
    value?: string | string[],                  // 当前值如果是值列表，则为值列表的独立源代码val，如果是自定义选项，则为自定义选项的val
    lov?: string | {
        type: string,                           // 值列表了类型
        parentType?: string                     // 父值列表类型
        parentVal?: string                      // 父值列表的值
        excludeLovs?: string[],                 // 排除的值列表
        reverse?: boolean,                      // 是否直接值列表的显示值
    },
    // 自定义选项，支持异步函数初始化
    options: FilterBarCustomOption[] | (() => FilterBarCustomOption[] | Promise<FilterBarCustomOption[]>),
    autoReload?: boolean,                       // AutoList是否自动重新reload
    notNull?: boolean,                          // 是否不允许为空
}
```

#### 带侧滑选项的列表

```html
<template>
    <link-page>
        <link-auto-list :option="option">
            <template v-slot="{data,index}">
                <link-swipe-action :key="index">
                    <item :title="data.name || ' '" :desc="data.val" :data="data"/>
                    <link-swipe-option label="删除" @tap="option.deleteItem(data)" slot="option"/>
                </link-swipe-action>
            </template>
        </link-auto-list>
    </link-page>
</template>

<script>
    export default {
        data() {
            const option = new this.AutoList(this, {
                module: 'action/link/basic',
                itemPath: '/pages/components/auto-list/demo-auto-list-item-page',
                searchFields: ['name', 'val'],
                sortOptions: null,
            })
            return {
                option,
            }
        },
    }
</script>
```

点击侧滑按钮的时候，需要手动调用 AutoList 对象的 deleteItem方法删除对象；

## 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| option | AutoList | --- | --- | 必填，AutoList配置对象 |
| fabBottom | number | --- | --- | 新建悬浮按钮距离底部的距离 |
| hideCreateButton | boolean | --- | --- | 是否隐藏新建悬浮按钮 |

## 事件

| 事件名称 | 参数 | 说明 |
| --- | --- | --- | 
| tapItem | e:TapEvent, data:object | 点击item事件，这个data就是传给item的data值 |
| filter-bar-change | val:string | link-filter-bar值变化事件，这个值实际上就是AutoList对象的option.filterBar.value 的值 |

## 插槽

| 插槽名称| 说明 |
| --- | --- |
| default | 默认插槽 |
| top | 顶部插槽，当存在顶部插槽时，将自动使用 <link-sticky top> 作为容器包裹 |
| bottom | 底部插槽，当存在底部插槽时，将自动使用 <link-sticky> 作为容器包裹 |

## 作用域插槽

| 作用域插槽名称 | 参数 | 说明 |
| --- | --- | --- | 
| default | {data:object,index:number} | 渲染列表内容的作用域插槽 | 