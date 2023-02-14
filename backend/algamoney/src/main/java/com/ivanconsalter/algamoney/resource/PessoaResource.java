package com.ivanconsalter.algamoney.resource;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ivanconsalter.algamoney.event.RecursoCriadoEvent;
import com.ivanconsalter.algamoney.model.Pessoa;
import com.ivanconsalter.algamoney.repository.PessoaRepository;
import com.ivanconsalter.algamoney.service.PessoaService;

@RestController
@RequestMapping(path = "/pessoas")
public class PessoaResource {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private PessoaService pessoaService;
	
	@Autowired
	private ApplicationEventPublisher eventPublisher;
	
	@GetMapping
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_PESSOA.name()) and hasAuthority('SCOPE_read')")
	public Page<Pessoa> pesquisar(@RequestParam(required = false, defaultValue = "") String nome, Pageable pageable) {
		return pessoaRepository.findByNomeContaining(nome, pageable);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_CADASTRAR_PESSOA.name()) and hasAuthority('SCOPE_write')")
	public ResponseEntity<Pessoa> criar(
			@Valid @RequestBody Pessoa pessoa,
			HttpServletResponse response
	) {
		Pessoa novaPessoa = pessoaService.salvar(pessoa);
		
		eventPublisher.publishEvent(new RecursoCriadoEvent(this, response, novaPessoa.getCodigo()));
		
		return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
	}
	
	@GetMapping(path = "/{codigo}")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_PESSOA.name()) and hasAuthority('SCOPE_read')")
	public ResponseEntity<Pessoa> buscarPorCodigo(@PathVariable Long codigo) {
		return pessoaRepository.findById(codigo)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping(path = "/{codigo}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_REMOVER_PESSOA.name()) and hasAuthority('SCOPE_write')")
	public void deletar(@PathVariable Long codigo) {
		pessoaRepository.deleteById(codigo);
	}
	
	@PutMapping(path = "/{codigo}")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_CADASTRAR_PESSOA.name()) and hasAuthority('SCOPE_write')")
	public ResponseEntity<Pessoa> atualizar(@Valid @RequestBody Pessoa pessoa, @PathVariable Long codigo) {
		
		Pessoa pessoaSalva = pessoaService.atualizar(codigo, pessoa);
		return ResponseEntity.ok(pessoaSalva);
		
	}
	
	@PutMapping(path = "/{codigo}/ativo")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_CADASTRAR_PESSOA.name()) and hasAuthority('SCOPE_write')")
	public void atualizarPropriedadeAtivo(@RequestBody Boolean ativo,@PathVariable Long codigo) {
		pessoaService.atualizarPropriedadeAtivo(ativo, codigo);
	}
	
}
