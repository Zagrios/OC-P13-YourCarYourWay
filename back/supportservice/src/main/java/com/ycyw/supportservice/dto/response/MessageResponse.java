package com.ycyw.supportservice.dto.response;

import com.ycyw.supportservice.model.UserDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
@Builder
public class MessageResponse {

    private Long id;
    private String message;
    private Date creationDate;
    private UserDetails sender;

}
