package com.harmoni.frontapi.main.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ErrorPayload {
    private String errorCode;
    private String errorMessage;
    private String errorDetail;
}