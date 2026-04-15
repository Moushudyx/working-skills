# O2Lov 值集下拉

O2Lov 用于消费平台值集（lovCode），自动完成“值-含义”映射。

如果需要弹窗表格选择，使用 `o2-lov-view.md`；如果是纯前端配置弹窗，使用 `o2-object.md`。

## 示例代码

```tsx
import { O2Lov, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ enabledFlag: 'Y' });

  return () => (
    <O2Lov
      v-model={state.enabledFlag}
      lovCode="HPFM.YES_NO"
      adjustToString
      style={{ width: 240 }}
    />
  );
});
```

### processLovOptions 示例

```tsx
import { O2Lov, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ orderStatus: '' });

  return (
    <O2Lov
      v-model={state.orderStatus}
      lovCode="DEMO.ORDER_STATUS"
      processLovOptions={({ items }) =>
        items
          .filter((item) => item.value !== 'OBSOLETE')
          .map((item) => ({ ...item, meaning: `[订单] ${item.meaning}` }))
      }
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | any | - | 绑定值 |
| lovCode | string | - | 值集编码 |
| disabledOptions | any[] | [] | 禁用的选项值 |
| processLovOptions | function | - | 二次处理值集选项，签名示例：`({ items }) => items` |
| filterByTags | string \| string[] | - | 按值集 tag 过滤 |
| adjustToString | boolean | false | 回写时转字符串 |
| adjustNotNullToString | boolean | false | 非空值才转字符串 |

说明:

- 继承 O2Select 的能力。
- 可通过 `O2Lov.$$lov` 使用值集服务（见 `common-tools.md`）。

## 常见问题

### 下拉一直 loading 或无数据？

- 先检查 `lovCode` 是否正确。
- 再检查初始化和接口权限配置。

### 值类型不一致导致回显失败？

- 后端常返回数字而值集是字符串。
- 可开启 `adjustToString` 对齐类型。

### 选项太多需要按业务过滤？

- 可使用 `filterByTags` 或 `processLovOptions`。

### O2Lov 与 O2LovView、O2Object 怎么选？

- O2Lov: 下拉选择，适合中小规模选项。
- O2LovView: 弹窗表格选择，适合大数据量与复杂筛选，见 `o2-lov-view.md`。
- O2Object: 前端自定义弹窗表格，非平台值集配置场景，见 `o2-object.md`。

## 特殊使用场景

- 平台标准值集字段: 直接使用 `lovCode`。
- 局部禁选: `disabledOptions` 控制不可选项。

## 版本支持

- `adjustToString` 在 `1.6.63` 新增。
- `adjustNotNullToString` 在 `1.9.3` 新增。
