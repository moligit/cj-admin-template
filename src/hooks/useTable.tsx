import React, { FC, useEffect, useState, useRef } from 'react';
import { useRequest } from 'ahooks';
import { message } from 'antd';

export interface ITable {
  request: (data: any) => Promise<any>;
  initPagination?: object;
  initSearch?: object;
}

export interface IResponse {
  handleSearch: (params: any) => void;
  setDataSource: (arr: any[]) => void;
  pagination: object;
  search: object;
  dataSource: any[];
  loading: boolean;
}

export interface IUseRequest {
  run: (params: any) => void;
  loading: boolean;
}

const useTable = (props: ITable): IResponse => {
  const { request, initPagination, initSearch } = props;
  const _pagination = {
    current: 1,
    pageSize: 20,
    hideOnSinglePage: true,
    showQuickJumper: true,
    onChange: paginationChange,
    onShowSizeChange: sizeChange,
    ...initPagination,
  };
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [pagination, setPagination] = useState(_pagination);
  const [search, _setSearch] = useState({ ...initSearch });
  const firstUpdate = useRef(true);

  const { run, loading }: IUseRequest = useRequest(request, {
    onSuccess: ({ data = {}, success, message: msg }) => {
      if (success) {
        const { content = [], totalRecords } = data;
        setDataSource(content);
        setPagination(state => ({
          ...state,
          total: totalRecords,
        }));
      } else {
        message.error(msg);
      }
    },
  });

  function paginationChange(current: number, pageSize: number) {
    setPagination(state => ({
      ...state,
      current,
      pageSize,
    }));
  }

  function sizeChange(current: number, pageSize: number) {
    setPagination(state => ({
      ...state,
      current: 1,
      pageSize,
    }));
  }

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    run({
      ...search,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    });
  }, [pagination.current, pagination.pageSize, search]);

  const handleSearch = (params: any) => {
    setPagination(state => ({
      ...state,
      current: 1,
    }));
    _setSearch(params);
  };

  return {
    search,
    handleSearch,
    setDataSource,
    dataSource,
    pagination,
    loading,
  };
};

export default useTable;
