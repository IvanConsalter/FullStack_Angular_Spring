package com.ivanconsalter.algamoney.resource;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ivanconsalter.algamoney.dto.Anexo;
import com.ivanconsalter.algamoney.dto.LancamentoEstatisticaCategoria;
import com.ivanconsalter.algamoney.dto.LancamentoEstatisticaDia;
import com.ivanconsalter.algamoney.event.RecursoCriadoEvent;
import com.ivanconsalter.algamoney.exceptionhandler.Erro;
import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.repository.LancamentoRepository;
import com.ivanconsalter.algamoney.repository.filter.LancamentoFilter;
import com.ivanconsalter.algamoney.service.LancamentoService;
import com.ivanconsalter.algamoney.service.exception.PessoaInexistenteOuInativaException;
import com.ivanconsalter.algamoney.storage.S3;

@RestController
@RequestMapping(path = "/lancamentos")
public class LancamentoResource {

	@Autowired
	private LancamentoRepository lancamentoRepository;

	@Autowired
	private LancamentoService lancamentoService;

	@Autowired
	private ApplicationEventPublisher applicationEventPublisher;

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private S3 s3;

	@PostMapping(path = "/anexo")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_LANCAMENTO.name()) and hasAuthority('SCOPE_read')")
	public Anexo uploadAnexo(@RequestParam MultipartFile anexo) throws IOException {

//		String nomeArquivoOriginal = anexo.getOriginalFilename();
//		int ultimoPontoIndex = nomeArquivoOriginal.lastIndexOf(".");
//		String nomeArquivo = nomeArquivoOriginal.substring(0, ultimoPontoIndex);
//		String extensao = nomeArquivoOriginal.substring(ultimoPontoIndex);
//		String novoNome = nomeArquivo + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + extensao;
//		
//		OutputStream outputStream = new FileOutputStream("C:\\Users\\ivan_\\Desktop\\" + novoNome);
//		outputStream.write(anexo.getBytes());
//		outputStream.close();

		String nome = s3.salvarTemporariamente(anexo);
		return new Anexo(nome, s3.configurarUrl(nome));

	}

	@GetMapping(path = "/relatorios/por-pessoa")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_LANCAMENTO.name()) and hasAuthority('SCOPE_read')")
	public ResponseEntity<byte[]> relatorioPorPessoa(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate inicio,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fim) throws Exception {

		byte[] relatorio = lancamentoService.relatorioPorPessoa(inicio, fim);

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE).body(relatorio);
	}

	@GetMapping(path = "/estatisticas/por-categoria")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_LANCAMENTO.name()) and hasAuthority('SCOPE_read')")
	public List<LancamentoEstatisticaCategoria> porCategoria(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate mesReferencia) {
		return this.lancamentoRepository.porCategoria(mesReferencia);
	}

	@GetMapping(path = "/estatisticas/por-dia")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_LANCAMENTO.name()) and hasAuthority('SCOPE_read')")
	public List<LancamentoEstatisticaDia> porDia(
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate mesReferencia) {
		return this.lancamentoRepository.porDia(mesReferencia);
	}

	@GetMapping()
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_LANCAMENTO.name()) and hasAuthority('SCOPE_read')")
	public Page<Lancamento> pesquisar(LancamentoFilter lancamentoFilter, Pageable pageable) {
		return lancamentoRepository.pesquisar(lancamentoFilter, pageable);
	}

	@GetMapping(path = "/{codigo}")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_PESQUISAR_LANCAMENTO.name()) and hasAuthority('SCOPE_read')")
	public ResponseEntity<Lancamento> buscarPorCodigo(@PathVariable Long codigo) {
		return lancamentoRepository.findById(codigo).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	// TODO - MELHORAR MENSAGEM DE ERRO QUANDO PASSA CATEGORIA E PESSOA VAZIA
	@PostMapping
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_CADASTRAR_LANCAMENTO.name()) and hasAuthority('SCOPE_write')")
	public ResponseEntity<Lancamento> criar(@Valid @RequestBody Lancamento lancamento, HttpServletResponse response) {
		Lancamento novoLancamento = lancamentoService.salvar(lancamento);

		applicationEventPublisher.publishEvent(new RecursoCriadoEvent(this, response, novoLancamento.getCodigo()));

		return ResponseEntity.status(HttpStatus.CREATED).body(novoLancamento);

	}

	// TODO - MELHORAR MENSAGEM DE ERRO QUANDO PASSA CATEGORIA E PESSOA VAZIA
	@PutMapping(path = "/{codigo}")
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_CADASTRAR_LANCAMENTO.name()) and hasAuthority('SCOPE_write')")
	public ResponseEntity<Lancamento> atualizar(@PathVariable Long codigo, @Valid @RequestBody Lancamento lancamento) {
		try {
			Lancamento lancamentoSalvo = lancamentoService.atualizar(codigo, lancamento);
			return ResponseEntity.ok(lancamentoSalvo);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping(path = "/{codigo}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority(T(com.ivanconsalter.algamoney.security.AuthorityEnum).ROLE_REMOVER_LANCAMENTO.name()) and hasAuthority('SCOPE_write')")
	public void deletar(@PathVariable Long codigo) {
		lancamentoRepository.deleteById(codigo);
	}

	@ExceptionHandler({ PessoaInexistenteOuInativaException.class })
	public ResponseEntity<Object> handlePessoaInexistenteOuInativaException(PessoaInexistenteOuInativaException ex) {
		String mensagemUsuario = messageSource.getMessage("pessoa.inexistente-ou-inativa", null,
				LocaleContextHolder.getLocale());
		String mensagemDesenvolvedor = ex.toString();
		List<Erro> erros = Arrays.asList(new Erro(mensagemUsuario, mensagemDesenvolvedor));

		return ResponseEntity.badRequest().body(erros);
	}

}
