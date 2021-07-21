import React from 'react';
import {useSelector} from "react-redux";
import TestModal from "../../../features/sandbox/TestModal";
import LoginForm from "../../../features/auth/LoginForm";

const ModalManager = () => {
    // Select a specific modal and display it on our page
    // inside we will have a kind of lookup object to check which type of modal we want to open
    const modalLookup = {
        TestModal,
        LoginForm,
    }
    const currentModal = useSelector(state => state.modals)
    // when we open a modal there's going to be something inside our state.and it will be store in currentModal
    let renderModal;
    if (currentModal) {
        // if there is currentModa we will have access to modalType, modalProps
        const {modalType, modalProps} = currentModal
        // make a ModalComponent and set it to type of modal that we are going to be opening
        const ModalComponent = modalLookup[modalType]
        renderModal = <ModalComponent {...modalProps} />
    }
    return <span>{renderModal}</span>
};

export default ModalManager;
