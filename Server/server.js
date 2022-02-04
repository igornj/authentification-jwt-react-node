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

app.use(cors());
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
    const username = req.body.username;
    const password = req.body.password;

    //user exist
    const usernameExist = await User.findOne({ username: username });
    if (!usernameExist) {
        res.json({ auth: false, message: "Incorrect username" });
        return res.status(400);
    }

    //Password is correct
    const validPass = await bcrypt.compare(password, usernameExist.password);
    if (!validPass) {
        res.json({ auth: false, message: "Incorrect password" });
        return res.status(400);
    }

    if (usernameExist) {
        //Create and assign a token
        const token = jwt.sign({ _id: usernameExist._id }, process.env.TOKEN_SECRET, {
            expiresIn: 300,
        });
        res.json({ auth: true, token: token, user: usernameExist });
    } else {
        res.json({ auth: false, message: "User doesn't exist" });
    }

    return res.status(200);
})

//middleware to check the jwt token created
const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send("We need a token to check if you are authorized")
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) res.json({ auth: false, message: "You failed to authenticate" });

        req.userId = decoded._id;
        next();
    });
}

app.get('/users', verifyJwt, (req, res) => {
    res.send('You are authenticated');
})


app.listen(3001, () => {
    console.log(`Server running on port: 3001`);
});





