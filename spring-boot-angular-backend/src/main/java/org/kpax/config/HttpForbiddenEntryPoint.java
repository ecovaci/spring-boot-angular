package org.kpax.config;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HttpForbiddenEntryPoint implements AuthenticationEntryPoint {
	private static final Log logger = LogFactory.getLog(HttpForbiddenEntryPoint.class);

	/**
	 * Always returns a 403 error code to the client.
	 */
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException arg2) throws IOException, ServletException {
		if (logger.isDebugEnabled()) {
			logger.debug("Pre-authenticated entry point called. Rejecting access");
		}
		if (arg2 instanceof InsufficientAuthenticationException) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access Denied");
		} else {
			response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
		}
	}
}