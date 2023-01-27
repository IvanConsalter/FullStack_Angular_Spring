package com.ivanconsalter.algamoney.resource;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/token")
public class TokenResource {
	
	@DeleteMapping(path = "/revoke")
	public void revoke(HttpServletRequest req, HttpServletResponse res) {
		Cookie cookie = new Cookie("refreshToken", null);
		cookie.setHttpOnly(true);
		cookie.setSecure(false); // TODO: Em Produção deve ser true
		cookie.setPath(req.getContextPath() + "/oauth/token");
		System.out.println(req.getContextPath());
		cookie.setMaxAge(0);
		
		res.addCookie(cookie);
		res.setStatus(HttpStatus.NO_CONTENT.value());
	}

}
