import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "amount required!"],
    },
    paymentIntentId: {
        type: String,
        required: [true, "paymentIntentId required!"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
    }
});

const paymentModel = mongoose.model("payment", paymentSchema);

export default paymentModel;