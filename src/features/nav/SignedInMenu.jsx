import React from 'react';
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link, useHistory} from "react-router-dom";
import { useSelector} from "react-redux";

//
import {toast} from "react-toastify";

//Bootstrap
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import {BsPlus, BsPersonFill, BsPower} from "react-icons/bs";

//Firebase
import {signOutFirebase} from "../../app/firestore/firebaseService";


const SignedInMenu = () => {
    const {currentUser} = useSelector(state => state.auth)
    const history = useHistory()

    async function handleSignOut() {
        // async because we want to wait until the user has signed out before we push to the new location
        try {
            await signOutFirebase()
            history.push('/events')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <SignedinMenuWrapper>
            <Image roundedCircle fluid className='user-img' src={currentUser.photoURL || '/assets/user.png'}/>
            <NavDropdown className='nav-dropdown fs-6' title={currentUser.email} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/createEvent'>
                    <BsPlus className='singin-icon' size='20px'/>
                    Create Event
                </NavDropdown.Item>
                <NavDropdown.Item  as={Link} to='/account'>
                    <BsPersonFill className='singin-icon' size='20px'/>
                    My Account
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleSignOut}>
                    <BsPower className='singin-icon' size='20px'/>
                    Sign out
                </NavDropdown.Item>
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
      margin-top: 9px;
    }
    .singin-icon{
      margin-right: 5px;
    }
    .nav-dropdown {
     .nav-link{
      color: #36bff7 !important;
      }
      
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