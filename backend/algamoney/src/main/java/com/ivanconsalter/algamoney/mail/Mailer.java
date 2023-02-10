package com.ivanconsalter.algamoney.mail;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
public class Mailer {

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private TemplateEngine templateEngine;
	
//	@Autowired
//	private LancamentoRepository lancamentoRepository;
//	@EventListener
//	private void teste(ApplicationReadyEvent event) {
//		
//		String template = "mail/aviso-lancamentos-vencidos";
//		
//		List<Lancamento> listaLancamento = lancamentoRepository.findAll();
//		
//		Map<String, Object> variaveis = new HashMap<>();
//		variaveis.put("lancamentos", listaLancamento);
//		
//		this.enviarEmailComTemplate(
//				"testes.algaworks@gmail.com",
//				Arrays.asList("ivanconsalter1@gmail.com"),
//				"Testando",
//				template,
//				variaveis);
//
//		System.out.println("<<<<<<< Email enviado >>>>>>");
//	}
//	@EventListener
//	private void teste(ApplicationReadyEvent event) {
//		this.enviarEmail("testes.algaworks@gmail.com", Arrays.asList("ivanconsalter1@gmail.com"), "Testando",
//				"Olá!<br/>Teste ok.");
//
//		System.out.println("<<<<<<< Email enviado >>>>>>");
//	}

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

	public void enviarEmailComTemplate(String remetente, List<String> destinatarios, 
			String assunto, String template, Map<String, Object> variaveis) {

		Context context = new Context(new Locale("pt", "BR"));
		
		variaveis.entrySet().forEach(entrada -> context.setVariable(entrada.getKey(), entrada.getValue()));
		
		String mensagem = templateEngine.process(template, context);
		
		this.enviarEmail(remetente, destinatarios, assunto, mensagem);
	}

}
