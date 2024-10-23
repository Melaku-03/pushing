import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: "pending" },
    account: { type: String, default: "checking" },
});

const userModel = mongoose.models.user || mongoose.model("user", Schema);
export default userModel;
