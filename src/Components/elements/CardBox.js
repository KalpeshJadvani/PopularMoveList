import React from 'react';
import { Col, Row, Card, Tag } from 'antd';
const { Meta } = Card;
const upperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

const CardBox = ({ title, description, releaseYear, images })=>{

    
    return (
        <Col style={{ margin: '20px 0' }} className="gutter-row" span={4}>
          <div className="gutter-box">
            <Card
              style={{ width: 200 }}
              cover={
                <img
                  alt={title}
                  src={
                    images["Poster Art"]["url"] === 'N/A'
                      ? 'https://placehold.it/198x264&text=Image+Not+Found'
                      : images["Poster Art"]["url"]
                  }
                />
              }
            >
              <Meta title={title} description={false} />
            </Card>
          </div>
        </Col>
      );
}
export default CardBox;