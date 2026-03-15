// package com.example.springapp.skinanalysis.service;

// import java.io.File;
// import java.io.IOException;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import com.example.springapp.skinanalysis.entity.SkinImage;
// import com.example.springapp.skinanalysis.repository.SkinImageRepository;

// @Service
// public class SkinAnalysisService {

//     @Autowired
//     SkinImageRepository repo;

//     private final String uploadDir = "uploads/";

//     public SkinImage saveImage(String email, MultipartFile file) throws IOException {

//         File folder = new File(uploadDir);
//         if (!folder.exists()) {
//             folder.mkdir();
//         }

//         String filePath = uploadDir + file.getOriginalFilename();

//         file.transferTo(new File(filePath));

//         SkinImage img = new SkinImage();
//         img.setUserEmail(email);
//         img.setImagePath(filePath);

//         // Temporary prediction (AI will be added later)
//         img.setPredictedSkinType("Analysis Pending");

//         return repo.save(img);
//     }
// }
// 


package com.example.springapp.skinanalysis.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.skinanalysis.entity.SkinImage;
import com.example.springapp.skinanalysis.repository.SkinImageRepository;

@Service
public class SkinAnalysisService {

    @Autowired
    SkinImageRepository repo;

    private final String uploadDir = "uploads/";

    public SkinImage saveImage(String email, MultipartFile file) throws Exception {

        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdir();
        }

        String filePath = uploadDir + file.getOriginalFilename();

        // Save uploaded image
        file.transferTo(new File(filePath));

        // Call Python model
        String prediction = runPythonModel(filePath);

        SkinImage img = new SkinImage();
        img.setUserEmail(email);
        img.setImagePath(filePath);
        img.setPredictedSkinType(prediction);

        return repo.save(img);
    }

    private String runPythonModel(String imagePath) throws Exception {

        ProcessBuilder pb = new ProcessBuilder(
                "python",
                "src/main/java/com/example/springapp/python/predict.py",
                imagePath
        );

        // Show python errors in Spring console
        pb.redirectErrorStream(true);

        Process process = pb.start();

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream())
        );

        String line;
        String result = "";

        while ((line = reader.readLine()) != null) {

            System.out.println("PYTHON OUTPUT: " + line);

            result = line;
        }

        process.waitFor();

        return result;
    }
}