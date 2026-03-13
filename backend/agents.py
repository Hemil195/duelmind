from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv
import os

try:
    from langchain_groq import ChatGroq  # pyright: ignore[reportMissingImports]
except ImportError:
    ChatGroq = None

# Load the API key from .env file
load_dotenv()

# Initialize models
groq_api_key = os.getenv("GROQ_API_KEY")
google_api_key = os.getenv("GOOGLE_API_KEY")

groq_llm = None
gemini_llm = None

if groq_api_key and ChatGroq is not None:
    groq_llm = ChatGroq(
        model=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
        api_key=groq_api_key
    )

if google_api_key:
    gemini_llm = ChatGoogleGenerativeAI(
        model=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
        google_api_key=google_api_key
    )


def invoke_with_fallback(messages):
    """
    Try Groq first. If Groq fails for any reason, fallback to Gemini.
    """
    groq_error = None

    if groq_llm is not None:
        try:
            return groq_llm.invoke(messages)
        except Exception as err:
            groq_error = err
            print(f"Groq request failed, falling back to Gemini: {err}")

    if gemini_llm is not None:
        try:
            return gemini_llm.invoke(messages)
        except Exception as err:
            if groq_error is not None:
                raise RuntimeError(
                    f"Both model calls failed. Groq error: {groq_error}; Gemini error: {err}"
                ) from err
            raise RuntimeError(f"Gemini call failed: {err}") from err

    if groq_error is not None:
        raise RuntimeError(
            f"Groq failed and Gemini is not configured. Groq error: {groq_error}"
        )

    raise RuntimeError(
        "No model is configured. Set GROQ_API_KEY, or set GOOGLE_API_KEY as fallback."
    )


def proponent_agent(state: dict) -> dict:
    """
    Agent A — argues IN FAVOR of the topic
    """
    topic = state["topic"]
    history = state["messages"]
    round_num = state["round"]

    # Build the conversation context from history
    history_text = "\n".join(history) if history else "This is the first round."

    response = invoke_with_fallback([
        SystemMessage(content="""You are a confident debate champion. 
        Your job is to argue STRONGLY IN FAVOR of the given topic.
        Be logical, use facts, and keep your argument to 3-4 sentences.
        Do NOT repeat what you said before. Build on previous arguments."""),

        HumanMessage(content=f"""
        Topic: {topic}
        Round: {round_num}
        Debate so far:
        {history_text}
        
        Now give your argument IN FAVOR of the topic.
        """)
    ])

    # Add this agent's argument to the messages list
    new_message = f"[PROPONENT - Round {round_num}]: {response.content}"
    state["messages"].append(new_message)

    return state


def opponent_agent(state: dict) -> dict:
    """
    Agent B — argues AGAINST the topic
    """
    topic = state["topic"]
    history = state["messages"]
    round_num = state["round"]

    history_text = "\n".join(history) if history else "This is the first round."

    response = invoke_with_fallback([
        SystemMessage(content="""You are a sharp debate champion.
        Your job is to argue STRONGLY AGAINST the given topic.
        Counter the proponent's points directly.
        Be logical, use facts, and keep your argument to 3-4 sentences.
        Do NOT repeat what you said before."""),

        HumanMessage(content=f"""
        Topic: {topic}
        Round: {round_num}
        Debate so far:
        {history_text}
        
        Now give your argument AGAINST the topic.
        """)
    ])

    new_message = f"[OPPONENT - Round {round_num}]: {response.content}"
    state["messages"].append(new_message)

    # After opponent speaks, increment the round
    state["round"] += 1

    return state


def judge_agent(state: dict) -> dict:
    """
    Agent C — reads full debate and gives verdict
    """
    topic = state["topic"]
    history = state["messages"]

    full_debate = "\n".join(history)

    response = invoke_with_fallback([
        SystemMessage(content="""You are an impartial judge in a debate competition.
        Read the full debate carefully.
        Give a fair verdict on WHO argued better and WHY.
        Also give a final answer on the topic based on the arguments.
        Be clear and structured in your response."""),

        HumanMessage(content=f"""
        Topic: {topic}
        
        Full Debate:
        {full_debate}
        
        Give your verdict now.
        """)
    ])

    state["verdict"] = response.content

    return state