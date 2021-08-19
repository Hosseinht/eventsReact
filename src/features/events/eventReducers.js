import {
    CLEAR_COMMENTS,
    CREATE_EVENT,
    DELETE_EVENT,
    FETCH_EVENTS,
    LISTEN_TO_EVENT_CHAT,
    UPDATE_EVENT
} from "./eventConstant";


const initialState = {
    events: [],
    comments: [],
    moreEvents: false
}

// action = {type, payload}. we simply remove action. .
export const eventReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case CREATE_EVENT:
            return {
                ...state,
                events: [...state.events, payload]
                // We never interested in mutating in redux (events.push). we always want our states to be immutable
                // we want original Array of events(events = sampleData in initialState) and pass the payload which is our new event
            }
        case UPDATE_EVENT:
            return {
                ...state,
                events: [...state.events.filter(evt => evt.id !== payload.id), payload]
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: [...state.events.filter(evt => evt.id !== payload)]
                // payload here is eventId in action.so we don't use payload.id
                // اگه یکی نیستن فیلترش کن
            }
        case FETCH_EVENTS:
            return {
                ...state,
                // events: [...payload]
                // events are array anyway so we don't need to spread this action so:
                events: [...state.events, ...payload.events],
                moreEvents: payload.moreEvents
            }
        case LISTEN_TO_EVENT_CHAT:
            return {
                ...state,
                comments: payload
            }
        case CLEAR_COMMENTS:
            return {
                ...state,
                comments: []
            }
        default:
            return state

    }
};


