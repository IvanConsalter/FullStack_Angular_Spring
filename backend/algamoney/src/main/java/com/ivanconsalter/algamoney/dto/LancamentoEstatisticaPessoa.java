package com.ivanconsalter.algamoney.dto;

import java.math.BigDecimal;

import com.ivanconsalter.algamoney.model.Pessoa;
import com.ivanconsalter.algamoney.model.Tipo;

public class LancamentoEstatisticaPessoa {
	
	private Tipo tipo;
	private Pessoa pessoa;
	private BigDecimal total;
	
	public LancamentoEstatisticaPessoa(Tipo tipo, Pessoa pessoa, BigDecimal total) {
		this.tipo = tipo;
		this.pessoa = pessoa;
		this.total = total;
	}

	public Tipo getTipo() {
		return tipo;
	}

	public void setTipo(Tipo tipo) {
		this.tipo = tipo;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public BigDecimal getTotal() {
		return total;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "LancamentoEstatisticaPessoa [tipo=" + tipo + ", pessoa=" + pessoa + ", total=" + total + "]";
	}
	
}
