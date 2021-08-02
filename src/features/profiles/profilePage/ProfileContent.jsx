import React from 'react';
import styled from "styled-components";
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

const ProfileContent = () => {
    return (
        <ProfileContentWrapper className=' d-flex justify-content-center align-items-center'>

            <Container className='profile-content-container w-75 mt-5 my-box-shadow'>
                <Tabs
                    defaultActiveKey="about"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >

                    <Tab eventKey="about" title="About">
                        Not
                    </Tab>
                    <Tab eventKey="photos" title="Photos">
                        Why
                    </Tab>
                    <Tab eventKey="events" title="Events">
                        HI
                    </Tab>
                    <Tab eventKey="followers" title="Followers">
                        HI
                    </Tab>
                    <Tab eventKey="following" title="Following">
                        HI
                    </Tab>

                </Tabs>
            </Container>
        </ProfileContentWrapper>

    );
};

export default ProfileContent;

const ProfileContentWrapper = styled.div`
  .profile-content-container{
    min-height: 300px;
  }
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #36bff7;
  }
  .nav-link {
    color: #212529;

  }

`