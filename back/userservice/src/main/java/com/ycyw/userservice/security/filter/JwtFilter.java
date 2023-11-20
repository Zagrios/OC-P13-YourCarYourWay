package com.ycyw.userservice.security.filter;

import com.ycyw.userservice.model.User;
import com.ycyw.userservice.service.JwtService;
import com.ycyw.userservice.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    private String getJwtFromReq(HttpServletRequest request){
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

        final String userId = this.jwtService.getJwtSubject(jwt);
        final Optional<User> user = this.userService.findById(Long.valueOf(userId));

        if(user.isEmpty()){
            filterChain.doFilter(request, response);
            return;
        }

        final UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.get(), null, null);

        SecurityContextHolder.getContext().setAuthentication(auth);

        filterChain.doFilter(request, response);
    }
}
