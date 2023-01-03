package com.ivanconsalter.algamoney.repository.lancamento;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.util.ObjectUtils;

import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.model.Lancamento_;
import com.ivanconsalter.algamoney.repository.filter.LancamentoFilter;

public class LancamentoRepositoryImpl implements LancamentoRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public List<Lancamento> pesquisar(LancamentoFilter lancamentoFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Lancamento> criteria = builder.createQuery(Lancamento.class);
		Root<Lancamento> root = criteria.from(Lancamento.class);

		Predicate[] predicates = criarRestricoes(lancamentoFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Lancamento> query = manager.createQuery(criteria);
		return query.getResultList();
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

}
