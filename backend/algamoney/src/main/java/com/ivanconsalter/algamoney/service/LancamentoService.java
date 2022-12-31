package com.ivanconsalter.algamoney.service;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.model.Pessoa;
import com.ivanconsalter.algamoney.repository.LancamentoRepository;
import com.ivanconsalter.algamoney.repository.PessoaRepository;
import com.ivanconsalter.algamoney.service.exception.PessoaInexistenteOuInativaException;

@Service
public class LancamentoService {

	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private LancamentoRepository lancamentoRepository;

	public Lancamento salvar(@Valid Lancamento lancamento) {
		
		Optional<Pessoa> pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo());
		if(pessoa.isEmpty() || pessoa.get().isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}
		
		return lancamentoRepository.save(lancamento);
	}
	
	
	
}
