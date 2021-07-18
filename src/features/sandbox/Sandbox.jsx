import React from 'react';
import {useSelector} from "react-redux";

const Sandbox = () => {
    const data = useSelector(state => state.data)
    return (
        <>
            <h1>Testing 123</h1>
            <h3>Data is: {data} </h3>
        </>
    );
};

export default Sandbox;
