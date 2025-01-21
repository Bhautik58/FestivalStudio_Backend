import validateUser from '../middlewares/validateUsers.ts';
import userController from '../controllers/UserController.ts';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../uploads');
        return cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${req.body.business_name}_${file.originalname}`)
    },
})
const upload = multer({ storage })

router.post('/user', upload.single('logo'), validateUser, userController.createUser);

export default router;