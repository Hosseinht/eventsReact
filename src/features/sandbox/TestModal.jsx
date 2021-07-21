import React from 'react';
import ModalWrapper from "../../app/common/modals/ModalWrapper";

const TestModal = ({data}) => {
    return (
        <ModalWrapper  header='Test Modal' size='lg'>
            <div>The data is: {data}</div>
            {/*this is the children of modalWrapper*/}
        </ModalWrapper>
    );
};

export default TestModal;
