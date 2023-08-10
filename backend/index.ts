import express, { Express, Request, Response } from "express"
import ParcelsRouter from './src/routes/parcels.route'
import EventsRouter from './src/routes/events.route';
import fetch from 'node-fetch';
import { ethers } from 'ethers'
//import { REACT_APP_AUSYS_CONTRACT_ADDRESS, REACT_APP_AURA_CONTRACT_ADDRESS } from "@env";
import contractABI from "../aurellion/src/dapp-connectors/aurellion-abi.json" assert { type: "json" };
import { Client } from "pg";
const port = 8000;
const app: Express = express();
import client from "./db.js";

app.use('/parcels', ParcelsRouter);
app.use('/events', EventsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("AuSys Backend");
});


app.get("/GetBoxes/:lat/:long", async (req: Request, res: Response) => {
  // type Location = {
  //     lat: number;
  //     lng: number;
  //   }
  //   
  //   type Journey = {
  //     start_location: Location;
  //     end_location: Location;
  //   }
  //   
  //   type Box = {
  //     location: Location;
  //     name: string;
  //   }
  //   
  //   let Boxes: Box[] = [];
  //   let boxLocations:Location[] = [];


  // const isCoordinateInOval = (location: Location, journey: Journey, sizeFactor: number = 1): boolean => {
  //   // Convert the Google Maps coordinates to standard latitude/longitude coordinates
  //   const lat = location.lat;
  //   const lng = location.lng;
  //   const lat1 = journey.start_location.lat;
  //   const lng1 = journey.start_location.lng;
  //   const lat2 = journey.end_location.lat;
  //   const lng2 = journey.end_location.lng;

  //   // Calculate the length of the semi-major axis
  //   const a = Math.abs(lng1 - lng2) / 2 * sizeFactor;

  //   // Calculate the length of the semi-minor axis
  //   const b = Math.abs(lat1 - lat2) / 2 * sizeFactor;

  //   // Calculate the center point of the oval
  //   const centerX = (lng1 + lng2) / 2;
  //   const centerY = (lat1 + lat2) / 2;

  //   // Calculate the distance from the center point to the given coordinate
  //   const distance = (Math.pow(lng - centerX, 2) / Math.pow(a, 2)) + (Math.pow(lat - centerY, 2) / Math.pow(b, 2));

  //   // Return a boolean value indicating whether the coordinate is within the oval
  //   return distance <= 1;
  // };

  // async function fetchBox(lat: number, long: number): Promise<void> {
  //   //52.406112%2C-1.510840
  //   const boxUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=20000&keyword=postbox&key=AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA`;
  //   //'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.406112%2C-1.510840&radius=20000&keyword=postbox&key=AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA'
  //   let response = await fetch(boxUrl);
  //   const data = await response.json() as unknown as { results: any };;

  //   const result = data["results"];
  //   for (let i = 0; i < result.length; i++) {
  //     let box: Box = {
  //       location: result[i]["geometry"]["location"],
  //       name: result[i]["name"]
  //     };
  //     Boxes.push(box);
  //   }
  // }
  // // Location of coventry to limit search area

  // const journey: Journey = {
  //   start_location: {lat: 52.397312, lng: -1.505571},
  //   end_location: {lat: 52.404645, lng: -1.520389}
  // }



  // Boxes.map(box => {
  //   if (isCoordinateInOval(box.location,journey)) {
  //     console.log(box.location)
  //     console.log(box.name)
  // }})
  // async function getBoxLocations() {
  //   await fetchBox(parseInt(req.params.lat),(parseInt(req.params.long)));
  //   for(let i = 0; i < Boxes.length; i++) {
  //     boxLocations.push(Boxes[i].location)}
  // }
  // await getBoxLocations()
  // res.send(boxLocations)
});
let provider;
try{
    provider = new ethers.providers.JsonRpcProvider("https://rpc.public.zkevm-test.net"); // Replace with your Ethereum node URL

} catch(err){
    console.log("error intialising provider")
    throw err 
    }
let contract;
try{
    contract = new ethers.Contract("0x7aeA312A70bb992899DCc6DdC2520Ec4b7833547", contractABI, provider);
} catch(err){
    console.log("error intialising contract",err)
    throw err
}

try{
    await client.connect()
}
catch (err){
    console.log("error connecting to db", err)
}
class EventObject {
  id: string;
  value: any;
  type: string;
  age: string;
  killEvent(): void {  this.id = "", this.value = null, this.type = "" };
  catEvent(): void { console.log(this) };

  constructor(id: string, value: any, type: string, age: string) {
    this.id = id;
    this.value = value;
    this.type = type;
    this.age = age;
  }
}
try {
    console.log("listening for sig events...")
    contract.on("emitSig", (id: any, signed: any) => {
    console.log("Event received:", id, signed);
    let eventObj = new EventObject(id, signed, "signed", "new")
    if (eventObj.value === "Signed") {
     client.query(
    `INSERT INTO events (ID, type, value, age) VALUES ($1, $2, $3, $4)`,
    [eventObj.id, eventObj.type, eventObj.value, eventObj.age]
    ); 
    eventObj.catEvent()
    console.log("Listening..........................................");

            };
        })
    }
catch (err) { console.log("Error in listening to signature events",err) };
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
