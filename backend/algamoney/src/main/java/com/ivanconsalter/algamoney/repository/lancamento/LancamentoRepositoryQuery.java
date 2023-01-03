package com.ivanconsalter.algamoney.repository.lancamento;

import java.util.List;

import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.repository.filter.LancamentoFilter;

public interface LancamentoRepositoryQuery {
	
	public List<Lancamento> pesquisar(LancamentoFilter lancamentoFilter);

}
