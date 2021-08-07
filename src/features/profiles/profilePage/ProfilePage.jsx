import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import {useDispatch, useSelector} from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {getUserProfile} from "../../../app/firestore/firestoreService";
import {listenToSelectedProfile} from "../profileActions";
import LoadingComponent from "../../../app/layout/LoadingComponents";

const ProfilePage = ({match}) => {
    const dispatch = useDispatch()
    const {selectedUserProfile} = useSelector((state) => state.profile)
    const {currentUser} = useSelector(state => state.auth)
    const {loading, error} = useSelector((state) => state.async)

    useFirestoreDoc({
        query: () => getUserProfile(match.params.id),
        data: profile => dispatch(listenToSelectedProfile(profile)),
        deps: [dispatch, match.params.id],

    })
    if ((loading && !selectedUserProfile) || (!currentUser) || (!selectedUserProfile && !error)) return <LoadingComponent/>

    return (
        <Container>
            <Row>
                <Col>
                    {/*{currentUser && }*/}
                    <ProfileHeader profile={selectedUserProfile}
                                   isCurrentUser={currentUser.uid === selectedUserProfile.id}/>
                    <ProfileContent profile={selectedUserProfile}  isCurrentUser={currentUser.uid === selectedUserProfile.id}/>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
