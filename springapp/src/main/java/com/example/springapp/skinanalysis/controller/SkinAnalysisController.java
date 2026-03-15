// package com.example.springapp.skinanalysis.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

// import com.example.springapp.skinanalysis.entity.SkinImage;
// import com.example.springapp.skinanalysis.service.SkinAnalysisService;

// @RestController
// @RequestMapping("/skin")
// public class SkinAnalysisController {

//     @Autowired
//     SkinAnalysisService service;

//     @PostMapping("/upload")
//     public SkinImage uploadImage(
//             @RequestParam String email,
//             @RequestParam MultipartFile file) throws Exception {

//         return service.saveImage(email, file);
//     }
// }
package com.example.springapp.skinanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.skinanalysis.entity.SkinImage;
import com.example.springapp.skinanalysis.service.SkinAnalysisService;

@RestController
@RequestMapping("/skin")
@CrossOrigin(origins = "http://localhost:3000")
public class SkinAnalysisController {

    @Autowired
    private SkinAnalysisService service;

    @PostMapping("/upload")
    public SkinImage uploadImage(
            @RequestParam String email,
            @RequestParam MultipartFile file) throws Exception {

        return service.saveImage(email, file);
    }
}