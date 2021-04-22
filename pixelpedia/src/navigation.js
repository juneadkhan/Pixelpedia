import { Navbar, Nav, Form, FormControl, Dropdown, ButtonGroup, Modal, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { LinkContainer } from 'react-router-bootstrap'
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Button, IconButton, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    background: '#F2C76E',
    '&:hover': {
      backgroundColor: '#f26e6e',
      color: '#ffffff',
    }
  },
  label: {
    color: "black"
  },
});


// Configure FirebaseUI.
const firebaseConfig = {
  apiKey: "AIzaSyD-3d0cBNN33wQ5JvUsQfBB9ERDMJ-kkqI",
  authDomain: "pixelpedia-fa44c.firebaseapp.com",
  projectId: "pixelpedia-fa44c",
  storageBucket: "pixelpedia-fa44c.appspot.com",
  messagingSenderId: "30869197092",
  appId: "1:30869197092:web:bc6eb12e71843cd45723b1"
};

// The component's Local state.
let state = {
  isSignedIn: false // Local signed-in state.
};



// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
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

  console.log("Theme", localStorage.getItem('theme'))
  let dark = true
  if (localStorage.getItem('theme') == "false") {
    dark = false
  }

  const [darkTheme, setDarkTheme] = React.useState(dark)
  console.log("Dark theme is ", darkTheme)
  document.getElementById("theme").className = darkTheme ? 'dark-theme' : 'light-theme'


  function handleClick() {
    setDarkTheme(prevTheme => !prevTheme)
    localStorage.setItem('theme', !darkTheme) // True indicatess darkTheme
    document.getElementById("theme").className = darkTheme ? 'light-theme' : 'dark-theme'
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    // no need for ref here
    const unsubscribeFromAuth = firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        // console.log("The user is logged in");
        state.isSignedIn = true
      } else {
        // console.log("The user is not logged in");
        state.isSignedIn = false
      }

      setUser(user);
      console.log(user)
      // state.isSignedIn = !state.isSignedIn;
      // console.log(firebase.auth().currentUser)
      // console.log(state.isSignedIn)

    })

    return () => {
      if (!state.isSignedIn) {
        unsubscribeFromAuth();
      }
    }
  }, []);

  function handleSignOut() {
    firebase.auth().signOut()
    state.isSignedIn = false;
    // console.log(firebase.auth().currentUser)
    // console.log(state.isSignedIn)

  }


  // Listen to the Firebase Auth state and set the local state.
  function componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
  }


  // Make sure we un-register Firebase observers when the component unmounts.
  function componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  if (!state.isSignedIn) {

    return (
      <>
        <div className={darkTheme ? 'dark-theme' : '#202020'}>
          <Navbar>
            <Navbar.Brand className="shmancy" href="#home" style={{ color: darkTheme ? 'white' : 'black', marginLeft: "0.8rem" }}><h3>pixelpedia</h3></Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Tooltip title ={darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
            <IconButton aria-label="delete" onClick={handleClick}>
              {darkTheme
                ? <BrightnessHighIcon style={{ color: "white" }} />
                : <Brightness4Icon />
              }
            </IconButton>
            </Tooltip>
            <Button style={{ marginLeft: "0.4rem" }} classes={{
              root: useStyles().root, // class name, e.g. `classes-nesting-root-x`
              label: useStyles().label, // class name, e.g. `classes-nesting-label-x`
            }} className="SignInButton" variant="contained" color="secondary" onClick={handleShow} disableElevation>Sign In</Button>
          </Navbar>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{ backgroundColor: darkTheme ? '#202020' : 'white', color: darkTheme ? 'white' : 'black' }}>
            <Modal.Title className="shmancy" >Sign In</Modal.Title >
          </Modal.Header>

          <Modal.Body style={{ backgroundColor: darkTheme ? '#202020' : 'white', color: darkTheme ? 'white' : 'black' }}>
            <Container>
              <h2 className="shmancy" style={{ textAlign: 'center' }}>Welcome to pixelpedia</h2>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </Container>
          </Modal.Body>
        </Modal>

      </>
    );

  } else {

    return (
      <>
        <div className={darkTheme ? 'dark-theme' : 'light-theme'}>
          <Navbar>
            <Navbar.Brand href="#home" style={{ color: darkTheme ? 'white' : '#202020', marginLeft: "0.8rem" }}><h3 >pixelpedia</h3></Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Tooltip title ={darkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
            <IconButton aria-label="delete" onClick={handleClick}>
              {darkTheme
                ? <BrightnessHighIcon style={{ color: "white" }} />
                : <Brightness4Icon />
              }
            </IconButton>
            </Tooltip>
            <Button style={{ marginLeft: "0.4rem" }} classes={{
              root: useStyles().root, // class name, e.g. `classes-nesting-root-x`
              label: useStyles().label, // class name, e.g. `classes-nesting-label-x`
            }} className="SignInButton" variant="contained" color="secondary" onClick={handleShow} disableElevation>Signed in as {firebase.auth().currentUser.displayName}</Button>
            
          </Navbar>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{ backgroundColor: darkTheme ? '#202020' : 'white', color: darkTheme ? 'white' : 'black' }}>
            <Modal.Title className="shmancy" >Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ backgroundColor: darkTheme ? '#202020' : 'white', color: darkTheme ? 'white' : 'black' }}>
            <Container>
              <h3 style={{ textAlign: 'center', fontFamily: 'Merriweather' }}>Hey, {firebase.auth().currentUser.displayName} 👋</h3>
              <br></br>
            </Container>
            <Container style={{ display: "flex", justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleSignOut} disableElevation>Sign Out</Button>
              <Button style={{ marginLeft: "0.4rem" }}
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
        disableElevation
        href="https://docs.google.com/forms/d/e/1FAIpQLSf4OcdHdulTPqXFh_A56PoO4Je_VxkNKMEIi34wrljER0EorQ/viewform" target="_blank"
      >
        Submit a Photo Spot
      </Button>
            </Container>
          </Modal.Body>
        </Modal>

      </>
    );

  }



}

export default Navigation;