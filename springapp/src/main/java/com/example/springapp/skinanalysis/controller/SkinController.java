// package com.example.springapp.skinanalysis.controller;

// import java.nio.file.Files;
// import java.nio.file.Paths;
// import java.util.Base64;
// import java.util.Map;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @CrossOrigin
// @RequestMapping("/api")
// public class SkinController {

// @PostMapping("/analyze")
// public String analyze(@RequestBody Map<String,String> body) {

// try {

// String imageData = body.get("image");

// System.out.println("Image received");

// String base64Image = imageData.split(",")[1];

// byte[] imageBytes = Base64.getDecoder().decode(base64Image);

// String path = "input.png";

// Files.write(Paths.get(path), imageBytes);

// System.out.println("Image saved");

// return "Image saved successfully";

// }
// catch(Exception e){

// e.printStackTrace();
// return "Error processing image";

// }

// }

// }


package com.example.springapp.skinanalysis.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class SkinController {

@PostMapping("/analyze")
public String analyze(@RequestBody Map<String,String> body) {

try {

String imageData = body.get("image");

String base64Image = imageData.split(",")[1];

byte[] imageBytes = Base64.getDecoder().decode(base64Image);

String imagePath = "C:/temp/input.png";

Files.write(Paths.get(imagePath), imageBytes);

System.out.println("Image saved successfully");


/* RUN PYTHON SCRIPT */
ProcessBuilder pb = new ProcessBuilder(
"C:\\Users\\venka\\OneDrive\\Desktop\\Skincare and Haircare\\mlmodel\\venv\\Scripts\\python.exe",
"C:/Users/venka/OneDrive/Desktop/Skincare and Haircare/mlmodel/predict.py",
imagePath
);

Process process = pb.start();

BufferedReader reader =
        new BufferedReader(new InputStreamReader(process.getInputStream()));

String line;
String result = "";

while ((line = reader.readLine()) != null) {
    System.out.println("PYTHON OUTPUT: " + line);
    result = line;   // last printed line = skin type
}

process.waitFor();

System.out.println("Skin Type: " + result);

return result;
}

catch(Exception e){

e.printStackTrace();
return "Prediction Failed";

}

}

}