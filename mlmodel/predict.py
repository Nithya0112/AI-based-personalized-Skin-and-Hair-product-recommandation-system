
# import os
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# import tensorflow as tf
# import numpy as np
# import cv2
# import sys
# import traceback

# classes = ['acne','dry','normal','oily']

# try:

#     model = tf.keras.models.load_model(
#         r"C:\Users\venka\OneDrive\Desktop\Skincare and Haircare\mlmodel\skin_model.h5"
#     )

#     if len(sys.argv) < 2:
#         raise Exception("Image path not provided")

#     img_path = sys.argv[1]

#     print("Image path:", img_path)

#     img = cv2.imread(img_path)

#     if img is None:
#         raise Exception("Image could not be loaded")

#     img = cv2.resize(img,(224,224))
#     img = img/255.0
#     img = np.reshape(img,(1,224,224,3))

#     prediction = model.predict(img, verbose=0)

#     index = np.argmax(prediction)
#     result = classes[index]
#     confidence = float(prediction[0][index]) * 100

#     print("Prediction:", result)
#     print("Confidence:", "{:.2f}%".format(confidence))

# except Exception as e:

#     print("ERROR_START")
#     print(str(e))
#     print("ERROR_END")
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow as tf
import numpy as np
import cv2
import sys
import json

# ✅ SAME BASE PATH
BASE_DIR = r"C:\Users\venka\OneDrive\Desktop\Skincare and Haircare\mlmodel"

try:
    model_path = BASE_DIR + r"\skin_model.h5"
    json_path = BASE_DIR + r"\class_indices.json"

    # Load model
    model = tf.keras.models.load_model(model_path)

    # Load class mapping
    with open(json_path, "r") as f:
        class_indices = json.load(f)

    classes = {v:k for k,v in class_indices.items()}

    if len(sys.argv) < 2:
        raise Exception("Image path not provided")

    img_path = sys.argv[1]
    print("Image path:", img_path)

    img = cv2.imread(img_path)

    if img is None:
        raise Exception("Image could not be loaded")

    # ✅ FIX: BGR → RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    img = cv2.resize(img,(224,224))
    img = img / 255.0
    img = np.reshape(img,(1,224,224,3))

    prediction = model.predict(img, verbose=0)

    index = int(np.argmax(prediction))
    result = classes[index]
    confidence = float(prediction[0][index]) * 100

    print("Prediction:", result)
    print("Confidence:", "{:.2f}%".format(confidence))

except Exception as e:
    print("ERROR_START")
    print(str(e))
    print("ERROR_END")