import React, {useEffect, useState} from 'react';
import styled from "styled-components";

//Bootstrap
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

import EventDetailedChatForm from "./EventDetailedChatForm";
import {useDispatch, useSelector} from "react-redux";
import {firebaseObjectToArray, getEventChatRef} from "../../../app/firestore/firebaseService";
import {listenToEventChat} from "../eventActions";
import {Link} from "react-router-dom";
import {formatDistance} from 'date-fns'
import {CLEAR_COMMENTS} from "../eventConstant";
import {createDataTree} from "../../../app/common/util/util";

const EventDetailedChat = ({eventId}) => {
    const dispatch = useDispatch()
    const {comments} = useSelector((state) => state.event)
    const [showReplyForm, setShowReplyForm] = useState({open: false, commentId: null})

    function handleCloseReplyForm() {
        // close form after comment is submitted
        setShowReplyForm({open: false, commentId: null})
    }

    useEffect(() => {
        getEventChatRef(eventId).on('value', snapshot => {
            if (!snapshot.exists()) return;
            dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()))
        });
        return () => {
            dispatch({type: CLEAR_COMMENTS})
            getEventChatRef().off()
        }
    }, [eventId, dispatch])

    return (
        <EventDetailedChatWrapper>
            <ListGroup>
                <h4 className="text-center">Chat about this event</h4>
                <div className='my-box-shadow'>
                    <EventDetailedChatForm eventId={eventId} parentId={0} closeForm={setShowReplyForm}/>

                    {createDataTree(comments).map((comment) => (
                        <ListGroup.Item key={comment.id}>
                            <div className="chat-group">
                                <div className="chat-group-user d-flex align-items-center">
                                    <Link to={`profile/${comment.uid}`} className='d-flex align-items-center'>
                                        <Image className='user-img' src={comment.photoURL || "/assets/user.png"}/>
                                        <div className="chat-group-username ms-3">
                                            <span>{comment.displayName}</span>
                                        </div>
                                    </Link>
                                    <div className="chat-group-time">
                                        <span className='text-muted'>{formatDistance(comment.date, new Date())}</span>
                                        {/*new Date() represent today's date*/}
                                    </div>
                                </div>
                                <div className="chat-group-comment-part">
                                    <div className="chat-group-comment ms-5">
                                        <p>{comment.text.split('\n').map((text, i) => (
                                            <span key={i}>
                                            {text}
                                                <br/>
                                        </span>
                                        ))}</p>
                                        <div className='chat-chat border-0'>
                                                 <span onClick={() => setShowReplyForm({
                                                     open: true,
                                                     commentId: comment.id
                                                 })}
                                                       className='d-block  text-muted border-0 my-reply'>Reply
                                                 </span>
                                            {showReplyForm.open && showReplyForm.commentId === comment.id &&
                                            <EventDetailedChatForm
                                                className='border-0'
                                                eventId={eventId}
                                                parentId={comment.id}
                                                closeForm={handleCloseReplyForm}
                                            />
                                            }
                                        </div>
                                    </div>
                                </div>
                                {comment.childNodes.length > 0 && (
                                    <div className='reply-to-right'>
                                        {comment.childNodes.reverse().map(child => (
                                            <div key={child.id}>
                                                <div className="chat-group-user d-flex align-items-center">
                                                    <Link to={`profile/${child.uid}`}
                                                          className='d-flex align-items-center'>
                                                        <Image className='user-img'
                                                               src={child.photoURL || "/assets/user.png"}/>
                                                        <div className="chat-group-username ms-3">
                                                            <span>{child.displayName}</span>
                                                        </div>
                                                    </Link>
                                                    <div className="chat-group-time">
                                                        <span
                                                            className='text-muted'>{formatDistance(child.date, new Date())}</span>
                                                        {/*new Date() represent today's date*/}
                                                    </div>
                                                </div>
                                                <div className="chat-group-comment-part">
                                                    <div className="chat-group-comment ms-5">
                                                        <p>{child.text.split('\n').map((text, i) => (
                                                            <span key={i}>
                                                                {text}
                                                                <br/>
                                                             </span>
                                                        ))}</p>

                                                        <div className='chat-chat border-0'>
                                                             <span onClick={() => setShowReplyForm({
                                                                 open: true,
                                                                 commentId: child.id
                                                             })}
                                                                   className='d-block text-muted border-0 my-reply'>Reply
                                                             </span>
                                                            {showReplyForm.open && showReplyForm.commentId === child.id &&
                                                            <EventDetailedChatForm
                                                                className='border-0'
                                                                eventId={eventId}
                                                                parentId={child.parentId}
                                                                closeForm={handleCloseReplyForm}
                                                            />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </ListGroup.Item>
                    ))}
                </div>
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
  //.chat-chat {
  //  border: none;
  //}
  //textarea {
  //    border: none;
  //    :focus{
  //      border: none;
  //    }
  //  }
  .form-control:focus {
     box-shadow: #FF4242;
     
     }
   .my-reply {
      cursor: pointer;
     }
  //   input[type="text"]:focus{
  //    border: none;
  //   }
    
`