import ReactDOM from 'react-dom';
import Main from "./main"
import Navigation from "./navigation"
import Map from "./map"
import SignIn from "./signIn"


ReactDOM.render( < Navigation/> , document.getElementById('nav'));
ReactDOM.render( < Main /> , document.getElementById('map'));


/*
ReactDOM.render( < SignIn /> , document.getElementById('map'));
*/