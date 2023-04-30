import {Request, Response, NextFunction} from 'express'
import { getBoxesAtLocationWithRadius , isBoxInOval } from '../helpers/parcels.helper';
import { Journey } from "../common/types";
  
const locationsBetweenTwoCoordinates = async (req: Request, res: Response, next: NextFunction) => {
    const journey: Journey = {
        start_location: res.locals.start_location,
        end_location: res.locals.end_location
    }
    const data = await getBoxesAtLocationWithRadius(journey.start_location, res.locals.radius)
    const parcels = data.map(result => ({
        location: result["geometry"]["location"],
        name: result["name"]
    }))
    const parcelsWithinArea = parcels.filter(parcel => isBoxInOval(parcel.location, journey))

    res.send(JSON.stringify((parcelsWithinArea)));
}

export {locationsBetweenTwoCoordinates}