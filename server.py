from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io
from pyngrok import ngrok

# Configure ngrok
ngrok.set_auth_token("33Axe2Bg8mv7u18WSdzLYu8jAcN_7n7ZyTeSuaiybbJ3dertd")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model = load_model('best_model_4.10.h5')

def preprocess_image(img_bytes):
    # Convert bytes to PIL Image
    img = Image.open(io.BytesIO(img_bytes))
    # Resize to match model's expected input size (assuming 224x224)
    img = img.resize((224, 224))
    # Convert to array and preprocess
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        file = request.files['image']
        img_bytes = file.read()
        
        # Print debugging information
        print("\n=== Debug Info ===")
        print(f"Received image size: {len(img_bytes)} bytes")
        
        processed_image = preprocess_image(img_bytes)
        print(f"Processed image shape: {processed_image.shape}")
        
        # Get model prediction
        print("Making prediction...")
        prediction = model.predict(processed_image)
        print(f"Raw prediction: {prediction}")
        
        # Get the predicted class
        predicted_class = np.argmax(prediction[0])
        confidence = float(prediction[0][predicted_class])
        
        print(f"Predicted class index: {predicted_class}")
        print(f"Confidence: {confidence}")
        
        # Map class index to label for helmet detection
        class_labels = ['All_wearing_helmet', 'No_helmet', 'Partial_use']
        
        result = {
            'class': class_labels[predicted_class],
            'confidence': confidence
        }
        print(f"Returning result: {result}")
        print("=== End Debug Info ===\n")
        
        return jsonify(result)
        
    except Exception as e:
        print(f"\nError in prediction: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        print(f"Traceback: {traceback.format_exc()}\n")
        return jsonify({'error': str(e)}), 500

def start_ngrok():
    # Start ngrok tunnel to expose the app
    try:
        # Kill any existing ngrok processes
        ngrok.kill()
        
        # Connect with options
        tunnel = ngrok.connect(
            addr="5000",
            proto="http",
            bind_tls=True,
            hostname="postlenticular-unpreclusive-alda.ngrok-free.dev"
        )
        public_url = tunnel.public_url
        
        print(f'\n=== NGROK URL ===')
        print(f'{public_url}/predict')
        print(f'=== Copy this URL to update in Index.tsx ===\n')
        return public_url
    except Exception as e:
        print(f"Error starting ngrok: {e}")
        return None

if __name__ == '__main__':
    print("\n=== Starting Server ===")
    # Start ngrok when app starts
    public_url = start_ngrok()
    
    if public_url:
        print("\n=== NGROK URL (Copy this) ===")
        print(f"{public_url}/predict")
        print("=== Update this URL in src/pages/Index.tsx ===\n")
        app.run()
    else:
        print("Failed to start ngrok tunnel")