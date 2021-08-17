import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import {followUser, getFollowingDoc, unfollowUser} from "../../../app/firestore/firestoreService";
import Spinner from "react-bootstrap/cjs/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {setFollowUser, setUnfollowUser} from "../profileActions";
import {CLEAR_FOLLOWINGS} from "../profileConsts";

const ProfileHeader = ({profile, isCurrentUser}) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('Following')
    const [buttonHover, setButtonHover] = useState(false)
    const [loading, setLoading] = useState(false)
    const {followingUser} = useSelector(state => state.profile)

    useEffect(() => {
        if (isCurrentUser) return;
        setLoading(true)

        async function fetchFollowingDoc() {
            try {
                const followingDoc = await getFollowingDoc(profile.id)
                if (followingDoc && followingDoc.exists) {
                    dispatch(setFollowUser())
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        fetchFollowingDoc().then(() => setLoading(false))
        return ()=> {
            dispatch({type: CLEAR_FOLLOWINGS})
        }
    }, [dispatch, profile.id, isCurrentUser])

    async function handleFollowUser() {
        setLoading(true)
        try {
            await followUser(profile)
            dispatch(setFollowUser())
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
            dispatch(setUnfollowUser())
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    function buttonOver() {
        setButtonHover(true)
        setText('Unfollow')
    }

    function buttonLeave() {
        setButtonHover(false)
        setText('Following')
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
                                className="number2">{profile.followerCount || 0}</span></div>
                            <div className="d-flex p-3 flex-column align-items-center"><span
                                className="rating">Following</span> <span
                                className="number3">{profile.followingCount || 0}</span></div>
                        </div>
                        {!isCurrentUser &&
                        <div>
                            {followingUser
                                ?
                                <Button
                                    onClick={() => handleUnfollowUser()}
                                    onMouseOver={() => buttonOver()}
                                    onMouseLeave={() => buttonLeave()}
                                    className={` ${buttonHover ? ' my-red-btn following-btn ' : 'my-blue-btn-invert following-btn '}`}
                                >
                                    {loading ? <Spinner animation='border' size={'sm'}/> : text}
                                </Button>
                                :
                                <Button
                                    onClick={handleFollowUser}
                                    className='my-blue-btn-invert  following-btn'
                                >
                                    {loading ? <Spinner animation='border' size={'sm'}/> : 'Follow'}
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