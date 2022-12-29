package com.ivanconsalter.algamoney.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ivanconsalter.algamoney.event.RecursoCriadoEvent;
import com.ivanconsalter.algamoney.model.Pessoa;
import com.ivanconsalter.algamoney.repository.PessoaRepository;

@RestController
@RequestMapping(path = "/pessoas")
public class PessoaResource {
	
	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private ApplicationEventPublisher eventPublisher;
	
	@GetMapping
	public List<Pessoa> listar() {
		return pessoaRepository.findAll();
	}
	
	@PostMapping
	public ResponseEntity<Pessoa> criar(
			@Valid @RequestBody Pessoa pessoa,
			HttpServletResponse response
	) {
		Pessoa novaPessoa = pessoaRepository.save(pessoa);
		
		eventPublisher.publishEvent(new RecursoCriadoEvent(this, response, novaPessoa.getCodigo()));
		
		return ResponseEntity.status(HttpStatus.CREATED).body(novaPessoa);
	}
	
	@GetMapping(path = "/{codigo}")
	public ResponseEntity<Pessoa> buscarPorCodigo(@PathVariable Long codigo) {
		return pessoaRepository.findById(codigo)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping(path = "/{codigo}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Long codigo) {
		pessoaRepository.deleteById(codigo);
	}
	
}
