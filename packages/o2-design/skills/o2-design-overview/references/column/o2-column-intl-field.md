# O2ColumnIntlField

O2ColumnIntlField 是多语言列，基于 O2IntlField，适用于多语言字段的行内编辑。

关联基础组件：`../o2-intl-field.md`

## 示例代码

```tsx
import { O2ColumnIntlField, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnIntlField title="名称" field="itemName" />
    </O2Table>
  );
});
```

## 行为说明

- edit 态使用 O2IntlField，自动传入：
  - `fieldName=field`
  - `row=scope.row`
  - `token=row._token`
- 必填状态会继承列级 `required` 规则。
- normal 态未自定义时回退为字段原值展示。

## 注意事项

- 表格数据建议包含 `_token`，便于多语言查询与回写保持一致。
- 若需自定义 O2IntlField 细节，可通过 `editProps` 透传。

## 版本支持

- `1.6.50` 起：O2IntlField 支持 `component`，可切换到文本域输入。
- `1.6.52` 起：支持 `defaultProcessTls`，可自动写入 `_tls`。
- `1.6.31` 起：支持 `maxLength/maxLengthMap`。
- `1.6.51`、`1.6.53`、`1.6.59`、`1.6.67`：多语言弹窗报错、样式、兼容性与缓存行为有修复，建议使用较新版本。
