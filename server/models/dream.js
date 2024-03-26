import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dreamSchema = Schema({
    summary: { type: String, required: true },
    quality: {
        type: String,
        required: true,
        enum: ["Ordinary", "Nightmare"]
    }
});

export default mongoose.model("Dream", dreamSchema);