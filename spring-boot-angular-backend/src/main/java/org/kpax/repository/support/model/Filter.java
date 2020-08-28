package org.kpax.repository.support.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
@Setter
public class Filter {
	String path;
	FilterType type;
	Object value;

	public Filter(String path, FilterType type, Object value) {
		this.path = path;
		this.type = type;
		this.value = value;
	}

}
