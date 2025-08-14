import React from "react";
import SentimentAnalysis from "./components/SentimentAnalysis.js";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Hugging Face Sentiment Analyzer</h1>
      </header>
      <main>
        <SentimentAnalysis />
      </main>
    </div>
  );
}