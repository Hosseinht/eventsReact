import React, {useState} from 'react';
import styled from "styled-components";
import {format} from "date-fns";
//Bootstrap
import {BsGeoAlt, BsFillCalendarFill, BsFillInfoSquareFill} from "react-icons/bs"
import Button from "react-bootstrap/cjs/Button";
import EventDetailedMap from "./EventDetailedMap";



const EventDetailedInfo = ({event}) => {
    const [mapOpen, setMapOpenToggle] = useState(false)
    return (
        <EventDetailedInfoWrapper>
            <div className="info-event">
                <div className="info-description-icon">
                    <BsFillInfoSquareFill size='20px'/>
                </div>
                <div className="info-description-text">
                    <p>{event.description}</p>
                </div>
            </div>
            <div className="info-event">
                <div className="info-date-icon">
                    <BsFillCalendarFill color='#FF4242' size='20px'/>
                </div>
                <div className="info-date-text">
                    <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                </div>
            </div>
            <div className="info-event-venue">
                <div className="info-event-venue-info">
                    <div className="info-venue-icon">
                        <BsGeoAlt size='20px'/>
                    </div>
                    <div className="info-venue-text">
                        <p>{event.venue.address}</p>
                    </div>
                </div>
                <div className=" info-event-btn">
                    <Button variant='light' onClick={() => setMapOpenToggle(!mapOpen)} className='my-blue-btn'>
                        {mapOpen ? 'Hide Map' : 'Show Map'}
                    </Button>
                </div>
            </div>
            {mapOpen && <EventDetailedMap latLng={event.venue.latLng}/>}

        </EventDetailedInfoWrapper>
    );
};

export default EventDetailedInfo;

const EventDetailedInfoWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-top: 15px;
  //padding: 5px 3px;
  .info-event{
  
    display: flex;
    //align-items: center;
    
    padding: 5px;
    //p {
    //  //padding: 5px;    
    //  margin-top: 15px;
    //}
  }
  .info-description-icon {
    margin-left: 5px;
    margin-right: 10px;
  }
  .info-date-icon{
     margin-left: 5px;
    margin-right: 10px;
  }
  .info-event-venue{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  
  }
  .info-event-venue-info {
    display: flex;
    margin-top: 15px;
    
    //align-items: center;
  }
  .info-venue-icon{
    margin-left: 10px;
    margin-right: 10px;
  }
  .info-event-btn {
    margin: 5px;
    align-self: center;
  }
  .info-description-text {
    //margin-top: 15px;
  }
`