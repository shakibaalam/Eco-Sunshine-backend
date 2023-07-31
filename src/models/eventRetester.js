import mongoose from "mongoose";

const EventRegSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name id required!"],
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    email: {
        type: String,
        required: [true, "img required!"],
    },
    phone: {
        type: String,
        required: [true, "phone name required!"],
    },
    message: {
        type: String,
        required: [true, "message name required!"],
    },
    comments: {
        type: String,
        required: false,
    },
});

const EventRegModel = mongoose.model("EventReg", EventRegSchema);

export default EventRegModel;
