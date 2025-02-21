require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 5000;

// Route: GET /bfhl (Returns operation_code)
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Route: POST /bfhl (Processes Input)
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    // Extract numbers and alphabets
    const numbers = data.filter((item) => /^\d+$/.test(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    // Find the highest alphabet (last in A-Z series, case insensitive)
    const highestAlphabet = alphabets.length
      ? [alphabets.reduce((max, char) => (char.toLowerCase() > max.toLowerCase() ? char : max))]
      : [];

    // Response JSON
    res.status(200).json({
      is_success: true,
      user_id: "john_doe_17091999", // Replace with actual user ID format
      email: "john@xyz.com", // Replace with actual email
      roll_number: "ABCD123", // Replace with actual roll number
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
