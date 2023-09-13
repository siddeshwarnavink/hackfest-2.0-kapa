import tensorflow as tf
from keras.applications import MobileNetV2
from keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
import numpy as np
from PIL import Image

# Load the MobileNetV2 model with pretrained weights
model = MobileNetV2(weights='imagenet')

# Load an image
img_path = r"D:\H\Hackathon\Code Factory Pvt Ltd\Old\Merch\Necklace.jpg"  # Replace with the path to your image
img = Image.open(img_path)
img = img.resize((224, 224))  # Resize the image to match the input size of MobileNetV2

# Preprocess the image for model input
img = tf.keras.preprocessing.image.img_to_array(img)
img = np.expand_dims(img, axis=0)  # Add a batch dimension
img = preprocess_input(img)

# Make predictions on the preprocessed image
predictions = model.predict(img)

# Decode the predictions to get human-readable labels
decoded_predictions = decode_predictions(predictions)

# Print the top-5 predicted classes with their probabilities
for i in range(5):  # Print the top 5 predictions
    class_name, description, probability = decoded_predictions[0][i]
    print(f"{i + 1}: {class_name} ({description}): {probability:.2f}")

