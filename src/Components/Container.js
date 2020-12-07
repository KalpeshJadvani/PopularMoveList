import React, { Component } from 'react';
import FilterBar from './FilterBar';
import ContainerBody from './ContainerBody';
class Container extends Component {
    constructor(props) {
      super(props);
      this.state = {
        options:[
            "Sort by year in descending order",
            "Sort by year in ascending order",
            "Sort by title in descending order",
            "Sort by title in ascending order"
        ],
        slectedOption: "Sort by year in descending order",
        list:[],
        loading: true,
        total:0
      };
      
    }
  

    UNSAFE_componentWillReceiveProps(){
        if(!this.state.loading)
        this.setState({ loading : true},()=>{
            this.apiCall();
        })
    }


    componentDidMount(){
        this.apiCall();
    }

    setData = ({entries, total })=>{
        const { tab } = this.props;
        const match = tab === "Series" ? "series" : "movie";

        const newList = entries.filter(item => {
            return item["programType"] === match;
        });

        this.setState({
            total:total,
            list: newList || [],
            loading: false,
          });
    }

    apiCall = () => {
        fetch(`https://raw.githubusercontent.com/KalpeshJadvani/Produtcs/master/sample.json`)
          .then((result) => result.json())
          .then((response) => {
              this.setData(response);
          })
          .catch((error) => {
            this.setState({
              error: error,
              loading: false,
            });
            console.error(error);
          });
      };
    

    onSearch = (value)=> {
        
        console.log("  value ", value);
    }
    onSelectChange = (slectedOption)=>{
        console.log("  selected ", slectedOption);
        this.setState({slectedOption});
    }
    render() {
        const { options, slectedOption, list, loading } = this.state;
      return (
        <div className="container">
            <FilterBar options={options} onSearch={this.onSearch} slectedOption={slectedOption } onSelectChange={this.onSelectChange}/>
            <br/>
            <ContainerBody  list={list} loading={loading}/>
            
        </div>
      );
    }
  }
  
  export default Container;