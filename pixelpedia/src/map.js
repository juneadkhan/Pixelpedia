import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

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
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/juneadk27/ckn10m3z11mxg17loh9k451jr',
      center: [lng, lat],
      zoom: zoom

    });
    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      placeholder: 'Find photo spots in...', // Placeholder text for the search bar
      bbox: [-79.5657, 35.4682, -77.2503, 36.2836], // Boundary for The Triangle
      proximity: {
        longitude: -79.055847,
        latitude: 35.913200
      } // Coordinates of Chapel Hill
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
      geocoder.on('result', function (e) {
        map.getSource('single-point').setData(e.result.geometry);
      });
    });



    map.on('click', function (e) {

      var features = map.queryRenderedFeatures(e.point, {
        layers: ['pixelpediatest'] // replace this with the name of the layer
      });

      if (!features.length) {
        return;
      }

      var feature = features[0];
      console.log(feature)

      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.Name + '</h3><p>' + feature.properties.Description + '</p>'
          + '<img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Bell_tower_in_Chapel_Hill_%28cropped%29.jpg" width="200" height="200">'
          + '<img src="https://www.unc.edu/wp-content/uploads/2019/04/008919_BellTowerClimb0178.jpg" width="200" height="200">'
          + '<img src="https://i.pinimg.com/originals/8f/20/91/8f209105e938d26a19780f97dfc825b8.jpg" width="200" height="200">'
        )
        .addTo(map);
    });

    function callback(mutationsList, observer) {
      console.log('Mutations:', mutationsList)
      console.log('Observer:', observer)
      mutationsList.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          console.log(mutation.target.className)
          if (mutation.target.className == 'light-theme'){
            map.setStyle('mapbox://styles/juneadk27/ckn10m3z11mxg17loh9k451jr')
          } else{
            map.setStyle('mapbox://styles/mapbox/dark-v10')
          }
          // this.props.map.setStyle('mapbox://styles/mapbox/dark-v10');
  
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
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;
