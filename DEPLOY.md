# Deploy (Stage 6)

Two services, deployed separately. Do the backend first — the frontend needs its live URL.

## 1. Backend → Render

1. Push this repo to GitHub if it isn't already.
2. In Render: **New → Blueprint**, connect the repo. Render reads `render.yaml` at the repo
   root automatically and proposes a `vigila-backend` web service rooted at `backend/`.
3. Before the first deploy, set the two env vars Render will prompt for (marked `sync: false`
   in the blueprint, so they're not stored in the repo):
   - `GEMINI_API_KEY` — the real key from `backend/.env`.
   - `FRONTEND_ORIGIN` — leave blank for now; come back and set it after step 2 below.
4. Deploy. Note the resulting URL (`https://vigila-backend-xxxx.onrender.com`).
5. Smoke test: `curl https://<that-url>/api/health` → `{"status":"ok"}`.

## 2. Frontend → Vercel

1. In Vercel: **New Project**, import the same repo.
2. Set **Root Directory** to `frontend`. Framework preset (Vite) is auto-detected.
3. Add the env var `VITE_API_BASE_URL` = the Render URL from step 1.4 above (no trailing slash).
4. Deploy. Note the resulting URL (`https://vigila-xxxx.vercel.app`).

## 3. Close the loop

Back in Render, set `FRONTEND_ORIGIN` to the Vercel URL from step 2.4 (exact origin, no
trailing slash), then trigger a redeploy so the CORS change takes effect.

## 4. Smoke test, live

- Load the Vercel URL, confirm the site renders (fonts, gradients, nav all show).
- Scroll to Stats — the age-distribution chart should load real data, not the error state
  (confirms the frontend is reaching the live backend, not still pointed at localhost).
- Send a message in the Companion chat, confirm a real reply comes back.
- Check the browser console for CORS errors — if `FRONTEND_ORIGIN` is wrong, `/api/chat` and
  `/api/stats/age-distribution` requests will fail with a CORS error, not a 4xx/5xx.
