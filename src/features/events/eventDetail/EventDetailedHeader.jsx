import React, {useState} from 'react';
import styled from "styled-components";
import {format} from "date-fns";
//Bootstrap
import Image from "react-bootstrap/cjs/Image";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {addUserAttendance, cancelUserAttendance} from "../../../app/firestore/firestoreService";
import {toast} from "react-toastify";
import Spinner from "react-bootstrap/cjs/Spinner";


const EventDetailedHeader = ({event, isHost, isGoing}) => {
    const [loading, setLoading] = useState(false)

    async function handleUserJoinEvent() {
        setLoading(true)
        try {
            await addUserAttendance(event)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleUserLeaveEvent() {
        setLoading(true)
        try {
            await cancelUserAttendance(event)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <EventDetailedHeaderWrapper>
            <div className='fixedoverlay'>
                <Image className='img-brightness' fluid src={`/assets/categoryImages/${event.category}.jpg`}/>
                <div className="content-title">
                    <div className="content-title-title">
                        <p className='fs-4'>{event.title}</p>
                    </div>
                    <div className='content-title-date'>
                        <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
                    </div>
                    <div className="content-title-host">
                        <p className='fs-6'>Hosted by <strong className=' host-text'><Link
                            to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong></p>
                    </div>
                </div>
            </div>

            <div className="header-btn-part">
                {!isHost &&
                <div className="header-btn-group">
                    {isGoing ?
                        <div className="header-cancel-btn">
                            <Button
                                onClick={handleUserLeaveEvent}
                                variant={'light'}
                                className='my-red-btn-inverted'
                            >
                                {loading ? <Spinner className='photos-spinner' animation="border" size="sm"/> :
                                    "Cancel My Place"
                                }

                            </Button>
                        </div>
                        :
                        <div className="header-join-btn">
                            <Button
                                onClick={handleUserJoinEvent}
                                variant={'light'}
                                className='my-blue-btn-invert'
                            >
                                {loading ? <Spinner className='photos-spinner' animation="border" size="sm"/> :
                                    "JOIN THIS EVENT"
                                }

                            </Button>
                        </div>
                    }
                </div>
                }
                {isHost &&
                <div className="header-event-btn ms-auto">
                    <Button as={Link} to={`/manage/${event.id}`} variant={'light'}>Manage Event</Button>
                </div>
                }
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
  .header-join-btn{
    .btn {
      min-width: 130px;
    }
  }
  .header-cancel-btn {
    margin-right: 5px;
    box-shadow: none ;
    .btn {
      min-width: 130px;
    }
    
  }
  .header-event-btn {
  .btn{
    background-color: #f7de62;
    color: #282828;
  }
  .btn:hover{
    background-color: #fad932;
    color: #282828;
  }
   
  }
  .host-text{
    a{
      color: #f1f1f1;
    }
    
  }
`