# O2Column 作用域插槽详解

O2Column 及其大部分变体都声明了 `scopeSlots`，并在 `setup` 中透传给 `useO2Column`。

## 源码入口

```tsx
export const O2Column = designComponent({
  props: O2ColumnPropOption,
  scopeSlots: O2ColumnScopeSlotOption,
  emits: O2ColumnEmitOption,
  setup({ props, scopeSlots, event }) {
    const { render, ...refer } = useO2Column({ props, scopeSlots, event });
    return { refer, render };
  },
});
```

## 插槽清单

| 插槽名 | 作用 |
| --- | --- |
| head | 自定义列标题 |
| normal | 自定义普通单元格渲染 |
| edit | 自定义行内编辑渲染 |
| form | 自定义表单编辑渲染 |
| filter | 自定义查询表单项渲染 |

回退顺序：

- `form` 未提供时，自动回退到 `edit`
- `edit` 未提供时，自动回退到 `normal`
- `normal` 未提供时，自动读取 `row[field]`

## 示例 1：同一列区分 normal/edit/form

```tsx
import { O2Checkbox, O2Column, O2Switch, O2Table, designPage, useTableOption } from 'o2-design';
import { Badge } from 'choerodon-ui';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id', editType: 'form' });

  return () => (
    <O2Table option={option}>
      <O2Column title="启用" field="enabled" paddingWhenEditing>
        {{
          normal: ({ row }) => (row.enabled ? <Badge status="success" text="启用" /> : <Badge status="error" text="停用" />),
          edit: ({ row }) => <O2Checkbox v-model={row.enabled} trueValue={1} falseValue={0} />,
          form: ({ row }) => <O2Switch v-model={row.enabled} trueValue={1} falseValue={0} />,
        }}
      </O2Column>
    </O2Table>
  );
});
```

## 示例 2：filter 插槽联动查询

```tsx
import { O2ColumnInput, O2ColumnLov, O2Input, O2Lov, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnLov title="参数类型" field="paramType" lovCode="O2MD.PARAM_TYPE" formFilter cascadeFields="paramValue" />
      <O2ColumnInput
        title="参数值"
        field="paramValue"
        filter={({ formData, search }) => {
          const Comp = formData.paramType === 'KV' ? O2Input : O2Lov;
          return (
            <Comp
              v-model={formData.paramValue}
              lovCode="O2MD.PARAM_TYPE"
              onEnterDown={() => {
                search(true);
              }}
            />
          );
        }}
      />
    </O2Table>
  );
});
```

## 示例 3：head 插槽扩展标题

```tsx
import { O2Column, O2Table, designPage, useTableOption } from 'o2-design';
import { Icon, Tooltip } from 'choerodon-ui';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id', enable: false });

  return () => (
    <O2Table option={option}>
      <O2Column field="score">
        {{
          head: () => (
            <>
              <span>评分</span>
              <Tooltip title="评分越高优先级越高">
                <Icon type="contact_support-o" />
              </Tooltip>
            </>
          ),
        }}
      </O2Column>
    </O2Table>
  );
});
```

## 常见问题

### filter 写了但查询参数没带上

- 自定义组件必须绑定到 `formData` 对应字段。
- 输入类组件建议在 Enter 时主动调用 `search(true)`。

### edit 写了但值没回写

- 使用 `v-model` 绑定 `scope.row[field]`。
- `deepField` 场景配合 `processDeepFieldVModel(scope)`。
