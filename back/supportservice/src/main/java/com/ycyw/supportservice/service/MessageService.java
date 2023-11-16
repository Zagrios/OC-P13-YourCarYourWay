package com.ycyw.supportservice.service;

import com.ycyw.supportservice.model.Message;
import com.ycyw.supportservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message message){
        this.messageRepository.save(message);
        return message;
    }

}
