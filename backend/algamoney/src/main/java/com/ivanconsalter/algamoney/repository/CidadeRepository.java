package com.ivanconsalter.algamoney.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ivanconsalter.algamoney.model.Cidade;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long>{

	public List<Cidade> findByEstadoCodigo(Long estadoCodigo);
}
