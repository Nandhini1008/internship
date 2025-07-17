# utils.py
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

MODEL_PATH = r"D:\data_science_bics\house_price_prediction\house_price_prediction\models\heart_attack_model.pkl"
SCALER_PATH = r"D:\data_science_bics\house_price_prediction\house_price_prediction\models\heart_attack_scaler.pkl"
CSV_PATH = r"D:\data_science_bics\Medicaldataset.csv"

FEATURE_COLUMNS = [
    "Age", "Gender", "Heart rate", "Systolic blood pressure", "Diastolic blood pressure",
    "Blood sugar", "CK-MB", "Troponin"
]
TARGET_COLUMN = "Result"

LABEL_MAP = {"negative": 0, "positive": 1}
INVERSE_LABEL_MAP = {0: "negative", 1: "positive"}

def load_data():
    df = pd.read_csv(CSV_PATH)
    df = df.dropna()
    df[TARGET_COLUMN] = df[TARGET_COLUMN].map(LABEL_MAP)
    return df

def train_and_save_model():
    df = load_data()
    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)

def load_model_and_scaler():
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    return model, scaler

def predict_heart_attack(features):
    model, scaler = load_model_and_scaler()
    X = pd.DataFrame([features], columns=FEATURE_COLUMNS)
    X_scaled = scaler.transform(X)
    pred = model.predict(X_scaled)[0]
    return INVERSE_LABEL_MAP[pred]
