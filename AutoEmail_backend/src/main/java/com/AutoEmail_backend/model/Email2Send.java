package com.AutoEmail_backend.model;

import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class Email2Send {

    @Nonnull
    private String name;

    @Nonnull
    private String to;

    @Nonnull
    private String mailMessage;

    @Nonnull
    private String subject;


    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    @Nullable
    private MultipartFile file;

    public Email2Send(String name, String to, String mailMessage, String subject, MultipartFile file) {
        this.name = name;
        this.to = to;
        this.mailMessage = mailMessage;
        this.subject = subject;
        this.file = file;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getMailMessage() {
        return mailMessage;
    }

    public void setMailMessage(String mailMessage) {
        this.mailMessage = mailMessage;
    }
}
