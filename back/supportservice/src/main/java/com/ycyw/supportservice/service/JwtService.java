package com.ycyw.supportservice.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String JWT_SECRET;
    private final String JWT_PREFIX = "Bearer ";

    private Algorithm getAlgorithm(){
        return Algorithm.HMAC512(this.JWT_SECRET);
    }

    private DecodedJWT decodeJwt(String jwt) throws JWTVerificationException {
        final JWTVerifier jwtVerifier = JWT.require(this.getAlgorithm()).build();
        return jwtVerifier.verify(jwt);
    }

    public String getJwtSubject(String jwt){
        DecodedJWT decodedJWT = this.decodeJwt(jwt);
        return decodedJWT.getSubject();
    }

    public boolean isJwtValid(String jwt){
        try {
            this.decodeJwt(jwt);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

}
