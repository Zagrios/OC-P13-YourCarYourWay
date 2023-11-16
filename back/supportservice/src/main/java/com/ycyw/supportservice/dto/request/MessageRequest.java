package com.ycyw.supportservice.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class MessageRequest {

    @JsonCreator
    public MessageRequest(@JsonProperty("message") String message){
        this.message = message;
    }

    @NotBlank
    private final String message;

}
