package com.ivanconsalter.algamoney.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ivanconsalter.algamoney.event.RecursoCriadoEvent;
import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.repository.LancamentoRepository;

@RestController
@RequestMapping(path = "/lancamentos")
public class LancamentoResource {

	@Autowired
	private LancamentoRepository lancamentoRepository;
	
	@Autowired
	private ApplicationEventPublisher applicationEventPublisher;
	
	@GetMapping()
	public List<Lancamento> listar() {
		return lancamentoRepository.findAll();
	}
	
	@GetMapping(path = "/{codigo}")
	public ResponseEntity<Lancamento> buscarPorCodigo(@PathVariable Long codigo) {
		return lancamentoRepository.findById(codigo)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping
	public ResponseEntity<Lancamento> criar(
			@Valid @RequestBody Lancamento lancamento,
			HttpServletResponse response
	) {
		Lancamento novoLancamento = lancamentoRepository.save(lancamento);
		
		applicationEventPublisher.publishEvent(new RecursoCriadoEvent(this, response, novoLancamento.getCodigo()));
		
		return ResponseEntity.status(HttpStatus.CREATED).body(novoLancamento);
		
	}
}
