import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-calendar/dist/Calendar.css'
import './index.css';
import App from './app/layout/App.jsx';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import configureStore from "./app/store/configureStore";
import {history} from "./app/store/configureStore"
import ScrollToTop from "./app/layout/ScrollToTop";
import {ConnectedRouter} from "connected-react-router";


const store = configureStore()

//store has access to dispatch that we used in action creators. we can use it here

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop/>
            <App/>,
        </ConnectedRouter>
    </Provider>,

    document.getElementById('root')
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
