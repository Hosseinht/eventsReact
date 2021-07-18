import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {DECREMENT_COUNTER, INCREMENT_COUNTER} from "./testReducer";

const Sandbox = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    return (
        <>
            <h1>Testing 123</h1>
            <h3>Data is: {data} </h3>
            <Button onClick={() => dispatch({type: INCREMENT_COUNTER})} variant='primary'>Increment</Button>{" "}
            <Button onClick={() => dispatch({type: DECREMENT_COUNTER})} variant='warning'>Decrement</Button>
        </>
    );
};

export default Sandbox;
