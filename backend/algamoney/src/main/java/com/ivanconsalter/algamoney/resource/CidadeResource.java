package com.ivanconsalter.algamoney.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ivanconsalter.algamoney.model.Cidade;
import com.ivanconsalter.algamoney.repository.CidadeRepository;

@RestController
@RequestMapping(path = "/cidades")
public class CidadeResource {
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@GetMapping
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_PESSOA.name()) and hasAuthority('SCOPE_read')")
	public List<Cidade> findByEstadoCodigo(@RequestParam Long estadoCodigo) {
		return cidadeRepository.findByEstadoCodigo(estadoCodigo);
	}

}
