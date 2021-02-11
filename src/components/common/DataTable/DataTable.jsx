import React from 'react';
import { Table, Space, Popover, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const DataTable = ({ title, columns, inputData, actions, funcs }) => {
  const rowActions = record => (
    <Space size="middle" direction="vertical">
      {actions.map((action, index) => {
        return (
          <Button
            type="link"
            className="ant-dropdown-link"
            key={index}
            onClick={() => funcs[index](record.id)}
          >
            {action}
          </Button>
        );
      })}
    </Space>
  );

  const columnLabels = columns.map((item, index) => {
    return {
      title: item.split('_')[0],
      dataIndex: item.toLowerCase(),
      key: index,
    };
  });

  columnLabels.push({
    title: 'Action',
    key: 'action',
    render: record => (
      <Popover
        content={rowActions(record)}
        trigger="click"
        placement="bottomRight"
      >
        <Button type="link" className="ant-dropdown-link">
          Actions <DownOutlined />
        </Button>
      </Popover>
    ),
  });

  return (
    <Table
      dataSource={inputData ? inputData : null}
      rowKey={record => record.id}
      title={() => title}
      pagination={{ hideOnSinglePage: true }}
      columns={columnLabels}
    />
  );
};
