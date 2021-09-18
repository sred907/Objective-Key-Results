import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Filters from "../../components/Filters";
import List from "../../components/List";

import { setData } from '../../actions';


const ResultsContainer = styled.div`
    background: #fff;
    padding: 50px 100px 0;
    display: flex;
    justify-content: flex-start;

    .filters {
        width: 25%;
    }

    .list {
        width: 60%;

        @media(max-width: 767px) {
            width: 100%;
            margin: 0;
        }
    }

    @media(max-width: 767px) {
        padding: 50px 15px 0;
    }
`;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            filters: []
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.loadItemsFromServer();
    }

    loadItemsFromServer = async () => {
        const res = await fetch("https://okrcentral.github.io/sample-okrs/db.json");
        const data = await res.json();
        this.filterData(data.data);
    }

    filterData = (data) => {
        let mappedData = [];
        let filters = [];
        data.forEach((item, i) => {
            if (item.parent_objective_id) { // Found Child
                let parentFound = mappedData.findIndex((el) => el.data.id === item.parent_objective_id);
                if (parentFound > -1) {
                    mappedData[parentFound].children = [...mappedData[parentFound].children, {"data": {...item}}]
                } else {
                    mappedData.push({
                        "data": {
                            "id": item.parent_objective_id
                        },
                        "children": [{"data": {...item}}]
                    });
                }

            } else { // Found Parent
                let parentFound = mappedData.findIndex((el) => el.data.id === item.id);
                if (parentFound > -1) {
                    mappedData[parentFound].data = {...mappedData[parentFound].data, ...item}
                } else {
                    mappedData.push({
                        "data" : {...item},
                        "children": []
                    })
                }
                let filterIndex = filters.findIndex((el) => el.name === item.category);
                if (filterIndex > -1) {
                    filters[filterIndex].count = filters[filterIndex].count + 1;
                } else {
                    filters.push({
                        "name": item.category,
                        "slug": item.category,
                        "count": 1
                    });
                }
            }
        });
        filters.unshift({
            "slug": "All",
            "name": "All",
            "count": mappedData.length
        });
        this.setState({
            filters,
            loading: false
        })
        this.props.setData(mappedData);
    }

    render(){
        return (
            <ResultsContainer>
                <Filters
                    filters={this.state.filters}
                    loading={this.state.loading}/>
                <List
                    filteredData={this.props.filteredData}
                    loading={this.state.loading}/>
            </ResultsContainer>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        filteredData: state.filteredData
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        setData: (data) => { dispatch(setData(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
