import React from 'react';
import styled from "styled-components";
import {BsPersonFill} from "react-icons/bs";
import ProfileCard from "./ProfileCard";
import {useDispatch, useSelector} from "react-redux";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {getFollowersCollection, getFollowingCollection} from "../../../app/firestore/firestoreService";
import {listenToFollowers, listenToFollowings} from "../profileActions";

const FollowingTab = ({profile, defaultActiveKey}) => {
    const dispatch = useDispatch()
    const {followings, followers} = useSelector(state => state.profile)

    useFirestoreCollection({
        query:
            defaultActiveKey === 'followers'
                ? () => getFollowersCollection(profile.id)
                : () => getFollowingCollection(profile.id),
        data: data => defaultActiveKey === 'followers'
            ? dispatch(listenToFollowers(data))
            : dispatch(listenToFollowings(data)),
        deps: [defaultActiveKey, dispatch]
    })

    return (
        <AboutTabWrapper>
            <div className='d-flex justify-content-between '>
                <div className="name-part d-flex align-items-center">
                    <BsPersonFill className='me-1' size='30px'/>
                    <span>Followers</span>
                </div>
            </div>
            <div className='d-flex'>
                {defaultActiveKey === 'followers' &&
                    followers.map(profile => (
                         <ProfileCard profile={profile} key={profile.id}/>
                    ))
                }
                 {defaultActiveKey === 'following' &&
                    followings.map(profile => (
                         <ProfileCard profile={profile} key={profile.id}/>
                    ))
                }
            </div>
        </AboutTabWrapper>
    );
};

export default FollowingTab;

const AboutTabWrapper = styled.div`


`