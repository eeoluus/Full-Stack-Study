import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, max: 99 },
});

export default mongoose.model("User", userSchema);