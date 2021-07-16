import React from 'react';
import {Menu, Container, Button} from "semantic-ui-react";
import './NavBar.css'
import {NavLink, Link} from "react-router-dom";

const NavBar = ({setFormOpen, formOpen}) => {
    // const toggleHandler = () => {
    //     setFormOpen(!formOpen)
    // }
    return (
        <Menu borderless fixed='top'>
            <Container>
                <Menu.Item header exact as={Link} to='/' className="nav-logo" name='Eeavents'/>
                <Menu.Item  as={NavLink} to='/events'  name='List'/>
                <Menu.Item>
                    <Button as={NavLink} to="/createEvent" className='newevent-btn ' basic onClick={() => setFormOpen(true)} content='Create Event'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Button className={"login-btn"} basic content='Login'/>
                    <Button className={'signup-btn'} basic content='Register' style={{marginLeft: '0.5em'}}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default NavBar;

// <nav className="nav-bg bg-white text-gray-700 fixed inset-x-0">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="flex justify-between">
//                     <div className="flex space-x-4">
//                         <div><a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"> <i
//                             className='bx bxl-medium-old mr-1 text-xl mb-1 text-blue-400'> </i> <span
//                             className="nav-logo text-xl  font-bold">Eeavents</span> </a></div>
//                         <div className=" flex items-center space-x-1">
//                             <a href="#"
//                                className="py-2 px-3 hover:bg-white hover:text-gray-700  newevent-btn text-gray-600 ">New
//                                 Event</a>
//                         </div>
//                     </div>
//                     <div className=" flex items-center rounded space-x-1">
//                         <a href="#"
//                            className="login-btn py-2 px-3  text-grey-800 hover:bg-gray-100 text-sm  hover:text-gray-700  transition duration-300">Login</a>
//                         <a href="#"
//                            className="signup-btn py-2 px-3  text-grey-800 hover:bg-gray-100 text-sm  hover:text-gray-700  transition duration-300">Signup</a>
//                     </div>
//                 </div>
//             </div>
//
//         </nav>