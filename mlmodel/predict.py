import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow as tf
import numpy as np
import cv2
import sys
import traceback

classes = ['dry','normal','oily']

try:

    model = tf.keras.models.load_model(
    "C:/Users/venka/OneDrive/Desktop/Skincare and Haircare/mlmodel/skin_model.h5"
    )

    img_path = sys.argv[1]

    print("Image path:", img_path)

    img = cv2.imread(img_path)

    if img is None:
        raise Exception("Image could not be loaded")

    img = cv2.resize(img,(224,224))
    img = img/255.0
    img = np.reshape(img,(1,224,224,3))

    prediction = model.predict(img, verbose=0)

    result = classes[np.argmax(prediction)]

    print(result)
    sys.stdout.flush()

except Exception as e:

    print("ERROR_START")
    traceback.print_exc()
    print("ERROR_END")
    sys.stdout.flush()