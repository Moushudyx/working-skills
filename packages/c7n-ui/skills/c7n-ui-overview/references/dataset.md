# DataSet 规范与模板

DataSet 可以用于列表和表单，也可以自行实现兼容其行为的组件

## 目标

统一页面数据层写法，确保查询、提交、导出、联动行为可预测。

## 适用范围

- 页面中可以使用 `useMemo` 初始化 DataSet
- 也可以使用高阶组件 `withProps` 初始化 DataSet

## 规范写法

1. DataSet 定义文件不要放在页面主体文件中，建议放在 `store` 目录下，保持页面主体文件的简洁
2. DataSet 工厂函数返回 `DataSetProps`，命名建议 `xxxDs()`。
3. 按顺序组织属性：`autoCreate` -> `autoQuery` -> `selection` -> `paging` -> `queryFields` -> `fields` -> `transport` -> `events`。
4. 查询使用 `ds.query()`；新增/更新使用 `ds.submit()`；提交前先 `validate()`。
5. 获取复杂查询参数统一由 `queryDataSet.current?.toJSONData()` 抽取并组装。

## 推荐模板

```ts
import intl from 'utils/intl';
import { getCurrentOrganizationId } from 'utils/utils';
import { DataSetProps } from 'choerodon-ui/pro/lib/data-set/DataSet';

const organizationId = getCurrentOrganizationId();

export function exampleListDs(): DataSetProps {
  return {
    autoQuery: false, // 使用此 DataSet 的列表/表单是否挂载到页面上时自动查询
    paging: true,
    pageSize: 10,
    // 配置 record 的地方很少见
    record: {
      // disabled 禁用 selectable 是否可以选中 defaultSelected 默认选中 defaultExpanded 默认展开
      // 这几个参数可以写在外面也可以放进 dynamicProps 动态控制某一条数据的行为
      defaultExpanded: true, // 所有行默认展开
      dynamicProps: {
        selectable: (record) => record.get('selectableFlag'), // 判断是否可以选中
        defaultSelected: (record) => record.get('defaultSelectFlag'), // 判断是否默认选中
      },
    },
    queryFields: [ // 这个字段会自动变为 exampleListDs 上的 queryDataSet 中的字段
      {
        name: 'requestWeek',
        type: 'string',
        label: intl.get('adidas.examplePage.object.requestWeek').d('Request Week'),
      },
    ],
    fields: [
      {
        name: 'statusMeaning', // 字段名 也叫字段编码
        type: 'string', // 字段类型，可选：boolean | number | string | date | dateTime | time | week | month | quarter | year | email | url | intl | object | attachment | json | bigNumber
        label: intl.get('adidas.examplePage.object.status').d('Status'),
        // maxLength 数字 最大长度
        // minLength 数字 最小长度
        // pattern 正则校验
        // transformRequest(value, record) 在发送请求之前对数据进行处理
        // defaultValue 默认值, 如果是 query 字段则会变成默认查询值
      },
      {
        name: 'channelChaseRecordMap',
        type: 'object',
        ignore: 'always', // 忽略提交
        // 如果想要提交时不忽略此字段或其下的内容，比如想要提交 channelChaseRecordMap['FRS-Non MW'].adjustChaseQty，应该去掉 ignore
      },
      {
        name: 'adjustFrsChaseQtyNonMw',
        label: intl.get('adidas.channelPlannedChase.object.adjustFrsChaseQtyNonMw').d('Adjust FRS Chase Qty -NON MW-'),
        type: 'number',
        // min 数字/字段名 最小值
        // max 数字/字段名 最大值
        // precision 小数点精度, 提交时会截断
        // numberGrouping true/false 千分位分组显示
        // bind 可以控制取值, 这个字符串只按点号分割因此 channelChaseRecordMap['FRS-Non MW'].adjustChaseQty 需要改写成如下的形式
        // 如果键名中带有点号, 建议使用下面 transport 中的 transformResponse 处理返回值, 将对应的键中的点号改成其他符号比如下划线等
        bind: 'channelChaseRecordMap.FRS-Non MW.adjustChaseQty',
        // dynamicProps 动态控制一些参数
        dynamicProps: {
          required: ({ record }: any) => record.get('statusMeaning') === '',
        },
        validator(value, name, record) {
          // 校验，当返回值为 false 或 字符串，则为校验失败
          // 返回为字符串时，字符串会视为报错的具体信息
        }
      },
    ],
    transport: {
      read: ({ params, data }) => ({
        // 这里的 dppcm 是接口前缀，也是后端服务名称，由后端提供
        url: `/dppcm/v1/${organizationId}/example/list`,
        method: 'GET',
        params: {
          ...params,
          ...data,
        },
      }),
      submit: ({ data }) => ({
        url: `/dppcm/v1/${organizationId}/example/submit`,
        method: 'POST',
        data,
      }),
    },
  };
}
```

## 常见场景

- 表格查询页：一个主 DataSet + 一个 queryDataSet(由主 DataSet 自动生成)
- 主从页面：主表 DataSet + 明细 DataSet，明细随主记录变化
- 导出：基于 queryDataSet 当前值构造导出参数

## 坑点

- 查询参数丢失：只传 `params` 未合并 `data`。
- 未校验即提交：`submit` 前缺 `validate`，导致后端报错。
- 绑定路径错误：`bind: 'xxx.yyy'` 与实际字段结构不一致。
- DataSet 在 render 中重复创建，导致状态重置。
