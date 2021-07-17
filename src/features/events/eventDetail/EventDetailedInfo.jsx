import React from 'react';
import styled from "styled-components";

//Bootstrap
import {BsGeoAlt, BsFillCalendarFill, BsFillInfoSquareFill} from "react-icons/bs"
import Button from "react-bootstrap/cjs/Button";


const EventDetailedInfo = () => {
    return (
        <EventDetailedInfoWrapper>
            <div className="info-event">
                <div className="info-description-icon">
                    <BsFillInfoSquareFill size='20px'/>
                </div>
                <div className="info-description-text">
                    <p>Event Description</p>
                </div>
            </div>
            <div className="info-event">
                <div className="info-date-icon">
                    <BsFillCalendarFill color='#FF4242' size='20px'/>
                </div>
                <div className="info-date-text">
                    <p>Event Date</p>
                </div>
            </div>
            <div className="info-event-venue">
                <div className="info-event-venue-info">
                    <div className="info-venue-icon">
                        <BsGeoAlt size='20px'/>
                    </div>
                    <div className="info-venue-text">
                        <p>Event Venue</p>
                    </div>
                </div>
                <div className=" info-event-btn">
                    <Button className='my-blue-btn'>Show Map</Button>
                </div>

            </div>
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
  
  }
  .info-event-venue-info {
    display: flex;
    
    //align-items: center;
  }
  .info-venue-icon{
    margin-left: 10px;
    margin-right: 10px;
  }
  .info-event-btn {
    margin: 5px;
  }
  .info-description-text {
    //margin-top: 15px;
  }
`