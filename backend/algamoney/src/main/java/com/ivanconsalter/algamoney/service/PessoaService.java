package com.ivanconsalter.algamoney.service;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.ivanconsalter.algamoney.model.Pessoa;
import com.ivanconsalter.algamoney.repository.PessoaRepository;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository pessoaRepository;
	
	public Pessoa salvar(@Valid Pessoa pessoa) {
		pessoa.getListContato().forEach( contato -> contato.setPessoa(pessoa));
		return pessoaRepository.save(pessoa);
	}
	
	public Pessoa atualizar(Long codigo, Pessoa pessoa) {
		Pessoa pessoaSalva = this.buscarPessoaPorCodigo(codigo);
		
		pessoaSalva.getListContato().clear();
		pessoaSalva.getListContato().addAll(pessoa.getListContato());
		pessoaSalva.getListContato().forEach( contato -> contato.setPessoa(pessoaSalva));
		
		BeanUtils.copyProperties(pessoa, pessoaSalva, "codigo", "listContato");
		return pessoaRepository.save(pessoaSalva);
	}

	public void atualizarPropriedadeAtivo(Boolean ativo, Long codigo) {
		Pessoa pessoaSalva = this.buscarPessoaPorCodigo(codigo);
		pessoaSalva.setAtivo(ativo);
		pessoaRepository.save(pessoaSalva);
	}
	
	private Pessoa buscarPessoaPorCodigo(Long codigo) {
		Pessoa pessoaSalva = pessoaRepository.findById(codigo)
				.orElseThrow( () -> new EmptyResultDataAccessException(1));
		
		return pessoaSalva;
	}

}
