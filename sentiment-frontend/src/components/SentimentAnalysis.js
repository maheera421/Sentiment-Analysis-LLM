import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SentimentAnalysis() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [progressbar, setProgressbar] = useState({ positive: "0%", negative: "0%" });

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setResult(null);
    setAnalysis(null);
    setProgressbar({ positive: "0%", negative: "0%" });

    try {
      
      const res = await axios.post("http://localhost:5000/api/sentiment-analysis", { 
        text: input 
      });
      setResult(res.data);
    } catch (err) {
      console.error("Frontend error:", err.response?.data || err.message);
      setResult({ message: "Error occurred calling API" });
    }
  };

  useEffect(() => {
    if (!Array.isArray(result)) return;

    // Handle different response formats
    let scores = result;
    
    // If result is nested (some models return [[{label, score}]])
    if (result[0] && Array.isArray(result[0])) {
      scores = result[0];
    }

    // Converting star rating system into positive/negative
    if (scores.some(item => item.label.includes('star'))) {
      // For star ratings: 4-5 stars = positive, 1-2 stars = negative, 3 stars = neutral
      const positive = scores.filter(item => 
        item.label.includes('5 stars') || item.label.includes('4 stars')
      );
      const negative = scores.filter(item => 
        item.label.includes('1 star') || item.label.includes('2 stars')
      );
      
      const posScore = positive.reduce((sum, item) => sum + item.score, 0) * 100;
      const negScore = negative.reduce((sum, item) => sum + item.score, 0) * 100;
      
      setProgressbar({ 
        positive: `${posScore.toFixed(2)}%`, 
        negative: `${negScore.toFixed(2)}%` 
      });

      // Find the highest scoring item for display
      const top = [...scores].sort((a, b) => b.score - a.score)[0];
      
      // Convert star rating to sentiment for display
      let convertedAnalysis = null;
      if (top) {
        if (top.label.includes('5 stars') || top.label.includes('4 stars')) {
          convertedAnalysis = { label: 'POSITIVE', score: top.score };
        } else if (top.label.includes('1 star') || top.label.includes('2 stars')) {
          convertedAnalysis = { label: 'NEGATIVE', score: top.score };
        } else {
          convertedAnalysis = { label: 'NEUTRAL', score: top.score };
        }
      }
      setAnalysis(convertedAnalysis);

      const animate = (id, score) => {
        let width = 0;
        const el = document.getElementById(id);
        if (!el) return;
        el.style.width = "0%";
        const timer = setInterval(() => {
          if (width >= score) return clearInterval(timer);
          width++;
          el.style.width = `${width}%`;
          el.style.backgroundColor = score > 50 ? "#4caf50" : "#f44336";
        }, 10);
      };

      animate("positive-progress", Number(posScore.toFixed(2)));
      animate("negative-progress", Number(negScore.toFixed(2)));
    } else {
      // Handle traditional positive/negative labels
      const pos = scores.find((t) => 
        t.label?.toUpperCase().includes("POSITIVE") || 
        t.label?.toUpperCase().includes("LABEL_2")
      );
      const neg = scores.find((t) => 
        t.label?.toUpperCase().includes("NEGATIVE") || 
        t.label?.toUpperCase().includes("LABEL_0")
      );

      const posScore = pos ? (pos.score * 100).toFixed(2) : 0;
      const negScore = neg ? (neg.score * 100).toFixed(2) : 0;

      setProgressbar({ positive: `${posScore}%`, negative: `${negScore}%` });

      const top = [...scores].sort((a, b) => b.score - a.score)[0];
      setAnalysis(top || null);

      const animate = (id, score) => {
        let width = 0;
        const el = document.getElementById(id);
        if (!el) return;
        el.style.width = "0%";
        const timer = setInterval(() => {
          if (width >= score) return clearInterval(timer);
          width++;
          el.style.width = `${width}%`;
          el.style.backgroundColor = score > 50 ? "#4caf50" : "#f44336";
        }, 10);
      };

      animate("positive-progress", Number(posScore));
      animate("negative-progress", Number(negScore));
    }
  }, [result]);

  return (
    <>
      <form onSubmit={handleAnalyze} className="card">
        <h2>Sentiment Analysis</h2>
        <textarea
          rows="8"
          placeholder="Type or paste text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={!input.trim()}>
          Analyze
        </button>
      </form>

      <div className="result">
        <h3>Result</h3>
        {result?.message && <p className="warning">{result.message}</p>}

        {analysis && (
          <p className={
            analysis.label.toUpperCase().includes("POSITIVE") ? "pos" : 
            analysis.label.toUpperCase().includes("NEGATIVE") ? "neg" : "neutral"
          }>
            {analysis.label} ({(analysis.score * 100).toFixed(2)}%)
          </p>
        )}

        <h3>Analyzer</h3>
        <div className="pg-container">
          <h4>Positive</h4>
          <div id="progressbar-container">
            <div id="positive-progress" className="progressbar"></div>
          </div>
          <p>{progressbar.positive}</p>
        </div>

        <div className="pg-container">
          <h4>Negative</h4>
          <div id="progressbar-container">
            <div id="negative-progress" className="progressbar"></div>
          </div>
          <p>{progressbar.negative}</p>
        </div>
      </div>
    </>
  );
}