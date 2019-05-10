package org.kpax.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

/**
 * Returns a 401 error code (Unauthorized) to the client, when Ajax authentication fails.
 */
public class AjaxAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    public static final String UNAUTHORIZED_MESSAGE = "Authentication failed";

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException exception) throws IOException, ServletException {
        String message;
        if (exception instanceof BadCredentialsException) {
            message =  exception.getMessage();
        } else {
            message = UNAUTHORIZED_MESSAGE;
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, message);
    }
}
