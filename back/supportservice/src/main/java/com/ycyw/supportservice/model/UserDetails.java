package com.ycyw.supportservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetails {

    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    @JsonIgnore
    public boolean isAdmin(){
        if(this.roles.isEmpty()){
            return false;
        }

        return this.roles.contains("ADMIN");
    }

}
