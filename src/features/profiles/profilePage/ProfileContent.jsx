import React, {useState} from 'react';
import styled from "styled-components";
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import AboutTab from "./AboutTab";
import PhotoTab from "./PhotosTab";
import EventsTab from "./EventsTab";
import FollowingTab from "./FollowingTab";

const ProfileContent = ({profile, isCurrentUser}) => {
    const [activeTab, setActiveTab] = useState("about")
    return (
        <ProfileContentWrapper className=' d-flex justify-content-center align-items-center'>

            <Container className='profile-content-container w-75 mt-5 my-box-shadow'>
                <Tabs
                    defaultActiveKey={activeTab}
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                     onSelect={(k) => setActiveTab(k)}

                >

                    <Tab eventKey="about" title="About" >
                        <AboutTab profile={profile} isCurrentUser={isCurrentUser}/>
                    </Tab>
                    <Tab eventKey="photos" title="Photos">
                        <PhotoTab profile={profile} isCurrentUser={isCurrentUser}/>
                    </Tab>
                    <Tab eventKey="events" title="Events">
                       <EventsTab  profile={profile} isCurrentUser={isCurrentUser}/>
                    </Tab>
                    <Tab eventKey="followers" title="Followers">
                      <FollowingTab key={profile.id} profile={profile} defaultActiveKey={activeTab}/>
                    </Tab>
                    <Tab eventKey="following" title="Following">
                      <FollowingTab key={profile.id} profile={profile} defaultActiveKey={activeTab}/>
                    </Tab>

                </Tabs>
            </Container>
        </ProfileContentWrapper>

    );
};

export default ProfileContent;

const ProfileContentWrapper = styled.div`
  .profile-content-container{
    min-height: 500px;
  }
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #36bff7;
  }
  .nav-link {
    color: #212529;

  }

`