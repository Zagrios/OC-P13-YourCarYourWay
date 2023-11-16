package com.ycyw.supportservice.mapper;

import com.ycyw.supportservice.dto.response.ConversationResponse;
import com.ycyw.supportservice.dto.response.MessageResponse;
import com.ycyw.supportservice.model.Conversation;
import com.ycyw.supportservice.model.Message;
import com.ycyw.supportservice.model.UserDetails;
import com.ycyw.supportservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MessageMapper {

    @Autowired
    private UserService userService;

    public MessageResponse toDto(Message message){
        return MessageResponse.builder()
                .id(message.getId())
                .message(message.getMessage())
                .creationDate(message.getCreationDate())
                .sender(userService.getUserDetailsById(message.getSender_id()))
                .build();
    }

    public List<MessageResponse> toDtos(List<Message> messages){
        return messages.stream().map(this::toDto).collect(Collectors.toList());
    }

}
