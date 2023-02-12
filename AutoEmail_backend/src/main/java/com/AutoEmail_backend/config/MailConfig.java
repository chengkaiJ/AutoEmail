package com.AutoEmail_backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.mail.Session;

@EnableAutoConfiguration
public class MailConfig {

    @Autowired
    private JavaMailSenderImpl mailSender;

    @Autowired
    private Session session;

}
