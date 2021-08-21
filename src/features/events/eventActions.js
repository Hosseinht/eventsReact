import {
    CREATE_EVENT,
    DELETE_EVENT,
    UPDATE_EVENT,
    FETCH_EVENTS,
    LISTEN_TO_EVENT_CHAT,
    LISTEN_TO_SELECTED_EVENTS,
    CLEAR_EVENTS,
    SET_FILTER,
    SET_START_DATE, CLEAR_SELECTED_EVENTS
} from "./eventConstant";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../../app/async/asyncReducer";
import fetchEventsFromFirestore, {dataFromSnapshot} from "../../app/firestore/firestoreService";


export const fetchEvents = (filter, startDate, limit, lastDocSnapshot) => async (dispatch) => {
    dispatch(asyncActionStart())
    try {
        const snapshot = await fetchEventsFromFirestore(filter, startDate, limit, lastDocSnapshot).get()
        const lastVisible = snapshot.docs[snapshot.docs.length - 1]
        const moreEvents = snapshot.docs.length >= limit
        const events = snapshot.docs.map(doc => dataFromSnapshot(doc))
        dispatch({type: FETCH_EVENTS, payload: {events, moreEvents, lastVisible}})
        dispatch(asyncActionFinish())
    } catch (error) {
        dispatch(asyncActionError(error))
    }
};

export const setFilter = (value) => {
    return function (dispatch) {
        dispatch(clearEvents());
        dispatch({type: SET_FILTER, payload: value})
    }
}


export const setStartDate = (date) => {
    return function (dispatch) {
        dispatch(clearEvents());
        dispatch({type: SET_START_DATE, payload: date})
    }
}


export const listenToSelectedEvents = (event) => {
    return {
        type: LISTEN_TO_SELECTED_EVENTS,
        payload: event
    }
};

export const clearSelectedEvents = () => {
    return {
        type:CLEAR_SELECTED_EVENTS
    }
}


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

export const listenToEventChat = (comments) => {
    return {
        type: LISTEN_TO_EVENT_CHAT,
        payload: comments
    }
}

export const clearEvents = () => {
    return {
        type: CLEAR_EVENTS
    }
}
