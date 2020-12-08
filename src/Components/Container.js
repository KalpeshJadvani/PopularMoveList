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
        list:[],
        filterData:{ 
            titleText:"",
            orderby:"Sort by year in descending order",
        },
        loading: true,
        error:undefined,
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
        const { filterData } = this.state;
        const match = tab === "Series" ? "series" : "movie";

        const newList = entries.filter(item => {

            if(filterData["titleText"]){
                return item["programType"] === match && item["title"].toLowerCase().includes(filterData["titleText"]);
            }

            return item["programType"] === match;
        });

        let sort = {
            "Sort by year in descending order": { machineKey:"releaseYear",
                                                    orderby: ">" },
            "Sort by year in ascending order":{ machineKey:"releaseYear",
                                                orderby: "<" },
            "Sort by title in descending order":{ machineKey:"title",
            orderby: ">" },
            "Sort by title in ascending order":{ machineKey:"title",
            orderby: "<" },
        }

        const filterObj = sort[filterData["orderby"]];


        newList.sort((a, b) => {
            if(filterObj["orderby"] === "<")   
                return (a[filterObj["machineKey"]] < b[filterObj["machineKey"]] ? -1 : 1)
            else
                return (a[filterObj["machineKey"]] > b[filterObj["machineKey"]] ? -1 : 1);
        });

        this.setState({
            total:total,
            list: newList || [],
            error: undefined,
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
    

    onSearch = (e)=> {

        let filterData = {
            ...this.state.filterData, 
            titleText: e.target.value.toLowerCase().trim(),
        }

        this.setState({filterData}, ()=>{
            let titleText = this.state.filterData["titleText"];
            if(titleText.length > 2 || titleText.length===0)
            this.apiCall();
        });
    }
    onSelectChange = (slectedOption)=>{

        let filterData = {
            ...this.state.filterData, 
            orderby: slectedOption,
        }
        this.setState({filterData},()=>{
            this.apiCall();
        });
    }

    render() {
        const { options, filterData, list, loading, error } = this.state;
      return (
        <div className="container">
            <FilterBar options={options} onSearch={this.onSearch} slectedOption={filterData["orderby"]} onSelectChange={this.onSelectChange}/>
            <br/>
            <ContainerBody  list={list} error={error} loading={loading}/>
            
        </div>
      );
    }
  }
  
  export default Container;