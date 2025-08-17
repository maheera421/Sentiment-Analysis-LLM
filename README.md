# Sentiment Analysis LLM Web Application

A modern, real-time sentiment analysis web application powered by Hugging Face transformer models. This project provides an intuitive interface for analyzing text sentiment with animated visualizations and confidence scores.

![Sentiment Analysis Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18+-blue) ![Node.js](https://img.shields.io/badge/Node.js-16+-green) ![Express](https://img.shields.io/badge/Express-4+-lightgrey)

## 🚀 Features

- **Real-time Sentiment Analysis**: Instant text analysis using state-of-the-art transformer models
- **Interactive UI**: Clean, responsive React interface with animated progress bars
- **Multi-language Support**: Powered by BERT-based multilingual sentiment classifier
- **Confidence Scoring**: Detailed sentiment breakdown with percentage confidence levels
- **Visual Feedback**: Animated progress bars showing positive/negative sentiment distribution
- **RESTful API**: Clean backend architecture with proper error handling

## 🛠️ Technologies Used

### Frontend
- **React.js** - Modern UI library for component-based architecture
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with animations and responsive design
- **HTML5** - Semantic markup structure

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **Hugging Face Inference API** - Access to transformer models
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### AI/ML
- **Hugging Face Transformers** - Pre-trained sentiment analysis models
- **BERT-based Models** - Multilingual sentiment classification
- **nlptown/bert-base-multilingual-uncased-sentiment** - 5-star rating sentiment model

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Hugging Face API token (free registration required)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/maheera421/Sentiment-Analysis-LLM.git
cd Sentiment-Analysis-LLM
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
HF_API_KEY=your_huggingface_api_token_here
PORT=5000
```

### 3. Frontend Setup
```bash
cd sentiment-frontend
npm install
```

### 4. Get Hugging Face API Token
1. Visit [Hugging Face](https://huggingface.co/)
2. Create a free account
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Copy the token to your `.env` file

## 🚀 Running the Application

### Start the Backend Server
```bash
cd Backend
npm start
```
The backend will run on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd sentiment-frontend
npm start
```
The frontend will run on `http://localhost:3000`

## 🔍 API Endpoints

### POST `/api/sentiment-analysis`
Analyzes the sentiment of provided text.
