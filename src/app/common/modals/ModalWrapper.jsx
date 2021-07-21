import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {closeModal} from "./modalReducer";

const ModalWrapper = ({children, size, header}) => {
    const dispatch = useDispatch()
    // const [show, setShow] = useState(true);

    return (
        <>
            <Modal show={true} size={size} onHide={() => dispatch(closeModal())}>
                {header &&
                <Modal.Header >
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                }
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>
        // <Modal.Dialog show={true} size={size} onClose={() => dispatch(closeModal())}>
        //     {header &&
        //     <Modal.Header closeButton>
        //         <Modal.Title>{header}</Modal.Title>
        //     </Modal.Header>
        //     }
        //
        //     <Modal.Body>
        //         {children}
        //         {/*anything inside openin and closing tag in ModalWrapper is considered to be children of the component*/}
        //     </Modal.Body>
        //
        //     <Modal.Footer>
        //         <Button variant="secondary">Close</Button>
        //         <Button variant="primary">Save changes</Button>
        //     </Modal.Footer>
        // </Modal.Dialog>


    )
        ;
};

export default ModalWrapper;
