// db.ts
import pkg from 'pg';
const { Client } = pkg;

export const client = new Client({
    user: 'machine',
    host: 'localhost',
    database: 'AuSysDB',
    password: 'm3ChaN01D!',
    port: 5432,
});
export const createEventsTable = async () => {
    try {
        await client.connect();
    } catch (e) {
        console.error("error while connecting DB")
    }

  // Create sequence for ID if it doesn't exist
  await client.query(`
    DO $$ BEGIN
      CREATE SEQUENCE IF NOT EXISTS event_id_seq;
    EXCEPTION WHEN duplicate_table THEN
      -- Do nothing, the sequence already exists
    END $$;
  `);

  // Create the events table if it doesn't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.events (
      id text COLLATE pg_catalog."default" NOT NULL DEFAULT nextval('event_id_seq'::regclass),
      value text COLLATE pg_catalog."default",
      type character varying(255) COLLATE pg_catalog."default",
      age character varying(255) COLLATE pg_catalog."default"
    );
  `);

  await client.end();
  return client;
};

