package com.ycyw.userservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/test")
    public ResponseEntity<List<String>> test(){
        final ArrayList<String> res = new ArrayList<>();
        res.add("Salut");
        return ResponseEntity.ok(res);
    }

}
