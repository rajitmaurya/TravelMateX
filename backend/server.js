const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const https = require("https");

dotenv.config();

const hotelDataAddedToDBRouter = require("./routes/dataimport.router");
const categoryDataAddedToDBRouter = require("./routes/categoryimport.router");

const hotelRouter = require("./routes/hotel.router");
const categoryRouter = require("./routes/category.router");
const singleHoterRouter = require("./routes/singlehotel.router");
const authRouter = require("./routes/auth.router");
const wishlistRouter = require("./routes/wishlist.router");

const connectDB = require("./config/dbconfig");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3500;

app.get("/", (req, res) => {
  res.send("Hello Geeks");
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singleHoterRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

// Self-pinging to prevent Render cold starts
const RENDER_URL = "https://travelmatex.onrender.com";
setInterval(() => {
  https.get(RENDER_URL, (res) => {
    console.log(`Self-pinged: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`Error self-pinging: ${err.message}`);
  });
}, 840000); // 14 minutes

// Start server immediately and connect DB in background
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is Up and Running on port ${process.env.PORT || PORT}`);
    connectDB();
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

