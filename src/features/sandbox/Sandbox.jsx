import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {decrement, increment} from "./testReducer";
import {openModal} from "../../app/common/modals/modalReducer";

const Sandbox = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.test.data)
    return (
        <>
            <h1>Testing 123</h1>
            <h3>Data is: {data} </h3>
            <Button onClick={() => dispatch(increment(20))} variant='primary'>Increment</Button>{" "}
            <Button onClick={() => dispatch(decrement(10))} variant='warning'>Decrement</Button>{" "}
            <Button onClick={() =>  dispatch(openModal({modalType:'TestModal', modalProps:{data}}))} variant='info'>Open Modal</Button>
        </>
    );
};

export default Sandbox;
