package com.ivanconsalter.algamoney.exceptionhandler;

public class Erro {
	
	private String mensagemUsuario;
	private String mensagemDesenvolvedor;
	
	public Erro(String mensagemUsuario, String mensagemDesenvolvedor) {
		super();
		this.mensagemUsuario = mensagemUsuario;
		this.mensagemDesenvolvedor = mensagemDesenvolvedor;
	}

	public String getMensagemUsuario() {
		return mensagemUsuario;
	}

	public void setMensagemUsuario(String mensagemUsuario) {
		this.mensagemUsuario = mensagemUsuario;
	}

	public String getMensagemDesenvolvedor() {
		return mensagemDesenvolvedor;
	}

	public void setMensagemDesenvolvedor(String mensagemDesenvolvedor) {
		this.mensagemDesenvolvedor = mensagemDesenvolvedor;
	}
	
}

