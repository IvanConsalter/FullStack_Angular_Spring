package com.ivanconsalter.algamoney.mail;

import java.util.Arrays;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class Mailer {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@EventListener
	private void teste(ApplicationReadyEvent event) {
		this.enviarEmail("testes.algaworks@gmail.com", Arrays.asList("ivanconsalter1@gmail.com"),"Testando", "Olá!<br/>Teste ok.");
		
		System.out.println("<<<<<<< Email enviado >>>>>>");
	}
	
	public void enviarEmail(String remetente, List<String> destinatarios, String assunto, String mensagem) {
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
			mimeMessageHelper.setFrom(remetente);
			mimeMessageHelper.setTo(destinatarios.toArray(new String[destinatarios.size()]));
			mimeMessageHelper.setSubject(assunto);
			mimeMessageHelper.setText(mensagem, true);
			
			javaMailSender.send(mimeMessage);
		} catch (MessagingException e) {
			throw new RuntimeException("Problemas com o envio de e-mail!", e); 
		}
	}

}
