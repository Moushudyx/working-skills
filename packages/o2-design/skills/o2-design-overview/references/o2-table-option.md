# useTableOption

useTableOption 用于创建 O2Table 的行为对象, 包含配置、状态、方法、钩子

关于 O2Table 的说明请见 `./o2-table.md`

关于列组件的说明请见 `./o2-column.md`

## 示例代码

```tsx
import { O2ColumnInput, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({
    url: '/api/demo/v1/items',
    keyField: 'id',
    editType: 'inline',
  });

  return () => (
    <O2Table option={option}>
      <O2ColumnInput title="编码" field="code" formFilter />
    </O2Table>
  );
});
```

## 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| keyField | string | 行唯一键 |
| url | string/object | 查询与增删改地址 |
| queryParams | object/function | 查询附加参数 |
| editType | inline/form | 行内编辑或表单编辑, 默认 5 列内使用行内编辑模式 |
| defaultNewRow | object/function | 新增默认值 |
| enable | boolean/{insert: boolean, update: boolean, delete: boolean} | 是否启用默认按钮 |
| hideButton | {[buttonCode]: boolean} | 隐藏按钮 |
| buttons | array | 额外按钮配置 |
| multipleCheck/singleCheck | boolean | 勾选模式 |
| deepField | boolean | 链式字段模式 |
| hooks | object | option 钩子 |
| pagination | boolean/object | 分页配置，传 false 可关闭分页 |
| commonColumnProps | object/function | 全列通用 props |
| rules | object | 列编辑校验规则 |

关于 `enable` `hideButton` `buttons` 的说明请见 `./table/table-button.md`

关于 hooks 的说明请见 `./table/table-hooks.md`

## 常用方法

- `option.methods.load(loadConfig?: { page: number; size: number })`: 查询列表(不传值则保持当前分页状态)
- `option.methods.reload()`: 查询列表(回到第一页)
- `option.methods.insert(newRow?: Record<string, unknown>, editType?: 'inline' | 'form')`: 新增行
- `option.methods.update(node?: iTableNode, editType?: 'inline' | 'form')`: 编辑行(不传 node 则默认编辑选中行)
- `option.methods.delete(delConfig: { selectNode?: iTableNode | null; position: 'in' })`: 删除传入行或选中行
- `option.methods.delete(delConfig: { position: 'out' })`: 批量删除多选行(没有开启多选则删除选中行)
- `option.methods.save()`: 保存
- `option.methods.cancel()`: 取消

这里的 iTableNode 参考 `./table/table-button.md` 中关于行内按钮的说明, 一些行操作相关的 hooks 也能获取到这个格式的数据

## 关于选中行与单选/多选行

这几个是不同的概念:

- 选中行 pickRow: 可以通过 option.state.pickRow 来获取(未查到数据时为 null, 查到数据时默认选中第一行), 代表当前被选中的行(通常是点击行时选中), 只能有一行被选中, 此功能是内置的无法关闭
- 单选: 需要通过配置 singleCheck 来开启, 与 pickRow 同步
- 多选: 需要通过配置 multipleCheck 来开启, 展示多选框列, 可以不选中任何行, 也可以选中多行

pickRow 默认选中第一行的行为有 BUG 可能选不中, 如果需求必须选中第一行, 需要手动处理

option.state 是响应式对象, 可以使用 watch/computed 来监听 option.state.pickRow 的变化, 但需要注意某些时候 pickRow 可能为 null

## 常见问题

### deepField 开启后编辑值写不回

- 深层字段场景不能只用 row[field] 直接读写
- 自定义 edit 插槽时应配合 deepField 处理函数

### hooks 改了但没有生效

- hooks 只在初始化 option 时生效
- 创建后再替换 hooks 对象通常不会更新内部绑定

## 版本支持

- `deepField` 深层字段模式在 `1.5.2` 新增
- `paging: false` 关闭分页功能在 `1.6.58` 新增（当时为 `paging` 配置）
- `commonColumnProps` 在 `1.6.45` 新增
- `buttons` 支持 `confirmType` 和 `confirmTitle` 在 `1.5.9` 起支持
- `inlineMaxButtons` 行内按钮折叠在 `1.6.37` 新增
- `operatorColumnProps` 在 `1.8.4` 新增
- `onBeforeSubmit` / `onAfterSubmit` hooks 在 `1.6.59` 新增
- `showAllPageCheck` 跨页全选在 `1.6.10` 新增
- `rowDraggable` 行拖拽在 `1.6.50` 新增
- `enableEditBoth` 同时新建和编辑在 `1.6.71` 新增
