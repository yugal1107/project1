import React , { useState , useEffect , useRef} from "react";
import { MapContainer, TileLayer, useMap , Marker , Popup } from 'react-leaflet'
import L , { Icon } from "leaflet";
import '../styles/map.css'
import '../App.css'
import axios from "axios"



function Admin(){

    const [ locations , setLocations ] = useState({latitude : null , longitude : null})
    const [qname , setQname ] = useState("")
    const [ loading , setLoading ] = useState(true)
    const [notFound , setNotfound ] = useState(false)
    const [longPolling , setPolling ] = useState(null)

    const mapRef = useRef(null);

    const fetchData = async ()=>{
        try{
            const loc_data = await axios.get("/api/locations")
            console.log("Fetched Location : " , loc_data.data)
            setLocations(loc_data.data)
            setLoading(false)
        } catch(error){
            console.error("Error fetching data : " , error)
        }
    }
    useEffect(()=>{
        fetchData(); 
        setPolling(setInterval(fetchData,5000))
    },[])


    function createMarker(location){
        location = location.coordinates 
        // console.log("Console Log from Create Marker : " , location)
        return (
            <Marker key={location.name} position={[location.latitude , location.longitude]} icon={customicon}>
                <Popup>
                    {location.name}
                </Popup>
            </Marker>
        )
    }

    function handleChange(event){
        console.log(event.target.value)
        setQname(event.target.value)
    }

    const flytolocation = () => {
        console.log("Fly to Location initiated .....")
        let location = locations.find((l) => l.name == qname)
        if (location){
            location = location.coordinates
            if (mapRef.current) {
                mapRef.current.flyTo([location.latitude, location.longitude], zoomlevel, { animate: true });
            }
        } else {
            setNotfound(true)
            console.log("Data not found")
        }
    }

    if (loading){
        console.log("Loading")
        return(
            <h1> Data is Loading ....</h1>
        )
    }

    // function showLocation() {
    //     const map = useMap(); // Access the Leaflet map instance using the useMap hook
    //     map.flyTo([location.latitude, location.longitude], zoomlevel, { animate: true });
    // }

    
    let zoomlevel = 15;
    let customicon = new Icon({
        iconUrl : "https://cdn-icons-png.flaticon.com/128/684/684908.png",
        iconSize : [40,40]
    })

    // const location = locations[0] 
    console.log(qname) 

    return (
        <>        
            <MapContainer id="map" center={[34, 70]} zoom={zoomlevel} scrollWheelZoom={false} ref={mapRef}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map(createMarker)}
{/* 
                <Marker position={[location.latitude, location.longitude]} icon={customicon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
            <div>
                <input type="text" placeholder="Enter Name/ID" onChange={handleChange} value={qname}></input>
            </div>
            <button style={{backgroundColor:"red"}} onClick={flytolocation}> Locate User </button>
            {notFound && <div> Data not found </div>}
        </>

    )
}


export default Admin;
