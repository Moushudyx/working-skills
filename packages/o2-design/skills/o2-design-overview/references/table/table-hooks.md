
## onClickRow

`(selectNode: iTableNode) => void`

异步钩子函数，行单击动作；

```ts
interface iTableNode<D extends iData = iData> {
  data: D;
  editRow: D;
  key: string;
  index: number;
  checkable: boolean; // 表示该行是否可以勾选
  status: {
    edit: boolean;
    removed: boolean; // 表示该行数据是否被临时移除了
    errors: ValidateError[] | null;
  };
}
```

## onDblClickRow

`(selectNode: iTableNode) => void`

异步钩子函数，行双击动作；

## onSelectChange

`(selectNode: iTableNode|null) => void`

异步钩子函数，单行选中动作（高亮行）；默认情况下数据加载完毕之后，会选中第一条数据；

## onCheckChange

`(data: { checked: any[], status: 'checked' | 'uncheck' | 'minus' }) => void`

异步钩子函数，多选行时，行选中状态变化动作；

## onBeginLoad

`() => void`

异步钩子函数，加载数据开始之前，此时并没有开始计算筛选参数，也没有得到requestConfig；这个钩子函数的使用场景，比如缓存了该页面的筛选参数， 在开始计算筛选参数之前需要获取缓存的筛选参数并且应用到表单查询的数据中。

## onBeforeLoad

`(requestConfig: any) => void`

异步钩子函数，加载数据之前，此时已经计算完毕requestConfig，requestConfig是含有完整查询参数的请求配置对象；

## onAfterLoad

`(queryResponse: iQueryResponse) => void`

异步钩子函数，数据加载之后；

```ts
export interface iQueryResponse {
  // 标准分页接口的返回
  content: any[],                         // 列表数据
  empty: boolean,                         // 为true好像表示没有数据
  number: number,                         // 当前页（从0开始计算）
  numberOfElements: number,               // 当前页数据个数
  size: number,                           // 页大小
  totalElements: number,                  // 总元素个数
  totalPages: number,                     // 总页数
  // 以下是查询失败可能的返回
  failed?: boolean,                       // 请求失败标识
  message?: string,                       // 请求失败提示信息
}
```

## onLoaded

`(queryResponse: iQueryResponse) => void`

onLoaded的时机在onAfterLoad之后，因为可能存在需要在onAfterLoad中对数据进行格式化，所以onLoaded中可以得到格式化完毕之后的数据；

## onBeforeLoadDetail

`(requestConfigObject: tRequestConfigObject) => void`

异步钩子函数，加载详情数据之前

## onAfterLoadDetail

`(resp: any) => void`

异步钩子函数，加载详情数据之后

## onBeforeDelete

`(requestConfigObject: tRequestConfigObject) => void`

异步钩子函数，删除一条记录之前

## onAfterDelete

`(resp: any) => void`

异步钩子函数，删除一条记录之后

## onBeforeEnableInsert

`() => void`

异步钩子函数，可以用来判断是否可以新建，不可以新建则返回Promise.reject()终止新建行为；

## onBeforeInsert

`(requestConfigObject: tRequestConfigObject) => void`

异步钩子函数，保存新建之前。

## onAfterInsert

`(resp: any) => void`

异步钩子函数，保存新建之后。

## onBeforeEnableCopy

`(row: any) => void`

异步钩子函数，复制一行数据之前，如果该行数据不可以复制，可以返回Promise.reject()阻止行为；

## onBeforeCopy

`(row: any) => void`

异步钩子函数，复制一行数据之前；

## onBeforeEnableUpdate

`(row: any) => void`

异步钩子函数，准备编辑一行数据之前，此时行数据并没有开启编辑；

## onBeforeUpdate

`(requestConfigObject: tRequestConfigObject) => void`

异步钩子函数，准备保存编辑之前；

## onAfterUpdate

`(resp: any) => void`

异步钩子函数，保存编辑之后；

## onC7NTableRef

`(table: Table<any>) => void`

异步钩子函数，获取c7n的基础表格组件实例对象；

## onO2TableSetup

`() => void`

同步钩子函数，当O2Table组件setup执行的时候执行；

## onTableMounted

`(el: HTMLDivElement) => void`

异步钩子函数，当O2Table组件挂载的时候执行，可以拿到O2Table根节点div的dom对象

## onButtons

`(buttons: iTableOptionButton[]) => void`

同步钩子，用来处理config中的buttons信息, 关于按钮的说明请见 `./o2-table-button.md`

示例: 根据列状态判断行内按钮是否可点击

```jsx
import {designPage, useTableOption, O2Table, O2Column} from 'o2-design'

export default designPage(() => {
  const option = useTableOption({
    loadOnStart: false,
    keyField: 'name',
    data: [
      {name: '张三', status: "edit"},
      {name: '李四', status: "edit"},
      {name: '王五', status: "disabled"},
    ],
    hooks: {
      onButtons: (buttons) => {
        buttons.filter((item) => item.position === "in").forEach((btn)=>{
          btn.disabled =({ data }) => {
            return data.status !== "edit";
          };
        });
      }
    },
  })
  return () => (
    <O2Table option={option}>
      <O2Column title="名称" field="name"/>
      <O2Column title="状态" field="status"/>
    </O2Table>
  )
})
```
