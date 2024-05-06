const express = require('express')
const cors = require('cors');
const nodeMailer = require('nodemailer')
const pool = require('./db')
require('dotenv').config();
const port = process.env.PORT;

const app = express()
app.use(express.json())
app.use(cors());

const html = `
    <h1>Bienvenue sur Spotiflix !</h1>
    <p>Votre compte a bien été créé, vous pouvez profiter de notre streaming sans limite !</p>
`

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
        const user = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        if (user.rows.length === 0) {
            await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password])
            const transporter = nodeMailer.createTransport({
                service: process.env.MAIL_SERVICE,
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });
            const info = await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Testing',
                text: "Hello World ?",
                html: html,
            });
            res.status(200).send({message: "Success"})
        } else {
            res.status(401).send({ message: "Account already exist" });
        }
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
        const checkTableQuery = `SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_name = 'users'
        )`;

        const { rows } = await pool.query(checkTableQuery);
        const tableExists = rows[0].exists;

        if (tableExists) {
            res.status(200).send({ message: "La table 'users' existe déjà." });
        } else {
            await pool.query('CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), password VARCHAR(100))');
            res.status(200).send({ message: "La table 'users' a été créée avec succès." });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete('/user/remove', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        if (result.rowCount === 1) {
            res.status(200).send({ message: "User deleted successfully" });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

app.put('/user/edit', async (req, res) => {
    const { id, oldpassword, newpassword} = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1 AND password = $2', [id, oldpassword]);
        if (user.rows.length === 1) {
            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [newpassword, id]);
            res.status(200).send({ message: "Password updated successfully" });
        } else {
            res.status(401).send({ message: "Invalid old password" });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))