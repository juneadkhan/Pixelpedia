
// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Jumbotron, Container, Card, Modal, Button } from 'react-bootstrap';


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

// firebase.initializeApp(firebaseConfig);

const SignIn = () => {
    return (
        <>

            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Container>
                        <h2 style={{ textAlign: 'center'}}>Welcome to Pixelpedia</h2>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </Container>
                </Modal.Body>
            </Modal.Dialog>
        </>

    );
}

export default SignIn;