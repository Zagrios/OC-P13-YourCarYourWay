package com.ycyw.userservice.controller;

import com.ycyw.userservice.dto.response.UserDetailsResponse;
import com.ycyw.userservice.model.Role;
import com.ycyw.userservice.model.User;
import com.ycyw.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/details")
public class UserDetailsController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailsResponse> getUserDetails(@PathVariable Long id){
        final Optional<User> optUser = this.userService.findById(id);

        if(optUser.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        final User user = optUser.get();

        return ResponseEntity.ok(
                UserDetailsResponse.builder()
                    .id(user.getId()).username(user.getUsername()).email(user.getEmail())
                    .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                    .build()
        );

    }


}
