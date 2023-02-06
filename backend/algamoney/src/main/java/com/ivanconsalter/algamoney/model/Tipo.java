package com.ivanconsalter.algamoney.model;

public enum Tipo {
	
	RECEITA("Receita"),
	DESPESA("Despesa");

	private final String descricao;
	
	private Tipo(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}
	
}
