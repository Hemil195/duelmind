# Agent Debate

## Project Overview

**Agent Debate** is an interactive web application that showcases two AI-powered agents engaging in intelligent debates on any topic provided by the user. The application demonstrates the power of multi-agent AI systems in having realistic, structured conversations where each agent presents arguments from different perspectives and a final verdict is rendered.

## Purpose

This project was created to:
- **Demonstrate multi-agent AI systems**: Show how multiple AI agents can interact, debate, and reach conclusions
- **Explore conversational AI**: Utilize advanced language models to generate coherent, logical arguments
- **Build intelligent discussion platforms**: Provide a foundation for creating applications where AI agents collaborate or compete to discuss topics
- **Showcase full-stack AI applications**: Combine backend AI orchestration with a modern, interactive frontend interface

## How It Works

1. A user submits a debate topic through the web interface
2. The backend orchestrates two AI agents to debate the topic
3. Each agent presents arguments and counterarguments
4. A final verdict is determined based on the debate outcome
5. The entire debate conversation is displayed to the user in real-time

## Technologies Used

### Backend
- **FastAPI** - Modern Python web framework for building APIs
- **LangChain** - Framework for working with language models
- **Groq API** - High-speed inference API for LLMs (primary LLM provider)
- **Google Gemini API** - Alternative LLM provider with fallback support
- **Python** - Core backend programming language
- **Pydantic** - Data validation and serialization library

### Frontend
- **React** - JavaScript library for building user interfaces
- **JavaScript (ES6+)** - Frontend programming language
- **CSS3** - Styling and responsive design

### Infrastructure & Deployment
- **CORS Middleware** - Enables secure communication between frontend and backend
- **REST API** - Standard HTTP-based API communication

## Key Features

✨ **Real-time AI Debates** - Watch two AI agents discuss any topic  
🎯 **Intelligent Verdict** - Automatic judgment based on debate arguments  
🔄 **Fallback LLM Support** - Seamless switching between Groq and Gemini APIs  
🚀 **Fast API** - Quick response times with Groq's optimized inference  
💻 **Modern UI** - Clean, intuitive interface for effortless interaction  
🔗 **Full-Stack Integration** - Complete backend and frontend integration  

## Architecture

The application follows a client-server architecture:
- **Frontend**: React-based single-page application
- **Backend**: FastAPI REST API with AI agent orchestration
- **Communication**: HTTP REST endpoints with JSON payloads
- **AI Layer**: LangChain-powered agents using external LLM APIs

## Getting Started

See individual README files in the `frontend/` and `backend/` directories for detailed setup and running instructions.

---

*Agent Debate - Empowering intelligent multi-agent conversations*