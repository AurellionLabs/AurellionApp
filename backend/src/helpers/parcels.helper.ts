import { Location, Journey, Parcel, NearbySearchResponse } from "../common/types";

export const isBoxInOval = (boxLocation: Location, journey: Journey, sizeFactor: number = 1): boolean => {
    // Calculate the length of the semi-major axis
    const a = Math.abs(journey.start_location.lng - journey.end_location.lng) / 2 * sizeFactor;
  
    // Calculate the length of the semi-minor axis
    const b = Math.abs(journey.start_location.lat - journey.end_location.lat) / 2 * sizeFactor;
  
    // Calculate the center point of the oval
    const centerX = (journey.start_location.lng + journey.end_location.lng) / 2;
    const centerY = (journey.start_location.lat + journey.end_location.lat) / 2;
  
    // Calculate the distance from the center point to the given coordinate
    const distance = (Math.pow(boxLocation.lng - centerX, 2) / Math.pow(a, 2)) + (Math.pow(boxLocation.lat - centerY, 2) / Math.pow(b, 2));
    // Return a boolean value indicating whether the coordinate is within the oval
    return distance <= 1;
  };
  
  export const getBoxesAtLocationWithRadius = async (location: Location, radius: number) =>{
    const boxUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat}%2C${location.lng}&radius=${radius}&keyword=postbox&key=AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA`;
    const response = await fetch(boxUrl);
    const data: NearbySearchResponse = await response.json(); 
    return data.results;
  }