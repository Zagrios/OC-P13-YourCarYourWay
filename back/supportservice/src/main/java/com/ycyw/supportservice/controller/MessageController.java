package com.ycyw.supportservice.controller;

import com.ycyw.supportservice.dto.request.MessageRequest;
import com.ycyw.supportservice.dto.response.MessageResponse;
import com.ycyw.supportservice.mapper.MessageMapper;
import com.ycyw.supportservice.model.Conversation;
import com.ycyw.supportservice.model.Message;
import com.ycyw.supportservice.model.UserDetails;
import com.ycyw.supportservice.service.ConversationService;
import com.ycyw.supportservice.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class MessageController {

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageMapper messageMapper;

    @Autowired
    private SimpMessagingTemplate template;

    private UserDetails getUserFromAccessor(SimpMessageHeaderAccessor sha){
        final UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = (UsernamePasswordAuthenticationToken) sha.getUser();
        return (UserDetails) usernamePasswordAuthenticationToken.getPrincipal();
    }

    @MessageMapping("/conversation/{id}")
    @SendTo("/sub/conversation/{id}")
    public MessageResponse messageReceived(SimpMessageHeaderAccessor sha, @DestinationVariable Long id, @Valid MessageRequest req){

        UserDetails user = this.getUserFromAccessor(sha);

        final Conversation conversation = this.conversationService.findConversationById(id).get();

        final Message newMessage = Message.builder()
                .conversation(conversation)
                .message(req.getMessage())
                .sender_id(user.getId())
                .build();

        final Message saved = this.messageService.saveMessage(newMessage);

        return this.messageMapper.toDto(saved);
    }

}
