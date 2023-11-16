package com.ycyw.supportservice.controller;

import com.ycyw.supportservice.dto.request.CreateConversationRequest;
import com.ycyw.supportservice.dto.response.ConversationResponse;
import com.ycyw.supportservice.mapper.ConversationMapper;
import com.ycyw.supportservice.model.Conversation;
import com.ycyw.supportservice.model.UserDetails;
import com.ycyw.supportservice.service.ConversationService;
import com.ycyw.supportservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("conversations")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private UserService userService;

    @Autowired
    private ConversationMapper conversationMapper;

    @PostMapping
    public ResponseEntity<ConversationResponse> createConversation(@RequestBody @Valid CreateConversationRequest req) {

        final UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        final Conversation conversation = Conversation.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .creatorId(user.getId())
                .messages(List.of()).build();

        this.conversationService.saveConversation(conversation);

        return ResponseEntity.ok(this.conversationMapper.toDto(conversation, user));
    }

    @GetMapping
    public ResponseEntity<List<ConversationResponse>> getConversations() {
        UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        final List<Conversation> conversations = user.isAdmin() ?
                this.conversationService.findAllConversation() :
                this.conversationService.findAllByCreatorId(user.getId());

        final List<ConversationResponse> res = conversations.stream().map(conversation -> {
            final UserDetails creator = this.userService.getUserDetailsById(conversation.getCreatorId());
            return this.conversationMapper.toDto(conversation, creator);
        }).toList();

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationResponse> getConversation(@PathVariable Long id) {

        final Conversation conversation = this.conversationService.findConversationById(id).get();

        final UserDetails creator = this.userService.getUserDetailsById(conversation.getCreatorId());
        final ConversationResponse res = this.conversationMapper.toDto(conversation, creator);

        return ResponseEntity.ok(res);
    }

}
