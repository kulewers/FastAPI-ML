## Description

Number recognition API with React front end

## Installation
```
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
Run `train_model.ipynb` notebook to train and output the model

Start the server with:
```
uvicorn main:app --reload
```
Or run in container:
```
docker build --tag 'ml-api' .
docker run -d -p 8000:80 'ml-api'
```

To run the front end:
```
cd frontend
npm install
npm run dev
```

## Usage
Front end provides a canvas to write on

![image](https://github.com/user-attachments/assets/4f50a218-7abc-4c8d-9c8a-5f715847ebf4)
