import express from 'express';
import { UserModel } from '../db/users.js';


class UserController {

    createUser = async (request: express.Request, response: express.Response): Promise<any> => {
        try {
            const { business_name, email, phone, website, location } = request.body;
            const { filename } = request.file
            const user = new UserModel({
                business_name,
                email,
                phone,
                website,
                location,
                logo : filename ? `/uploads/${filename}` : null
            })
             await user.save();
            return response.status(201).json({
                message: 'User login successfully!',
                data: user
            })
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}

export default new UserController();