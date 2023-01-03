package com.ivanconsalter.algamoney.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.repository.lancamento.LancamentoRepositoryQuery;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery {

}
