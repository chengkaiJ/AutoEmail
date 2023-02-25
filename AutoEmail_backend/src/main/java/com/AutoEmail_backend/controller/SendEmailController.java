package com.AutoEmail_backend.controller;


import com.AutoEmail_backend.model.Email2Send;
import com.AutoEmail_backend.service.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@CrossOrigin
@RestController
public class SendEmailController {

    SendEmailService sendEmailService;

    @Autowired
    public SendEmailController(SendEmailService sendEmailService) {
        this.sendEmailService = sendEmailService;
    }

    @GetMapping(value = "/get")
    public void testGet() {
        System.out.println("get request received");
    }


    @PostMapping(value = "/send")
    public String sendEmail(Email2Send email2Send) {
        System.out.println("received request");

        sendEmailService.sendEmail(email2Send);
        System.out.println("send email successfully");
        return "success";
    }

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void saveDraft(@RequestBody Email2Send email2Send) throws MessagingException, javax.mail.MessagingException {
        sendEmailService.saveDraft(email2Send);
    }

}
