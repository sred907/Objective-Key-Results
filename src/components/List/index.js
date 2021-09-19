import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";

import Freeze from "../Freeze";

import {ItemsContainer, Heading} from "../../commonStyles";

const ListContainer = styled.div`
    margin: 0 30px;

    .wrapper {
        .overlay {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            position: fixed;
            z-index: 99999;
            background: rgba(0, 0, 0, 0.5);
            zoom: 1;
        }
    
        .modalContainer {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            overflow: auto;
    
            .modalContent {
                border: transparent;
                left: 50%;
                top: 50%;
                position: absolute;
                width: 100%;
                transform: translate(-50%, -50%);
                text-align: center;
                max-width: 910px;
                min-height: 570px;
                margin: 0 auto;
                background: #fff;

                .close {
                    text-align: right;
                    padding: 15px 30px;
                    font-size: 22px;
                    display: inline-block;
                    left: 238px;
                    position: relative;
                }

                .title {
                    text-align: center;
                    padding: 15px;
                    font-size: 15px;
                    display: inline-block;
                }

                .detailRow {
                    height: 39px;
                    border: 2px solid #E0E0E0;
                    border-radius: 10px;
                    font-size: 18px;
                    line-height: 39px;
                    letter-spacing: 0.15px;
                    color: #212121;
                    width: auto;
                    padding: 10px 0 10px 20px;
                    background: #fff;
                    margin: 0 20px 6px;
                    text-align: left;
                }
            }
        }
    }
`;

const Parent = styled.div`
    margin-bottom: 30px;

    .parentTitleCont {
        height: 39px;
        border: 2px solid #E0E0E0;
        border-radius: 10px;
        font-size: 18px;
        line-height: 39px;
        letter-spacing: 0.15px;
        color: #212121;
        width: auto;
        padding: 10px 0 10px 20px;
        background: #ccdde6;

        .childList {
            display: block;
        }

        @media(max-width: 767px) {
            padding-left: 10px;
        }
    }

    .parentTitle {
        display: inline-block;
        position: relative;
        width: 80%;
        top: -11px;

        @media(max-width: 1199px) {
            line-height: 20px;
        }
    }

    .dropDown {
        display: inline-block;
        position: relative;
        width: 20%;
        height: 40px;
    }

    .arrow {
        width: 13px;
        height: 13px;
        position: relative;
        bottom: -13px;
        left: -46px;
        transition: 0.4s ease;
        margin-top: 2px;
        text-align: left;
        transform: rotate(45deg);
        float: right;

        &:before, &:after {
            position: absolute;
            content: '';
            display: inline-block;
            width: 12px;
            height: 3px;
            background-color: #000;
            transition: 0.4s ease;
        }
        &:after {
            position: absolute;
            transform: rotate(90deg);
            top: -5px;
            left: 5px;
        }
    }

    &.isClosed {
        .arrow {
            transform: rotate(45deg) translate(-5px,-5px);

            &:before {
                transform: translate(10px,0);
            }

            &:after {
                transform: rotate(90deg) translate(10px,0);
            }
        }

        .childList {
            display: none;
        }
    }
`;

const Child = styled.div`
    min-height: 22px;
    border: 2px solid #E0E0E0;
    border-radius: 10px;
    font-size: 18px;
    letter-spacing: 0.15px;
    color: #212121;
    width: auto;
    padding: 10px 50px 10px 60px;

    @media(max-width: 767px) {
        padding: 10px;
    }
`;

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closedIds: [],
            isModalOpen: false,
            selectedItem: {}
        } 
    }

    elementClicked = (id) => {
        let arr = [...this.state.closedIds];
        if (arr.indexOf(id) > -1) {
            arr.splice(arr.indexOf(id), 1);
        } else {
            arr.push(id);
        }
        this.setState({
            closedIds: [...arr]
        });
    }

    showDetails = (item) => {
        if (!item) {
            this.setState({
                isModalOpen: false,
                selectedItem: {}
            });
        } else {
            this.setState({
                isModalOpen: true,
                selectedItem: item
            });
        }
    }

    render() {
        let { closedIds, isModalOpen, selectedItem } = this.state;
        const { loading } = this.props;
        return (
            <ListContainer className="list">
                <Heading>List</Heading>
                <ItemsContainer>
                    {   this.props.filteredData.length ?
                        this.props.filteredData.map((item, i) => {
                            return (
                                <Parent key={i} className={closedIds.indexOf(item.data.id) > -1 ? "isClosed" : ""}>
                                    <div className="parentTitleCont">
                                        <div className="parentTitle" onClick={() => this.showDetails(item)}>{i + 1}.&nbsp;&nbsp;&nbsp;{item.data.title}</div>
                                        <div className="dropDown" onClick={() => this.elementClicked(item.data.id)}>
                                            {item.children.length ? <div className="arrow"></div> : null}
                                        </div>
                                    </div>
                                    {
                                        item.children.length ? (
                                            <div className="childList">
                                                {
                                                    item.children.map((child, j) => {
                                                        return <Child key={j} onClick={() => this.showDetails(child)}>{String.fromCharCode(97 + j)}.&nbsp;&nbsp;&nbsp;{child.data.title}</Child>
                                                    })
                                                }
                                            </div>
                                        ) : null
                                    }
                                </Parent>
                            );
                        })
                        :
                        loading ? <Freeze customClass={"padding40"}/> : "No Objectives found!"
                    }
                </ItemsContainer>
                {
                    isModalOpen && selectedItem &&
                    <div className="wrapper">
                        <div className="overlay">
                            <div className="modalContainer">
                                <div className="modalContent">
                                    <div>
                                        <div className="title">{selectedItem.data.title}</div>
                                        <div className="close" onClick={() => this.showDetails()}>&#x2715;</div>
                                    </div>
                                    {
                                        Object.keys(selectedItem.data).map((el, i) => {
                                            return (
                                                el !== "title" && <div className="detailRow" key={i}>
                                                    {`${el}: ${selectedItem.data[el]}`}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </ListContainer>
        );
    }
}

List.propTypes = {
    filteredData: PropTypes.array,
    loading: PropTypes.bool
};

export default List;
