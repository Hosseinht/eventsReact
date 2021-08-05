import React from 'react';

import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const ProfileHeader = ({profile, isCurrentUser}) => {
    return (
        <ProfileHeaderWrapper className='d-flex  justify-content-center'>
            <Container className='w-75 my-box-shadow '>
                <Card
                    className='border-0 profile-header-card d-flex flex-wrap justify-content-between align-items-center flex-lg-row flex-sm-column'>
                    <div>
                        <Image className='profile-img p-2' rounded fluid src={profile.photoURL || '/assets/user.png'}/>
                    </div>
                    <div className='d-flex justify-content-center align-items-center flex-column w-50 p-2'>
                        <h4>{profile.displayName}</h4>
                        <div className='d-flex'>
                            <div className="d-flex p-3 flex-column  align-items-center"><span
                                className="followers">Followers</span> <span
                                className="number2">980</span></div>
                            <div className="d-flex p-3 flex-column align-items-center"><span
                                className="rating">Following</span> <span
                                className="number3">8.9</span></div>
                        </div>
                        {!isCurrentUser &&
                        <Button className='my-blue-btn-invert following-btn'>
                            Following
                        </Button>
                        }
                    </div>
                </Card>
            </Container>
        </ProfileHeaderWrapper>
    );
};

export default ProfileHeader;

const ProfileHeaderWrapper = styled.div`
  .profile-header-card{
     min-height: 200px;
  }
 
  //max-width: 1080px;
  .profile-img {
    max-width: 180px;
    max-height: 180px;
  }
  .following-btn {
    width: 160px;
  }
 
    

`