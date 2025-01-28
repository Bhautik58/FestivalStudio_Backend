import validateUser from '../middlewares/validateUsers.ts';
import UserController from '../controllers/UserController.ts';
import validateFestival from '../middlewares/ validateFestivals.ts';
import FestivalController from '../controllers/FestivalController.ts';
import PostController from '../controllers/PostController.ts';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import createUploader from '../middlewares/fileUpload.ts';
import validatePost from '../middlewares/validatePost.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const uploadBusinessLogo = createUploader('businessLogos')

router.post('/user', uploadBusinessLogo.single('logo'), validateUser, UserController.createUser);

//Festival Route
router.post('/festival', validateFestival, FestivalController.createFestival);
router.get('/festivals', FestivalController.getAllFestivals);
router.patch('/festival/:id', FestivalController.updateFestival);
router.delete('/festival/:id', FestivalController.deleteFestival);

const uploadPost = createUploader('posts')

//Post Route
router.post('/post', uploadPost.single('post_image'),validatePost, PostController.createPost)
router.get('/posts', PostController.getAllPosts);
router.delete('/post/:id', PostController.deletePost); 

export default router;  