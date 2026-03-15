# import tensorflow as tf
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras import layers, models

# # Dataset path
# dataset_path = "dataset"

# # Image preprocessing
# datagen = ImageDataGenerator(
#     rescale=1./255,
#     validation_split=0.2
# )

# train_data = datagen.flow_from_directory(
#     dataset_path,
#     target_size=(224, 224),
#     batch_size=32,
#     class_mode='categorical',
#     subset='training'
# )

# val_data = datagen.flow_from_directory(
#     dataset_path,
#     target_size=(224, 224),
#     batch_size=32,
#     class_mode='categorical',
#     subset='validation'
# )

# # CNN Model
# model = models.Sequential([
    
#     layers.Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),
#     layers.MaxPooling2D(2,2),

#     layers.Conv2D(64, (3,3), activation='relu'),
#     layers.MaxPooling2D(2,2),

#     layers.Conv2D(128, (3,3), activation='relu'),
#     layers.MaxPooling2D(2,2),

#     layers.Flatten(),

#     layers.Dense(128, activation='relu'),
#     layers.Dense(3, activation='softmax')   # 3 classes: dry, normal, oily
# ])

# model.compile(
#     optimizer='adam',
#     loss='categorical_crossentropy',
#     metrics=['accuracy']
# )

# model.summary()

# # Train model
# model.fit(
#     train_data,
#     validation_data=val_data,
#     epochs=10
# )

# # Save model
# model.save("skin_model.h5")

# print("Model training completed and saved as skin_model.h5")


import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models

dataset_path = "dataset"

datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224,224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

val_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224,224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

model = models.Sequential([
    layers.Conv2D(32,(3,3),activation='relu',input_shape=(224,224,3)),
    layers.MaxPooling2D(2,2),

    layers.Conv2D(64,(3,3),activation='relu'),
    layers.MaxPooling2D(2,2),

    layers.Conv2D(128,(3,3),activation='relu'),
    layers.MaxPooling2D(2,2),

    layers.Flatten(),

    layers.Dense(128,activation='relu'),
    layers.Dense(3,activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(train_data, validation_data=val_data, epochs=10)

model.save("skin_model.h5")

print("Model Saved")