import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import {useDispatch, useSelector} from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import {getUserProfile} from "../../../app/firestore/firestoreService";
import {listenToCurrentProfile} from "../profileActions";
import LoadingComponent from "../../../app/layout/LoadingComponents";

const ProfilePage = ({match}) => {
    const dispatch = useDispatch()
    const {currentUserProfile} = useSelector((state) => state.profile)
    const {loading, error} = useSelector((state) => state.async)

    useFirestoreDoc({
        query: () => getUserProfile(match.params.id),
        data: profile => dispatch(listenToCurrentProfile(profile)),
        deps: [dispatch, match.params.id],

    })
    if ((loading && !currentUserProfile) || (!currentUserProfile && !error)) return <LoadingComponent/>

    return (
        <Container>
            <Row>
                <Col>
                    <ProfileHeader profile={currentUserProfile}/>
                    <ProfileContent profile={currentUserProfile}/>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
