

# import tensorflow as tf
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras import layers, models

# dataset_path = "C:/Users/venka/OneDrive/Desktop/Datasets"

# datagen = ImageDataGenerator(
#     rescale=1./255,
#     validation_split=0.2,
#     rotation_range=20,
#     zoom_range=0.2,
#     horizontal_flip=True
# )

# train_data = datagen.flow_from_directory(
#     dataset_path,
#     target_size=(224,224),
#     batch_size=16,
#     class_mode='categorical',
#     subset='training'
# )

# val_data = datagen.flow_from_directory(
#     dataset_path,
#     target_size=(224,224),
#     batch_size=16,
#     class_mode='categorical',
#     subset='validation'
# )

# print("Class indices:", train_data.class_indices)

# model = models.Sequential([
#     layers.Input(shape=(224,224,3)),

#     layers.Conv2D(32,(3,3),activation='relu'),
#     layers.MaxPooling2D(2,2),

#     layers.Conv2D(64,(3,3),activation='relu'),
#     layers.MaxPooling2D(2,2),

#     layers.Conv2D(128,(3,3),activation='relu'),
#     layers.MaxPooling2D(2,2),

#     layers.Flatten(),

#     layers.Dense(128,activation='relu'),
#     layers.Dense(4,activation='softmax')
# ])

# model.compile(
#     optimizer='adam',
#     loss='categorical_crossentropy',
#     metrics=['accuracy']
# )

# model.fit(
#     train_data,
#     validation_data=val_data,
#     epochs=15
# )

# model.save("skin_model.h5")

# print("Model training completed and saved!")
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.utils import class_weight
import numpy as np
import json

# ✅ CHANGE THIS PATH
BASE_DIR = r"C:\Users\venka\OneDrive\Desktop\Skincare and Haircare\mlmodel"
DATASET_PATH = r"C:\Users\venka\OneDrive\Desktop\Datasets"

# Data Generator
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True
)

train_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224,224),
    batch_size=16,
    class_mode='categorical',
    subset='training'
)

val_data = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=(224,224),
    batch_size=16,
    class_mode='categorical',
    subset='validation'
)

print("Class indices:", train_data.class_indices)

# ✅ SAVE CLASS INDICES (VERY IMPORTANT)
json_path = BASE_DIR + r"\class_indices.json"
with open(json_path, "w") as f:
    json.dump(train_data.class_indices, f)

# ✅ TRANSFER LEARNING MODEL
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(224,224,3),
    include_top=False,
    weights='imagenet'
)

base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(len(train_data.class_indices), activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Class weights (handle imbalance)
# model.fit(
#     train_data,
#     validation_data=val_data,
#     epochs=30
# )

# Early stopping
early_stop = EarlyStopping(patience=5, restore_best_weights=True)

# Train
model.fit(
    train_data,
    validation_data=val_data,
    epochs=30,
   
    callbacks=[early_stop]
)

# Save model
model.save(BASE_DIR + r"\skin_model.h5")

print("✅ Model training completed!")