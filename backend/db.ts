// db.ts
import { Client } from 'pg';

const client = new Client({
    host: "localhost",
    user: "machine",
    password: "m3ChaN01D",
    port: 5432,
    database: "AuSysDB"
});

client.connect();

export default client;

