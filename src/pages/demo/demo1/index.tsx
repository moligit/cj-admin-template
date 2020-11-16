import React, { useState, useRef, useEffect } from 'react';
import { Card, message } from 'antd';
import { Panel } from '@/components';
import { useRequest } from 'ahooks';
import Filter from './_components/Filter';
import TableList from './_components/TableList';
import api from './_service';

export default () => {
  const int = { pageNumber: 1, pageSize: 10, total: '', name: '' };
  const [list, setList] = useState([]);
  const firstUpdate = useRef(true);
  const [pageInfo, setPageInfo] = useState(int);

  useEffect(() => {
    const { pageNumber, pageSize, name } = pageInfo;
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    getList({ name, pageNumber, pageSize });
  }, [pageInfo.pageNumber, pageInfo.pageSize, pageInfo.name]);

  const { run: getList } = useRequest(api.getList, {
    manual: true,
    onSuccess: (res: any, params: any[]) => {
      if (res.success) {
        const {
          data: { content, totalRecords },
        } = res;
        setList(content);
        setPageInfo({ ...pageInfo, total: totalRecords });
      }
    },
  });

  const { run: setAmount } = useRequest(api.setAmount, {
    manual: true,
    onSuccess: (res: any, params: any[]) => {
      if (res.success) {
        freshData();
        message.success('操作成功');
      }
    },
  });

  const { run: resetPass } = useRequest(api.resetPass, {
    manual: true,
    onSuccess: (res: any, params: any[]) => {
      if (res.success) {
        freshData();
        message.success('操作成功');
      } else {
        message.error(res.message);
      }
    },
  });

  const freshData = () => {
    const { pageNumber, pageSize, name } = pageInfo;
    getList({ name, pageNumber, pageSize });
  };

  const handleSearch = (v: any) => {
    const { name } = v;
    setPageInfo({ ...pageInfo, pageNumber: 1, pageSize: 10, name });
  };

  interface Page {
    current: number;
    pageSize: number;
    total: string;
    name: string;
  }

  const pageChange = (page: Page) => {
    const { current, pageSize, total, name } = page;
    setPageInfo({ pageNumber: current, pageSize, total, name });
  };

  const reUseAmount = (userId: string, status: number) => {
    console.log(status);
    setAmount({ userId, status: status === 0 ? 1 : 0 });
  };

  const tableProps = {
    list,
    resetPass,
    pageInfo,
    pageChange,
    reUseAmount,
  };

  const filterProps = {
    handleSearch,
  };

  return (
    <Panel>
      <Card>
        <Filter {...filterProps} />
        <TableList {...tableProps} />
      </Card>
    </Panel>
  );
};
