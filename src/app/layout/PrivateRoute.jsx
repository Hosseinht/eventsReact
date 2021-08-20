import React from 'react';
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom'
import UnAuthModal from "../../features/auth/UnAuthModal";

const PrivateRoute = ({component: Component, prevLocation, ...rest}) => {
    const {authenticated} = useSelector(state => state.auth)

    return (
        <Route
            {...rest}
            render={(props) => authenticated ? <Component {...props} /> : <UnAuthModal {...props}/>} />
    );
};

export default PrivateRoute;
