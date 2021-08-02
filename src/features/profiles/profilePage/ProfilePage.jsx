import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col >
                        <ProfileHeader/>
                        <ProfileContent/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;
