import { db } from "../db.js";

export const getPosts = (req, res) => {
    const q = "SELECT * FROM posts";

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT * FROM  posts WHERE id ?";

    db.query(q, [req.param.id], (err, data) => {
        if(err) return res.json(err)

        return res.status(200).json(data);
    })
}

export const addPost = (req, res) => {
    res.json("add post")
}

export const deletePost = (req, res) => {
    res.json("delete post")
}

export const updatePost = (req, res) => {
    res.json("update post")
}