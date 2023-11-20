package com.ycyw.supportservice.repository;

import com.ycyw.supportservice.model.Conversation;
import com.ycyw.supportservice.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

}
