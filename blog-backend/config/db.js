  
const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL

});

pool.connect()
.then(()=> console.log("Connected to the database"))
.catch((err) => console.error("Connection error", err.stack));
module.exports = pool