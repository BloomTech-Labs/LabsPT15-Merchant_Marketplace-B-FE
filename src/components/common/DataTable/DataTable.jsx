import React from 'react';
import { Table, Space, Popover, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const DataTable = ({ title, columns, inputData, actions }) => {
  const handleClick = e => {
    e.preventDefault();
    console.log(`${e.target.childNodes[0].data} clicked`);
  };

  const rowActions = (
    <Space size="middle" direction="vertical">
      {actions.map(item => {
        return (
          <Button
            type="link"
            className="ant-dropdown-link"
            key={item}
            onClick={handleClick}
          >
            {item}
          </Button>
        );
      })}
    </Space>
  );

  const columnLabels = columns.map(item => {
    return {
      title: item.split('_')[0],
      dataIndex: item.toLowerCase(),
      key: item.toLowerCase(),
    };
  });

  columnLabels.push({
    title: 'Action',
    key: 'action',
    render: () => (
      <Popover content={rowActions} trigger="click" placement="bottomRight">
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
