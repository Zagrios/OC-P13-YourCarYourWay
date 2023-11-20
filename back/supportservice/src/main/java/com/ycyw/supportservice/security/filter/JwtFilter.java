package com.ycyw.supportservice.security.filter;

import com.ycyw.supportservice.model.UserDetails;
import com.ycyw.supportservice.service.JwtService;
import com.ycyw.supportservice.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.util.Arrays;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Value("${service.user-service-url}")
    private String USER_SERVER;

    private UserDetails validToken(String token){
        final String uriEndpoint = String.join("/", USER_SERVER, "auth", "me");

        System.out.println(uriEndpoint);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(uriEndpoint, HttpMethod.GET, entity, UserDetails.class).getBody();
    }

    private String getJwtFromReq(HttpServletRequest request){

        final Cookie cookieToken = WebUtils.getCookie(request, "token");

        if(cookieToken != null){
            return cookieToken.getValue();
        }

        final String header = request.getHeader("Authorization");
        final String JWT_PREFIX = "Bearer ";

        if(header == null || !header.startsWith(JWT_PREFIX)){
            return null;
        }
        return header.replace(JWT_PREFIX, "");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String jwt = this.getJwtFromReq(request);
        if(!this.jwtService.isJwtValid(jwt)){
            filterChain.doFilter(request, response);
            return;
        }

        final Long userId = Long.valueOf(this.jwtService.getJwtSubject(jwt));

        final UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(null, jwt, null);

        SecurityContextHolder.getContext().setAuthentication(auth);

        final UserDetails user = this.validToken(jwt);

        System.out.println(user);

        final UsernamePasswordAuthenticationToken authWithUser = new UsernamePasswordAuthenticationToken(user, jwt, null);

        SecurityContextHolder.getContext().setAuthentication(authWithUser);
        filterChain.doFilter(request, response);
    }

}
