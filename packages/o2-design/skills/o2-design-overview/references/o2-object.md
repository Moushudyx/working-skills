# O2Object 对象选择

O2Object 用于“前端自定义表格弹窗选择”场景。

和 O2LovView 的核心区别是：O2Object 的列表列、查询与接口都由前端通过 option 配置，而不是通过 lovCode 从平台配置中心拉取。

## 示例代码

```tsx
import {
  O2Object,
  O2ColumnInput,
  O2ColumnLov,
  O2ColumnSwitch,
  O2ColumnTextarea,
  designPage,
  reactive,
  useObjectOption,
} from 'o2-design';

export default designPage(() => {
  const state = reactive({
    row: {
      userId: '',
      userName: '',
    },
    selectedUsers: [],
  });

  const option = useObjectOption({
    keyField: 'userId',
    url: '/api/demo/v1/users',
    enable: false,
    render: () => (
      <>
        <O2ColumnInput title="用户编码" field="userCode" formFilter />
        <O2ColumnInput title="用户名称" field="userName" formFilter />
        <O2ColumnLov title="状态" field="enabledFlag" lovCode="HPFM.YES_NO" formFilter />
        <O2ColumnSwitch title="启用" field="enabledFlag" trueValue="Y" falseValue="N" />
        <O2ColumnTextarea title="备注" field="remark" />
      </>
    ),
  });

  return () => (
    <>
      {/* 单选: 通过 row + map 回写字段 */}
      <O2Object
        row={state.row}
        option={option}
        showKey="userName"
        map={{ userId: 'userId', userName: 'userName' }}
        beforeSelect={() => {
          // 可做前置校验
        }}
        afterSelect={() => {
          // 可做联动处理
        }}
      />

      {/* 多选: 用 v-model-selected 维护选中数组 */}
      <O2Object
        multiple
        option={option}
        showKey="userName"
        v-model-selected={state.selectedUsers}
        onChange={(rows) => {
          // rows 为当前选中数组
        }}
      />
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| option | iTableOption | - | 弹窗表格配置（必填） |
| showKey | string | - | 选中后显示字段（必填） |
| row | object | - | 单选模式回写对象 |
| map | object | - | 单选模式字段映射 |
| multiple | boolean | false | 是否多选 |
| selected | any[] | - | 多选已选数据 |
| beforeSelect | function | - | 打开前回调 |
| afterSelect | function | - | 选择后回调 |
| modalProps | object | - | 弹窗属性 |

事件:

- `onSelect(row, selected)`
- `onUpdateSelected(rows)`
- `onChange(value)`

## 常见问题

### 单选模式为什么必须传 row？

- 单选会按 `map` 回写到 `row`。
- 不传 row 无法落地结果。

### 多选为什么不走 map？

- 多选直接通过 `selected/onUpdateSelected` 维护数组。
- `showKey` 仅用于展示标签文本。

### 为什么看起来像 O2LovView？

- 二者交互都像“输入框 + 弹窗表格选择”。
- O2LovView 用 `lovCode` 消费平台配置，O2Object 用 `option` 完全前端自定义。

### 什么时候用 O2Object 而不是 O2LovView？

- 后端已有值集视图配置时优先 O2LovView。
- 纯前端自定义列表时使用 O2Object。

### O2Object 与 O2Lov 的区别？

- O2Lov 是下拉选择，轻量场景优先。
- O2Object 是弹窗表格选择，适合字段多、需要看更多列再决策的场景。

## 特殊使用场景

- 自定义业务对象选择弹窗。
- 需要复用现有 `useTableOption` 配置的选择场景。

## 关联文档

- 平台值集下拉: `o2-lov.md`
- 平台值集弹窗: `o2-lov-view.md`

## 版本支持

- `onChange` 事件在 `1.6.62` 有增强记录（用于触发表单校验联动）。
