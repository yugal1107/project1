import React, { useState , useEffect} from "react"
import axios from "axios"
import "../App.css"

function User(){

    const [ name , setName ] = useState('')
    const [locationShared , setLocationshared ] = useState(false)
    const [interval , updateinterval ] = useState(null)


    const stoplocationsharing = ()=>{

        console.log("Stopped")
        clearInterval(interval)

    }

    const startlocation = ()=>{
        // let sharinglocation = setInterval(getLocation,3000)
        updateinterval(setInterval(getLocation,10000))
    }

    function getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLocationshared(true)
                axios.post("/api/location" , { latitude : position.coords.latitude , longitude : position.coords.longitude , name : name})
                    .then((response)=>{
                        console.log("Data sent successfully ...")
                        console.log(response.message)
                        //console.log("Location sent successfully latitude and longitude are : " , position.location.latitude , position.location.longitude)
                    })
                    .catch((error)=>{
                        console.error("Error occured is : " , error)
                    })
            })
        } else {
            console.log("Browser do not support geolocation  api...")
        }
    }

    function handleChange(event){
        setName(event.target.value)
    }

    console.log(name);

    return (
        <>
            <div><input type="text" placeholder="Enter Name/ID" onChange={handleChange} value={name}></input></div>
            <div><button onClick={startlocation}>Start Sharing My Location </button></div>
            {/* <br />
            <button onClick={getLocation}> One Time Location Sharing </button> */}
            <div><button onClick={stoplocationsharing}>Stop Sharing My Location</button></div>
        </>
    )
} 


export default User;

