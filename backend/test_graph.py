from graph import build_debate_graph

# Build the graph
debate = build_debate_graph()

# Initial state
initial_state = {
    "topic": "Should AI replace doctors?",
    "messages": [],
    "round": 1,
    "verdict": ""
}

print("🚀 Starting Debate...\n")

# Run the full graph - it handles everything automatically!
final_state = debate.invoke(initial_state)

print("=" * 60)
print("📜 FULL DEBATE TRANSCRIPT")
print("=" * 60)
for message in final_state["messages"]:
    print()
    print(message)
    print("-" * 60)

print()
print("=" * 60)
print("⚖️  JUDGE VERDICT")
print("=" * 60)
print(final_state["verdict"])