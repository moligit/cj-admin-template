// eslint-disable-next-line no-unused-vars
import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';

interface Svalue {
  name?: string;
}

interface IProps {
  handleSearch: (values: Svalue) => void;
}

const Filter: FC<IProps> = ({ handleSearch }) => {
  const [form] = Form.useForm();
  return (
    <Form layout="inline" form={form} onFinish={handleSearch}>
      <Form.Item name="name">
        <Input placeholder="客户编号、用户名、客户姓名" />
      </Form.Item>
      <Button type="primary">查询</Button>
    </Form>
  );
};
export default Filter;
