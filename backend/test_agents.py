from agents import proponent_agent, opponent_agent, judge_agent

# Create initial state
state = {
    "topic": "Should AI replace doctors?",
    "messages": [],
    "round": 1,
    "verdict": ""
}

print("Running Proponent Agent...")
state = proponent_agent(state)
print(state["messages"][-1])
print()

print("Running Opponent Agent...")
state = opponent_agent(state)
print(state["messages"][-1])
print()

print("Running Judge Agent...")
state = judge_agent(state)
print("VERDICT:", state["verdict"])