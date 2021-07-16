import React from 'react';
import {Button, Menu} from "semantic-ui-react";

const SignedOutMenu = () => {
    return (
        <Menu.Item position='right'>
            <Button className={"login-btn"} basic content='Login'/>
            <Button className={'signup-btn'} basic content='Register' style={{marginLeft: '0.5em'}}/>
        </Menu.Item>
    );
};

export default SignedOutMenu;
