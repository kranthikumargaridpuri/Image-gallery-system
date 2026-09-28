package com.asprineminds.gallery.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // A disconnected client cannot receive a JSON error response.
    @ExceptionHandler(org.apache.catalina.connector.ClientAbortException.class)
    public void clientDisconnected(org.apache.catalina.connector.ClientAbortException e) {
        // Nothing to write: the connection is already closed.
    }


    /**
     * Always return exceptions as JSON.
     *
     * File/download endpoints may have selected a binary MIME type such as
     * application/zip or application/x-zip-compressed before an exception is
     * raised.  If that content type is allowed to leak into this handler,
     * Spring tries to serialize this Map using a ZIP/binary converter and
     * throws HttpMessageNotWritableException.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> ex(
            Exception e,
            HttpServletRequest request,
            HttpServletResponse response) {

        // The response is still writable in the normal exception path.
        // Clear any MIME type inherited from the failed file response.
        if (!response.isCommitted()) {
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
        }

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Bad Request");
        body.put("message", safeMessage(e));
        body.put("path", request == null ? null : request.getRequestURI());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body);
    }

    private String safeMessage(Exception e) {
        if (e == null || e.getMessage() == null || e.getMessage().trim().isEmpty()) {
            return "Request could not be completed";
        }
        return e.getMessage();
    }
}
