import {combineReducers} from "redux";
import testReducer from "../../features/sandbox/testReducer";
import {eventReducer} from "../../features/events/eventReducers";

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer
})
export default rootReducer;