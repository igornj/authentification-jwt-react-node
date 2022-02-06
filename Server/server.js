/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/User');
dotenv.config();


//Connect to DB
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        //Checking if the user is already in the database
        try {
            const usernameExist = await User.findOne({ username: username });
            if (usernameExist) {
                console.log('usuário ja existe');
                return res.status(400).send('username already exists');
            }
        } catch (err) {
            console.log(err);
        }


        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //CREATE A NEW USER
        const user = new User({
            username: username,
            password: hashPassword
        });

        try {
            const savedUser = await user.save();
            res.send({ user: savedUser });
            res.status(200);
        } catch (e) {
            res.status(400).send(e);
            console.log(e);
            console.log('data not sent');
        }
    }

})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    //check if user exist
    const usernameExist = await User.findOne({ username: username });
    if (!usernameExist) {
        return res.status(400).json({ message: "Incorrect username" });
    }

    //Check if Password is correct
    const validPass = await bcrypt.compare(password, usernameExist.password);
    if (!validPass) {
        return res.status(400).json({ message: "Incorrect password" });
    }


    //Create and assign a token
    const token = jwt.sign({ _id: usernameExist._id }, process.env.TOKEN_SECRET, {
        expiresIn: 300,
    });

    return res.status(200).json({ token: token, user: usernameExist });;
})

//middleware to check the jwt token on headers
const verifyToken = (req, res, next) => {
    //the "authorization" has to be in lower case to find it, and the "bearer" needs to be excluded to be verified
    const token = req.headers["authorization"].replace('Bearer ', '');

    if (!token) {
        res.status(401);
        console.log('Unauthorized');
    }

    //authenticate token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded._id;
        next();
    });
}

app.get('/users', verifyToken, (req, res) => {
    res.status(200).send('You are authenticated');
})


app.listen(3001, () => {
    console.log(`Server running on port: 3001`);
});





