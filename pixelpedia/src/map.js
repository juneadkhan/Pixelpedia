import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Popup } from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import ReactDOM from 'react-dom';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { Button, IconButton, Paper } from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import InstagramIcon from '@material-ui/icons/Instagram';


export async function getWeatherIcon(lat, lng) {

  const result = await axios({
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&exclude=&appid=f36e366463c261985623b04441c510f8',
  });

  console.log("DaTA: ", result.data['current']['weather'][0]['icon'])
  return result.data['current']['weather'][0]['icon']

};

export async function getTemperature(lat, lng, unit) {

  const result = await axios({
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&exclude=&appid=f36e366463c261985623b04441c510f8&units=' + unit,
  });

  console.log("DaTA: ", Math.round(result.data['current']['temp']))
  return Math.round(result.data['current']['temp'])

};

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoianVuZWFkazI3IiwiYSI6ImNrbXpvcml4ajA0OXkydm8yODFmN3dtemgifQ.YacZnbSOmX93UZJMH7WLKg';

const Map = () => {

  const mapContainer = useRef();
  const [lng, setLng] = useState(-79.0541);
  const [lat, setLat] = useState(35.913200);
  const [zoom, setZoom] = useState(12.15);

  useEffect(() => {
    /*
    let theme = document.getElementById("theme").className
    console.log(theme)
    let style = 'mapbox://styles/juneadk27/ckn10m3z11mxg17loh9k451jr'
    if (theme == 'dark-theme'){
      style = 'mapbox://styles/mapbox/dark-v10'
    }
    // map.setStyle('mapbox://styles/mapbox/dark-v10');
    */
    let mapStyle = 'mapbox://styles/juneadk27/cknou38682ur817mztigvh1ux'
    if (localStorage.getItem('theme') == "false") {
      mapStyle = 'mapbox://styles/juneadk27/ckn10m3z11mxg17loh9k451jr'
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom

    });
    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      placeholder: 'Find photo spots around...', // Placeholder text for the search bar

    });

    map.addControl(geocoder);

    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on('load', function () {

      map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#448ee4'
        }
      });

      // Listen for the `result` event from the Geocoder
      // `result` event is triggered when a user makes a selection
      //  Add a marker at the result's coordinates
      /*
      geocoder.on('result', function (e) {
        console.log(map.getSource('single-point'))
        map.getSource('single-point').setData(e.result.geometry);
      });
      */
    });



    map.on('click', async function (e) {

      var features = map.queryRenderedFeatures(e.point, {
        layers: ['pixelpediatest'] // replace this with the name of the layer
      });

      if (!features.length) {
        return;
      }

      var feature = features[0];
      var latDisp = feature.geometry.coordinates[1];
      var lngDisp = feature.geometry.coordinates[0];

      var icon = await getWeatherIcon(latDisp, lngDisp)
      var iconURL = "https://openweathermap.org/img/wn/" + icon + ".png"

      var units = "imperial"
      if (localStorage.getItem('units') == "cel") {
        units = "metric"
      }

      var temp = await getTemperature(latDisp, lngDisp, units)

      var unitsInitial = (units == "imperial" ? 'F' : 'C')




      console.log("FEATURE", feature)

      map.flyTo({
        center: [lngDisp + .0002, latDisp - .0025],
        zoom: 15
      });

      const placeholder = document.createElement('div');
      ReactDOM.render(

        <Container>
          <Row>
            <Col style={{
              flexDirection: "row",
              justifyContent: "flex-start"
            }}>
              <h3 className="propertyName">{feature.properties.Name}</h3>
              <p>{feature.properties.Description}</p>

              <Container>
                <Row>
                  <Button style={{ backgroundColor: "#23272b", color: "white" }} variant="contained" block href={"https://maps.google.com/?q=" + latDisp + "," + lngDisp} target="_blank" disableElevation>
                    <svg style={{ marginRight: "0.5rem" }} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" fill="#34A853"></path><path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" fill="#FBBC05"></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z" fill="#EA4335"></path></svg>
                    Open in Google Maps
                </Button>
                  <Paper className={darkTheme ? 'dark' : 'light'} variant="outlined" disabled style={{ marginLeft: "0.5rem", paddingRight: "0.5rem", paddingLeft: "0.5rem", height: "50px" }}>
                    <img className="img-fluid" src={iconURL} style={{ width: "25px", height: "25px" }} />
                    <p style={{ fontSize: "12px" }}>{temp + "°" + unitsInitial}</p></Paper>


                  { /* 
                <IconButton aria-label="delete">
                <FavoriteIcon style={{ color: "darkred", marginLeft: "0.5rem"}}/>              
                </IconButton>
                */

                  }
                </Row>
              </Container>

            </Col>
            <Col><Carousel fade>

              {feature.properties.Img != undefined &&
                <Carousel.Item>
                  <img className="d-block width-100"
                    src={feature.properties.Img}
                    alt="First slide" />
                  {feature.properties.Auth != undefined &&
                  <Carousel.Caption>
                    <p style={{ backgroundColor: "#23282bba", padding: "3px", fontSize: "10px" }}> <InstagramIcon style={{ marginRight: "0.1rem", height: "14px" }} />
                     {feature.properties.Auth}</p>
                  </Carousel.Caption>
                  }
                </Carousel.Item>
              }

              {feature.properties.Img2 != undefined &&
                <Carousel.Item>

                  <img
                    className="d-block width-100"
                    src={feature.properties.Img2}
                    alt="Second slide"
                  />
                 {feature.properties.Auth2 != undefined &&
                  <Carousel.Caption>
                    <p style={{ backgroundColor: "#23282bba", padding: "3px", fontSize: "10px" }}> <InstagramIcon style={{ marginRight: "0.1rem", height: "14px" }} />
                     {feature.properties.Auth2}</p>
                  </Carousel.Caption>
                  }
                </Carousel.Item>
              }

              {feature.properties.Img3 != undefined &&
                <Carousel.Item>
                  <img
                    className="d-block width-100"
                    src={feature.properties.Img3}
                    alt="Third slide"
                  />
                  {feature.properties.Auth3 != undefined &&
                  <Carousel.Caption>
                    <p style={{ backgroundColor: "#23282bba", padding: "3px", fontSize: "10px" }}> <InstagramIcon style={{ marginRight: "0.1rem", height: "14px" }} />
                     {feature.properties.Auth3}</p>
                  </Carousel.Caption>
                  }
                </Carousel.Item>
              }
            </Carousel></Col>
          </Row>
        </Container>

        , placeholder);

      let darkTheme = true
      if (localStorage.getItem('theme') == "false") {
        darkTheme = false;
      }

      var popup = new mapboxgl.Popup({ offset: [0, -15], className: darkTheme ? 'dark' : 'light', id: 'mapboxPopupID' })
        .setLngLat(feature.geometry.coordinates)
        .setDOMContent(placeholder)
        .addTo(map);
    });

    function callback(mutationsList, observer) {
      console.log('Mutations:', mutationsList)
      console.log('Observer:', observer)
      mutationsList.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          console.log(mutation.target.className)
          if (mutation.target.className == 'light-theme') {
            map.setStyle('mapbox://styles/juneadk27/ckn10m3z11mxg17loh9k451jr')
          } else {
            map.setStyle('mapbox://styles/juneadk27/cknou38682ur817mztigvh1ux')
          }
        }
      })
    }

    const mutationObserver = new MutationObserver(callback)

    mutationObserver.observe(mainNode, { attributes: true })

    /*
    var marker = new mapboxgl.Marker() // initialize a new marker
      .setLngLat([-79.055847, 35.913200]) // Marker [lng, lat] coordinates
      .addTo(map); // Add the marker to the map
      */

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);

  const mainNode = document.getElementById('theme')


  return (
    <div>
      { /*
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */
      }
      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;
