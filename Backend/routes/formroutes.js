import express from "express";
import FormModel from "../models/formModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Received data at backend:", req.body);

    const newForm = new FormModel(req.body);

    const validationError = newForm.validateSync();
    if (validationError) {
      console.error("Validation Error:", validationError);
      return res.status(400).json({ error: "Validation failed", details: validationError });
    }

    const saved = await newForm.save();
    console.log("Saved to MongoDB:", saved);

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error saving to DB:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});


export default router;




  
