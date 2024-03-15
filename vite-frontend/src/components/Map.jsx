import React , { useState , useEffect , useRef} from "react";
import { MapContainer, TileLayer, useMap , Marker , Popup } from 'react-leaflet'
import L , { Icon } from "leaflet";
import '../styles/map.css'

function Map() {

    let [ location , setLocation ] = useState({latitude:26 , longitude : 80 , loaded : false});
    const mapRef = useRef(null);

    useEffect(()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((l) => {
                setLocation({latitude : l.coords.latitude , longitude : l.coords.longitude , loaded : true})
            })
        } else {
        console.log("Geolocation is not available in your browser ....")
        }
    },[])

    let zoomlevel = 15;

    let customicon = new Icon({
        iconUrl : "https://cdn-icons-png.flaticon.com/128/684/684908.png",
        iconSize : [40,40]
    })

    // function showLocation() {
    //     const map = useMap(); // Access the Leaflet map instance using the useMap hook
    //     map.flyTo([location.latitude, location.longitude], zoomlevel, { animate: true });
    // }

    console.log(location);

    return (
        <>        
            <MapContainer id="map" center={[location.latitude, location.longitude]} zoom={zoomlevel} scrollWheelZoom={false} ref={mapRef}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.latitude , location.longitude]} icon={customicon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            <div id="hellomini">Teri Maa Ki Location {location.latitude} and {location.longitude}</div>
            <button style={{backgroundColor:"red"}} onClick={() => {
                if (mapRef.current) {
                    mapRef.current.flyTo([location.latitude, location.longitude], zoomlevel, { animate: true });
                }
            }}> Locate Me </button>
        </>

    )
};

export default Map