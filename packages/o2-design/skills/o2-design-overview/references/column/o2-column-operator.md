# O2ColumnOperator

O2ColumnOperator 是操作列，默认用于渲染行内按钮组。

类型：内部/框架列（用于操作位布局，不用于业务字段展示）。

关联基础组件：`../o2-button.md`

## 示例代码

```tsx
import { O2Button, O2ColumnOperator, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return (
    <O2Table option={option}>
      <O2ColumnOperator>
        {{
          default: ({ row }) => (
            <>
              <O2Button funcType="flat">编辑</O2Button>
              <O2Button funcType="flat" color="red">删除</O2Button>
            </>
          ),
        }}
      </O2ColumnOperator>
    </O2Table>
  );
});
```

## 默认配置

- `title='操作'`
- `width=160`
- `fixed='right'`
- `disappearInFormEditor=true`
- `stopPropagationClick=true`

## 行为说明

- normal 态默认用 O2ButtonGroup 包裹 default 插槽内容。
- 通常与表格 hooks/按钮权限逻辑组合使用。
- 该列主要承载“操作行为按钮”，不建议用于绑定业务数据字段。
