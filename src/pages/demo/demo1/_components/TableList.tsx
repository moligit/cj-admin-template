import React, { FC, useState } from 'react';
import moment from 'moment';
import { Button, Divider, Form, Modal, Table } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IReqRetpass } from '../_service/@types';
import styles from '../index.less';

interface IProps {
  list: any;
  resetPass: (record: IReqRetpass) => void;
  pageInfo: { pageNumber: number };
  pageChange: (pagination: any) => void;
  reUseAmount: (userId: string, status: number) => void;
}

interface obj {
  accountNo: string;
  name: string;
  fullName: string;
  createAt: string;
  email: string;
  phone: string;
  account: string;
  lastLoginTime: string;
}

const TableList: FC<IProps> = ({
  list,
  resetPass,
  pageInfo,
  pageChange,
  reUseAmount,
}) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<obj>(Object);
  const columns = [
    {
      title: '客户编号',
      dataIndex: 'accountNo',
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '客户名称',
      dataIndex: 'fullName',
    },
    {
      title: '注册日期',
      dataIndex: 'createAtTimestamp',
      render: (text: string) =>
        (text && moment(Number(text)).format('YYYY-MM-DD hh:mm')) || '--',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '操作',
      width: 320,
      render: (text: string, record: { status: number; id: string }) => (
        <div className={styles.btns}>
          <Button
            type="link"
            onClick={() => {
              showConfirm(record);
            }}
          >
            重置密码
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => {
              showUse(record);
            }}
          >
            {record.status === 1 ? '启用' : '禁用'}
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => {
              showMoadl(record);
            }}
          >
            详情
          </Button>
        </div>
      ),
    },
  ];
  const showMoadl = (record: any) => {
    setCurrentRecord(record);
    setModalStatus(true);
  };
  const showConfirm = (record: { id: string }) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定需要重置该账号密码',
      okText: '确认',
      cancelText: '取消',
      onOk: () => resetPass(record),
    });
  };
  const showUse = (record: { status: number; id: string }) => {
    console.log(record);
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `确定需要${record.status === 1 ? '启用' : '禁用'}该账号`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => reUseAmount(record.id, record.status),
    });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <>
      <Table
        dataSource={list}
        columns={columns}
        className={styles.tableMargin}
        pagination={{ ...pageInfo, current: pageInfo.pageNumber }}
        onChange={pageChange}
        bordered
      />
      <Modal
        title="客户信息详情"
        visible={modalStatus}
        onCancel={() => setModalStatus(false)}
        footer={[<Button onClick={() => setModalStatus(false)}>关闭</Button>]}
      >
        <Form {...layout}>
          <Form.Item label="客户编号">{currentRecord.accountNo}</Form.Item>
          <Form.Item label="用户名">{currentRecord.name}</Form.Item>
          <Form.Item label="客户姓名">{currentRecord.fullName}</Form.Item>
          <Form.Item label="注册日期">{currentRecord.createAt}</Form.Item>
          <Form.Item label="邮箱">{currentRecord.email}</Form.Item>
          {/* <Form.Item label="手机"> */}
          {/*  { currentRecord.phone } */}
          {/* </Form.Item> */}
          {/* <Form.Item label="绑定支付账号"> */}
          {/*  { currentRecord.account } */}
          {/* </Form.Item> */}
          <Form.Item label="最后登录时间">
            {currentRecord.lastLoginTime}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TableList;
