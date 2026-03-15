import sys
import numpy as np
import tensorflow as tf
import cv2

# Load trained model
model = tf.keras.models.load_model(
    "src/main/java/com/example/springapp/python/skin_model.h5"
)

# Get image path from Spring Boot
image_path = sys.argv[1]

# Read image
img = cv2.imread(image_path)

# Resize image
img = cv2.resize(img, (224, 224))

# Normalize
img = img / 255.0

# Reshape for model
img = np.reshape(img, (1, 224, 224, 3))

# Predict
prediction = model.predict(img)

classes = ["Dry Skin", "Oily Skin", "Normal Skin", "Acne"]

result = classes[np.argmax(prediction)]

print(result)