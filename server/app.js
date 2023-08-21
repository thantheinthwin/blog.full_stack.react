import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config({path: '.env'});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: true}));


app.get("/", (req, res) => {
    return res.json("Hi there...")
})

import postRoutes from './routes/posts.js'
app.use('/api/posts', postRoutes)

import userRoutes from './routes/users.js'
app.use('/api/users', userRoutes)

import auth from './routes/auth.js'
app.use('/api/auth', auth)

// db.connect((err) => {
//     if(err) throw err;
//     console.log("Connected !");
// })

app.listen(process.env.PORT, () => console.log(`Listening to port: ${process.env.PORT}`));