## 常见需求

### 如何自定义请求地址

指定 module 之后, 默认接口如下:

- 查询接口 queryByExamplePage: `{module}/queryByExamplePage`
- 新建接口 insert: `{module}/insert`
- 更新接口 update: `{module}/update`
- 删除接口 deleteById: `{module}/deleteById`
- 导出数据接口 exportData: `{module}/exportData`
- 批量新建数据保存接口 batchInsert: `{module}/batchInsert`
- 批量更新数据保存接口 batchUpdate: `{module}/batchUpdate`

```js
export default {
  data(){
    const option = new AutoOption({
      module: 'link/clue',
      queryByExamplePage:'link/clue/customQueryUrl',
      // 以此类推, 需要覆盖哪个接口就写哪个接口的 url, 不需要覆盖的接口就不写
    })
    return {
      option,
    }
  },
}
```

### 如何设置表格的查询参数

1. AutoOption 中的 param 属性
2. 如果查询参数是动态的，最好在 beforeLoad 钩子函数中操作 param
3. 操作 filtersRaw 的话, 如果字段编码与列表中的某个字段编码重复, 则不能写在 AutoOption 的 param 里, 会导致查询和展示问题

### 如何实现单列编辑多值(比如单列同时编辑起止时间)

列组件的 scoped slot 可以实现此需求, 更多信息可以参考 references/link-table-column.md 中的“作用域插槽 自定义列内容”部分

```html
<link-auto-table :option="option">
	<link-table-column field="startTime" title="起止时间" filterName="date" width="110">
		<template slot-scope="{showRow,editable}">
			<span v-if="!editable">{{showRow.startTime}} - {{showRow.endTime}}</span>
			<link-datepicker v-else validateOnInit :start.sync="showRow.startTime" :end.sync="showRow.endTime" range required/>
		</template>
	</link-table-column>
</link-auto-table>
```

### 一个字段分割到多个列展示, 保存时又想合在一起

计算机科学领域的所有问题都可以通过增加中间层来解决

```js
export default {
  data(){
    const option = new AutoOption({
      module: 'link/clue',
      rowFormatter(row) {
        // 这里可以控制展示的数据, 比如将后端返回的一个字段分割成两个字段展示
      },
      beforeUpsert(row) {
        // 这里可以处理保存的数据, 比如将展示的两个字段合成一个字段传给后端
      }
    })
    return {
      option,
    }
  },
}

```

### 禁用自动添加的ID、创建时间、更新时间搜索条件

这三个搜索条件都是自带的, 不写这几个列也会加在默认查询条件里, 一般不需要去掉

- 禁用 ID 查询: `defaultSearchIdField: false`
- 禁用创建时间查询: `externalFilterColumns: [{title: '', field: 'created', filterName: 'input', search: false}]`
- 禁用更新时间查询: `externalFilterColumns: [{title: '', field: 'lastUpdated', filterName: 'input', search: false}]`

### 预制默认搜索条件

通过searchField以及singleDynamicFilter设置搜索栏初始状态下的搜索条件

```js
export default {
  data(){
    const option = new AutoOption({
      module: 'link/clue',
      searchField: 'created', // 默认展示 created 字段的搜索条件
      singleDynamicFilter: new DynamicFilter({
        type: 'date',
        field: 'created',
        value: {
          start: '2026-09-09 00:00:00',
          end: '2026-12-31 23:59:59',
        },
      }),
    })
    return {
      option,
    }
  },
}
```

少见的需求: 通过 combineFilter 设置组合查询的初始筛选条件

```js
export default {
  data(){
    const option = new AutoOption({
      module: 'link/clue',
      combineFilter: {
        filtersRaw: [
          {
            id: 'created_1',
            property: 'created',
            operator: '>=',
            value: '2026-09-09 00:00:00'
          },
          {
            id: 'created_2',
            property: 'created',
            operator: '<=',
            value: '2026-12-31 23:59:59'
          },
        ],
        filterOptions: [
          {
            id: 'created_1',
            field: 'created',
            name: '创建时间',
          },
          {
            id: 'created_2',
            field: 'created',
            name: '创建时间',
          },
        ],
        filterResults: [
          {
            condition: '>=',
            field: 'created',
            id: 'created_1',
            multi: false,
            multival: false,
            type: 'date',
            value: '2026-09-09 00:00:00',
          },
          {
            condition: '<=',
            field: 'created',
            id: 'created_2',
            multi: false,
            multival: false,
            type: 'date',
            value: '2026-12-31 23:59:59',
          },
        ],
        filterOperator: '',
      },
    })
    return {
      option,
    }
  },
}
```

## 常见问题

### 发送insert或者update请求, 数据没有保存成功

检查保存发送的请求类型, 是表单请求`application/x-www-form-urlencoded`还是json请求`application/json`

传参无误的话与后端人员沟通

### 表格的总数/页数显示也不正确, 或者无法正常切换到下一页

检查一下分页查询接口, 特别是返回的数据`{rows,success,total}`中的total是否正确

确实是接口问题的话与后端人员沟通

### 表格显示一片空白, 或者部分列展示空白

1. 可能是在 ElTabs 中使用AutoTable, 改用 LinkTabs
2. 可能是使用 v-show 控制 AutoTable 或者 AutoTable 父元素的显隐, 调用 AutoOption 的 refreshRender 方法试试
3. 在 dialog 中的 AutoTable 也会有此问题, 处理方式同第 2 条

### 表格没有显示全数据, 比如切换到50条每页查出来50条数据, 但是只显示几十条, 无法滚动查看剩下的数据, 并且表格的高度不正确

不正确的场景下使用了 AutoOption 的 fill 属性, 此属性只能用于页面上只有一个列表的情况

### 表格高度问题: 底部的分页器被遮挡，或者表格在增大每页显示的行数的时候，没有出现滚动条，而是高度增大了

同上, 不正确的场景下使用了 AutoOption 的 fill 属性, 此属性只能用于页面上只有一个列表的情况

- 如果确实要在页面上渲染除了列表以外的组件, 且希望列表自动撑开高度(使用 fill), 则需要手动将列表组件放进一个控制了高度的 div 里面

### 表格中有的列的宽度/标题/顺序跟代码不一致, 默认查询字段/查询数据排序方式跟代码配置的不一致

检查一下是不是使用了表格的**自定义**功能，在自定义中可以配置部分列属性，标题，以及默认排序字段，排序方式等等
