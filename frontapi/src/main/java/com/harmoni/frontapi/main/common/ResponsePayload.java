package com.harmoni.frontapi.main.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public interface ResponsePayload {

    @JsonIgnoreProperties(ignoreUnknown = true)
    class Empty implements ResponsePayload {
    }
}