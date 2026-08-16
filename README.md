# Vigila

A PCOS education and support site: real, cited information about PCOS phenotypes, symptoms and
management, and prevalence statistics, plus a non-diagnostic companion chatbot for talking through
how you're feeling. Built for a 48-hour hackathon (Technology For Wellness track + Best Use of AI
bonus track).

## Tech stack

**Frontend:** React (Vite), Tailwind CSS, Recharts
**Backend:** FastAPI (Python), pandas/numpy, Google Gemini API (`google-genai`) for the companion
chatbot

## Running locally

### Backend

```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then fill in GEMINI_API_KEY
uvicorn main:app --reload --port 8000
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`, talking to the backend at `http://localhost:8000` by default.

## Data & sources

- **Age-distribution chart** (`/stats`): [Kaggle — PCOS Diagnosis
  Dataset](https://www.kaggle.com/datasets/samikshadalvi/pcos-diagnosis-dataset) — synthetic/practice
  data, not verified clinical records, captioned as such on the site.
- **Prevalence & undiagnosed-rate statistics**: [WHO fact sheet, "Polycystic ovary
  syndrome"](https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome)
- **Phenotype-card content**: [2023 International Evidence-based Guideline for the Assessment and
  Management of PCOS](https://pubmed.ncbi.nlm.nih.gov/37580861/) (International PCOS Network, 39
  endorsing societies)

Symptom-card sources (PubMed, Harvard Health, Contemporary OB/GYN, and others) are cited inline on
the Symptoms page itself.
