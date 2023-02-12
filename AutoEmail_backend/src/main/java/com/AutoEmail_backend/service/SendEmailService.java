package com.AutoEmail_backend.service;

import com.AutoEmail_backend.model.Email2Send;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Service
public interface SendEmailService {

    void sendEmail(Email2Send email2Send);

    void saveDraft(Email2Send email2Send) throws MessagingException;

    void printEmail(String to, String name, String content);
}
