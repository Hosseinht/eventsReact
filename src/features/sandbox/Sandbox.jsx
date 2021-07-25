import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {decrement, increment} from "./testReducer";
import {openModal} from "../../app/common/modals/modalReducer";
import TestPlaceInput from "./TestPlaceInput";
import TestMap from "./TestMap";

const Sandbox = () => {
    const dispatch = useDispatch()
    const [target, setTarget] = useState(null)
    const data = useSelector(state => state.test.data)
    const {loading} = useSelector(state => state.async)

    const defaultProps = {
        center: {
            lat: 51.65054,
            lng: 39.27507
        },
        zoom: 11
    };
    const [location, setLocation] = useState(defaultProps)

    function handleSetLocation(latLng) {
        setLocation({...location, center: {lat: latLng.lat, lng: latLng.lng}})
        // update the map with the new properties. the reason that we are taken in
        // the existing location is we'll just keep the zoom as it is
    }

    return (
        <>
            <h1>Testing 123</h1>
            <h3>Data is: {data} </h3>
            <Button name='increment' loading={loading}
                    onClick={(e) => {
                        dispatch(increment(20))
                        setTarget(e.target.name)
                    }}
                    variant='primary'>
                {loading && target === 'increment' ?
                    <div>
                        < Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className='me-1'
                        />
                        Loading...
                    </div>
                    : "Increment"}
            </Button>{" "}
            <Button name='decrement' loading={loading}
                    onClick={(e) => {
                        dispatch(decrement(10))
                        setTarget(e.target.name)
                    }}
                    variant='warning'
                    className='sandbox-btn'
                    style={{width: "100px"}}
            >
                {loading && target === 'decrement' ?
                    <div>
                        < Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </div>
                    : "Decrement"}</Button>{" "}
            <Button onClick={() => dispatch(openModal({modalType: 'TestModal', modalProps: {data}}))} variant='info'>Open
                Modal</Button>
            <div className='mt-5'>
                {/*pass cordinate from textinput to the map. and for this we need to set the state in here */}
                <TestPlaceInput setLocation={handleSetLocation}/>
                {/*we need the ability for our TestPlaceInput to update the location in state. so wee need to update the center property*/}
                <TestMap location={location}/>
            </div>
        </>
    );
};

export default Sandbox;
