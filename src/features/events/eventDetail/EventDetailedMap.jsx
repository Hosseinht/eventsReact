import React from 'react';
import styled from "styled-components";
import GoogleMapReact from 'google-map-react';
import Container from "react-bootstrap/Container";
import {BsGeoAlt} from "react-icons/bs"
import { FaMapMarker } from "react-icons/fa";
const {REACT_APP_GOOGLE_MAP_API} = process.env

function Marker() {
    return(
        <BsGeoAlt size='26px' color='red'/>
    )
}
const EventDetailedMap = ({latLng}) => {
    const zoom = 14;
    return (
        <Container style={{padding:0}}>
            <div style={{height:300, width:"100%"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: REACT_APP_GOOGLE_MAP_API}}
                    center={latLng}
                    zoom={zoom}
                >
                    <Marker lat={latLng.lat} lng={latLng.lng} />
                </GoogleMapReact>
            </div>

        </Container>
    );
};

export default EventDetailedMap;
