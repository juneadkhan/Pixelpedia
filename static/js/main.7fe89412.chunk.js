(this.webpackJsonppixelpedia=this.webpackJsonppixelpedia||[]).push([[0],{110:function(e,t,a){"use strict";a.r(t);var n=a(21),i=a.n(n),c=a(29),s=a(116),o=a(115),r=a(112),l=a(114),d=a(113),u=(a(72),a(73),a(2)),h=a.n(u),j=a(36),m=a.n(j),b=a(14),g=a(5),p={isSignedIn:!1},O={signInFlow:"popup",signInSuccessUrl:"/",signInOptions:[b.a.auth.EmailAuthProvider.PROVIDER_ID,b.a.auth.GoogleAuthProvider.PROVIDER_ID,b.a.auth.TwitterAuthProvider.PROVIDER_ID,b.a.auth.FacebookAuthProvider.PROVIDER_ID,b.a.auth.GithubAuthProvider.PROVIDER_ID]};b.a.initializeApp({apiKey:"AIzaSyD-3d0cBNN33wQ5JvUsQfBB9ERDMJ-kkqI",authDomain:"pixelpedia-fa44c.firebaseapp.com",projectId:"pixelpedia-fa44c",storageBucket:"pixelpedia-fa44c.appspot.com",messagingSenderId:"30869197092",appId:"1:30869197092:web:bc6eb12e71843cd45723b1"});var x=function(){var e=Object(u.useState)(!1),t=Object(c.a)(e,2),a=t[0],n=t[1],i=function(){return n(!1)},j=function(){return n(!0)},x=h.a.useState(!1),f=Object(c.a)(x,2),I=f[0],y=f[1];function v(){y((function(e){return!e})),document.getElementById("theme").className=I?"light-theme":"dark-theme"}var k=Object(u.useState)(null),w=Object(c.a)(k,2),S=(w[0],w[1]);return Object(u.useEffect)((function(){var e=b.a.auth().onAuthStateChanged((function(e){e?(console.log("The user is logged in"),p.isSignedIn=!0):(console.log("The user is not logged in"),p.isSignedIn=!1),S(e),console.log(e),console.log(b.a.auth().currentUser),console.log(p.isSignedIn)}));return function(){p.isSignedIn||e()}}),[]),p.isSignedIn?Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("div",{className:I?"dark-theme":"light-theme",children:Object(g.jsxs)(s.a,{children:[Object(g.jsxs)(s.a.Brand,{href:"#home",style:{color:I?"white":"black"},children:[Object(g.jsx)("h3",{children:"pixelpedia"}),Object(g.jsx)("h5",{children:"Find the best photo spots"})]}),Object(g.jsx)(o.a,{className:"mr-auto"}),Object(g.jsx)(r.a,{variant:I?"outline-warning":"outline-secondary",onClick:v,children:I?"\ud83c\udf1a":"\u2600\ufe0f"}),Object(g.jsxs)(r.a,{className:"shmancy",variant:"outline-info",onClick:j,children:["Signed in as ",b.a.auth().currentUser.displayName]})]})}),Object(g.jsxs)(l.a,{show:a,onHide:i,style:{backgroundcolor:I?"white":"black"},children:[Object(g.jsx)(l.a.Header,{closeButton:!0,children:Object(g.jsx)(l.a.Title,{className:"shmancy",children:"Profile"})}),Object(g.jsxs)(l.a.Body,{children:[Object(g.jsxs)(d.a,{children:[Object(g.jsxs)("h3",{style:{textAlign:"center"},children:["Hey, ",b.a.auth().currentUser.displayName," \ud83d\udc4b"]}),Object(g.jsx)("br",{})]}),Object(g.jsx)(d.a,{style:{display:"flex",justifyContent:"center"},children:Object(g.jsx)(r.a,{variant:"outline-danger",onClick:function(){b.a.auth().signOut(),p.isSignedIn=!1,console.log(b.a.auth().currentUser),console.log(p.isSignedIn)},children:"Sign Out"})})]})]})]}):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("div",{className:I?"dark-theme":"light-theme",children:Object(g.jsxs)(s.a,{children:[Object(g.jsx)(s.a.Brand,{className:"shmancy",href:"#home",style:{color:I?"white":"black"},children:Object(g.jsx)("h3",{children:"pixelpedia"})}),Object(g.jsx)(o.a,{className:"mr-auto"}),Object(g.jsx)(r.a,{variant:I?"outline-warning":"outline-secondary",onClick:v,children:I?"\ud83c\udf1a":"\u2600\ufe0f"}),Object(g.jsx)(r.a,{className:"shmancy",variant:"outline-info",onClick:j,children:"Sign In"})]})}),Object(g.jsxs)(l.a,{show:a,onHide:i,children:[Object(g.jsx)(l.a.Header,{closeButton:!0,children:Object(g.jsx)(l.a.Title,{className:"shmancy",children:"Sign In"})}),Object(g.jsx)(l.a.Body,{children:Object(g.jsxs)(d.a,{children:[Object(g.jsx)("h2",{className:"shmancy",style:{textAlign:"center"},children:"Welcome to pixelpedia"}),Object(g.jsx)(m.a,{uiConfig:O,firebaseAuth:b.a.auth()})]})})]})]})},f=a(30),I=a.n(f),y=a(66);I.a.workerClass=y.a,I.a.accessToken="pk.eyJ1IjoianVuZWFkazI3IiwiYSI6ImNrbXpvcml4ajA0OXkydm8yODFmN3dtemgifQ.YacZnbSOmX93UZJMH7WLKg";var v=function(){var e=Object(u.useRef)(),t=Object(u.useState)(-79.0541),a=Object(c.a)(t,2),n=a[0],i=a[1],s=Object(u.useState)(35.9132),o=Object(c.a)(s,2),r=o[0],l=o[1],d=Object(u.useState)(12.15),h=Object(c.a)(d,2),j=h[0],m=h[1];Object(u.useEffect)((function(){var t=new I.a.Map({container:e.current,style:"mapbox://styles/juneadk27/ckn10m3z11mxg17loh9k451jr",center:[n,r],zoom:j}),a=new MapboxGeocoder({accessToken:I.a.accessToken,mapboxgl:I.a,marker:!1,placeholder:"Find photo spots in...",bbox:[-79.5657,35.4682,-77.2503,36.2836],proximity:{longitude:-79.055847,latitude:35.9132}});return t.addControl(a),t.on("load",(function(){t.addSource("single-point",{type:"geojson",data:{type:"FeatureCollection",features:[]}}),t.addLayer({id:"point",source:"single-point",type:"circle",paint:{"circle-radius":10,"circle-color":"#448ee4"}}),a.on("result",(function(e){t.getSource("single-point").setData(e.result.geometry)}))})),t.on("click",(function(e){var a=t.queryRenderedFeatures(e.point,{layers:["pixelpediatest"]});if(a.length){var n=a[0];console.log(n);new I.a.Popup({offset:[0,-15]}).setLngLat(n.geometry.coordinates).setHTML("<h3>"+n.properties.Name+"</h3><p>"+n.properties.Description+'</p><img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Bell_tower_in_Chapel_Hill_%28cropped%29.jpg" width="200" height="200"><img src="https://www.unc.edu/wp-content/uploads/2019/04/008919_BellTowerClimb0178.jpg" width="200" height="200"><img src="https://i.pinimg.com/originals/8f/20/91/8f209105e938d26a19780f97dfc825b8.jpg" width="200" height="200">').addTo(t)}})),new MutationObserver((function(e,a){console.log("Mutations:",e),console.log("Observer:",a),e.forEach((function(e){"class"===e.attributeName&&(console.log(e.target.className),"light-theme"==e.target.className?t.setStyle("mapbox://styles/juneadk27/ckn10m3z11mxg17loh9k451jr"):t.setStyle("mapbox://styles/mapbox/dark-v10"))}))})).observe(b,{attributes:!0}),t.on("move",(function(){i(t.getCenter().lng.toFixed(4)),l(t.getCenter().lat.toFixed(4)),m(t.getZoom().toFixed(2))})),function(){return t.remove()}}),[]);var b=document.getElementById("theme");return Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{className:"sidebar",children:["Longitude: ",n," | Latitude: ",r," | Zoom: ",j]}),Object(g.jsx)("div",{className:"map-container",ref:e})]})},k=function(){return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(h.a.Fragment,{children:Object(g.jsx)(v,{})})})};b.a.auth.EmailAuthProvider.PROVIDER_ID,b.a.auth.GoogleAuthProvider.PROVIDER_ID,b.a.auth.TwitterAuthProvider.PROVIDER_ID,b.a.auth.FacebookAuthProvider.PROVIDER_ID,b.a.auth.GithubAuthProvider.PROVIDER_ID;i.a.render(Object(g.jsx)(x,{}),document.getElementById("nav")),i.a.render(Object(g.jsx)(k,{}),document.getElementById("map"))}},[[110,1,2]]]);
//# sourceMappingURL=main.7fe89412.chunk.js.map