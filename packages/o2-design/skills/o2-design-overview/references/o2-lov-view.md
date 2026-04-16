# O2LovView 值集视图

O2LovView 用于“弹窗表格选值”场景，可单选或多选，并支持输入框/按钮两种触发模式。

## 示例代码

### 单选

```tsx
import { O2LovView, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ row: { supplierId: '', supplierName: '' } });

  return () => (
    <O2LovView
      row={state.row}
      lovCode="MDM.SUPPLIER"
      showKey="supplierName"
      map={{ supplierId: 'supplierId', supplierName: 'supplierName' }}
    />
  );
});
```

### 多选用法 A（字符串字段回写）

```tsx
import { O2LovView, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    row: {
      itemIds: '',
      itemNames: '',
    },
  });

  return (
    <O2LovView
      row={state.row}
      lovCode="MDM.ITEM"
      multipleConfig={{
        rowDisplayField: 'itemNames',
        rowValueField: 'itemIds',
        valueField: 'itemId',
        displayField: 'itemName',
      }}
    />
  );
});
```

### 多选用法 B（整行数组回写）

```tsx
import { O2LovView, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    row: {
      itemRows: [],
      allPageChecked: false,
    },
  });

  return (
    <O2LovView
      row={state.row}
      lovCode="MDM.ITEM"
      mode="button"
      enableAllPageCheck
      multipleConfig={{
        rowsField: 'itemRows',
        valueField: 'itemId',
        displayField: 'itemName',
        extraValueField: ['uomCode'],
        allPageCheckField: 'allPageChecked',
        maxTagCount: 3,
        maxTagTextLength: 12,
        maxTagPlaceholder: (restValues) => `+${restValues.length}...`,
      }}
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| lovCode | string | - | 值集视图编码（必填） |
| row | object | - | 绑定行对象 |
| map | object \| function | - | 回写字段映射 |
| showKey | string | - | 输入框显示字段 |
| lovPara | object \| function | - | 查询附加参数 |
| multipleConfig | object | - | 多选配置对象 |
| mode | 'default' \| 'button' | default | 输入框模式或按钮模式 |
| buttonProps | object | - | 按钮模式下按钮属性 |
| enableAllPageCheck | boolean | false | 多选弹窗跨页全选 |
| resetFilterWhenOpen | boolean | false | 每次打开前重置查询 |

### multipleConfig 详细说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| displayField | string | 选中行显示字段，默认取值集视图配置 |
| valueField | string | 主值字段，默认取值集视图配置 |
| valueFiled | string | 旧拼写，已弃用，优先使用 valueField |
| rowDisplayField | string | 回写到 row 的显示字段（逗号拼接） |
| rowValueField | string | 回写到 row 的值字段（逗号拼接） |
| rowsField | string | 回写完整选中行数组到 row[rowsField] |
| extraValueField | string[] | 额外拼接到主键/回写的数据字段 |
| allPageCheckField | string | 将跨页全选状态回写到 row 的字段 |
| maxTagCount | number | 多选标签最多显示数量 |
| maxTagTextLength | number | 多选标签文案最大长度 |
| maxTagPlaceholder | function | 超出数量时自定义占位文案 |

## 常见问题

### 多选到底有哪两种模式？

- 用法 A: `rowDisplayField + rowValueField`，回写为逗号分隔字符串。
- 用法 B: `rowsField`，直接回写完整行数组，适合后续还需要更多字段。

### 开启跨页全选后输入框表现异常？

- 源码已提示：跨页全选更适合按钮模式。
- 建议 `mode='button'` 搭配 `enableAllPageCheck`。

### 清空逻辑和 map 冲突怎么办？

- 可使用 `handleClear` 自定义清空行为。

### O2LovView 与 O2Lov、O2Object 的区别是什么？

- 与 O2Lov: O2Lov 是下拉；O2LovView 是弹窗表格，适合大数据量和复杂筛选。见 `o2-lov.md`。
- 与 O2Object: O2LovView 依赖平台 lovCode 配置；O2Object 由前端自行配置弹窗表格。见 `o2-object.md`。

## 特殊使用场景

- 复杂主数据选择: 用 `rowsField` 保留完整数据。
- 需要先做前置校验: 用 `beforeSelect` / `beforeOk`。

## 版本支持

- `resetFilterWhenOpen` 在 `1.9.4` 新增。
- `multipleConfig` 的 `maxTagCount/maxTagTextLength/maxTagPlaceholder` 在 `1.8.6` 首次引入，后续在 `2.0.0-beta.3` 进一步增强。
- 多选 SQL 值集视图输入搜索参数修复在 `1.6.72`。
- `enableAllPageCheck` 跨页全选在 `1.6.10` 新增。
- `processTableOption` 在每次打开弹窗前修改 tableOption 在 `1.6.17` 新增。
- `valueFiled` 旧拼写弃用，在 `1.5.4` 建议使用 `valueField`。
