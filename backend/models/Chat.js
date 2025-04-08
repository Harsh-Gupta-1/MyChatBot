import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  question: { type: String, required: true },
  reply: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);
