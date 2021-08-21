import {
    CLEAR_COMMENTS, CLEAR_EVENTS, CLEAR_SELECTED_EVENTS,
    CREATE_EVENT,
    DELETE_EVENT,
    FETCH_EVENTS,
    LISTEN_TO_EVENT_CHAT, LISTEN_TO_SELECTED_EVENTS, RETAIN_STATE, SET_FILTER, SET_START_DATE,
    UPDATE_EVENT
} from "./eventConstant";


const initialState = {
    events: [],
    comments: [],
    moreEvents: true,
    selectedEvent: null,
    lastVisible: null,
    filter: 'all',
    startDate: new Date(),
    retainState: false,
    // the is the flag to see if we want to keep the events we already have in memory
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
                moreEvents: payload.moreEvents,
                lastVisible: payload.lastVisible
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
        case LISTEN_TO_SELECTED_EVENTS:
            return {
                ...state,
                selectedEvent: payload
            }
        case CLEAR_SELECTED_EVENTS:
            return {
                ...state,
                selectedEvent:null
            }
        case CLEAR_EVENTS:
            return {
                ...state,
                events: [],
                moreEvents: true,
                lastVisible: null,
            };
        case SET_FILTER:
            return {
                ...state,
                retainState: false,
                moreEvents: true,
                filter: payload,
            };
        case SET_START_DATE:
            return {
                ...state,
                retainState: false,
                moreEvents: true,
                startDate: payload,
            };
        case RETAIN_STATE:
            return {
                ...state,
                retainState: true,
            };
        default:
            return state

    }
};


