from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from graph import build_debate_graph

# ── 1. Create FastAPI app ────────────────────────────────────────
app = FastAPI(
    title="Agent Debate API",
    description="Two AI agents debate any topic",
    version="1.0.0"
)

# ── 2. CORS Middleware ───────────────────────────────────────────
# This allows your React frontend to talk to this backend
# Without this, browser will BLOCK the request (security rule)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Allow all origins (fine for development)
    allow_methods=["*"],      # Allow GET, POST, etc.
    allow_headers=["*"],      # Allow all headers
)

# ── 3. Build the debate graph once when server starts ────────────
debate_graph = build_debate_graph()

# ── 4. Request Model ─────────────────────────────────────────────
# This defines what the frontend must send
class DebateRequest(BaseModel):
    topic: str   # Example: "Should AI replace doctors?"

# ── 5. Response Model ────────────────────────────────────────────
# This defines what we send back to frontend
class DebateResponse(BaseModel):
    topic: str
    messages: list
    verdict: str
    total_rounds: int

# ── 6. Health Check Endpoint ─────────────────────────────────────
# Just to confirm the server is running
@app.get("/")
def health_check():
    return {"status": "Agent Debate API is running!"}

# ── 7. Main Debate Endpoint ──────────────────────────────────────
@app.post("/debate", response_model=DebateResponse)
def run_debate(request: DebateRequest):

    # Validate topic is not empty
    if not request.topic.strip():
        raise HTTPException(
            status_code=400,
            detail="Topic cannot be empty"
        )

    # Validate topic is not too short
    if len(request.topic.strip()) < 10:
        raise HTTPException(
            status_code=400,
            detail="Topic must be at least 10 characters"
        )

    # Build initial state
    initial_state = {
        "topic": request.topic,
        "messages": [],
        "round": 1,
        "verdict": ""
    }

    # Run the full debate graph
    final_state = debate_graph.invoke(initial_state)

    # Return structured response
    return DebateResponse(
        topic=final_state["topic"],
        messages=final_state["messages"],
        verdict=final_state["verdict"],
        total_rounds=3
    )