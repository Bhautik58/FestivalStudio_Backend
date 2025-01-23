import express from 'express';
import { UserModel } from '../db/users.js';


class UserController {

    createUser = async (request: express.Request, response: express.Response): Promise<any> => {
        try {
            const { business_name, email, phone, website, location, fcm_token } = request.body;

            // Check if a user with the same email already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return response.status(400).json({
                    message: 'User with this email already exists!',
                });
            }

            // Create a new user
            const user = new UserModel({
                business_name,
                email,
                phone,
                website,
                location,
                fcm_token,
                logo: request.file && request.file.filename ? `/uploads/${request.file.filename}` : null
            })
            await user.save();
            return response.status(201).json({
                message: 'User login successfully!',
                data: user
            })
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}

export default new UserController();