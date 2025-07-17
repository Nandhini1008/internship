# ❤️ Heart Attack Prediction App

A modern, full-stack machine learning web app to predict the risk of a heart attack from medical data. Built with **FastAPI** (Python) for the backend and **React + Vite** for the frontend. Deployable locally, with Docker, or to the cloud (Vercel/Render).

---

## 🚀 Features
- Predicts heart attack risk (positive/negative) from user medical features
- FastAPI backend with REST API and trained Random Forest model
- Vibrant, modern React + Vite frontend
- Easy deployment: local, Docker, or cloud (Vercel/Render)

---

## 🗂️ Project Structure
```
project-root/
├── house_price_prediction/
│   └── house_price_prediction/
│       ├── app1/           # FastAPI backend code
│       ├── models/         # Trained model & scaler (.pkl)
│       ├── requirements.txt
│       ├── Medicaldataset.csv
│       └── README.md
├── frontend/               # React + Vite frontend
│   ├── src/
│   └── ...
├── docker-compose.yml      # (optional, for Docker deployment)
```

---

## ⚡ Quick Start (Local)

### 1. **Backend (FastAPI)**
```bash
cd house_price_prediction/house_price_prediction
pip install -r requirements.txt
python app1/models.py         # Train and save the model (if not already done)
uvicorn app1.main:app --reload
```
- The API will be at `http://localhost:8000`

### 2. **Frontend (React + Vite)**
```bash
cd frontend
npm install
npm run dev
```
- The app will be at `http://localhost:5173`

### 3. **Connect Frontend to Backend**
- In `frontend/src/App.jsx`, set the API URL to your backend (e.g., `http://localhost:8000/predict` for local).

---

## 🐳 Docker Deployment (Recommended for Servers/Cloud VMs)

1. **Create Dockerfiles** in both `house_price_prediction/house_price_prediction/` and `frontend/` (see below for examples).
2. **Create a `docker-compose.yml`** at the project root:
   ```yaml
   version: '3.8'
   services:
     backend:
       build: ./house_price_prediction/house_price_prediction
       ports:
         - "8000:8000"
     frontend:
       build: ./frontend
       ports:
         - "3000:80"
   ```
3. **Run everything:**
   ```bash
   docker-compose up --build
   ```
- Visit `http://localhost:3000` for the frontend, `http://localhost:8000` for the API.

---

## ☁️ Cloud Deployment

### **Frontend (Vercel)**
1. Push your `frontend/` folder to GitHub.
2. Go to [vercel.com](https://vercel.com), import your repo, set root to `frontend/`, and deploy.
3. You’ll get a public link (e.g., `https://your-app.vercel.app`).

### **Backend (Render)**
1. Push your backend (`house_price_prediction/house_price_prediction/`) to GitHub.
2. Go to [render.com](https://render.com), create a new Web Service:
   - **Root Directory:** `house_price_prediction/house_price_prediction`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app1.main:app --host 0.0.0.0 --port 10000`
3. Add CORS middleware in `main.py`:
   ```python
   from fastapi.middleware.cors import CORSMiddleware
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Or your Vercel frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```
4. You’ll get a public API link (e.g., `https://your-backend.onrender.com`).
5. In your frontend, set the API URL to this backend link.

---

## 🧑‍💻 API Reference

### **POST `/predict`**
- **Request Body:**
  ```json
  {
    "Age": 55,
    "Gender": 1,
    "Heart_rate": 80,
    "Systolic_blood_pressure": 120,
    "Diastolic_blood_pressure": 80,
    "Blood_sugar": 110.5,
    "CK_MB": 2.5,
    "Troponin": 0.01
  }
  ```
- **Response:**
  ```json
  { "result": "positive" }
  // or
  { "result": "negative" }
  ```

---

## 📝 Notes
- **Model:** Random Forest, trained on `Medicaldataset.csv`.
- **Frontend:** Modern, vibrant, and responsive. All logic in `frontend/src/App.jsx`.
- **Backend:** All logic in `app1/` (FastAPI, Pydantic, joblib, etc.).
- **CORS:** Make sure to allow your frontend’s domain in the backend for production.
- **Custom Domains:** Both Vercel and Render support custom domains.

---

## 📬 Contact & Credits
- Built by [Your Name/Team]
- For demo/educational use only. Not for medical advice.