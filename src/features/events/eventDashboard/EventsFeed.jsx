import React, {useEffect} from 'react';
import styled from "styled-components";

import {useDispatch, useSelector} from "react-redux";
import {firebaseObjectToArray, getUserFeedRef} from "../../../app/firestore/firebaseService";
import {listenToFeed} from "../../profiles/profileActions";
import EventFeedItem from "./EventFeedItem";
import LoadingComponent from "../../../app/layout/LoadingComponents";

const EventsFeed = () => {
    const dispatch = useDispatch()
    const {feed} = useSelector(state => state.profile)

    useEffect(() => {
        getUserFeedRef()?.on('value', snapshot => {
            if (!snapshot.exists()) {
                return;
            }
            const feed = firebaseObjectToArray(snapshot.val()).reverse();
            dispatch(listenToFeed(feed))
        })
        return () => {
            getUserFeedRef()?.off()
        }
    }, [dispatch])
    
    return (
        <EventsFeedWrapper className='my-box-shadow'>
            <h5 className='mt-5 p-3'>News Feed</h5>
            {feed.map(post =>(
                <EventFeedItem post={post} key={post.id}/>
            ))}
        </EventsFeedWrapper>
    );
};

export default EventsFeed;

const EventsFeedWrapper = styled.div`
  
`