# Agent Debate - Backend API

## Overview

The backend is a **FastAPI** server that orchestrates two AI agents to debate any given topic. It handles:
- LLM integration with Groq and Google Gemini
- Multi-agent debate orchestration using LangGraph
- REST API endpoints for the frontend
- Input validation and error handling

## Architecture

The backend consists of three main components:

### **agents.py**
Defines the three debate agents:
- **Proponent Agent**: Argues IN FAVOR of the topic
- **Opponent Agent**: Argues AGAINST the topic  
- **Judge Agent**: Evaluates both sides and renders a final verdict

Each agent uses LLM (Groq or Gemini with fallback) to generate intelligent arguments.

### **graph.py**
Implements the debate workflow using **LangGraph**:
- Defines the `DebateState` (shared context for all agents)
- Creates a state graph with 3 nodes (proponent → opponent → judge)
- Implements conditional routing to control debate rounds
- Compiles the graph into an executable workflow

### **main.py**
Provides the **FastAPI** REST API:
- Health check endpoint: `GET /`
- Debate endpoint: `POST /debate`
- Input validation (topic must be 10+ characters)
- CORS middleware for frontend communication

## Setup

### **1. Prerequisites**
- Python 3.10 or higher
- pip (Python package manager)

### **2. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **3. Environment Variables**
Create a `.env` file in the `backend/` directory:

```env
# Groq API (Primary LLM)
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant

# Google Gemini (Fallback LLM)
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

**Note**: Configure at least one LLM provider. Groq is faster; Gemini is the fallback.

### **4. Get API Keys**
- **Groq API**: Visit [console.groq.com](https://console.groq.com)
- **Google Gemini**: Visit [ma.google.com/ai-studio](https://ma.google.com/ai-studio)

## Running the Server

### **Development Mode**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### **Interactive API Docs**
Visit `http://localhost:8000/docs` to see and test all endpoints.

## API Endpoints

### **1. Health Check**
```http
GET /
```
**Response:**
```json
{
  "status": "Agent Debate API is running!"
}
```

### **2. Start Debate**
```http
POST /debate
```

**Request Body:**
```json
{
  "topic": "Should artificial intelligence replace human doctors?"
}
```

**Response:**
```json
{
  "topic": "Should artificial intelligence replace human doctors?",
  "messages": [
    "[PROPONENT - Round 1]: AI can analyze medical data faster...",
    "[OPPONENT - Round 1]: But doctors provide empathy...",
    ...
  ],
  "verdict": "Both perspectives have merit...",
  "total_rounds": 3
}
```

**Validation Rules:**
- Topic must not be empty
- Topic must be at least 10 characters long

## Project Structure

```
backend/
├── main.py           # FastAPI app and endpoints
├── agents.py         # AI agent definitions
├── graph.py          # LangGraph debate workflow
├── test_agents.py    # Unit tests for agents
├── test_graph.py     # Unit tests for graph
├── requirements.txt  # Python dependencies
├── .env              # Environment variables (create this)
└── README.md         # This file
```

## Technologies

- **FastAPI**: Modern, high-performance API framework
- **LangChain**: LLM orchestration and agent framework
- **LangGraph**: State machine for multi-agent workflows
- **Groq API**: Fast LLM inference
- **Google Gemini**: Alternative LLM provider
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

## Testing

Run the test suite:
```bash
pytest test_agents.py test_graph.py
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError` | Run `pip install -r requirements.txt` |
| `GROQ_API_KEY not found` | Create `.env` file with your API keys |
| `Connection refused` | Ensure backend is running on port 8000 |
| `CORS error from frontend` | CORS middleware is already enabled |

## Notes

- The debate runs for exactly **3 rounds**
- Each agent gets one turn per round
- The judge evaluates all arguments and gives the final verdict
- Groq is tried first; Gemini is the fallback if Groq fails
- The API validates topics before processing to save API calls

---

For frontend setup, see [../frontend/README.md](../frontend/README.md)
