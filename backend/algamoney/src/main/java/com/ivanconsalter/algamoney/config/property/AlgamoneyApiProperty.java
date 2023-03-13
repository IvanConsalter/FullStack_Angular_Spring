package com.ivanconsalter.algamoney.config.property;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("algamoney")
@Component
public class AlgamoneyApiProperty {

//	private final String originPermitida = "http://127.0.0.1:5500";
	private final String originPermitida = "http://localhost:4200";
	
	private final Seguranca seguranca = new Seguranca();
	
	private final Mail mail = new Mail();
	
	private final S3 s3 = new S3();
	
	public Mail getMail() {
		return mail;
	}
	
	public Seguranca getSeguranca() {
		return seguranca;
	}
	
	public S3 getS3() {
		return s3;
	}
	
	public String getOriginPermitida() {
		return originPermitida;
	}
	
	public static class Seguranca {
		
		private List<String> redirectsPermitidos;
		private String authServerUrl;

		public List<String> getRedirectsPermitidos() {
			return redirectsPermitidos;
		}

		public void setRedirectsPermitidos(List<String> redirectsPermitidos) {
			this.redirectsPermitidos = redirectsPermitidos;
		}

		public String getAuthServerUrl() {
			return authServerUrl;
		}

		public void setAuthServerUrl(String authServerUrl) {
			this.authServerUrl = authServerUrl;
		}
		
		
	}
	
	public static class Mail {
		
		private String host;
		private Integer port;
		private String username;
		private String password;
		
		public String getHost() {
			return host;
		}
		
		public void setHost(String host) {
			this.host = host;
		}
		
		public Integer getPort() {
			return port;
		}
		
		public void setPort(Integer port) {
			this.port = port;
		}
		public String getUsername() {
			return username;
		}
		
		public void setUsername(String username) {
			this.username = username;
		}
		
		public String getPassword() {
			return password;
		}
		
		public void setPassword(String password) {
			this.password = password;
		}
		
		
	}
	
	public static class S3 {
		
		private String accessKeyId;
		private String secretAccessKey;
		private String bucket = "aw-algamoney-arquivos-ivan";
		
		public String getAccessKeyId() {
			return accessKeyId;
		}
		
		public void setAccessKeyId(String accessKeyId) {
			this.accessKeyId = accessKeyId;
		}
		
		public String getSecretAccessKey() {
			return secretAccessKey;
		}
		
		public void setSecretAccessKey(String secretAccessKey) {
			this.secretAccessKey = secretAccessKey;
		}
		
		public void setBucket(String bucket) {
			this.bucket = bucket;
		}
		
		public String getBucket() {
			return bucket;
		}
		
	}

}
