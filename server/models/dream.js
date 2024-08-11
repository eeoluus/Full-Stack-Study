import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dreamSchema = Schema({
    summary: { type: String, required: true },
    quality: {
        type: String,
        required: true,
        enum: ["Ordinary", "Nightmare", "Dream come true"]
    },
    dreamer: { type: Schema.Types.ObjectId, ref: "User", required: true }
});


export default mongoose.model("Dream", dreamSchema);