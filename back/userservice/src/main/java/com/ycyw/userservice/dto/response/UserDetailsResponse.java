package com.ycyw.userservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class UserDetailsResponse {

    private Long id;
    private String username;
    private String email;
    private List<String> roles;

}
