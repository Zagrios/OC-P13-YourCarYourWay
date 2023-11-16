package com.ycyw.userservice.service;

import com.ycyw.userservice.model.User;
import com.ycyw.userservice.repository.UserRepository;
import com.ycyw.userservice.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> opt = this.userRepository.findByUsername(username);

        if(opt.isEmpty()){
            opt = this.userRepository.findByEmail(username);
        }

        if(opt.isEmpty()){
            throw new UsernameNotFoundException(String.format("%s not found", username));
        }

        final User user = opt.get();

        return UserDetailsImpl.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority("USER")))
                .build();
    }
}
