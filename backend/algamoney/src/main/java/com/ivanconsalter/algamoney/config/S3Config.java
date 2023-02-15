package com.ivanconsalter.algamoney.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.ivanconsalter.algamoney.config.property.AlgamoneyApiProperty;

@Configuration
public class S3Config {
	
	@Autowired
	private AlgamoneyApiProperty algamoneyApiProperty;
	
	@Bean
	public AmazonS3 amazonS3() {
		AWSCredentials awsCredentials = new BasicAWSCredentials(
				algamoneyApiProperty.getS3().getAccessKeyId(),
				algamoneyApiProperty.getS3().getSecretAccessKey());
		
		AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
				.build();
		
		return amazonS3;
	}

}
