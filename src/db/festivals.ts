import mongoose  from "mongoose";

const FestivalSchema = new mongoose.Schema({
    festival_name : {
        type : String,
        trim: true,
        required: [true, 'Festival name is required'],
    },
    date : {
        type : Date,
        required: [true, 'Festival date is required'],
    }
},{ timestamps : true })

export const FestivalModel = mongoose.model('Festival', FestivalSchema);