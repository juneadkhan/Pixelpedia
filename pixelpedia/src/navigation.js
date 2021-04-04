import { Navbar, Nav, Form, FormControl, Button, Dropdown, ButtonGroup, Modal, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { LinkContainer } from 'react-router-bootstrap'
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


// Configure FirebaseUI.
const firebaseConfig = {
  apiKey: "AIzaSyD-3d0cBNN33wQ5JvUsQfBB9ERDMJ-kkqI",
  authDomain: "pixelpedia-fa44c.firebaseapp.com",
  projectId: "pixelpedia-fa44c",
  storageBucket: "pixelpedia-fa44c.appspot.com",
  messagingSenderId: "30869197092",
  appId: "1:30869197092:web:bc6eb12e71843cd45723b1"
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID

  ]
};

firebase.initializeApp(firebaseConfig);


function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [darkTheme, setDarkTheme] = React.useState(false)


  return (
    <>
      <div className= {darkTheme ? 'dark-theme' : 'light-theme'}>
      <Navbar>
        <Navbar.Brand href="#home" style={{color: darkTheme ? 'white' : 'black'}}>Pixelpedia</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Button variant={darkTheme ? 'outline-warning' : 'outline-secondary'} onClick={() => setDarkTheme(prevTheme => !prevTheme)}>{darkTheme ? '🌚' : '☀️'}</Button>
        <Button variant="outline-info" onClick={handleShow}>Sign In</Button>
      </Navbar>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <h2 style={{ textAlign: 'center' }}>Welcome to Pixelpedia</h2>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </Container>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>

    </>
  );
}

export default Navigation;