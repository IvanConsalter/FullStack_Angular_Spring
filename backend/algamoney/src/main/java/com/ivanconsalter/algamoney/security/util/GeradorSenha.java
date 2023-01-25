package com.ivanconsalter.algamoney.security.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeradorSenha {
	
	public static void main(String[] args) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		System.out.println(bCryptPasswordEncoder.encode("@ngul@r0"));
		System.out.println(bCryptPasswordEncoder.encode("m0b1l30"));
	}

}
