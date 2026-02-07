---
name: o2-column
description: O2Column 基础列组件
---

# 基本用法

```jsx
import { designPage, useTableOption, O2Table, O2Column } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={state.option}>
      {/* 文本字段是最基础的字段 */}
      <O2ColumnInput
        title={intl.get('多语言前缀.model.text').d('文本字段')}
        field="text" // 字段编码
        editable={false} // 是否可编辑，如果没有编辑需求则不用写这个
        formFilter // 是否展示在查询表单里
        fit // 字段过少时自动占满页面宽度
      />
      {/* 仅查询字段的写法 */}
      <O2ColumnInput
        title={intl.get('多语言前缀.model.text').d('文本字段-仅查询')}
        field="text2"
        formFilter // 展示在查询表单里
        hide // 隐藏字段，这样就只出现在查询表单里
      />
      {/* 数字字段 */}
      <O2ColumnInputNumber
        title={intl.get('多语言前缀.model.number').d('数字字段')}
        field="number"
        min={0} // 如果要控制必须比某个字段大，可以写为 min="某字段" 或者 min={[0, "某字段"]}
        max={100} // 同上
        // step={1} // 调整步长，如果只是控制精度可以用 precision
        // precision={0} // 控制为整数
        editable={false}
        formFilter
      />
      {/* 值集字段，值集类似 link 的值列表 */}
      <O2ColumnLov
        title={intl.get('多语言前缀.model.lov').d('值集字段')}
        field="lov"
        lovCode="O2SRH.SYNC_STATUS" // 值集编码
        formFilter
      />
      {/* 值集视图字段，值集视图类似 link 的 pickList */}
      <O2ColumnLovView
        title={intl.get('多语言前缀.model.lovView').d('值集视图字段')}
        field="lovView" // 实际存的字段
        lovCode="值集视图编码"
        showKey="lovViewMeaning" // 展示的字段
        map={{ lovView: '实际存的字段', lovViewMeaning: '用于展示的字段' }}
        lovPara={{ a: 'awa' }} // 传给值集视图的自定义查询参数
        formFilter
      />
      {/* 日期时间字段，查询时最常见的用法是按时间区间查询 */}
      <O2ColumnDatePicker
        title={intl.get('多语言前缀.model.time').d('时间字段')}
        field="time"
        datetime // 展示日期+时间，不写这个的话会变成只精确到日期
        formFilter
        filterConfig={{ // 这个参数可以配置查询字段相关的功能
          start: 'timeFrom', // 时间区间，开始时间字段
          end: 'timeTo', // 结束时间字段
          nativeAttrs: { // 这一项会直接作为组件参数传给查询表单中的组件
            // 这一项会传给 O2DatePicker，用法与 C7N 的基本一致
            // 此配置的意思是，开始时间默认为一天的 00:00:00，结束时间默认为一天的 23:59:59
            defaultTime: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          },
        }}
        // filterHandler="精确查询" // 如果不是按时间区间查询的，则需要添加这一项，当然 filterConfig 写法也会变
      />
      {/* 开关型的字段，一般展示为“启用”“禁用” */}
      <O2ColumnSwitch
        title={intl.get('多语言前缀.model.switch').d('开关字段')}
        field="switch"
        // yesNoMode // 展示为“是”“否”
        editable={false}
        formFilter
      />
    </O2Table>
  );
});
```

# 常用属性

- `title`、`field`
- `required`、`rules`
- `editable`
- `formFilter` 与 `filterConfig`

# 字段联动示例

```jsx
import { designPage, useTableOption, O2Table, O2ColumnInput } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/v1/items', keyField: 'id' });
  return () => (
    <O2Table option={option}>
      <O2ColumnInput title="国家" field="country" />
      {/* 如果开启列表编辑，城市字段会在国家字段为空时置灰不可编辑 */}
      {/* 国家字段清空时，城市字段会连带着清空 */}
      {/* Address 组件自带级联关系不用这么写 */}
      <O2ColumnInput
        title="城市"
        field="city"
        cascadeFields={['country']}
        disableWhenParentClear
      />
    </O2Table>
  );
});
```
