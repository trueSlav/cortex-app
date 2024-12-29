import express from 'express';
import cors from 'cors';
import mysql from "mysql2";
import { OpenAI } from 'openai'

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'my-database',
    user: 'db_user',
    password: process.env.DB_PASSWORD,
    // host: 'localhost',
    // user: 'root',
    database: 'employee_db',
    multipleStatements: true
})

const checkTables = (callback) => {
    const check =
      `
        SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = 'employee_db' AND table_name = 'users') AS users; 
        SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = 'employee_db' AND table_name = 'departments') AS departments; 
    `;

    db.query(check, (error, result) => {
        const [users, departments] = result;
        const tablesExist = {
            users: users[0].users === 1,
            departments: departments[0].departments === 1
        }
        return callback(tablesExist);
    })
}

const createDBTables = (checkTable) => {
    const createTableUsers = `create table if not exists users(
      id int primary key auto_increment,
      first_name varchar(255) not null,
      last_name varchar(255) not null,
      middle_name varchar(255) not null,
      position varchar(255) not null,
      hire_date date
    )`;
    const createTableDepartments = `create table if not exists departments(
      id int primary key auto_increment,
      dep_name varchar(255) not null,
      dep_descr varchar(255) not null
    )`;

    checkTable(function (tables) {
        if(!tables.users) {
            db.query(createTableUsers, (error, result) => {
                if (!error) {
                    console.log("Table users created successfully.");
                } else {
                    console.log(error.sql)
                    console.log('Error create table users', error.message)
                }
            })
        }

        if(!tables.departments) {
            db.query(createTableDepartments, (error, result) => {
                if (!error) {
                    console.log("Table departments created successfully.");

                } else {
                    console.log(error.sql)
                    console.log('Error create table departments', error.message)
                }
            })
        }
    })
}
createDBTables(checkTables)

app.post('/users', (req, res) => {
    const sql = "INSERT INTO users (`first_name`,`last_name`,`middle_name`, `position`, `hire_date`) VALUES (?)"
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.middleName,
        req.body.position,
        req.body.hireDate,
    ]
    db.query(sql, [values], (err, result) => {
        if (err) {
            return console.log(`Error to inserting data`, err);
        } else {
            console.log('Successfully inserted data');
            const updatedUsers = 'SELECT * FROM users'
            db.query(updatedUsers, (error, newList) => {
                res.send(newList);
            })
        }
    })
})

app.get('/users/edit/:id', (req, res) => {
    try {
        const _id = req.params.id;
        const sql = `SELECT * FROM users WHERE id = ${_id}`
        db.query(sql, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log('failed user editing', err.message)
            }
        })
    } catch (error) {
        return res.status(500).json({success: false ,error: 'edit department error on server'});
    }
})

app.put('/users/edit/:id', (req, res) => {
    try {
        const _id = req.params.id;
        const sql = `UPDATE users SET first_name = (?), last_name = (?), middle_name = (?), position = (?), hire_date = (?) WHERE id = ${_id}`;
        const values = [
            req.body.first_name,
            req.body.last_name,
            req.body.middle_name,
            req.body.position,
            req.body.hire_date,
        ]

        db.query(sql, [...values], (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log(err.sql)
                console.log('the update users on the database side failed!', err.message)
            }
        })
    } catch (error) {
        console.log(error.message);
    }
})

app.delete('/users/:id', (req, res) => {
    try {
        const _id = req.params.id;
        const sql = `DELETE FROM users WHERE id = ${_id}`;

        db.query(sql, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log(err.sql)
                console.log('the delete user on the database side failed!', err.message)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/get-users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (!err) {
            console.log('Successfully read users');
            res.send(result);
        } else {
            console.log('failed to read users');
        }
    })
})

app.post('/departments', (req, res) => {

    try {
        const sql = "INSERT INTO departments (`dep_name`, `dep_descr`) VALUES (?)"
        const values = [
            req.body.dep_name,
            req.body.dep_descr,
        ]

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.log(result)
                return console.log(`Error to inserting`, err.message);
            } else {
                const updatedDeps = 'SELECT * FROM departments'
                db.query(updatedDeps, (error, newList) => {
                    res.send(newList);
                })
                return console.log('Successfully inserted data to departments table');
            }
        })

    } catch (error) {
        return res.status(500).json({success: false ,error: 'add position error on server'});
    }
})

app.get ('/departments', (req, res) => {
    const sql = "SELECT * FROM departments";
    db.query(sql, (err, result) => {
        if (!err) {
            console.log('Successfully read departments');
            res.send(result);
        } else {
            console.log('failed to read departments');
        }
    })
})

app.get('/departments/:id', (req, res) => {
    try {
        const _id = req.params.id;
        const sql = `SELECT * FROM departments WHERE id = ${_id}`
        db.query(sql, (err, result) => {
            if (!err) {
                console.log('EDITING ID', _id)
                res.send(result);
            } else {
                console.log('failed editing', err.message)
            }
        })
    } catch (error) {
        return res.status(500).json({success: false ,error: 'edit department error on server'});
    }
})

app.put('/departments/:id', (req, res) => {
    try {
        const _id = req.params.id;
        const sql = `UPDATE departments SET dep_name = (?), dep_descr = (?) WHERE id = ${_id}`;
        const values = [
            req.body.dep_name,
            req.body.dep_descr,
        ]
        db.query(sql, [...values], (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log(err.sql)
                console.log('the update on the database side failed!', err.message)
            }
        })
    } catch (error) {
        console.log(res.status(500).json({success: false ,error: 'update department error on server'}));
    }
})

app.delete('/departments/:id', (req, res) => {
    try {
        const _id = req.params.id;
        const sql = `DELETE FROM departments WHERE id = ${_id}`;

        db.query(sql, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log(err.sql)
                console.log('the delete on the database side failed!', err.message)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/letter', (req, res) => {
    try {
        const value = req.body.value;
        console.log(value)
        const apikey = process.env.API_KEY_AI
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: apikey,

        })

        async function main() {
            const completion = await openai.chat.completions.create({
                model: "meta-llama/llama-3.1-70b-instruct:free",
                messages: [
                    {
                        "role": "user",
                        "content": `${value}`,
                    }
                ]
            })
            if (completion.choices[0] === undefined){
                return res.status(400).send({success: false})
            }
            await res.send(completion.choices[0].message.content);
        }
        main()
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

