import React, { Component } from 'react';
// import { Layout, Row, Alert, Modal, Button } from 'antd';
import './App.css';
import Container from './Components/Container'; 

class App extends Component {
  state = {
    tab: 'tab2',
  };

  tabEvent = (e, tab) => {
    this.setState({ tab });
  };
  render() {
    const { tab } = this.state;

    return (
      <div className="App">
        <header className="header">
          <a href="#default" className="logo">
              Popular Movies
          </a>
          <div className="header-right">
              <a
                href="#Series"
                className={`tablinks ${tab === 'Series' ? 'active' : ''}`}
                onClick={(e) => this.tabEvent(e, 'Series')}
                style={{marginRight:"20px"}}
              >
                Series
              </a>
          
              <a
                href="#Movies"
                className={`tablinks ${tab === 'Movies' ? 'active' : ''}`}
                onClick={(e) => this.tabEvent(e, 'Movies')}
              >
                Movies
              </a>
            </div>
        </header>
        <Container tab={tab}/>
        <footer style={{ textAlign: 'center' }}>
            Movies Information ©2020
          </footer>
      </div>
    );
  }
}
export default App;
