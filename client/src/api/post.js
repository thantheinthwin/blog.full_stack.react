import axios from "axios";

export const getAllPosts = async () => {
    try {
        const res = await axios.get("/posts/")
        return res.data;
    } catch (error) {
        return console.error(error);
    }
}

export const getPost = async (postId) => {
    try {
        const res = await axios.get(`/posts/${postId}`)
        return res.data;
    } catch (error) {
        return console.error(error);
    }
}

export const addPost = async (inputData) => {
    try {
        const res = await axios.post('/posts/', inputData)
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const deletePost = async (id) => {
    try {
        const res = await axios.delete(`/posts/${id}`)
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const updatePost = async (inputData, id) => {
    try {
        const res = await axios.put(`/posts/${id}`, inputData)
        return res.data;
    } catch (error) {
        return null;
    }
}