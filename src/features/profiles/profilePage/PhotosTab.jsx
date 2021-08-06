import React, {useState} from 'react';

import styled from "styled-components";

import {BsPersonFill, BsTrashFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";

const PhotoTab = ({profile, isCurrentUser}) => {
    const [edit, setEdit] = useState(true)

    return (
        <PhotoTabWrapper>
            <div className='d-flex justify-content-between '>
                <div className="name-part d-flex align-items-center">
                    <BsPersonFill className='me-1' size='30px'/>
                    <span>Photos </span>
                </div>
                {isCurrentUser &&
                <div className="btn-part">
                    <Button variant='light' className='my-blue-btn' onClick={() => setEdit(!edit)}>
                        {edit ? 'Cancel' : 'Add Photo'}
                    </Button>
                </div>
                }
            </div>
            <div>
                {edit ? (
                    <PhotoUploadWidget setEdit={setEdit}/>
                ) : (
                    <>
                        <Card className='border-0 mt-3' style={{width:'200px'}}>
                            <Card.Img fluid src={'/assets/user.png'}/>
                            <Card.Body className='ms-1 mt-1 p-0'>
                                <Button variant='light' className='my-blue-btn-invert'>Main</Button>{' '}
                                <Button variant='light' className='my-red-btn-inverted '><BsTrashFill/></Button>
                            </Card.Body>
                        </Card>
                    </>
                )

                }
            </div>
        </PhotoTabWrapper>
    );
};

export default PhotoTab;

const PhotoTabWrapper = styled.div`
  
  .my-blue-btn-invert{
    width: 95px;
  }
  .my-red-btn-inverted{
    width: 95px;
  }

`