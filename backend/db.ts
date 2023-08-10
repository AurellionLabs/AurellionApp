// db.ts
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: "localhost",
    user: "machine",
    password: "m3ChaN01D!",
    port: 5432,
    database: "AuSysDB"
});

export default client;

