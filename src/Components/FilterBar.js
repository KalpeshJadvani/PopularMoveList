import React, { Component } from 'react';
import {  Row, Col, Input, Select } from 'antd';

const { Search } = Input;
const Option = Select.Option;
class FilterBar extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  

    render() {
        const { options, slectedOption } = this.props;
      return (
            <Row gutter={24} >
                <Col span={12}>
                    <Search size="middle"  placeholder="enter movie or series" onSearch={this.props.onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Select size="middle" value={slectedOption} onChange={this.props.onSelectChange} >
                       {
                           options.map(option => <Option key={option}> {option} </Option>)
                       } 
                    </Select>
                </Col>
            </Row>
      );
    }
  }
  
  export default FilterBar;