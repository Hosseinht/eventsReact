import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS} from "./eventConstant";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../../app/async/asyncReducer";
import delay from "../../app/common/util/util";
import {toast} from "react-toastify";
import {fetchSampleData} from "../../app/api/mockApi";



export const loadEvents = () => async (dispatch) => {
    dispatch(asyncActionStart())
    try {
        const events = await fetchSampleData()
        dispatch({type:FETCH_EVENTS, payload:events})
        dispatch(asyncActionFinish())
    } catch (error) {
        dispatch(asyncActionError(error))
    }
};

export const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: event
    }
};

export const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: event
    }
};

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        payload: eventId
    }
};



