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
| enable | boolean/{insert: boolean, update: boolean, delete: boolean} | 是否启用默认的增删改功能 |
| hideButton | {[buttonCode]: boolean} | 隐藏按钮, 如 { insert: true } 隐藏默认的新增按钮 |
| buttons | array | 额外按钮配置 |
| multipleCheck/singleCheck | boolean | 勾选模式 |
| deepField | boolean | 链式字段模式 |
| hooks | object | option 钩子 |
| pagination | boolean/object | 分页配置，传 false 可关闭分页 |
| commonColumnProps | object/function | 全列通用 props |
| rules | object | 列编辑校验规则 |

关于 `enable` `hideButton` `buttons` 的说明请见 `./table/o2-table-button.md`

关于 hooks 的说明请见 `./table/table-hooks.md`

## 常用方法

- option.methods.load(): 查询列表
- option.methods.insert(): 新增行
- option.methods.update(node): 编辑行
- option.methods.remove(node): 删除行
- option.methods.save(node): 保存行

## 常见问题

### deepField 开启后编辑值写不回

- 深层字段场景不能只用 row[field] 直接读写
- 自定义 edit 插槽时应配合 deepField 处理函数

### hooks 改了但没有生效

- hooks 只在初始化 option 时生效
- 创建后再替换 hooks 对象通常不会更新内部绑定
