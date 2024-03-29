package com.ivanconsalter.algamoney.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ivanconsalter.algamoney.repository.listener.LancamentoAnexoListener;

@EntityListeners(LancamentoAnexoListener.class)
@Entity
@Table(name = "lancamento")
public class Lancamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long codigo;
	
	@NotNull
	@Size(min = 3, max= 255)
	String descricao;
	
	@Column(name = "data_vencimento")
	@NotNull
	LocalDate dataVencimento;
	
	@Column(name = "data_pagamento")
	LocalDate dataPagamento;
	
	@NotNull
	BigDecimal valor;
	
	String observacao;
	
	@Enumerated(EnumType.STRING)
	@NotNull
	Tipo tipo;
	
	@JsonIgnoreProperties(value = "listContato")
	@ManyToOne
	@JoinColumn(name = "pessoa_codigo")
	@NotNull
	Pessoa pessoa;
	
	@ManyToOne
	@JoinColumn(name = "categoria_codigo")
	@NotNull
	Categoria categoria;
	
	private String anexo;
	
	@Transient
	private String urlAnexo;
	
	@JsonIgnore
	public boolean isReceita() {
		return Tipo.RECEITA.equals(this.tipo);
	}

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDataVencimento() {
		return dataVencimento;
	}

	public void setDataVencimento(LocalDate dataVencimento) {
		this.dataVencimento = dataVencimento;
	}

	public LocalDate getDataPagamento() {
		return dataPagamento;
	}
	
	public void setDataPagamento(LocalDate dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
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

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}
	
	public String getAnexo() {
		return anexo;
	}
	
	public void setAnexo(String anexo) {
		this.anexo = anexo;
	}
	
	public String getUrlAnexo() {
		return urlAnexo;
	}
	
	public void setUrlAnexo(String urlAnexo) {
		this.urlAnexo = urlAnexo;
	}

	@Override
	public int hashCode() {
		return Objects.hash(codigo);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Lancamento other = (Lancamento) obj;
		return Objects.equals(codigo, other.codigo);
	}

	@Override
	public String toString() {
		return "Lancamento [codigo=" + codigo + ", descricao=" + descricao + ", dataVencimento=" + dataVencimento
				+ ", dataPagamento=" + dataPagamento + ", valor=" + valor + ", observacao=" + observacao + ", tipo="
				+ tipo + ", pessoa=" + pessoa + ", categoria=" + categoria + ", anexo=" + anexo + ", urlAnexo="
				+ urlAnexo + "]";
	}

}
