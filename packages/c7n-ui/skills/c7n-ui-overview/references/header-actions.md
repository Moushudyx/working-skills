# 页面顶部操作区（Header Actions）

## 目标

统一页面顶部按钮区写法，保证权限、导出、导入按钮可复用。

## 常见结构

顶部区域一般放在 Header 内，常见按钮：

- 导出（ExcelExport）, `import ExcelExport from 'components/ExcelExport';` 或者 `import ExcelExportPro from 'components/ExcelExportPro';`
- 导入（CommonImport）, 见 `common-import.md`
- 新建/删除等业务按钮（ButtonPermission）

## 简短示例

```tsx
<Header title={intl.get('adidas.poDetails.title.PODetails').d('PO Details')}>
  <ExcelExport
    requestUrl={`${HZERO_O2PCM}/v1/${currentTenantID}/dppcm-po-items/poDetails/export`}
    queryParams={() => ({
      ...omit(PODetailsTableDs.queryDataSet!.current!.toJSONData(), ['__dirty', '__id', '_status']),
      page: PODetailsTableDs.currentPage - 1,
      size: PODetailsTableDs.pageSize,
    })}
    otherButtonProps={{
      color: ButtonColor.primary,
      type: 'c7n-pro',
      permissionList: [{ code: `${permissionKey}.button.PODetails.export`, type: 'button', meaning: 'PODetails-export' }],
    }}
    buttonText={intl.get('adidas.poDetails.button.export').d('Export')}
  />
</Header>
```

## 参数与约束

- permissionList: 必填，必须绑定按钮权限码 (除非项目明确要求不需要按钮权限)
- queryParams: 导出/查询参数统一从 queryDataSet 读取并清理元字段
- buttonText: 使用 intl (视项目需求)

## 常见场景

- 顶部仅一个导出按钮
- 导出 + 导入并存
- 导出 + 业务动作（新增、批量操作）

## 坑点

- 顶部按钮没配 permissionList，导致权限不可控
- 直接读取 queryDataSet 原始对象未过滤元字段
