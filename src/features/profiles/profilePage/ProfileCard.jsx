import React from 'react';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

const ProfileCard = ({profile}) => {
    return (
        <div >
            <Card className='mt-5 m-2' border='0' as={Link} to={`/profile/${profile.id}`} style={{width: '9rem'}}>
                <Card.Img variant="top" src={profile.photoURL || "assets/user.png"}/>
                <Card.Body>
                    <Card.Text className='text-center'>{profile.displayName}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfileCard;
