package com.ycyw.supportservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long creatorId;
    private String title;
    private String description;

    @OneToMany(targetEntity = Message.class, mappedBy = "conversation")
    private List<Message> messages;

    @CreationTimestamp
    @Column(nullable = false)
    private Date creationDate;

}
