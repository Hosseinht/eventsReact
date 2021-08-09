import React, {useState} from 'react';

import styled from "styled-components";

import {BsPersonFill, BsTrashFill} from "react-icons/bs";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import {deletePhotosFromCollection, getUserPhotos, setMainPhoto} from "../../../app/firestore/firestoreService";
import {useDispatch, useSelector} from "react-redux";
import {listenToUserPhotos} from "../profileActions";
import Spinner from "react-bootstrap/cjs/Spinner";
import {toast} from "react-toastify";
import {deleteFromFirebaseStorage} from "../../../app/firestore/firebaseService";

const PhotoTab = ({profile, isCurrentUser}) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const {loading} = useSelector(state => state.async)
    const {photos} = useSelector(state => state.profile)
    const [updating, setUpdating] = useState({isUpdating: false, target: null})
    const [deleting, setDeleting] = useState({isDeleting: false, target: null})

    useFirestoreCollection({
        query: () => getUserPhotos(profile.id),
        data: (photos) => dispatch(listenToUserPhotos(photos)),
        deps: [profile.id, dispatch]
    })

    // Function to handle updating the photos
    async function handleSetMainPhoto(photo, target) {
        setUpdating({isUpdating: true, target});
        try {
            await setMainPhoto(photo)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setUpdating({isUpdating: false, target: null})
        }
    }

    async function handleDeletePhoto(photo, target) {
        setDeleting({isDeleting: true, target})
        try {
            await deleteFromFirebaseStorage(photo.name)
            await deletePhotosFromCollection(photo.id)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setDeleting({isDeleting: false, target: null})
        }
    }

    return (
        <PhotoTabWrapper>
            {loading ? <Spinner className='photos-spinner' animation='grow'/> :
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
                            <div className='d-flex justify-content-center align-items-center flex-wrap '>
                                {photos.map((photo) => (
                                    <Card key={photo.id} className='border-0 mt-5 me-3 mb-3' style={{width: '200px'}}>
                                        <Card.Img  src={photo.url}/>
                                        <Card.Body className='ms-1 mt-1 p-0'>
                                            {/*callback func because we need photo as a parameter*/}
                                            <Button
                                                onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                                                disabled={photo.url === profile.photoURL}
                                                variant='light'
                                                className='my-blue-btn-invert'
                                                name={photo.id}>
                                                {updating.isUpdating && updating.target === photo.id ?
                                                    <Spinner className='photos-spinner-btn' size='sm'
                                                             animation='border'/> :
                                                    "Main"
                                                }
                                            </Button>{' '}
                                            <Button
                                                onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                                                disabled={photo.url === profile.photoURL}
                                                variant='light'
                                                className='my-red-btn-inverted '
                                                name={photo.id}>
                                                {deleting.isDeleting && deleting.target === photo.id ?
                                                    <div>
                                                        <Spinner className='photos-spinner-btn' size='sm'
                                                                 animation='border'/>
                                                    </div>
                                                    :
                                                    <BsTrashFill/>
                                                }

                                            </Button>
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
  position: relative;
 
  .my-blue-btn-invert{
    width: 95px;
  }
  .my-red-btn-inverted{
    width: 95px;
  }
  .photos-spinner {
    position: absolute;
    margin-top: 25vh;
    left: 50%;
    z-index: 10000;
  }

`