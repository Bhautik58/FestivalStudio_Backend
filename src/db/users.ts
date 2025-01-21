import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    business_name: {
        type: String,
        required: [true, 'Business name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                // Basic email validation regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Please enter a valid email address',
        },
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function (value) {
                // Validate phone number format (10-15 digits)
                return /^\d{10,15}$/.test(value);
            },
            message: 'Phone number must be between 10 and 15 digits',
        },
    },
    website: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                // Basic URL validation regex
                return /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value);
            },
            message: 'Please enter a valid website URL',
        },
    },
    location: {
        type: String,
        trim: true,
    },
    logo: { type: String },
},{ timestamps: true})

export const UserModel = mongoose.model('User', UserSchema);