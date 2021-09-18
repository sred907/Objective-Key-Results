import React from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";

const FreezeCont = styled.div`
    padding: 100px;
    margin: 0 auto;

    .loader {
        border: 4px solid #f3f3f3; /* Light grey */
        border-top: 4px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
        margin: 0 auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    &.padding40 {
        padding: 40px;
    }
`;

const Freeze = (props) => {
    return (
        <FreezeCont className={props.customClass}>
                <div className="loader"></div>
        </FreezeCont>
    );
}

Freeze.propTypes = {
    customClass: PropTypes.string
};

export default Freeze;
