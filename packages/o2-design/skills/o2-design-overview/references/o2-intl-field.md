# O2IntlField 多语言输入

O2IntlField 用于多语言文本字段维护，支持 input/textarea 两种形态，并可回写 `_tls`。

## 示例代码

```tsx
import { O2IntlField, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    row: { _token: 'abc', name: '', _tls: {} },
  });

  return (
    <O2IntlField
      row={state.row}
      fieldName="name"
      token={state.row._token}
      modelValue={state.row.name}
      onUpdateModelValue={(v) => (state.row.name = v || '')}
      defaultProcessTls
      component="input"
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fieldName | string | - | 多语言字段名（必填） |
| row | object | - | 行对象（用于回写 _tls） |
| token | string | row._token | 查询多语言数据 token |
| modelValue | string | - | 当前语言文本 |
| component | input \| textarea | input | 输入组件类型 |
| maxLength | number | - | 统一最大长度 |
| maxLengthMap | Record<string, number> | - | 按语言最大长度 |
| defaultProcessTls | boolean | false | 自动把查询结果写入 row._tls |
| defaultUseTls | boolean | false | 优先使用 row._tls 数据 |
| showLengthInfo | boolean | - | 显示长度信息 |

## 常见问题

### 这个 token 是什么？

- token 用于多语言内容的查询和更新，通常是一串字符串，一般与多语言信息所在的记录上的 _token 字段保持一致。
- HZero 系统有一个接口可以通过 `token + fieldName` 来获取多语言内容，组件会监听 token 变化自动重新加载多语言内容。

### 为什么点小地球没数据？

- 检查 `token` 与 `fieldName`。
- 检查多语言接口权限和初始化配置。

### 为什么 modelValue 改了但 _tls 没同步？

- 开启 `defaultProcessTls` 后会自动同步。
- 否则需要在业务中手动写 `_tls`。

### 为什么不同语言长度限制没生效？

- 检查 `maxLengthMap` 是否按语言 code 配置。
- 还可能被全局配置 `adjustIntlFieldMaxLengthMap` 改写。

## 特殊使用场景

- 主数据多语言名称维护。
- 文本域多语言（`component='textarea'`）。
