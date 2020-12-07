import React from 'react';
import { Spin } from 'antd';
const Loader = () => {
  return (
    <div style={{ margin: '150px 0', textAlign: 'center' }}>
      <Spin size="large"/>
    </div>
  );
};

export default Loader;
