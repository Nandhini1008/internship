# schemas.py
from pydantic import BaseModel

class HeartFeatures(BaseModel):
    Age: int
    Gender: int
    Heart_rate: int
    Systolic_blood_pressure: int
    Diastolic_blood_pressure: int
    Blood_sugar: float
    CK_MB: float
    Troponin: float

class PredictionResponse(BaseModel):
    result: str
