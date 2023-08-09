
import {Request, Response, NextFunction} from 'express'
import client from '../../db';
//import { getBoxesAtLocationWithRadius , isBoxInOval } from '../helpers/parcels.helper';
//import { Client } from 'pg';
export const getAllEventsForType = async (req: Request, res: Response, next: NextFunction) => {
   const events = await client.query(
    `SELECT * FROM events WHERE id=$1 AND type=$2`,
        [res.locals.id, res.locals.type]
   );    
   res.send(events);
}
// export const getAllEventsForType = (id: string, type: string): EventObject[] => {
//     return sigEvents.filter((event) => event.type === type && event.id === id);
//   };
export const killOldEvents = async () => {
    const events = await client.query(
    `SELECT * FROM events WHERE type="old" `);
    console.log("killed Old Events", events);
  };

  


