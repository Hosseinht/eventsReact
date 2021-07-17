import React from 'react';
import {Link} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

//Bootstrap
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import {BsPlus, BsPersonFill, BsPower} from "react-icons/bs";

const SignedInMenu = ({setAuthenticated}) => {
    return (
        <SignedinMenuWrapper>
            <Image roundedCircle fluid className='user-img' src='/assets/user.png'/>
            <NavDropdown className='fs-5' title="Bob" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"><BsPlus className='singin-icon' size='20px'/> Create
                    Event</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2"><BsPersonFill className='singin-icon' size='20px'/> My
                    profile</NavDropdown.Item>
                <NavDropdown.Item onClick={()=> setAuthenticated(false)} href="#action/3.3"><BsPower className='singin-icon' size='20px'/> Sign
                    out</NavDropdown.Item>
            </NavDropdown>
        </SignedinMenuWrapper>

    );
};

export default SignedInMenu;

const SignedinMenuWrapper = styled.div`
    display: flex;
    
    .user-img{
      width: 30px;
      height: 30px;
      margin-right: 5px;
      margin-top: 4px;
    }
    .singin-icon{
      margin-right: 5px;
    }
`


//
// <div>
//             <Menu.Item position='right'>
//                 <Image avatar spaced='right' src='/assets/user.png'/>
//                 <Dropdown pointing='top left' text="Bob">
//                     <Dropdown.Menu>
//                         <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon='plus'/>
//                         <Dropdown.Item text="My Profile" icon='user'/>
//                         <Dropdown.Item text="Sign out" icon='power'/>
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </Menu.Item>
//         </div>