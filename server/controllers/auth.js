import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    if(req.body.email === "" || req.body.username === "" || req.body.password === ""){
        return res.status(404).json("Insufficient input")
    }
    else {
        // Check existing user
        const q = "SELECT * FROM users WHERE email = ? OR username = ?"

        db.query(q, [req.body.email, req.body.username], (err, data) => {
            if(err) return res.json(err)
            if(data.length) return res.status(409).json("User already exists");

            // Hashing the password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)"
            const values = [
                req.body.username,
                req.body.email,
                hash
            ]

            db.query(q, [values], (err, data) => {
                if(err) return res.json(err);
                return res.status(200).json("User created successfully")
            })
        })
    }
}

export const login = (req, res) => {
    if(req.body.email == "" || req.body.password == ""){
        return res.status(404).json("Insuficient input")
    }
    else {
        // Check user
        const q = "SELECT * FROM users WHERE email = ?"

        db.query(q, [req.body.email], (err, data) => {
            if(err) return res.json(err);
            if (data.length === 0)
              return res.status(404).json("User not found");

            // Check password
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

            if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
            
            // removing password in respond to user
            const {password, ...other} = data[0]

            const token = jwt.sign({user: other}, "jwtkey");

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(other)
        })
    }
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User have been logged out")
}

export const validateUser = (req, res) => {
    if(req.cookies["access_token"]){
        return res.status(200).json(JSON.stringify(jwt.decode(req.cookies["access_token"])))
    }
    else {
        return res.status(400).json("Token not exists")
    }
}