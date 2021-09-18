import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import Freeze from "../Freeze";

import {ItemsContainer, Heading, FilterListContainer, FilterListItem} from "../../commonStyles";

import { setFilters } from "../../actions";

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filters.length !== this.props.filters.length) {
            this.setState({
                options: [...this.props.filters] || []
            })
        }
    }

    updateResult = (event) => {
        let { value } = event.target;
        let arr = this.props.filters.filter((option) => {
            return (option.name.toLowerCase()).indexOf(value.toLowerCase()) > -1
        });
    
        let filteredData = arr.length ? [...arr] : [];
        this.setState({
            options: filteredData
        })
    }

    updateChecks = (index, catName) => {
        const { options } = this.state;
        const { filtersApplied } = this.props;
        let arr = [...filtersApplied];
        if (catName === "All") {
            arr = filtersApplied[0] === "All" ? [] : ["All"]
        } else {
            if(arr.indexOf("All") > -1) arr.splice(arr.indexOf("All"), 1);
            if (arr.indexOf(options[index].slug) > -1) {
                arr.splice(arr.indexOf(options[index].slug), 1);
            } else {
                arr.push(options[index].slug);
            }
        }
        this.props.setFilters(arr);
    }

    getStatus = (option) => {
        const { filtersApplied } = this.props;
        if (filtersApplied.indexOf(option.slug) > -1) {
            return "checked";
        } else {
            return "";
        }
    }

    render() {
        const { options } = this.state;
        const { loading } = this.props;
        return (
            <div className="filters">
                <Heading>Categories</Heading>
                <ItemsContainer>
                    <input
                        placeholder="Search Category"
                        className="searchBox"
                        onChange={(e) => this.updateResult(e)}
                        type="search"
                    />
                    {
                        options.length ?
                        <FilterListContainer>
                            {
                                options.map((option, i) => {
                                    let labelName = `${option.name} (${option.count})`;
                                    return (
                                        <FilterListItem key={i}>
                                            <label>
                                                {labelName}
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        this.updateChecks(i, option.name);
                                                    }}
                                                    checked={this.getStatus(option)}
                                                    name={option.name}
                                                    value={option.slug}
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        </FilterListItem>
                                    );
                                })
                            }
                        </FilterListContainer>
                        :
                        loading ? <Freeze customClass={"padding40"}/> : "No Categories found!"
                    }
                </ItemsContainer>
            </div>
        );
    }
}

Filters.propTypes = {
    filters: PropTypes.array,
    loading: PropTypes.bool
};

const mapStateToProps = (state)=>{
    return {
        filtersApplied: state.filtersApplied
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        setFilters: (filtersApplied) => { dispatch(setFilters(filtersApplied)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
