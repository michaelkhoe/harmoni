package com.harmoni.frontapi.main.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FrontApiGenericResponse<T> {
    private ResponseHeader header;
    private T payload;
    private ErrorPayload error;

    public FrontApiGenericResponse(T payload) {
        this(new ResponseHeader("0000", "success"), payload, null);
    }
}

