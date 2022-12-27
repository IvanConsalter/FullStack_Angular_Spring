package com.ivanconsalter.algamoney.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ivanconsalter.algamoney.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
