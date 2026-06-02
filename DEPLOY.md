# KadoTV Deployment

## Architecture
- **Frontend** → Vercel
- **Backend** → Render (free) or Railway
- **Database** → MongoDB Atlas (free M0 cluster)

---

## 1. MongoDB Atlas

1. Go to https://cloud.mongodb.com and create a free account.
2. Create a **Shared Cluster (M0)** — region closest to you.
3. **Database Access** → Add Database User:
   - Username: `kadotv`
   - Password: (save this)
   - Role: Read and Write to any database
4. **Network Access** → IP Access List → Allow access from anywhere: `0.0.0.0/0`
5. **Cluster → Connect → Connect your application** → copy the URI, e.g:
   ```
   mongodb+srv://kadotv:YOUR_PASS@cluster0.xxxxx.mongodb.net/kadotv?retryWrites=true&w=majority
   ```

---

## 2. Backend (Render)

1. Push this repo to GitHub.
2. Go to https://render.com and sign up with GitHub.
3. **New +** → **Web Service**.
4. Connect your repo and select it.
5. Configure:
   - **Name**: `kadotv-backend`
   - **Region**: Frankfurt / Virginia (closest to you)
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. **Environment Variables** → add:
   | Key | Value |
   |---|---|
   | `MONGO_URI` | Your Atlas URI from step 1 |
   | `JWT_SECRET` | Any long random string |
   | `PORT` | `4000` |
   | `NODE_ENV` | `production` |
7. Click **Create Web Service**.
8. Wait for build → copy the Render URL (e.g. `https://kadotv-backend.onrender.com`).

---

## 3. Frontend (Vercel)

1. Go to https://vercel.com and sign up with GitHub.
2. **Add New...** → **Project** → select your repo.
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `next build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
4. **Environment Variables** → add:
   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_API_URL` | `https://<your-render-backend>.onrender.com/api` |
5. Click **Deploy**.
6. Vercel gives you a domain like `kadotv.vercel.app`.

---

## 4. Update Backend CORS

Before deploying, edit `backend/src/index.ts` and replace the CORS wildcard with your Vercel domain:

```ts
app.use(cors({ origin: ['https://kadotv.vercel.app', 'http://localhost:3000'] }));
```

Rebuild and redeploy the backend after this change.

---

## 5. Ready

Open `https://<your-project>.vercel.app` — your live KadoTV app.

To update later:
- Push to GitHub → Vercel + Render auto-redeploy.
- No local MongoDB or `npm run dev` needed.