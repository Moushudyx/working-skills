```jsx
// 示例: 课程管理列表页
import React from 'react';
import moment from 'moment'; // O2DatePicker 可能需要用到
import {
  // designO2Page,
  designKeepAlivePage,
  O2Table,
  O2Column,
  O2ColumnInput,
  O2ColumnLov,
  O2ColumnLovView,
  O2ColumnSwitch,
  O2ColumnDatePicker,
  useHttp,
  // usePageOperator, // 渲染在页面顶部的按钮
  usePageTitle,
  // useReactHooks, // 用于将 React 的 Hooks 改造为 O2 的
  useTableOption,
  // watch,
} from 'o2-design';
// import { useLocation } from 'react-router';
// import O2ButtonCollapse from 'o2Components/O2ButtonCollapse';
import formatterCollections from 'utils/intl/formatterCollections';
import intl from 'utils/intl';
import { getCurrentOrganizationId, getResponse } from 'utils/utils';
import { O2MD_M } from 'o2Utils/config';
import ExcelExportPro from "components/ExcelExportPro"; // HZero 的导出组件

// 服务编码
const prefix = `${O2MD_M}`;
const organizationId = getCurrentOrganizationId();
// 部分页面上可能存在特殊写法 getPlatformUrl
// const getPlatformUrl = platformUrlFactory(O2MD_M); // platformUrlFactory 返回一个可以适配平台层的 url 生成器
// getPlatformUrl('course') // 正常情况下相当于 `${prefix}/v1/${organizationId}/course`, 但当页面渲染在 HZero 的平台层时, 没有 organizationId, 此时 getPlatformUrl('course') 返回值会变成 `${prefix}/v1/course`
// 可用 import { isTenantRoleLevel } from "utils/utils"; 配合判断当前页面渲染在 true=租户层 false=平台层
// 实际项目上, 除非有极其特殊的需求, 否则绝大部分页面都没有渲染在平台层的必要, 不过这里的 getPlatformUrl 还是可以作为一个工具函数来使用, 统一生成接口地址, 减少出错概率

// 这里使用的 designKeepAlivePage 是 o2-design 1.8.0 以后的才能使用的方法, 如果页面不需要缓存, 直接使用 designO2Page 即可
// 注意与 designPage 区分:
// designPage 是不带任何功能的最基础的定义组件的方法(只能使用 useTableOption 和生命周期函数)
// designO2Page 上可以使用 usePageTitle、usePageOperator 这些模板页面才有的功能
// designKeepAlivePage 则在 designO2Page 的基础上增加了页面缓存功能, 从别的路由跳回时会保留状态, 不会重新渲染
const Page = designKeepAlivePage(({ history }) => {
  usePageTitle(() => intl.get('o2.md.course.view.title.list').d('课程管理列表'));

  // 额外的页面操作按钮, 会被渲染在页面顶部
  // 多数情况下不需要, useTableOption 的 buttons 中, position 为 'out' 的按钮也会渲染在页面顶部, 可以满足绝大多数场景
  // usePageOperator((prev) => (
  //   <>
  //     {/* 这里的 prev 是其他地方渲染的按钮 */}
  //     {prev}
  //     {/* O2ButtonCollapse 用于实现超过 5 个按钮时折叠多于按钮的逻辑, 上面的 prev 也可以塞进这里 */}
  //     <O2ButtonCollapse reverse>{getButtonRender()}</O2ButtonCollapse>
  //   </>
  // ));

  const http = useHttp();
  // const state = reactive({});
  // useTableOption 详见 `../o2-table-option.md`。
  const option = useTableOption({
    permission: '完整菜单编码.ps.button',
    url: { base: () => `${prefix}/v1/${organizationId}/course` },
    // keyField: 'courseId',
    enable: false,
    // hideButton: {
    //   insert: true, // 默认新建按钮
    //   update: true, // 默认编辑按钮
    //   delete: true, // 默认删除按钮
    // },
    buttons: [
      // 页面顶部按钮
      {
        type: 'other',
        code: 'create', // code 除了作为按钮标识之外, 也作为按钮权限标识的一部分, 拼接到 permission 上, 具体权限字符串为 `${permission}.${code}`
        // permissionCode: 'insert', // 如果需要单独控制权限, 可以使用 permissionCode 覆盖掉默认的 `${permission}.${code}`
        position: 'out',
        icon: 'add',
        color: 'primary',
        label: '新建',
        handler: () => {
          methods.handleCreate();
        },
      },
      {
        position: 'out',
        type: 'other',
        code: 'publish',
        label: intl.get('o2.md.course.button.publish').d('发布'),
        handler: () => methods.handlePublish(),
        // disabled: () => boolean,
      },
      {
        position: 'out',
        type: 'other',
        code: 'export',
        label: intl.get('o2.md.course.button.export').d('导出'),
        // 使用 render 时，需要在 render 内自行处理点击与禁用。
        render: () => (
          <ExcelExportPro
            requestUrl={`${prefix}/v1/${organizationId}/course/export`}
            queryParams={() => option.methods.getParams()} // 导出接口的查询参数, 很多导出接口会直接复用列表页的查询参数, 这里直接从 option 里拿到当前的查询参数
            // method="POST" // 默认 GET 请求, 可以改为别的方法
            // allBody // 查询参数放在 body 上, 非 POST 请求无需此属性
            // otherButtonProps 可以自定义按钮属性
            otherButtonProps={{
              type: 'c7n-pro',
              color: 'default',
              icon: 'file_upload_black-o',
              permissionList: [
                {
                  code: `完整菜单编码.ps.button.export`,
                  type: 'button',
                  meaning: '课程管理列表-导出',
                },
              ],
            }}
            // modalProps 用于配置导出时的弹窗
            modalProps={{ drawer: false, closable: true }}
          />
        ),
      },
      // 行内按钮
      {
        type: 'other',
        code: 'detail',
        position: 'in',
        label: '详情',
        handler: ({ data }) => {
          methods.handleDetail(data);
        },
      },
    ],
  });

  const methods = {
    /** 跳转到新建页面 */
    handleCreate: () => {
      history.push(`/o2rm/course/detail/create`);
    },
    /** 跳转到详情页面 */
    handleDetail: (record) => {
      history.push(`/o2rm/course/detail/${record.courseId}`);
    },
    /** 发布 */
    async handlePublish() {
      const checked = option.check.getChecked(); // 获取已选行数据
      // 这里可以做校验之类的 具体逻辑略
      // 标准接口失败时会返回 {failed: true, message: '错误信息'} 的格式, 可以通过 getResponse 来统一处理接口响应, 直接拿到成功时的数据, 失败时会自动报错并返回 null
      const res = getResponse(await http.post(`${prefix}/v1/${organizationId}/course/publish`, {
        type: 'batch',
        data: checked.map((item) => item.courseId),
      }));
      if (res) {
        // 发布成功后的逻辑
        option.methods.load(); // 刷新当前页, 如果要跳转到第一页可以使用 option.methods.reload()
      } else {
        // 发布失败后的逻辑, 错误信息会在 getResponse 里自动弹出, 所以这里应该做后续处理, 没有后续处理的话这里也可以不写
      }
    },
  };

  // // 监听页面跳转, 刷新列表页
  // const loc = useReactHooks(() => useLocation());
  // watch(
  //   () => loc.current,
  //   (newLoc) => {
  //     if (newLoc?.pathname === '/o2rm/course/list') option.methods.load();
  //   }
  // );

  return () => (
    <>
      {/* commonColumnProps={{ tooltip: 'overflow', fit: true }} 是推荐写法, 意思是所有列都在内容溢出时显示 tooltip, 并且列宽自适应 */}
      <O2Table option={option} commonColumnProps={{ tooltip: 'overflow', fit: true }}>
        {/* 列组件说明见 `../o2-column.md` */}
        {/* O2Column 非编辑态下展示与 O2ColumnInput 一致 */}
        <O2Column
          title={intl.get('o2.md.course.model.courseCode').d('课程编号')}
          field="courseCode"
        />
        <O2ColumnInput
          title={intl.get('o2.md.course.model.courseName').d('课程名称')}
          field="courseName"
          formFilter
        />
        <O2ColumnLov
          title={intl.get('o2.md.course.model.courseTypeCode').d('课程类型')}
          field="courseTypeCode"
          lovCode="COURSE_TYPE"
          formFilter
        />
        <O2ColumnLovView
          title={intl.get('o2.md.course.model.trainer').d('培训导师')}
          field="trainer"
          lovCode="培训导师值集视图编码"
          showKey="trainer"
          map={{/* 填写值集视图的字段Map */}}
        />
        <O2ColumnSwitch
          title={intl.get('o2.md.course.model.requiredFlag').d('是否必修')}
          field="requiredFlag"
          yesNoMode // 展示为“是”“否”
          formFilter
        />
        <O2ColumnLov
          title={intl.get('o2.md.course.model.status').d('课程状态')}
          field="status"
          lovCode="COURSE_STATUS"
          formFilter
        />
        <O2ColumnDatePicker
          title={intl.get('o2.md.course.model.startTime').d('课程开始时间')}
          field="startTime"
          // filterConfig={{
          //   start: 'startTime',
          //   end: 'endTime',
          //   nativeAttrs: {
          //     defaultTime: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          //   },
          // }}
          // formFilter
        />
        <O2ColumnDatePicker
          title={intl.get('o2.md.course.model.endTime').d('课程结束时间')}
          field="endTime"
        />
        <O2ColumnInput
          title={intl.get('o2.md.course.model.creator').d('创建人')}
          field="creator"
        />
        <O2ColumnDatePicker
          title={intl.get('o2.md.course.model.creationDate').d('创建时间')}
          field="creationDate"
          datetime // 展示日期+时间
          filterConfig={{
            start: 'creationDateFrom',
            end: 'creationDateTo',
            nativeAttrs: {
              defaultTime: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            },
          }}
          formFilter
        />
      </O2Table>
    </>
  );
});
// formatterCollections 自动加载对应前缀的多语言资源
export default formatterCollections({ code: ['o2.md.course'] })(Page);
```
