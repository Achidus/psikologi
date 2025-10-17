import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // <-- Tambahkan ini untuk baca .env

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ai", async (req, res) => {
  const message = req.body.message || "";

  const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HF_TOKEN}`, // <-- Pakai dari .env
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: message }),
  });

  const result = await response.json();
  const reply = result?.generated_text || "Aku mengerti... lanjutkan ceritamu 💜";
  res.json({ reply });
});

app.listen(3000, () => console.log("AI Backend berjalan di port 3000"));
