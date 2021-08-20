import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {openModal} from "../../app/common/modals/modalReducer";

const UnAuthModal = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()

    function handleClose() {
        setOpen(false)
    }

    return (
        <>
            <Modal show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>You need to be signed in to do that</Modal.Title>
                </Modal.Header>
                <div className='d-flex justify-content-center mt-5'>
                    <Button className='my-blue-btn-invert me-3'
                            onClick={() => dispatch(openModal({modalType: 'LoginForm'}))}>
                        Login
                    </Button>
                    <Button className='my-blue-btn-invert'
                            onClick={() => dispatch(openModal({modalType: 'RegisterForm'}))}>
                        Register
                    </Button>

                </div>
                <div className='d-flex flex-column justify-content-center align-items-center p-2 mt-5 mb-5'>
                    <span>Or click cancel to continue as a guest</span>
                    <Button className='my-red-btn-inverted mt-1' onClick={handleClose}>Cancel</Button>
                </div>

            </Modal>
        </>
    );
};

export default UnAuthModal;
