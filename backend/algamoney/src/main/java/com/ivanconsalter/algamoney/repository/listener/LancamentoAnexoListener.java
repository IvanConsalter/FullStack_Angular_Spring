package com.ivanconsalter.algamoney.repository.listener;

import javax.persistence.PostLoad;

import org.springframework.util.StringUtils;

import com.ivanconsalter.algamoney.AlgamoneyApplication;
import com.ivanconsalter.algamoney.model.Lancamento;
import com.ivanconsalter.algamoney.storage.S3;

public class LancamentoAnexoListener {
	
	@PostLoad
	public void postLoad(Lancamento lancamento) {
		if(StringUtils.hasText(lancamento.getAnexo())) {
			S3 s3 = AlgamoneyApplication.getBean(S3.class);
			lancamento.setUrlAnexo(s3.configurarUrl(lancamento.getAnexo()));
		}
	}

}
