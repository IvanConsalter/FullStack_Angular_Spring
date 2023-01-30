package com.ivanconsalter.algamoney.service;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
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
		verificarSePessoaExisteOuAtiva(pessoa);
		
		return lancamentoRepository.save(lancamento);
	}
	
	public Lancamento atualizar(Long codigo, Lancamento lancamento) {
		Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
		
		if(!lancamento.getPessoa().equals(lancamentoSalvo.getPessoa())) {
			validarPessoa(lancamento);
		}
		
		BeanUtils.copyProperties(lancamento, lancamentoSalvo, "codigo");
		return lancamentoRepository.save(lancamentoSalvo);
	}
	
	private void validarPessoa(Lancamento lancamento) {
		Optional<Pessoa> pessoa = null;
		
		if(lancamento.getPessoa().getCodigo() != null) {
			pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo());
		}
		
		verificarSePessoaExisteOuAtiva(pessoa);
	}
	
	private Lancamento buscarLancamentoExistente(Long codigo) {
		return lancamentoRepository.findById(codigo).orElseThrow( () -> new IllegalArgumentException());
	}
	
	private void verificarSePessoaExisteOuAtiva(Optional<Pessoa> pessoa) {
		if(pessoa.isEmpty() || pessoa.get().isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}
	}
	
	
}
