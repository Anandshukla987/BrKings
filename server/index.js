import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Brownie Kings</h1>");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));