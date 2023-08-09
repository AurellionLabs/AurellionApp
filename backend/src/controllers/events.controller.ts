
import {Request, Response, NextFunction} from 'express'
import { getBoxesAtLocationWithRadius , isBoxInOval } from '../helpers/parcels.helper';

export const getAllEventsForType = async (req: Request, res: Response, next: NextFunction) => {
    res.send(events.filter((event) => event.type === res.locals.type && event.id === res.locals.id));
    }
// export const getAllEventsForType = (id: string, type: string): EventObject[] => {
//     return sigEvents.filter((event) => event.type === type && event.id === id);
//   };
export const killOldEvents = () => {
    const oldEvents = events.filter((event) => event.age === "old")
    oldEvents.forEach((event) => { event.killEvent() });
    console.log("killed Old Events", oldEvents);
  };


