import express, { Request, Response } from 'express';
import { PostModel } from '../db/posts.ts';
import { FestivalModel } from '../db/festivals.ts';

class PostController {

    createPost = async (req: Request, res: Response): Promise<any> => {
        try {
            const {  festival_id } = req.body;
            const festival = await FestivalModel.findById(festival_id);
            if (!festival) {
                return res.status(404).json({ error: 'Festival not found' });
            }

            const festival_name = festival.festival_name

            const newPost = new PostModel({
                festival_name,
                festival_id,
                post_image: req.file && req.file.filename ? `/uploads/posts/${req.file.filename}` : null
            })
            await newPost.save();
            return res.status(201).json({
                message: 'Post created successfully!',
                data: newPost

            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    getAllPosts = async (req: Request, res: Response): Promise<any> => {
        try {
            const posts = await PostModel.find().select('-createdAt -updatedAt');; 
            return res.status(200).json({
                message: 'Posts fetched successfully!',
                data: posts
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    deletePost = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params; 

            const post = await PostModel.findByIdAndDelete(id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            return res.status(200).json({
                message: 'Post deleted successfully!',
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}

export default new PostController();