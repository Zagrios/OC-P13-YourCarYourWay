package com.ycyw.supportservice.service;

import com.ycyw.supportservice.model.Conversation;
import com.ycyw.supportservice.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    public Optional<Conversation> findConversationById(Long id){
        return this.conversationRepository.findById(id);
    }

    public List<Conversation> findAllByCreatorId(Long id){
        return this.conversationRepository.findAllByCreatorId(id);
    }

    public List<Conversation> findAllConversation(){
        return this.conversationRepository.findAll();
    }

    public Conversation saveConversation(Conversation conversation){
        return this.conversationRepository.save(conversation);
    }

}
