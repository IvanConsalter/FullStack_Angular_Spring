package com.ivanconsalter.algamoney.config.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("algamoney")
@Component
public class AlgamoneyApiProperty {

//	private final String originPermitida = "http://127.0.0.1:5500";
	private final String originPermitida = "http://localhost:4200";
	
	private Seguranca seguranca = new Seguranca();
	
	public Seguranca getSeguranca() {
		return seguranca;
	}
	
	public String getOriginPermitida() {
		return originPermitida;
	}
	
	public static class Seguranca {
		
		private boolean enableHttps;


		public boolean isEnableHttps() {
			return enableHttps;
		}


		public void setEnableHttps(boolean enableHttps) {
			this.enableHttps = enableHttps;
		}
		
		
	}
}
