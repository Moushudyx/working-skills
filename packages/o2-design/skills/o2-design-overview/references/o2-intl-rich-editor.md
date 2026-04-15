# O2IntlRichEditor 多语言富文本

O2IntlRichEditor 是 O2RichEditor 的多语言衍生组件，通过 Tabs 维护各语言内容。

## 示例代码

```tsx
import { O2IntlRichEditor, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ row: { _token: 'abc', desc: '', _tls: {} } });

  return (
    <O2IntlRichEditor
      row={state.row}
      fieldName="desc"
      token={state.row._token}
      modelValue={state.row.desc}
      onUpdateModelValue={(v) => (state.row.desc = v || '')}
      urlPrefix="/o2md-m"
      directory="o2-richtext"
      modelValueAsDefault
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fieldName | string | - | 多语言字段名（必填） |
| row | object | - | 行对象（用于 _tls） |
| token | string | row._token | 多语言查询 token |
| modelValue | string | - | 当前语言默认值 |
| modelValueAsDefault | boolean | true | 新建时用默认语言内容填充空语言 |
| handleIntlQueryResult | function | - | 处理多语言查询结果 |
| defaultUseTls | boolean | false | 优先使用 row._tls |

说明:

- 其余富文本相关参数与 O2RichEditor 一致。
- 内部每个语言 Tab 都是一个 O2RichEditor 实例。

## 常见问题

### 这个 token 是什么？

- token 用于多语言内容的查询和更新，通常是一串字符串，一般与多语言信息所在的记录上的 _token 字段保持一致。
- HZero 系统有一个接口可以通过 `token + fieldName` 来获取多语言内容，组件会监听 token 变化自动重新加载多语言内容。

### 切换 token 后语言内容没刷新？

- 组件会监听 `token + fieldName` 变化重新加载。
- 确认 token 真实变化且接口可用。

### 为什么某些语言默认带了主语言内容？

- `modelValueAsDefault=true` 时，新建场景空语言会回填默认内容。

### defaultUseTls 什么时候用？

- 已有 `_tls` 且不想立即走远程查询时使用。

## 特殊使用场景

- 多语言富文本编辑。
