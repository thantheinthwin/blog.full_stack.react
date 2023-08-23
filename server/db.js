import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config({path: '.env'});

export const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})