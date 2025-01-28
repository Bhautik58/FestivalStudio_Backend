import { Request, Response, NextFunction } from 'express';

const validatePost = (req: Request, res: Response, next: NextFunction) : void => {
    const { festival_id } = req.body;
    const post_image = req.file;

    if (!festival_id) {
        res.status(400).json({ error: 'Festival ID is required.' });
        return 
    }

    if (!post_image) {
        res.status(400).json({ error: 'Post image is required.' });
        return 
    }

    next();
};

export default validatePost;
