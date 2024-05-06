const express = require('express')
const cors = require('cors');
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())
app.use(cors());

///routes
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM users')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password])
        res.status(200).send({message: "Success"})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (user.rows.length === 1) {
            res.status(200).send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), password VARCHAR(100))')
        res.status(200).send({message: "Success"})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))