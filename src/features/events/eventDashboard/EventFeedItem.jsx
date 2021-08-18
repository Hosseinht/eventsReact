import React from 'react';
import Image from "react-bootstrap/Image";
import {formatDistance} from 'date-fns';
import styled from "styled-components";

const EventFeedItem = ({post}) => {
    let summary;
    switch (post.code) {
        case 'joined-event':
            summary = (
                <>
                    <a href={`/profile/${post.userUid}`}>{post.displayName} </a> has
                    signed up to <a href={`/events/${post.eventId}`}>{post.title}</a>
                </>
            );
            break;
        case 'left-event':
            summary = (
                <>
                    <a href={`/profile/${post.userUid}`}>{post.displayName} </a> has
                    cancelled their place on{' '}
                    <a href={`/events/${post.eventId}`}>{post.title}</a>
                </>
            );
            break;
        default:
            summary = 'Something happened';
            break;
    }
    return (
        <EventFeedItemWrapper>
            <div className='p-3 d-flex align-items-center'>
                <Image roundedCircle className='me-3 ' src={post.photoURL} alt=""/>
                <div className='d-flex flex-column'>
                    <span className='span-date'>{formatDistance(new Date(post.date), new Date())} ago</span>
                    <span className='span-summery'><strong> {summary}</strong></span>
                </div>
            </div>
        </EventFeedItemWrapper>

    )

};

export default EventFeedItem;

const EventFeedItemWrapper = styled.div`
  img {
    width: 30px;
    height: 30px;
  }
  .span-date{
    font-size: 12px;
  }
  .span-summery{
    font-size: 12px;
  }

`