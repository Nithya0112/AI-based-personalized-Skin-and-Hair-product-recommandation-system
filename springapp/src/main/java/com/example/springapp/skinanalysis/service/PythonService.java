package com.example.springapp.skinanalysis.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.stereotype.Service;

@Service
public class PythonService {

    public String runPrediction(String imagePath) {

        try {

           ProcessBuilder pb = new ProcessBuilder(
    "python",
    "C:/Users/venka/OneDrive/Desktop/Skincare and Haircare/mlmodel/predict.py",
    imagePath
);

            Process process = pb.start();

            BufferedReader reader =
                    new BufferedReader(
                            new InputStreamReader(process.getInputStream())
                    );

            String result = reader.readLine();

            return result;

        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }

    }
}