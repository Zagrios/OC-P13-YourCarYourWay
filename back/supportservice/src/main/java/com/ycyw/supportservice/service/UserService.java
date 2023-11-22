package com.ycyw.supportservice.service;

import com.ycyw.supportservice.model.UserDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@Service
public class UserService {

    @Value("${service.user-service-url}")
    private String USER_SERVER;

    public UserDetails getUserDetailsById(Long id){

        final String uriEndpoint = String.join("/", USER_SERVER, "details", String.valueOf(id));

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(uriEndpoint, HttpMethod.GET, entity, UserDetails.class).getBody();
    }

}
