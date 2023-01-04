package com.ivanconsalter.algamoney.repository.lancamento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.repository.filter.LancamentoFilter;

public interface LancamentoRepositoryQuery {
	
	public Page<Lancamento> pesquisar(LancamentoFilter lancamentoFilter, Pageable pageable);

}
