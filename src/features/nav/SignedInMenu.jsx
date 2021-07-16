import React from 'react';
import {Dropdown, Image, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

const SignedInMenu = () => {
    return (
        <div>
            <Menu.Item position='right'>
                <Image avatar spaced='right' src='/assets/user.png'/>
                <Dropdown pointing='top left' text="Bob">
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon='plus'/>
                        <Dropdown.Item text="My Profile" icon='user'/>
                        <Dropdown.Item text="Sign out" icon='power'/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>

    );
};

export default SignedInMenu;
