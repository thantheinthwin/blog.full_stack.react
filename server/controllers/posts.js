import { db } from "../db.js";

export const getPosts = (req, res) => {
    const q = "SELECT * FROM posts";

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT posts.title, posts.content, users.id, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.json(err)

        return res.status(200).json(data);
    })
}

export const addPost = (req, res) => {
    if(req.body.title === '' || req.body.content === ''){
        return res.status(400).json('Insufficient Input')
    }
    else{
        const q = "INSERT INTO posts (`title`, `content`, `user_id`) VALUES (?)"
        const values = [
            req.body.title,
            req.body.content,
            req.body.user_id
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.json(err);
            return res.status(200).json("Post added successfully")
        })
    }
}

export const deletePost = (req, res) => {
    const q = "DELETE FROM posts WHERE id = ?"
    db.query(q, req.params.id, (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json("Post deleted successfully")
    })
}

export const updatePost = (req, res) => {
    const q = "UPDATE posts SET title=?, content=? WHERE id=?"
    db.query(q, [req.body.title, req.body.content, req.params.id], (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json("Post updated successfully")
    })
}