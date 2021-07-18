import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {decrement, increment} from "./testReducer";

const Sandbox = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    return (
        <>
            <h1>Testing 123</h1>
            <h3>Data is: {data} </h3>
            <Button onClick={() => dispatch(increment(20))} variant='primary'>Increment</Button>{" "}
            <Button onClick={() => dispatch(decrement(10))} variant='warning'>Decrement</Button>
        </>
    );
};

export default Sandbox;
