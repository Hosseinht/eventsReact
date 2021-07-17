import React from 'react';
import './NavBar.css'
import {NavLink, Link} from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import styled from "styled-components";

//Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";


const NavBar = ({setFormOpen, formOpen}) => {
    // const toggleHandler = () => {
    //     setFormOpen(!formOpen)
    // }
    return (
        <NavbarCustom>
            <Navbar className='' expand="lg">
                <Container className='py-3'>
                    <Navbar.Toggle className="mx-sm-5" aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className='justify-content-between ' id="basic-navbar-nav">
                        <Nav className=" align-items-center mx-sm-5 align-items-sm-start ">
                            <Navbar.Brand as={Link} to='/events' className='fs-3 py-3 events-logo'
                                          href="#home">Eeavents</Navbar.Brand>
                            <Button as={NavLink} to="/createEvent" className='py-2 newevent-btn' href="#home">New
                                Event</Button>
                        </Nav>
                        <Nav className='justify-content-evenly login-register-btn w-50 mx-sm-5 align-items-sm-start'>
                            <SignedOutMenu/>
                            <SignedInMenu/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </NavbarCustom>

    );
};

export default NavBar;

const NavbarCustom = styled.div`
  .events-logo{
      :focus{
      color: #FF4242
      }
      ::selection{
        color: white;
      }
      
      color: #FF4242;
  }
  .nav-link {
    margin-top: 3px;
  }
  .login-register-btn {
    
    margin-top: 10px;
  }
  .newevent-btn {
    background-color: #95D2EC;
    color: rgba(255,255,255,0.95);
    margin-top: 10px;
    border: none;
    box-shadow: none !important;
    
    :hover {
    color: rgb(255,255,255);
    background-color:  #47abd8;
    }
  }
`

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

//
// <Menu borderless fixed='top'>
//             <Container>
//                 <Menu.Item header exact as={Link} to='/events' className="nav-logo" name='Eeavents'/>
//                 {/*<Menu.Item  as={NavLink} to='/events'  name='List'/>*/}
//                 <Menu.Item>
//                     <Button as={NavLink} to="/createEvent" className='newevent-btn ' basic
//                             onClick={() => setFormOpen(true)} content='Create Event'/>
//                 </Menu.Item>
//                 <SignedOutMenu/>
//                 <UserInfoMenu>
//                     <SignedInMenu/>
//                 </UserInfoMenu>
//
//             </Container>
//         </Menu>