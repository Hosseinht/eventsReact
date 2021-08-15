import React from 'react';
import styled from "styled-components";
import {BsPersonFill} from "react-icons/bs";
import ProfileCard from "./ProfileCard";

const FollowingTab = ({profile}) => {

    return (
        <AboutTabWrapper>
            <div className='d-flex justify-content-between '>
                <div className="name-part d-flex align-items-center">
                    <BsPersonFill className='me-1' size='30px'/>
                    <span>Followers</span>
                </div>
            </div>
            <div className='d-flex'>
                <ProfileCard  profile={profile}/>
                <ProfileCard profile={profile}/>
                <ProfileCard profile={profile}/>
            </div>
        </AboutTabWrapper>
    );
};

export default FollowingTab;

const AboutTabWrapper = styled.div`


`