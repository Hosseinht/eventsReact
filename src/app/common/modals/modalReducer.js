const OPEN_MODAL = "OPEN_MODAL"
const CLOSE_MODAL = "CLOSE_MODAL"


export const openModal = (payload) => {
    return {
        type: OPEN_MODAL,
        payload
    }
};


export const closeModal = () => {
    return {
        type: CLOSE_MODAL,

    }
};

const initialState = null;

export const modalReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case OPEN_MODAL:
            // inside our payload, we're going to take or have the option to pass in the Modal type. a register modal or a login modal etc
            // nd will also provide the ability to send a maid or some properties as well.So what we'll do is we'll restructure what we're going to get from our payload and we'll specify a modal
            //type and also modal props.Anything that we want to display inside the model that we get from our component is what is going to be inside the modalProps
            const {modalType, modalProps} = payload;
            return {modalType, modalProps};
            // inside of state we will have modalType & modalProps
        case CLOSE_MODAL:
            return null;
        default:
            return state
    }
}
