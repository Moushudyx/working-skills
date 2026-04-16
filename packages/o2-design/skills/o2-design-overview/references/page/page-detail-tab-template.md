```jsx
// 示例: 课程管理 - 学员信息
import React from 'react';
import {
  O2Table,
  O2ColumnInput,
  O2ColumnLovView,
  O2ColumnInputNumber,
  O2ColumnDatePicker,
  O2ColumnLov,
  useTableOption,
} from 'o2-design';
import intl from 'utils/intl';
import { O2MD_M } from 'o2Utils/config';
import { getCurrentOrganizationId } from 'utils/utils';

const prefix = `${O2MD_M}`;
const organizationId = getCurrentOrganizationId();

/** 课程管理 - 学员信息 */
export function useStudentInfo({ useTabPane, formOption /* , methods, state */ }) {
  const innerMethods = {
    // 内部方法，如按钮的 handler
  };
  const studentOption = useTableOption({
    permission: '完整菜单编码.ps.student.button',
    url: { base: () => `${prefix}/v1/${organizationId}/course-student` },
    queryParams: () => ({ courseId: formOption.courseId }),
    // keyField: 'courseStudentId',
    // hideButton: {
    //   insert: true, // 默认新建按钮
    //   update: true, // 默认编辑按钮
    //   delete: true, // 默认删除按钮
    // },
    loadOnStart: false, // 详情页的表格通常需要等到头数据加载完毕后才能查询，所以 loadOnStart 配置为 false，等头数据加载完毕后手动调用 studentOption.methods.load() 来查询
    buttons: [
      // 相关说明见 `../table/table-button.md` 这里不赘述
    ],
    notPlaceButtonInPageOperator: true, // 不将按钮放入页面操作栏，保持在表格顶部
  });
  // 头数据查询完毕后触发行查询
  formOption.hooks.onAfterLoad.use(() => {
    studentOption.methods.reload();
  });

  const key = 'studentInfo';
  const tab = intl.get('o2.md.course.tabTitle.studentInfo').d('学员信息');
  useTabPane({
    key,
    tab,
    render: () => (
      <O2Table option={studentOption} commonColumnProps={{ tooltip: 'overflow', fit: true }}>
        <O2ColumnInput
          title={intl.get('o2.md.course.model.studentCode').d('学员编号')}
          field="studentCode"
          formFilter
          editable={false}
        />
        <O2ColumnLovView
          title={intl.get('o2.md.course.model.studentName').d('学员姓名')}
          field="studentName"
          lovCode="学员姓名值集视图编码"
          showKey="studentName"
          map={{/* 填写值集视图的字段Map */}}
          required
        />
        <O2ColumnInputNumber
          title={intl.get('o2.md.course.model.phoneNumber').d('联系电话')}
          field="phoneNumber"
          editable={false}
        />
        <O2ColumnInput
          title={intl.get('o2.md.course.model.merchantShortName').d('商家简称')}
          field="merchantShortName"
          editable={false}
        />
        <O2ColumnDatePicker
          title={intl.get('o2.md.course.model.registrationTime').d('报名时间')}
          field="registrationTime"
          datetime // 展示日期+时间
          // filterConfig={{
          //   start: 'registrationTimeFrom',
          //   end: 'registrationTimeTo',
          //   nativeAttrs: {
          //     defaultTime: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          //   },
          // }}
          // formFilter
          editable={false}
        />
        <O2ColumnLov
          title={intl.get('o2.md.course.model.registrationMethod').d('报名方式')}
          field="registrationMethod"
          lovCode="报名方式值集编码"
          required
        />
      </O2Table>
    ),
    isShow: () => formOption.status !== 'insert', // 这里可以配置展示逻辑, 目前是新建时不展示
  });
  return { studentOption };
}
```