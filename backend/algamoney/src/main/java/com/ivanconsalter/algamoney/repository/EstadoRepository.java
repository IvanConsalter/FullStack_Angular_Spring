package com.ivanconsalter.algamoney.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ivanconsalter.algamoney.model.Estado;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long>{

}
