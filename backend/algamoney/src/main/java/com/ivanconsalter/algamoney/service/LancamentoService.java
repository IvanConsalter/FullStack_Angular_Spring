package com.ivanconsalter.algamoney.service;

import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ivanconsalter.algamoney.dto.LancamentoEstatisticaPessoa;
import com.ivanconsalter.algamoney.mail.Mailer;
import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.model.Pessoa;
import com.ivanconsalter.algamoney.model.Usuario;
import com.ivanconsalter.algamoney.repository.LancamentoRepository;
import com.ivanconsalter.algamoney.repository.PessoaRepository;
import com.ivanconsalter.algamoney.repository.UsuarioRepository;
import com.ivanconsalter.algamoney.security.AuthorityEnum;
import com.ivanconsalter.algamoney.service.exception.PessoaInexistenteOuInativaException;
import com.ivanconsalter.algamoney.storage.S3;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class LancamentoService {

	private static final String DESTINATARIOS = AuthorityEnum.ROLE_PESQUISAR_LANCAMENTO.toString();

	private static final Logger logger = LoggerFactory.getLogger(Lancamento.class);

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private LancamentoRepository lancamentoRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private Mailer mailer;

	@Autowired
	private S3 s3;

//	@Scheduled(cron = "0 0 6 * * *")
//	@Scheduled(fixedDelay = 1000 * 60 * 30)
	public void avisarSobreLancamentoVencido() {
		if (logger.isDebugEnabled()) {
			logger.debug("Preparando envio de " + "e-mails de aviso de lançamentos vencidos.");
		}

		List<Lancamento> listLancamentosVencidos = lancamentoRepository
				.findByDataVencimentoLessThanEqualAndDataPagamentoIsNull(LocalDate.now());

		if (listLancamentosVencidos.isEmpty()) {
			logger.info("Sem lançamentos vencidos para aviso.");
			return;
		}

		logger.info("Existem {} lançamentos vencidos.", listLancamentosVencidos.size());

		List<Usuario> destinatarios = usuarioRepository.findByPermissoesDescricao(DESTINATARIOS);

		if (destinatarios.isEmpty()) {
			logger.warn("Existem lançamentos vencidos, mas o " + "sistema não encontrou destinatários.");
			return;
		}

		mailer.avisarSobreLancamentosVencidos(listLancamentosVencidos, destinatarios);

		logger.info("Envio de e-mail de aviso concluído.");
	}

	public byte[] relatorioPorPessoa(LocalDate inicio, LocalDate fim) throws Exception {
		List<LancamentoEstatisticaPessoa> dados = lancamentoRepository.porPessoa(inicio, fim);

		Map<String, Object> parametros = new HashMap<>();
		parametros.put("DT_INICIO", Date.valueOf(inicio));
		parametros.put("DT_FIM", Date.valueOf(fim));
		parametros.put("REPORT_LOCALE", new Locale("pt", "BR"));

		InputStream inputStream = this.getClass().getResourceAsStream("/relatorios/lancamentos-por-pessoa.jasper");

		JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros,
				new JRBeanCollectionDataSource(dados));

		return JasperExportManager.exportReportToPdf(jasperPrint);

	}

	public Lancamento salvar(@Valid Lancamento lancamento) {

		Optional<Pessoa> pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo());
		verificarSePessoaExisteOuAtiva(pessoa);

		if (StringUtils.hasText(lancamento.getAnexo())) {
			s3.salvar(lancamento.getAnexo());
		}

		return lancamentoRepository.save(lancamento);
	}

	public Lancamento atualizar(Long codigo, Lancamento lancamento) {
		Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);

		if (!lancamento.getPessoa().equals(lancamentoSalvo.getPessoa())) {
			validarPessoa(lancamento);
		}

		if (!StringUtils.hasText(lancamento.getAnexo()) && StringUtils.hasText(lancamentoSalvo.getAnexo())) {
			s3.remover(lancamentoSalvo.getAnexo());
		} else if (StringUtils.hasText(lancamento.getAnexo())
				&& !lancamento.getAnexo().equals(lancamentoSalvo.getAnexo())) {
			s3.substituirAnexo(lancamentoSalvo.getAnexo(), lancamento.getAnexo());
		}

		BeanUtils.copyProperties(lancamento, lancamentoSalvo, "codigo");
		return lancamentoRepository.save(lancamentoSalvo);
	}

	private void validarPessoa(Lancamento lancamento) {
		Optional<Pessoa> pessoa = null;

		if (lancamento.getPessoa().getCodigo() != null) {
			pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo());
		}

		verificarSePessoaExisteOuAtiva(pessoa);
	}

	private Lancamento buscarLancamentoExistente(Long codigo) {
		return lancamentoRepository.findById(codigo).orElseThrow(() -> new IllegalArgumentException());
	}

	private void verificarSePessoaExisteOuAtiva(Optional<Pessoa> pessoa) {
		if (pessoa.isEmpty() || pessoa.get().isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}
	}

}
