from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
import numpy as np
from PIL import Image
import io
from torchvision.models import inception_v3
import os

app = Flask(__name__, 
    static_folder='static',
    static_url_path=''
)
CORS(app)

# Cache control
@app.after_request
def add_header(response):
    response.cache_control.max_age = 300
    return response

# Global variables
model = None
device = torch.device("cpu")

def load_model():
    global model
    if model is None:
        try:
            model = inception_v3(weights=None)
            model.fc = torch.nn.Linear(model.fc.in_features, 4)
            MODEL_PATH = "nitrogenrice_model_latest.pth"
            model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
            model.eval()
            model = model.to(device)
            print("Model loaded successfully")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise
    return model

# Define class labels
CLASS_LABELS = ["Nitrogen Deficient : Class 1", "Nitrogen Deficient : Class 2", "Nitrogen Deficient : Class 3", "Nitrogen Deficient : Class 4"]

def preprocess_image(img):
    transform = transforms.Compose([
        transforms.Resize((299, 299)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                           std=[0.229, 0.224, 0.225])
    ])
    img = transform(img).unsqueeze(0)
    return img.to(device)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Load model only when needed
        model = load_model()
        
        file = request.files['image']
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        processed_image = preprocess_image(img)

        with torch.no_grad():
            outputs = model(processed_image)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            predicted_class_index = torch.argmax(probabilities, dim=1).item()

        predicted_class = CLASS_LABELS[predicted_class_index]
        confidence = probabilities[0][predicted_class_index].item()

        # Clear some memory
        if hasattr(torch, 'cuda'):
            torch.cuda.empty_cache()

        return jsonify({
            "prediction": predicted_class,
            "confidence": float(confidence)
        })

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
