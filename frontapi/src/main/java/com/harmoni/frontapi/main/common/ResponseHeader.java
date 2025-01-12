package com.harmoni.frontapi.main.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ResponseHeader {
    private String resultCode;
    private String resultMessage;
}
