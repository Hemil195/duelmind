from langgraph.graph import StateGraph, END
from typing import TypedDict
from agents import proponent_agent, opponent_agent, judge_agent

# ── 1. Define the State ──────────────────────────────────────────
# This is the shared whiteboard all agents read and write to
class DebateState(TypedDict):
    topic: str        # The debate topic
    messages: list    # Full debate history
    round: int        # Current round number
    max_rounds: int   # Maximum number of rounds to run
    verdict: str      # Judge fills this at end

# ── 2. Routing Function ──────────────────────────────────────────
# This function decides: should we do another round OR go to judge?
def should_continue(state: DebateState) -> str:
    # Continue until the configured max_rounds is reached
    # After opponent speaks, round gets incremented
    # So if round > max_rounds, debate is done → go to judge
    if state["round"] > state["max_rounds"]:
        return "judge"
    else:
        return "proponent"

# ── 3. Build the Graph ───────────────────────────────────────────
def build_debate_graph():
    # Create a new graph that uses DebateState
    graph = StateGraph(DebateState)

    # Add the 3 agents as nodes
    graph.add_node("proponent", proponent_agent)
    graph.add_node("opponent", opponent_agent)
    graph.add_node("judge", judge_agent)

    # Set starting point
    graph.set_entry_point("proponent")

    # After proponent speaks → always goes to opponent
    graph.add_edge("proponent", "opponent")

    # After opponent speaks → check if more rounds needed
    # This is the conditional edge (the smart routing)
    graph.add_conditional_edges(
        "opponent",           # After this node...
        should_continue,      # ...run this function to decide...
        {
            "proponent": "proponent",  # if returns "proponent" → go to proponent
            "judge": "judge"           # if returns "judge" → go to judge
        }
    )

    # After judge speaks → end the graph
    graph.add_edge("judge", END)

    # Compile and return the runnable graph
    return graph.compile()