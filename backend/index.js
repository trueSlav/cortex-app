import express from 'express';
import cors from 'cors';
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees',
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
