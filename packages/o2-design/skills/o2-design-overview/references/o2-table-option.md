# useTableOption

useTableOption 用于创建 O2Table 的行为对象, 包含配置、状态、方法、钩子

## 最小可用示例

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

## 常用配置

| 配置 | 类型 | 说明 |
| --- | --- | --- |
| keyField | string | 行唯一键 |
| url | string/object | 查询与增删改地址 |
| editType | inline/form | 行内编辑或表单编辑 |
| defaultNewRow | object/function | 新增默认值 |
| rules | object | 列编辑校验规则 |
| buttons | array | 额外按钮配置 |
| queryParams | object/function | 查询附加参数 |
| multipleCheck/singleCheck | boolean | 勾选模式 |
| deepField | boolean | 链式字段模式 |
| commonColumnProps | object/function | 全列通用 props |
| hooks | object | option 生命周期钩子 |

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
