import { Request, Response, NextFunction } from 'express';

const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { business_name, email, phone } = req.body;

    // Validate business_name
    if (!business_name || typeof business_name !== 'string') {
        res.status(400).json({ error: 'Business name is required and should be a valid string.' });
        return
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
        res.status(400).json({ error: 'A valid email address is required.' });
        return
    }

    // Validate phone
    if (!phone || !isValidPhone(phone)) {
        res.status(400).json({ error: 'A valid phone number is required.' });
        return
    }

    // If validation passes, proceed to the next middleware/controller
    next();
};

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Helper function to validate phone
const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
};

export default validateUser;
