import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, max: 99 },
    dream: [{ type: Schema.Types.ObjectId, ref: "Dream" }]
});

export default mongoose.model("User", userSchema);