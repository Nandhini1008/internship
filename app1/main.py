# main.py
from fastapi import FastAPI
from app1.schemas import HeartFeatures, PredictionResponse
from app1.utils import train_and_save_model, predict_heart_attack
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="❤️ Heart Attack Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:5173"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to the Heart Attack Prediction API!"}

@app.post("/predict", response_model=PredictionResponse)
def predict(features: HeartFeatures):
    # Convert Pydantic model to dict and match feature names
    input_dict = {
        "Age": features.Age,
        "Gender": features.Gender,
        "Heart rate": features.Heart_rate,
        "Systolic blood pressure": features.Systolic_blood_pressure,
        "Diastolic blood pressure": features.Diastolic_blood_pressure,
        "Blood sugar": features.Blood_sugar,
        "CK-MB": features.CK_MB,
        "Troponin": features.Troponin
    }
    result = predict_heart_attack(input_dict)
    return {"result": result}
