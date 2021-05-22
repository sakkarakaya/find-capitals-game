import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"
import CapitalCities from '../capitalCities.json'
import { getDistance } from 'geolib';
import { useState } from "react";

const api_key = process.env.REACT_APP_API_KEY

//customize google maps view
const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]


const MyMapComponent = compose(
  withStateHandlers(() => ({
    isMarkerShown: false,
    markerPosition: null
  }), {
    onMapClick: ({ isMarkerShown }) => (e) => ({
      markerPosition: e.latLng,
      isMarkerShown: true,
      markerLat: e.latLng.lat(),
      markerLong: e.latLng.lng()
      
   })
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQMJ_kftmYX_DptkoPw4mV9mLJw98psog&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
{
  //console.log("props",props)
  // props.passChildData(data);
  const [cityIndex, setCityIndex] = useState(0)
  const handleClick = (e) => {
    setCityIndex(props.index)
    
    var dis = getDistance(
      { latitude: parseFloat(e.latLng.lat()), longitude: parseFloat(e.latLng.lng()) },
      
      props.index===0 ?
      { latitude: CapitalCities[cityIndex].lat, longitude: CapitalCities[cityIndex].long }:
      { latitude: CapitalCities[cityIndex+1].lat, longitude: CapitalCities[cityIndex+1].long }
      
    );
    console.log("dis", dis / 1000)
    props.distance(dis/1000)

  }
  console.log("mapchart index",cityIndex)


  return (
    <GoogleMap
      options={{
        styles: mapStyles,
      }}
      defaultZoom={4}
      defaultCenter={{ lat: 52, lng: 13 }}
      onClick={(e) => {props.onMapClick(e); handleClick(e)}}
    >
      {props.isMarkerShown && (
        <>
          <Marker position={props.markerPosition} />
          <Marker
            position={{ lat: CapitalCities[cityIndex].lat, lng: CapitalCities[cityIndex].long }}
          />
        </>
        
      )}
      <Polyline
      path={[
        { lat: props.markerLat, lng: props.markerLong },
        { lat: CapitalCities[cityIndex].lat, lng: CapitalCities[cityIndex].long }
      ]}
      options={{ strokeColor: "#FF0000 " }} />
    </GoogleMap>
  );
});

export default MyMapComponent
