package com.ivanconsalter.algamoney.repository.lancamento;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.ObjectUtils;

import com.ivanconsalter.algamoney.dto.LancamentoEstatisticaCategoria;
import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.model.Lancamento_;
import com.ivanconsalter.algamoney.repository.filter.LancamentoFilter;

public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public Page<Lancamento> pesquisar(LancamentoFilter lancamentoFilter, Pageable pageable) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Lancamento> criteria = builder.createQuery(Lancamento.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);

		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Lancamento> query = manager.createQuery(criteria);
		adicionarRestricoesDePaginacao(query, pageable);
		
		return new PageImpl<>(query.getResultList(), pageable, total(lancamentoFilter));
	}

	private Predicate[] criarRestricoes(
			LancamentoFilter lancamentoFilter, 
			CriteriaBuilder builder,
			Root<Lancamento> root
	) {

		List<Predicate> predicates = new ArrayList<Predicate>();

		if (!ObjectUtils.isEmpty(lancamentoFilter.getDescricao())) {
			predicates.add(
						builder.like(
								builder.lower(root.get(Lancamento_.descricao)),
								"%" + lancamentoFilter.getDescricao().toLowerCase() + "%"));
		}
		
		if (!ObjectUtils.isEmpty(lancamentoFilter.getDataVencimentoDe())) {
			predicates.add(
					builder.greaterThanOrEqualTo(
							root.get(Lancamento_.dataVencimento), 
							lancamentoFilter.getDataVencimentoDe()));
		}
		
		if (!ObjectUtils.isEmpty(lancamentoFilter.getDataVencimentoAte())) {
			predicates.add(
					builder.lessThanOrEqualTo(
							root.get(Lancamento_.dataVencimento), 
							lancamentoFilter.getDataVencimentoAte()));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}
	
	private void adicionarRestricoesDePaginacao(TypedQuery<Lancamento> query, Pageable pageable) {
		int paginaAtual = pageable.getPageNumber();
		int totalRegistrosPorPagina = pageable.getPageSize();
		int primeiroRegistroDaPagina = paginaAtual * totalRegistrosPorPagina;
		
		query.setFirstResult(primeiroRegistroDaPagina);
		query.setMaxResults(totalRegistrosPorPagina);
	}
	
	private Long total(LancamentoFilter lancamentoFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Long> criteria = builder.createQuery(Long.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);
		
		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		criteria.where(predicates);
		
		criteria.select(builder.count(root));
		return manager.createQuery(criteria).getSingleResult();
	}

	@Override
	public List<LancamentoEstatisticaCategoria> lancamentoPorCategoria(LocalDate mesReferencia) {
		
		CriteriaBuilder criteriaBuilder = manager.getCriteriaBuilder();
		
		CriteriaQuery<LancamentoEstatisticaCategoria> criteriaQuery = 
				criteriaBuilder.createQuery(LancamentoEstatisticaCategoria.class);
		
		Root<Lancamento> root = criteriaQuery.from(Lancamento.class);
		
		criteriaQuery.select(criteriaBuilder.construct(LancamentoEstatisticaCategoria.class,
				root.get(Lancamento_.categoria),
				criteriaBuilder.sum(root.get(Lancamento_.valor))));
		
		LocalDate primeiroDia = mesReferencia.withDayOfMonth(1);
		LocalDate ultimoDia = mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth());
		
		criteriaQuery.where(
				criteriaBuilder.greaterThanOrEqualTo(root.get(Lancamento_.dataVencimento), primeiroDia),
				criteriaBuilder.lessThanOrEqualTo(root.get(Lancamento_.dataVencimento), ultimoDia));
		
		criteriaQuery.groupBy(root.get(Lancamento_.categoria));
		
		TypedQuery<LancamentoEstatisticaCategoria> typedQuery = manager.createQuery(criteriaQuery);
		
		return typedQuery.getResultList();
	}

}
