import React, {useState} from 'react';
import {format} from 'date-fns'
import styled from "styled-components";

import {BsFillCalendarFill} from "react-icons/bs";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/cjs/Spinner";
import {useDispatch, useSelector} from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {getUserEventQuery} from "../../../app/firestore/firestoreService";
import {listenToUserEvents} from "../profileActions"
import {Link} from "react-router-dom";

const EventsTab = ({profile}) => {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("hosting")
    const {profileEvents} = useSelector(state => state.profile)
    const {loading} = useSelector(state => state.async)


   useFirestoreCollection({
    query: () => getUserEventQuery(activeTab, profile.id),
    data: (events) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id],
  });
    return (
        <EventTabWrapper>
            {loading ? <Spinner animation={"border"}/> :
            <>
                <div className='d-flex justify-content-between '>
                    <div className="name-part d-flex align-items-center">
                        <BsFillCalendarFill className='me-1' size='30px'/>
                        <span>Events </span>
                    </div>
                </div>

                <div className='  mt-5 w-100 '>
                    <Tabs
                        defaultActiveKey={activeTab}
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3 border-0 w-100 d-flex justify-content-center"
                        variant='pills'
                         onSelect={(k) => setActiveTab(k)}

                    >
                        <Tab  tabClassName='me-5' eventKey="future events" title="Future Events">
                            <div className='d-flex justify-content-start align-items-center flex-wrap '>
                                {profileEvents.map(event => (
                                    <Card as={Link} to={`/events/${event.id}`}
                                          className='border-0 ms-auto me-auto mt-5  mb-3' style={{width: '200px'}}
                                          key={event.id}>
                                        <Card.Img  src={`/assets/categoryImages/${event.category}.jpg`}/>
                                        <Card.Body className='ms-1 mt-1 p-0 d-flex flex-column align-items-center'>
                                            <span className=''><strong>{event.title}</strong></span>
                                           <div>{format(event.date,'dd MMM yyyy')}</div>
                                            <div>{format(event.date,'hh:mm a')}</div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>
                        <Tab tabClassName='me-5' eventKey="past events" title="Past Events">
                            <div className='d-flex justify-content-start align-items-center flex-wrap '>
                                {profileEvents.map(event => (
                                    <Card as={Link} to={`/events/${event.id}`}
                                          className='border-0 ms-auto me-auto mt-5  mb-3' style={{width: '200px'}}
                                          key={event.id}>
                                        <Card.Img src={`/assets/categoryImages/${event.category}.jpg`}/>
                                        <Card.Body className='ms-1 mt-1 p-0 d-flex flex-column align-items-center'>
                                            <span className=''><strong>{event.title}</strong></span>
                                           <div>{format(event.date,'dd MMM yyyy')}</div>
                                            <div>{format(event.date,'hh:mm a')}</div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>
                        <Tab tabClassName='me-5' eventKey="hosting" title="Hosting">
                            <div className='d-flex justify-content-start align-items-center flex-wrap '>
                                {profileEvents.map(event => (
                                    <Card as={Link} to={`/events/${event.id}`}
                                          className='border-0 ms-auto me-auto mt-5  mb-3' style={{width: '200px'}}
                                          key={event.id}>
                                        <Card.Img src={`/assets/categoryImages/${event.category}.jpg`}/>
                                        <Card.Body className='ms-1 mt-1 p-0 d-flex flex-column align-items-center'>
                                            <span className=''><strong>{event.title}</strong></span>
                                           <div>{format(event.date,'dd MMM yyyy')}</div>
                                            <div>{format(event.date,'hh:mm a')}</div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Tab>


                    </Tabs>
                </div>
            </>
            }
        </EventTabWrapper>
    );
};

export default EventsTab;

const EventTabWrapper = styled.div`
  .nav-pills .nav-link.active, .nav-pills .show > .nav-link{
      background-color: white;
      color: black;
      border-bottom: 1px solid #36bff7;
      border-radius: 0;
  }

`