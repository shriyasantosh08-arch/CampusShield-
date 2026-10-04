const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.set("io", io);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Campus Emergency Backend is running");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const incidentRoutes = require("./routes/incidentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);

// Socket.IO
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});