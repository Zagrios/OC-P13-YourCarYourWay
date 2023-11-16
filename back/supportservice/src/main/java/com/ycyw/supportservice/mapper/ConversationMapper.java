package com.ycyw.supportservice.mapper;

import com.ycyw.supportservice.dto.response.ConversationResponse;
import com.ycyw.supportservice.model.Conversation;
import com.ycyw.supportservice.model.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConversationMapper {

    @Autowired
    private MessageMapper messageMapper;

    public ConversationResponse toDto(Conversation conversation, UserDetails creator){
        return ConversationResponse.builder()
                .id(conversation.getId())
                .title(conversation.getTitle())
                .description(conversation.getDescription())
                .creator(creator)
                .messages(messageMapper.toDtos(conversation.getMessages()))
                .creationDate(conversation.getCreationDate())
                .build();
    }

}
