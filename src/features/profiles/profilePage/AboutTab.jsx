import React, {useState} from 'react';
import {format} from 'date-fns'
import styled from "styled-components";

import {BsPersonFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import ProfileForm from "./ProfileForm";

const AboutTab = ({profile, isCurrentUser}) => {
    const [edit, setEdit] = useState(false)

    return (
        <AboutTabWrapper>
            <div className='d-flex justify-content-between '>
                <div className="name-part d-flex align-items-center">
                    <BsPersonFill className='me-1' size='30px'/>
                    <span>About  <strong> {profile.displayName}</strong></span>
                </div>
                {isCurrentUser &&
                <div className="btn-part">
                    <Button variant='light' className='my-blue-btn' onClick={() => setEdit(!edit)}>
                        {edit ? 'Cancel' : 'Edit'}
                    </Button>
                </div>
                }
            </div>
            <div>
                {edit ? (
                    <ProfileForm profile={profile}/>
                ) : (
                    <>
                        <div>
                            <span><strong>Member Since: {format(profile.createdAt, 'dd MMM yyyy')}</strong></span>
                            <div>{profile.description || null}</div>
                        </div>
                    </>
                )

                }
            </div>
        </AboutTabWrapper>
    );
};

export default AboutTab;

const AboutTabWrapper = styled.div`


`