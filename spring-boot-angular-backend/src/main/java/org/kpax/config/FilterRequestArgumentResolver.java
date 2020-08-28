package org.kpax.config;

import org.kpax.controller.Filterable;
import org.kpax.repository.support.model.Filter;
import org.kpax.repository.support.model.FilterType;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

public class FilterRequestArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.getParameterAnnotation(Filterable.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer,
                                  NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        HttpServletRequest request = (HttpServletRequest) nativeWebRequest.getNativeRequest();

        Map<String, String> filterMap = Collections.list(request.getParameterNames()).stream()
                .filter(name -> name.startsWith("_f(") && name.endsWith(")"))
                .collect(Collectors.toMap(name -> name.substring(3, name.length() - 1), name -> request.getParameter(name)));

		Filter[] filters = filterMap.entrySet().stream().map(entry -> {
			String key = entry.getKey();
			String[] split = key.split(",");
			return new Filter(split[0], FilterType.valueOf(split[1]), entry.getValue());
		}).toArray(Filter[]::new);
		return filters;
    }

}