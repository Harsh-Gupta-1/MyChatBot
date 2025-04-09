import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import Chat from "./models/Chat.js";

dotenv.config();
const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Mistral API Configuration
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

app.get("/", (req, res) => {
  res.send("Welcome to the Harsh's Chat API!");
})
app.post("/api/chat", async (req, res) => {
  try {
    const { userID, message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Send request to Mistral API
    const response = await axios.post(MISTRAL_API_URL, {
      model: "mistral-tiny", // Other models: "mistral-small", "mistral-medium"
      messages: [{ role: "user", content: message }],
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const botReply = response.data.choices[0].message.content;

    // Save chat in MongoDB
    const chat = new Chat({ userID, question: message, reply: botReply });
    await chat.save();

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Mistral API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
