import React from 'react';
import { Table, Space, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Column } = Table;

export const DataTable = ({ title, inputData, actions }) => {
  const handleClick = e => {
    e.preventDefault();
    console.log('click');
  };

  const rowActions = (
    <>
      {actions.map(item => {
        return (
          <>
            <a className="ant-dropdown-link" onClick={handleClick}>
              {item}
            </a>
            <br />
          </>
        );
      })}
    </>
  );

  return (
    <Table
      dataSource={inputData ? inputData : null}
      rowKey={record => record.id}
      title={() => title}
      pagination={{ hideOnSinglePage: true }}
    >
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Created At" dataIndex="created_at" key="createdAt" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column
        title="Action"
        key="action"
        render={() => (
          <Space size="middle">
            <Popover
              content={rowActions}
              trigger="click"
              placement="bottomRight"
            >
              <a className="ant-dropdown-link">
                Actions <DownOutlined />
              </a>
            </Popover>
          </Space>
        )}
      />
    </Table>
  );
};
