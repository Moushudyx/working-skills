# LOV 使用规范

## 目标

统一 LOV 选型与字段绑定，避免查询值与展示值不一致。

## 两种主流写法

### 1) `lookupCode`（简单场景）

适用于固定值集(独立值集)、无需额外查询参数的场景。

- 警告: 此方法仅能用于独立值集，如果是 SQL 值集严禁使用此方法

```ts
{
  name: 'status',
  type: 'string',
  lookupCode: 'DPPCM_PO_UPLOAD_STATUS',
}
```

### 2) `options: getLovDs()`（复杂场景）

适用于需要定制 transport、复用 lov 数据源(SQL 值集)、联动字段的场景。

- 警告: 此方法仅能用于 SQL 值集，如果是独立值集严禁使用此方法

```ts
{
  name: 'categoryLov',
  type: 'object',
  lovCode: 'DPPCM_PMS_CATEGORY',
  options: getLovDs('DPPCM_PMS_CATEGORY'),
  ignore: 'always',
},
{
  name: 'category',
  type: 'string',
  bind: 'categoryLov.category',
}
```

- `categoryLov` 为 object 字段, 筛选框、列表中的字段 name 也应该使用此字段
- `category` 为提交字段

坑点:

- `lovCode` 存在但缺 `bind` 绑定字段，导致提交字段为空。
- object 字段未 `ignore: 'always'`，提交 payload 冗余。
- 列表/筛选框中使用了提交字段（例子中的 `category`）而不是值集字段（例子中的 `categoryLov`），导致操作时没有下拉框内容

#### getLovDs 示例代码

```js
const getLovDs = (lovCode, lovPara = {}) => {
  return new DataSet({
    paging: true,
    pageSize: 20,
    autoQuery: true,
    transport: {
      read({ data, params }) {
        return {
          url: `${HZERO_O2PCM}/v1/lovs/sql/data?lovCode=${lovCode}`,
          method: 'GET',
          params: { ...params, ...data, ...lovPara },
        };
      },
    },
  });
};
```

## 选型规则

1. 仅字典映射：优先 `lookupCode`。
2. 需要对象返回或复用查询逻辑：使用 `options` DataSet。
3. 需要从对象映射子字段时，使用 `bind`。
