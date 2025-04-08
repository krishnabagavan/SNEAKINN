// server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import formRoutes from "./routes/formroutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect("mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/formdata", formRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



