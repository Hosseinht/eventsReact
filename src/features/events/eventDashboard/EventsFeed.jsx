import React from 'react';
import styled from "styled-components";
import Image from "react-bootstrap/Image";

const EventsFeed = () => {
    const image = '/assets/user.png'
    const date = '3 days ago'
    const summery = "Asad joined an event"
    return (
        <EventsFeedWrapper className='my-box-shadow'>
            <h5 className='mt-5 p-3'>News Feed</h5>
            <div className='p-3 d-flex align-items-center'>
                <Image roundedCircle className='me-3 ' src={image} alt=""/>
                <div className='d-flex flex-column'>
                    <span className='span-date'>{date}</span>
                    <span className='span-summery'><strong> {summery}</strong></span>
                </div>
            </div>
        </EventsFeedWrapper>
    );
};

export default EventsFeed;

const EventsFeedWrapper = styled.div`
  img {
    width: 30px;
    height: 30px;
  }
  .span-date{
    font-size: 14px;
  }
  .span-summery{
    font-size: 14px;
  }
`