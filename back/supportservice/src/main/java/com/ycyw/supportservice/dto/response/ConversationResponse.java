package com.ycyw.supportservice.dto.response;

import com.ycyw.supportservice.model.Message;
import com.ycyw.supportservice.model.UserDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Data
@Builder
public class ConversationResponse {

    private Long id;
    private String title;
    private String description;
    private UserDetails creator;
    private List<MessageResponse> messages;
    private Date creationDate;

}
