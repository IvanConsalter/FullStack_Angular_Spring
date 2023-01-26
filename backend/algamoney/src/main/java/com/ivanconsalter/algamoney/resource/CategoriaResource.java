package com.ivanconsalter.algamoney.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ivanconsalter.algamoney.event.RecursoCriadoEvent;
import com.ivanconsalter.algamoney.model.Categoria;
import com.ivanconsalter.algamoney.repository.CategoriaRepository;

@RestController()
@RequestMapping(path = "/categorias")
public class CategoriaResource {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Autowired
	private ApplicationEventPublisher eventPublisher;
	
	@GetMapping
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_CATEGORIA.name()) and hasAuthority('SCOPE_read')")
	public List<Categoria> listar() {
		return categoriaRepository.findAll();
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_CADASTRAR_CATEGORIA.name()) and hasAuthority('SCOPE_write')")
	public ResponseEntity<Categoria> criar(
			@Valid @RequestBody Categoria categoria,
			HttpServletResponse response
	) {
		Categoria novaCategoria = categoriaRepository.save(categoria);
		
		eventPublisher.publishEvent(new RecursoCriadoEvent(this, response, novaCategoria.getCodigo()));
		
		return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
	}
	
	@GetMapping(path = "/{codigo}")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_CADASTRAR_CATEGORIA.name()) and hasAuthority('SCOPE_read')")
	public ResponseEntity<Categoria> buscarPorCodigo(@PathVariable Long codigo) {
		return categoriaRepository.findById(codigo)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
}
