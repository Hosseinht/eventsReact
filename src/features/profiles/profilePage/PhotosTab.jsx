import React, {useState} from 'react';

import styled from "styled-components";

import {BsPersonFill, BsTrashFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {getUserPhotos} from "../../../app/firestore/firestoreService";
import {useDispatch, useSelector} from "react-redux";
import {listenToUserPhotos} from "../profileActions";
import Spinner from "react-bootstrap/cjs/Spinner";

const PhotoTab = ({profile, isCurrentUser}) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const {loading} = useSelector(state => state.async)
    const {photos} = useSelector(state => state.profile)

    useFirestoreCollection({
        query: () => getUserPhotos(profile.id),
        data: photos => dispatch(listenToUserPhotos(photos)),
        deps: [profile.id, dispatch]
    })

    return (
        <PhotoTabWrapper>
            {loading ? <Spinner animation='grow'/> :
                <div>
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
                            <div className='d-flex flex-wrap '>
                                {photos.map((photo) => (
                                    <Card className='border-0 mt-5 me-3 mb-3' style={{width: '200px'}}>
                                        <Card.Img  fluid src={photo.url}/>
                                        <Card.Body className='ms-1 mt-1 p-0'>
                                            <Button variant='light' className='my-blue-btn-invert'>Main</Button>{' '}
                                            <Button variant='light'
                                                    className='my-red-btn-inverted '><BsTrashFill/></Button>
                                        </Card.Body>
                                    </Card>
                                ))}

                            </div>
                        )
                        }
                    </div>
                </div>
            }
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