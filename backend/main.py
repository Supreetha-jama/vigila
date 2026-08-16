import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.genai import errors as genai_errors

from chat import ChatRequest, get_reply
from stats import get_age_distribution

load_dotenv()

app = FastAPI(title="Vigila API")

# Vite dev server ports, always allowed — plus the deployed Vercel frontend origin,
# supplied via env var so it doesn't need a code change/redeploy once that URL exists.
_DEV_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]
_extra_origins = [o.strip() for o in os.environ.get("FRONTEND_ORIGIN", "").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_DEV_ORIGINS + _extra_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/stats/age-distribution")
def age_distribution():
    return get_age_distribution()


@app.post("/api/chat")
def chat(request: ChatRequest):
    try:
        reply = get_reply(request.messages)
    except genai_errors.APIError as e:
        if e.code in (401, 403):
            raise HTTPException(status_code=500, detail="Chatbot is not configured (missing/invalid API key).")
        if e.code == 429:
            raise HTTPException(status_code=429, detail="Companion is getting a lot of messages right now — try again in a moment.")
        raise HTTPException(status_code=502, detail=f"Companion service error: {e.message}")
    return {"reply": reply}
