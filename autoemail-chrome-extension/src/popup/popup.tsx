import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom"
import './popup.css';
import FormPage from "./Pages/FormPage";
declare const chrome: any;

let list = document.getElementById("emailList");


function scrapeEmailsFromPage () {
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

    let emails = document.body.innerHTML.match(emailRegEx);

    chrome.runtime.sendMessage({emails})
}

const handleOnClick = async () => {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEmailsFromPage,
        args: []
    });
}
const Popup = () => {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        setEmails(request.emails);
        });
    }, []);
    return (
        <div className="h-screen">
            {/* 
            <button onClick={handleOnClick}>Scrape Emails</button>
            <ul id="emailList">
                {emails.length === 0 ? 
                    (<li>No email found</li>)
                    : (emails.map((email) => 
                        <li key={email} >{email}</li>
                    ))
                }
            </ul> */}
            <BrowserRouter>
                <FormPage />
            </BrowserRouter>
        </div>
    )
};

export default Popup;