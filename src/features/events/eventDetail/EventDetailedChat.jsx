import React, {useEffect} from 'react';
import styled from "styled-components";

//Bootstrap
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EventDetailedChatForm from "./EventDetailedChatForm";
import {useDispatch, useSelector} from "react-redux";
import {firebaseObjectToArray, getEventChatRef} from "../../../app/firestore/firebaseService";
import {listenToEventChat} from "../eventActions";
import {Link} from "react-router-dom";
import {formatDistance} from 'date-fns'

const EventDetailedChat = ({eventId}) => {
    const dispatch = useDispatch()
    const {comments} = useSelector((state) => state.event)

    useEffect(() => {
        getEventChatRef(eventId).on('value', snapshot => {
            if (!snapshot.exists()) return;
            dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val())))
        })
    }, [eventId, dispatch])

    return (
        <EventDetailedChatWrapper>
            <ListGroup>
                <h4 className="text-center">Chat about this event</h4>
                {comments.map(comment => (
                    <ListGroup.Item key={comment.id}>
                        <div className="chat-group">
                            <div className="chat-group-user d-flex align-items-center">
                                <Link to={`profile/${comment.uid}`} className='d-flex align-items-center'>
                                    <Image className='user-img' src={comment.photoURL || "/assets/user.png"}/>
                                    <div className="chat-group-username">
                                        <span>{comment.displayName}</span>
                                    </div>
                                </Link>
                                <div className="chat-group-time">
                                    <span className='text-muted'>{formatDistance(comment.date, new Date())}</span>
                                    {/*new Date() represent today's date*/}
                                </div>
                            </div>
                            <div className="chat-group-comment-part">
                                <div className="chat-group-comment">
                                    <p>{comment.text}
                                        <span className='d-block text-muted'>Reply</span>
                                    </p>
                                </div>
                            </div>
                            {/*<div className='reply-to-right'>*/}
                            {/*    <div className="chat-group-user">*/}
                            {/*        <Image className='user-img' src="/assets/user.png"/>*/}
                            {/*        <div className="chat-group-username">*/}
                            {/*            <p>Chatt</p>*/}
                            {/*        </div>*/}
                            {/*        <div className="chat-group-time">*/}
                            {/*            <span className='text-muted'>Today at 5:42PM</span>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="chat-group-comment-part">*/}
                            {/*        <div className="chat-group-comment">*/}
                            {/*            <p>This has been very useful for my research. Thanks as well!This has been very*/}
                            {/*                useful for my research. Thanks as well!This has been very useful for my*/}
                            {/*                research. Thanks as well!*/}
                            {/*                <span className='d-block text-muted'>Reply</span>*/}
                            {/*            </p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                    </ListGroup.Item>
                ))}
                <EventDetailedChatForm eventId={eventId}/>
            </ListGroup>

        </EventDetailedChatWrapper>
    );
};

export default EventDetailedChat;

const EventDetailedChatWrapper = styled.div`
  
  .list-group {
    
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .list-group-item {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #ffffff;
  }
  img{
    width: 30px;
    height: 30px;
  }
  .chat-group{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
   
  }
  .chat-group-user {
    display: flex;
    //padding: 5px;
    //margin-left: 5px;
    //align-items: flex-start;
  }
  .chat-group-username {
    margin: 5px 10px 0 8px;
  }
  .chat-group-time {
    //margin-top: 4px;
    span{
      font-size: 10px;
      
    }
  }
  .user-img {
    margin-top: 7px;
  }
  .chat-group-comment {
    margin-left: 34px;
    span {
      font-size: 12px;
      margin-top: 8px;
    }
  }
  .reply-to-right {
    margin-left: 30px;
    margin-top: 10px;
  }
`