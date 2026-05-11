import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import socketHandler from "./socket/socket.js";
import { fetchQuote } from "./socket/utils/fetchQuote.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// FRONTEND URLS
const allowedOrigins = [
  "http://localhost:5173",
  "https://typenova-frontend-seven.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

// Root route
app.get("/", (req, res) => {
  res.json({
    status: "Backend running successfully",
  });
});

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Quote API route
app.get("/api/get", async (req, res) => {
  try {
    const quote = await fetchQuote();

    res.json({
      text: quote,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch quote",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});