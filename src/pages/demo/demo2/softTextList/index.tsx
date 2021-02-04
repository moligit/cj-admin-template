import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Panel } from '@/components';
import {
  Badge,
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tooltip,
} from 'antd';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import Api from '../service';
import styles from '../index.less';

const { Option } = Select;
const { confirm } = Modal;

interface IFilter {
  title?: string;
  isStock?: string;
}

interface Page {
  current: number;
  pageSize: number;
  total?: number;
}

const Index: FC = () => {
  const firstUpdate = useRef(true);
  const [search, setSearch] = useState<IFilter>({});
  const [list, setList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Page>({
    current: 1,
    pageSize: 20,
  });

  // 列表获取
  const { run: getTableData, loading } = useRequest(Api.getListApi, {
    onSuccess: ({ data = {}, success, message: msg }) => {
      if (success) {
        const { content = [], totalRecords } = data;
        setList(content);
        setPagination((state: any) => ({
          ...state,
          total: totalRecords,
        }));
      } else {
        message.error(msg);
      }
    },
  });

  function getList() {
    const { current, pageSize } = pagination;
    getTableData({ ...search, pageNumber: current, pageSize });
  }

  // 上架/下架
  const { run: changeStatus } = useRequest(Api.changeStatusApi, {
    onSuccess: ({ success, message: msg }) => {
      if (success) {
        message.success('操作成功');
        getList();
      } else {
        message.error(msg);
      }
    },
  });

  // 删除
  const { run: removeList } = useRequest(Api.removeApi, {
    onSuccess: ({ success, message: msg }) => {
      if (success) {
        message.success('操作成功');
        getList();
      } else {
        message.error(msg);
      }
    },
  });

  // 搜索
  const onSearch = (values: any) => {
    setSearch({ ...values });
    setPagination((state: Page) => ({
      ...state,
      current: 1,
    }));
  };

  // 发布文章
  const handlePostArticle = () => {
    history.push({
      pathname: '/demo2/softTextSet/add',
    });
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    getList();
  }, [pagination.current, pagination.pageSize, search]);

  // 编辑
  const handleEdit = (record: any) => {
    history.push({
      pathname: `/demo2/softTextSet/${record.id}`,
    });
  };

  // 删除
  const handleRemove = (record: any) => {
    const { id } = record;
    confirm({
      title: '你确定要删除这篇文章吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        return removeList({ id });
      },
    });
  };

  // 上架/下架
  const handleSetStatus = (record: any) => {
    const { id, isStock } = record;
    changeStatus({ id, isStock: Number(!isStock) });
  };

  // 分页改变
  const paginationChange = (current: number, pageSize: number) => {
    setPagination((state: any) => ({
      ...state,
      current,
      pageSize,
    }));
  };

  // 表头
  const columns = [
    {
      title: '封面大图',
      dataIndex: 'coverImage',
      width: '100px',
      render: (text: string) => (
        <img width={50} src={text && text.split(',')[0]} alt="" />
      ),
    },
    {
      title: '推文标题',
      dataIndex: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: (content: string | any) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'clickCount',
    },
    {
      title: '分享数',
      dataIndex: 'shareCount',
    },
    {
      title: '状态',
      dataIndex: 'isStock',
      render: (text: string) => (
        <Badge
          status={text ? 'success' : 'error'}
          text={text ? '已发布' : '草稿箱'}
        />
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      render: (date: number) => moment(Number(date)).format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      title: '操作',
      width: '250px',
      render: (text: any, record: any) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => handleRemove(record)}>
            删除
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => handleSetStatus(record)}>
            {!record.isStock ? '上架' : '下架'}
          </Button>
        </>
      ),
    },
  ];

  // 分页参数
  const paginationObj: object = {
    ...pagination,
    showQuickJumper: true,
    onChange: paginationChange,
    onShowSizeChange: paginationChange,
  };

  return (
    <Panel title="软文列表">
      <div className={styles.wrapper}>
        <Form layout="inline" className="filter-box" onFinish={onSearch}>
          <Form.Item name="title">
            <Input type="text" placeholder="请输入推文标题" />
          </Form.Item>
          <Form.Item name="isStock">
            <Select style={{ width: 200 }} placeholder="请选择">
              <Option value="">全部</Option>
              <Option value="1">已发布</Option>
              <Option value="0">草稿箱</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form>
        <div className="actions-box">
          <Button type="primary" onClick={handlePostArticle}>
            发布文章
          </Button>
        </div>
        <Table
          rowKey={(v: any) => v.id}
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={paginationObj}
          bordered
          scroll={{ y: '60vh' }}
        />
      </div>
    </Panel>
  );
};

export default Index;
