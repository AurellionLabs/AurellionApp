// Pragma HermesV1
import fetch from "node-fetch";

type Location = {
  lat: number;
  lng: number;
}

type Journey = {
  start_location: Location;
  end_location: Location;
}

type Box = {
  location: Location;
  name: string;
}

let Boxes: Box[] = [];

const isCoordinateInOval = (location: Location, journey: Journey, sizeFactor: number = 1): boolean => {
  // Convert the Google Maps coordinates to standard latitude/longitude coordinates
  const lat = location.lat;
  const lng = location.lng;
  const lat1 = journey.start_location.lat;
  const lng1 = journey.start_location.lng;
  const lat2 = journey.end_location.lat;
  const lng2 = journey.end_location.lng;

  // Calculate the length of the semi-major axis
  const a = Math.abs(lng1 - lng2) / 2 * sizeFactor;

  // Calculate the length of the semi-minor axis
  const b = Math.abs(lat1 - lat2) / 2 * sizeFactor;

  // Calculate the center point of the oval
  const centerX = (lng1 + lng2) / 2;
  const centerY = (lat1 + lat2) / 2;

  // Calculate the distance from the center point to the given coordinate
  const distance = (Math.pow(lng - centerX, 2) / Math.pow(a, 2)) + (Math.pow(lat - centerY, 2) / Math.pow(b, 2));

  // Return a boolean value indicating whether the coordinate is within the oval
  return distance <= 1;
};

async function fetchBox(lat: number, long: number): Promise<void> {
  //52.406112%2C-1.510840
  const boxUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=20000&keyword=postbox&key=AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA`;
  //'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.406112%2C-1.510840&radius=20000&keyword=postbox&key=AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA'
  let response = await fetch(boxUrl);
  const data = await response.json() as unknown as JSON;
  const result = data["results"];
  for (let i = 0; i < result.length; i++) {
    let box: Box = {
      location: result[i]["geometry"]["location"],
      name: result[i]["name"]
    };
    Boxes.push(box);
  }
}
// Location of coventry to limit search area
await fetchBox(52.406112,-1.510840)

const journey: Journey = {
  start_location: {lat: 52.397312, lng: -1.505571},
  end_location: {lat: 52.404645, lng: -1.520389}
}



Boxes.map(box => {
  if (isCoordinateInOval(box.location,journey)) {
    console.log(box.location)
    console.log(box.name)
}})
