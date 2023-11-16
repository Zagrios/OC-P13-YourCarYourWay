package com.ycyw.supportservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class CreateConversationRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

}
