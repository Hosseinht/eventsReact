import React, {useState} from 'react';

import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import {followUser, unfollowUser} from "../../../app/firestore/firestoreService";
import Spinner from "react-bootstrap/cjs/Spinner";

const ProfileHeader = ({profile, isCurrentUser}) => {
    let initialText = 'Follow'
    const [text, setText] = useState('Follow')
    const [following, setFollowing] = useState(false)
    const [loading, setLoading] = useState(false)


    async function handleFollowUser() {
        setLoading(true)
        try {
            await followUser(profile)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleUnfollowUser() {
        setLoading(true)
        try {
            await unfollowUser(profile)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }


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
                        <div>
                            {following ?
                                <Button onClick={handleUnfollowUser}  className='my-blue-btn-invert following-btn'>
                                    {text}
                                </Button>
                                :
                                <Button
                                    onMouseOver={() => setText('Unfollow')}
                                    onMouseLeave={() =>setText(initialText)}
                                    className='my-blue-btn-invert following-btn'
                                    onClick={handleFollowUser}
                                >
                                    {loading ?
                                        <Spinner animation='border' size={'sm'}/>
                                        :
                                        "Following"
                                    }
                                </Button>
                            }
                        </div>

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