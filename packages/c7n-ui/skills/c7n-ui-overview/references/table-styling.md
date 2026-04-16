# 列表表头与单元格上色规范

## 目标

统一表格中表头分组上色、深浅层级区分、单元格状态上色的写法。

## 常见场景

- 按业务分组给表头设置不同背景色
- 同一组字段用深浅两种颜色区分汇总列/差异列
- 告警、状态、Tag、按钮等单元格按状态上色

## 简短示例

```tsx
import thStyle from './样式文件路径.module.less';

const columns = [
  { headerClassName: thStyle['last-week'], name: 'etaInitialQtySum' },
  { headerClassName: thStyle['last-week-dark'], name: 'initialVsDemandQty' },
  { headerClassName: thStyle['inbound'], name: 'etaInitialQtySum' },
  { headerClassName: thStyle['inbound-dark'], name: 'initialVsDemandQty' },
  { headerClassName: thStyle['alert'], name: 'alertList' },
];
```

## 表头上色规范

1. 优先使用 `headerClassName` 绑定样式类，不要在列定义里直接写内联样式
2. 表头颜色样式统一放在样式文件中
3. 同一业务分组的列使用同一套类名，例如：`last-week`、`inbound`、`alert`
4. 若同组内需要区分“普通列”和“汇总/差异列”，可使用深色变体，例如：`last-week-dark`、`inbound-dark`

## 单元格上色规范

### 单元格整体调整

1. 优先使用 `className` 绑定样式类
2. 单元格颜色样式统一放在样式文件中

### 单元格内容高亮展示

1. 状态类字段优先在 `renderer` 中返回 `Tag`、按钮或带 className 的组件。
2. 告警按钮、状态标签等样式建议复用公共 less 模块，例如 `alert.module.less`。
3. 上色应表达业务含义，同类状态颜色要保持一致。

## 常用场景

- Demand/ETA/Inbound/GR 分区表头
- 汇总列与差异列颜色区分
- Alert 列按钮颜色区分告警等级
- 状态 Tag 区分完成、取消、计划中等状态

## 坑点

- 直接在列配置里写大量 style，后续难维护
- 同一业务含义使用多套颜色，用户难以理解
- 表头上色和字段分组不一致，会让表格难读
- 表头颜色命名不统一，后续新增列时难以复用
