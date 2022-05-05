import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'


export const getPosts = async (req,res) =>{
    try{
        const postMessages = await PostMessage.find();

        res.status(200).send(postMessages)
    }catch(error){
        res.status(404).send({ message : error.message })
    }
}

export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).send(newPostMessage);
    } catch (error) {
        res.status(409).send({ message: error.message });
        console.log(error.message );
        console.log("FAILED TO STORE DATA IN DB");
    }
}

export const updatePost = async (req,res) =>{
    const { id : _id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id ${_id}`)

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});

    res.status(200).send(updatedPost)
}