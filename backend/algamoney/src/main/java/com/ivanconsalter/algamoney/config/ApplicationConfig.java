package com.ivanconsalter.algamoney.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:config/config.properties")
public class ApplicationConfig {

	@Value("${algamoney.mail.host}")
	private String mailHost;
	
	@Value("${algamoney.mail.port}")
	private Integer mailPort;
	
	@Value("${algamoney.mail.username}")
	private String mailUsername;
	
	@Value("${algamoney.mail.password}")
	private String mailPassword;
}
