package com.sellertl.sellertool_v1.controller.api.message;

import org.springframework.stereotype.Component;

@Component
public class ResponseMessage {
    public final String SUCCESS = "{\"message\":\"SUCCESS\"}";
    public final String FAILURE = "{\"message\":\"FAILURE\"}";
    public final String ERROR = "{\"message\":\"ERROR\"}";
    public final String USER_INVALID = "{\"message\":\"USER_INVALID\"}";
}
