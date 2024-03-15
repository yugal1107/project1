import express from "express"
import bodyParser from "body-parser"
import axios from "axios";
import { log } from "console";

const app = express();
const port = 3000;
let id = 1;

app.use(express.json());

app.get("/" , (req,res)=>{
    res.send("Server is running successfully....")
})

app.post('/api/location', (req, res) => {
    const { latitude, longitude, name } = req.body;
    const locationData = {
        name : name ,
        coordinates :{
            latitude : latitude,
            longitude : longitude
        }
    }
    let message = ""
    const findUser = locations.findIndex((data) => data.name == name)
    if (findUser != -1){
        locations[findUser].coordinates = {latitude: latitude , longitude: longitude}
        message ="User already exists. Updated coordinates are : " + latitude + " and " + longitude
        console.log(message);
    } else {
        locations.push(locationData)
        message="New user added"
        console.log(message , locationData)
    }

    // const locationData = { name: name , coordinates : {
    //     latitude: latitude ,
    //     longitude : longitude
    // }};
    // locations.push(locationData);

    res.status(200).json({ message: message });
});


app.get("/api/locations" , (req,res) => {
    res.send(locations)
})

const locations = [{ coordinates: {latitude: 26.3416031, longitude: 78.2142114} , name: 'Akshat Jain' } , { coordinates: {latitude: 21.2316031, longitude: 80.2132114} , name: 'Tanmay Sawankar' }]; // Array to store location data

app.listen(port , ()=>{
    console.log("Server running in port " , port )
})