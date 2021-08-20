import React from 'react';
import GoogleMapReact from 'google-map-react';
import Container from "react-bootstrap/Container";
import {BsGeoAlt} from "react-icons/bs"

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
                    bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_KEY}}
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
