from typing import Literal, Optional

from google import genai
from google.genai import types
from pydantic import BaseModel

from system_prompt import SYSTEM_PROMPT

# "-latest" alias tracks Google's current flash model automatically, so this
# doesn't go stale the way a dated snapshot id would.
MODEL = "gemini-flash-latest"

# The system prompt's "trend across the conversation" instruction needs actual
# turns to look at — capped so cost/latency don't grow unbounded on a long chat.
MAX_HISTORY_MESSAGES = 12

_client: Optional[genai.Client] = None


def _get_client() -> genai.Client:
    # Constructed lazily (not at import time) so a missing GEMINI_API_KEY
    # doesn't crash the whole app at startup — /api/health and /api/stats
    # should stay up even if the chat key isn't configured yet.
    global _client
    if _client is None:
        _client = genai.Client()  # reads GEMINI_API_KEY from the environment
    return _client


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


def get_reply(messages: list[ChatMessage]) -> str:
    recent = messages[-MAX_HISTORY_MESSAGES:]
    # Gemini uses "model" where the rest of the app (and the wire format from
    # the frontend) says "assistant" — translate at the boundary.
    contents = [
        types.Content(
            role="model" if m.role == "assistant" else "user",
            parts=[types.Part(text=m.content)],
        )
        for m in recent
    ]
    response = _get_client().models.generate_content(
        model=MODEL,
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            max_output_tokens=1024,
        ),
    )
    return response.text or ""
