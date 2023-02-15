package com.AutoEmail_backend.controller;


import com.AutoEmail_backend.model.Email2Send;
import com.AutoEmail_backend.service.SendEmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class SendEmailController {

    SendEmailService sendEmailService;

    @Autowired
    public SendEmailController(SendEmailService sendEmailService) {
        this.sendEmailService = sendEmailService;
    }


    @PostMapping(value = "/send")
    public String sendEmail(Email2Send email2Send) {

        sendEmailService.sendEmail(email2Send);
        System.out.println("send email successfully");
        return "success";
    }

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void saveDraft(@RequestBody Email2Send email2Send) throws MessagingException, javax.mail.MessagingException {
        sendEmailService.saveDraft(email2Send);
    }

}
