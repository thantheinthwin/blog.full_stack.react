import axios from "axios";

export const getAllPosts = async () => {
    try {
        const res = await axios.get("/posts/")
        return res.data;
    } catch (error) {
        return console.error(error);
    }
}
