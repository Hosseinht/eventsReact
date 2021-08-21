import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {getUserProfile} from "../../../app/firestore/firestoreService";
import {listenToSelectedProfile} from "../profileActions";

import LoadingComponent from "../../../app/layout/LoadingComponents";

const ProfilePage = ({match}) => {
    const dispatch = useDispatch()
    const {selectedUserProfile, currentUserProfile } = useSelector((state) => state.profile)
    const {currentUser} = useSelector(state => state.auth)
    const {loading, error} = useSelector((state) => state.async)
    let profile;
    useFirestoreDoc({
        query: () => getUserProfile(match.params.id),
        data: profile => dispatch(listenToSelectedProfile(profile)),
        deps: [dispatch, match.params.id],
        shouldExecute: match.params.id !== currentUser.uid

    })
    if (match.params.id === currentUser.uid) {
        profile = currentUserProfile
    } else {
        profile = selectedUserProfile
    }
    if ((loading && !profile) || (!profile && !error)) return <LoadingComponent/>
    // if ((loading && !selectedUserProfile) || (!currentUser) || (!selectedUserProfile && !error)) return <LoadingComponent/>

    return (
        <Container>
            <Row>
                <Col>
                    {/*{currentUser && }*/}
                    <ProfileHeader profile={profile}
                                   isCurrentUser={currentUser.uid === profile.id}/>
                    <ProfileContent profile={profile}
                                    isCurrentUser={currentUser.uid === profile.id}/>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
