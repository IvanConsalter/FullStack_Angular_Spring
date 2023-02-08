package com.ivanconsalter.algamoney.config;

import java.util.Properties;

import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.ivanconsalter.algamoney.config.property.AlgamoneyApiProperty;

@Configuration
public class MailConfig {
	
	private AlgamoneyApiProperty algamoneyApiProperty;

	public JavaMailSender javaMailSender() {
		Properties properties = new Properties();
		
		properties.put("mail.transport.protocol", "smtp");
		properties.put("mail.smtp.auth", true);
		properties.put("mail.smtp.starttls.enable", true);
		properties.put("mail.smtp.connectiontimeout", 10000);
		
		JavaMailSenderImpl javaMailSenderImpl = new JavaMailSenderImpl();
		javaMailSenderImpl.setJavaMailProperties(properties);
		javaMailSenderImpl.setHost(algamoneyApiProperty.getMail().getHost());
		javaMailSenderImpl.setPort(algamoneyApiProperty.getMail().getPort());
		javaMailSenderImpl.setUsername(algamoneyApiProperty.getMail().getUsername());
		javaMailSenderImpl.setPassword(algamoneyApiProperty.getMail().getPassword());
		
		return javaMailSenderImpl;
	}
}
