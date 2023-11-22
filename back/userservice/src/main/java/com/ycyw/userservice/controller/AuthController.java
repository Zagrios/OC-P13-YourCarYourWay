package com.ycyw.userservice.controller;

import com.ycyw.userservice.dto.request.LoginRequest;
import com.ycyw.userservice.dto.request.RegisterRequest;
import com.ycyw.userservice.dto.response.LoginResponse;
import com.ycyw.userservice.dto.response.RegisterResponse;
import com.ycyw.userservice.dto.response.UserDetailsResponse;
import com.ycyw.userservice.model.Role;
import com.ycyw.userservice.model.User;
import com.ycyw.userservice.security.UserDetailsImpl;
import com.ycyw.userservice.service.JwtService;
import com.ycyw.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DaoAuthenticationProvider authenticationProvider;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody @Valid RegisterRequest req){

        if(this.userService.findByEmail(req.getEmail()).isPresent()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        if(this.userService.findByUsername(req.getUsername()).isPresent()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        final boolean containAdmin = req.getUsername().toLowerCase().contains("admin");

        final User newUser = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .build();

        if(containAdmin){
            newUser.setRoles(List.of(Role.builder().name("ADMIN").build()));
        }

        this.userService.createUser(newUser);

        return ResponseEntity.ok(new RegisterResponse(this.jwtService.createJwt(newUser.getId().toString())));

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest req){


        try{
            final Authentication authentication = this.authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            return ResponseEntity.ok(new LoginResponse(this.jwtService.createJwt(userDetails.getId().toString())));
        }
        catch (AuthenticationException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping("/me")
    public ResponseEntity<UserDetailsResponse> me(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(UserDetailsResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                .build()
        );
    }

}
