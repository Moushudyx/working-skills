# O2ColumnSelect

O2ColumnSelect 是下拉列，基于 O2Select，支持默认插槽、异步 options 与查询联动。

关联基础组件：`../o2-select.md`

## 示例代码

```tsx
import { O2ColumnSelect, O2SelectOption, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnSelect title="状态" field="status" formFilter>
        {{
          default: () => (
            <>
              <O2SelectOption value="NEW">新建</O2SelectOption>
              <O2SelectOption value="DONE">完成</O2SelectOption>
            </>
          ),
        }}
      </O2ColumnSelect>
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| searchable | boolean | true | 是否可搜索 |
| searchMatcher | string/function | - | 搜索匹配规则 |
| options | ReactNode/Function/Promise | - | 选项来源 |
| filterOptions 插槽 | slot | - | 查询区选项渲染 |

## 默认配置

- `filterName='select'`
- `filterHandler='精确查询'`
- `width=120`

## 注意事项

- normal 态会优先按 options/默认插槽反查显示文本。
- 异步 options 加载期间会展示 loading 占位。
