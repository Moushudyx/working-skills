# CommonImport 组件使用规范

## 目标

统一导入按钮与导入弹窗接入方式，确保权限、模板编码、回调行为一致。

## 简短示例

```tsx
<CommonImport
  refreshButton
  templateCode="DPPCM_PO_DETAIL_IMPORT"
  modalProps={{ style: { width: 500 }, drawer: false }}
  args={{ tenantId: currentTenantID }}
  buttonText={intl.get('adidas.poDetails.button.import').d('Import')}
  buttonProps={{
    icon: 'get_app',
    color: ButtonColor.default,
    permissionList: [
      { code: `${permissionKey}.button.PODetails.import`, type: 'button', meaning: 'PODetails-import' },
    ],
  }}
  successCallBack={() => {
    refresh();
  }}
/>
```

## 参数

- templateCode: 必填，导入模板编码
- args: 透传参数，常见为 tenantId
- buttonText: 按钮文案
- buttonProps.permissionList: 必填，绑定权限码
- successCallBack: 推荐填写，导入后刷新列表
- modalProps: 视业务设置弹窗宽度与 drawer 模式

## 常用场景

- Header 中与导出按钮并排
- 导入成功后刷新当前页
- 按业务模板拆分多个导入入口

## 坑点

- templateCode 填错会导致模板下载/导入失败
- 未配置 successCallBack，导入后页面数据未刷新
