import {CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS, LISTEN_TO_EVENT_CHAT} from "./eventConstant";
import {asyncActionError, asyncActionFinish, asyncActionStart} from "../../app/async/asyncReducer";
import fetchEventsFromFirestore, {dataFromSnapshot} from "../../app/firestore/firestoreService";


export const fetchEvents = (predicate, limit, lastDocSnapshot) => async (dispatch) => {
    dispatch(asyncActionStart())
    try {
        const snapshot = await fetchEventsFromFirestore(predicate, limit, lastDocSnapshot).get()
        const lastVisible = snapshot.docs[snapshot.docs.length - 1]
        const moreEvents = snapshot.docs.length >= limit
        const events = snapshot.docs.map(doc => dataFromSnapshot(doc))
        dispatch({type: FETCH_EVENTS, payload: {events, moreEvents}})
        dispatch(asyncActionFinish())
        return lastVisible
    } catch (error) {
        dispatch(asyncActionError(error))
    }
};

export const listenToEvents = (events) => {
    return {
        type: FETCH_EVENTS,
        payload: events
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

export const listenToEventChat = (comments) => {
    return {
        type: LISTEN_TO_EVENT_CHAT,
        payload: comments
    }
}


