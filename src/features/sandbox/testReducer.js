export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'


export const increment = (amount) => async (dispatch) => {
    return {
        type:INCREMENT_COUNTER,
        payload: amount
    }
};

export const decrement = (amount) => {
    return {
        type:DECREMENT_COUNTER,
        payload: amount
    }
};



const initailState = {
    data: 42
}


const testReducer = (state = initailState, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }
        default:
            return state

    }
};

export default testReducer;
