package com.ivanconsalter.algamoney.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ivanconsalter.algamoney.model.Estado;
import com.ivanconsalter.algamoney.repository.EstadoRepository;

@RestController
@RequestMapping(path = "/estados")
public class EstadoResource {
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@GetMapping
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_PESSOA.name()) and hasAuthority('SCOPE_read')")
	public List<Estado> buscarEstados() {
		return estadoRepository.findAll(); 
	}

}
