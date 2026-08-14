from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from stats import get_age_distribution

app = FastAPI(title="Vigila API")

# Vite dev server — falls back to another port if 5173 is taken (see frontend logs).
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/stats/age-distribution")
def age_distribution():
    return get_age_distribution()
