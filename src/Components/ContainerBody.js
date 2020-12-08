import React, { Component } from 'react';
import Loader from './elements/Loader';
import { Layout, Row, Alert, Modal } from 'antd';
import CardBox from './elements/CardBox';
import NoData from './elements/NoData';
const { Content } = Layout;
class ContainerBody extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options:[
            "Sort by year in descending order",
            "Sort by year in ascending order",
            "Sort by title in descending order",
            "Sort by title in ascending order"
        ],
        slectedOption: "Sort by year in descending order"
      };
      
    }


    render() {
        const { loading, list } = this.props; 
      return (
        <Content >
            {loading ?  <Loader /> :
                <Row gutter={16} type="flex" justify="center">
                    {list !== null &&
                        list.length > 0 ?
                        list.map((result, index) => (
                        <CardBox
                            key={index}
                            {...result}
                        />
                        )) :
                        <NoData msg={'Data Not Found.'} />
                        }
                </Row>
            
            }
        </Content>
      );
    }
  }
  
  export default ContainerBody;