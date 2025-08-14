import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const hf = new HfInference(process.env.HF_API_KEY);

// sentiment analysis or text classification
app.post('/api/sentiment-analysis', async(req, res) => {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: "Text input is required" });
    }

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: text,
                    options: { wait_for_model: true }
                })
            }
        );

        if (response.ok) {
            const data = await response.json();
            return res.status(200).json(data);
        } else {
            return res.status(500).json({ error: "Failed to get prediction" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Failed to get prediction" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});