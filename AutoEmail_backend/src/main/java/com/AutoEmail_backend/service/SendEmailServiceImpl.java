package com.AutoEmail_backend.service;

import com.AutoEmail_backend.model.Email2Send;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailParseException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class SendEmailServiceImpl implements SendEmailService{

    private Environment env;

    private final JavaMailSender javaMailSender;

    private final String gmailAccountPassword = "JJCk030511@!";

    @Autowired
    public SendEmailServiceImpl(Environment env, JavaMailSender javaMailSender) {
        this.env = env;
        this.javaMailSender = javaMailSender;
    }


    @Override
    public void sendEmail(Email2Send email) {
        if (email.getFile() != null) {
            sendEmailWithAttachments(email);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(env.getProperty("spring.mail.username"));
        message.setTo(email.getTo());
        message.setSubject(email.getSubject());
        message.setText(email.getMailMessage());

        javaMailSender.send(message);
    }

    private void sendEmailWithAttachments(Email2Send email2Send) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(env.getProperty("spring.mail.username"));
            helper.setTo(email2Send.getTo());
            helper.setSubject(email2Send.getSubject());
            helper.setText(email2Send.getMailMessage());

            // convert MultipartFile to File type.
            MultipartFile file = email2Send.getFile();
            File convFile = new File(file.getOriginalFilename());
            convFile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convFile);
            fos.write(file.getBytes());
            fos.close();

            helper.addAttachment(convFile.getName(), convFile);

        }catch (MessagingException | IOException e) {
            throw new MailParseException(e);
        }
        javaMailSender.send(message);
    }


    @Override
    public void saveDraft(Email2Send mail) {
        // TO DO
    }

    public void printEmail(String to, String name, String content) {
        System.out.println("email:  " + to + "\nname:  " + name +"\ncontent:  " +content);
    }
}
