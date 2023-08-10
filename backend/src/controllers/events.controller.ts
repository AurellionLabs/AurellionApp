
import { Request, Response, NextFunction } from 'express';
import client from '../../db';

export const getAllEventsForType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await client.query(
            `SELECT * FROM events WHERE id=$1 AND type=$2`,
            [res.locals.id, res.locals.type]
        );    
        res.send(events.rows);
    } catch (error) {
        res.status(500).send({message: "Error retrieving events", Error: error});
    }
}

export const killOldEvents = async (req: Request, res: Response) => {
    try {
        const result = await client.query(`DELETE FROM events WHERE age='old'`);
        res.json({ message: "Old events deleted.", deletedCount: result.rowCount });
    } catch (error) {
        res.status(500).send({message: "Error deleting old events.", Error: error});
    }
}


  


