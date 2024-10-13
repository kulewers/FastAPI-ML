from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from PIL import Image, ImageOps
import io
import numpy as np

import pickle
with open("mnist_model.pkl", "rb") as f:
    model = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)

class PredictionOut(BaseModel):
    prediction: str

@app.get("/")
def home():
    return {"health_check": "OK"}


@app.post("/predict-image/", response_model=PredictionOut)
async def predict_image(file: UploadFile = File(...)):
    image = await file.read()
    image = Image.open(io.BytesIO(image)).convert("L")
    image = ImageOps.invert(image)
    image = image.resize((28, 28))
    pixel_arr = np.array(image).reshape(1, -1)
    prediction = model.predict(pixel_arr)
    return {"prediction": prediction[0]}
