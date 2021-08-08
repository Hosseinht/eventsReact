import React, {useState} from 'react';
import {format} from 'date-fns'
import styled from "styled-components";

import {BsFillCalendarFill, BsTrashFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import ProfileForm from "./ProfileForm";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AboutTab from "./AboutTab";
import PhotoTab from "./PhotosTab";
import Container from "react-bootstrap/Container";
import Fade from "react-bootstrap/Fade";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/cjs/Spinner";

const EventsTab = ({profile, isCurrentUser}) => {
    const [activeTab, setactiveTab] = useState(false)

    return (
        <EventTabWrapper>
            <div className='d-flex justify-content-between '>
                <div className="name-part d-flex align-items-center">
                    <BsFillCalendarFill className='me-1' size='30px'/>
                    <span>Events </span>
                </div>
            </div>

            <div className='  mt-5 w-100 '>
                <Tabs
                    defaultActiveKey="about"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3 border-0 w-100 "
                    variant='pills'

                >
                        <Tab tabClassName=' me-5' eventKey="future events" title="Future Events">
                            <div className='d-flex justify-content-start align-items-center flex-wrap '>
                                <Card className='border-0 mt-5 me-3 mb-3' style={{width: '200px'}}>
                                    <Card.Img fluid src='/assets/categoryImages/drinks.jpg'/>
                                    <Card.Body className='ms-1 mt-1 p-0 d-flex flex-column align-items-center'>
                                        <span className='r'><strong>Title</strong></span>
                                        <div>Date</div>
                                        <div>Time</div>
                                    </Card.Body>
                                </Card>

                            </div>
                        </Tab>
                        <Tab tabClassName=' me-5' eventKey="past events" title="Past Events">
                            <div className='d-flex justify-content-start align-items-center flex-wrap '>
                                <Card className='border-0 mt-5 me-3 mb-3' style={{width: '200px'}}>
                                    <Card.Img fluid src='/assets/categoryImages/drinks.jpg'/>
                                    <Card.Body className='ms-1 mt-1 p-0 d-flex flex-column align-items-center'>
                                        <span className='r'><strong>Title</strong></span>
                                        <div>Date</div>
                                        <div>Time</div>
                                    </Card.Body>
                                </Card>

                            </div>n
                        </Tab>
                        <Tab tabClassName=' me-5' eventKey="hosting" title="Hosting">
                            <div className='d-flex justify-content-start align-items-center flex-wrap '>
                                <Card className='border-0 mt-5 me-3 mb-3' style={{width: '200px'}}>
                                    <Card.Img fluid src='/assets/categoryImages/drinks.jpg'/>
                                    <Card.Body className='ms-1 mt-1 p-0 d-flex flex-column align-items-center'>
                                        <span className='r'><strong>Title</strong></span>
                                        <div>Date</div>
                                        <div>Time</div>
                                    </Card.Body>
                                </Card>

                            </div>
                        </Tab>


                </Tabs>
            </div>

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