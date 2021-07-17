import React from 'react';
import styled from "styled-components";

//Bootstrap
import Image from "react-bootstrap/cjs/Image";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const EventDetailedHeader = () => {
    return (
        <EventDetailedHeaderWrapper>
            <div className='fixedoverlay'>
                <Image className='img-brightness' fluid src='/assets/categoryImages/drinks.jpg'/>
                <div className="content-title">
                    <div className="content-title-title">
                        <p className='fs-3'>Event Title</p>
                    </div>
                    <div className='content-title-date'>
                        <p>Event Date</p>
                    </div>
                    <div className="content-title-host">
                        <p className='fs-6'>Hosted by <strong> Bob</strong></p>
                    </div>
                </div>
            </div>

            <div className="header-btn-part">
                <div className="header-btn-group">
                    <div className="header-cancel-btn">
                        <Button variant={'light'}> Cancel My Place</Button>
                    </div>
                    <div className="header-join-btn">
                        <Button variant={'light'}>JOIN THIS EVENT</Button>
                    </div>
                </div>
                <div className="header-event-btn">
                    <Button as={Link} to={`/manage/`} variant={'light'}>Manage Event</Button>
                </div>
            </div>
        </EventDetailedHeaderWrapper>
    );
};

export default EventDetailedHeader;

const EventDetailedHeaderWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: relative;
  .img-brightness{
    filter: brightness(30%);
  }
  
  .content-title {
   
    //padding: 20px 10px;
    position: absolute;
    bottom: 35%;
    left: 7%;
    width: 50%;
    height: auto;
    color: white;
    z-index: 10;
  }
  .header-btn-part{
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
   
  }
  .header-btn-group{
    display: flex;
    
  }
  .header-cancel-btn {
    margin-right: 5px;
    box-shadow: none ;
   
  }

`