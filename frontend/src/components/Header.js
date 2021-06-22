import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);

  const { user, isAuthenticated } = useAuth0();

  // logout functionality
  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem('auth-token', '');
  };

  return (
    <div>
      {/* {!isAuthenticated && (
        <Navbar
          bg='navbar-dark bg-primary'
          expand='lg'
          class='navbar navbar-expand-lg navbar-dark bg-primary'
        >
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand style={{ color: 'white' }}>Chat App</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )} */}
      {isAuthenticated && (
        <Navbar
          bg='navbar-dark bg-primary'
          expand='lg'
          class='navbar navbar-expand-lg navbar-dark bg-primary'
        >
          <Container >
            <LinkContainer to='/'>
              <Navbar.Brand style={{ color: 'white' }}>Chat App</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' class="align-content-end">
              <Nav className='ml-auto'>
                <LinkContainer to='/chat'>
                  <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/profile'>
                  <Nav.Link>Profile ({user.name})</Nav.Link>
                </LinkContainer>
              </Nav>
              <LogoutButton />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default Header;
