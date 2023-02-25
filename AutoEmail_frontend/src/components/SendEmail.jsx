import React, { useState, useEffect} from 'react';

import MailMessage from './MailMessage';

function SendEmail() {
  const [values, setValues] = useState({
    user_name: '',
    recruiter_name: '',
    company_name: '',
    recruiter_email: '',
    subject: 'About Application',
    submission_date: '',
    job_title: '',
    job_posting: ''
  });

  const [mailMessage, setMailMessage] = useState('Dear recruiter_name,\n\nI hope this email finds you well. My name is user_name, and I am reaching out to follow up on the job application I submitted on submission_date for the job_title position. I am very interested in this opportunity and wanted to express my enthusiam for the role. \n\nI wanted to confirm that my application was received and inquire if there are any additional materials I can provide to support the review process. I have attached a copy of my resume for your convenience. I am excited about the prospect of contributing to company_name\'s mission and would be grateful for the chance to do so. \n\nThank you for considering my application, and I look forward to hearing from you soon. \n\nJob Posting: job_posting\n\nBest regards,\n\nuser_name');

  var mailMessageTemp =  `Dear ${values.recruiter_name},\n\nI hope this email finds you well. My name is ${values.user_name}, and I am reaching out to follow up on the job application I submitted on ${values.submission_date} for the ${values.job_title} position. I am very interested in this opportunity and wanted to express my enthusiam for the role. \n\nI wanted to confirm that my application was received and inquire if there are any additional materials I can provide to support the review process. I have attached a copy of my resume for your convenience. I am excited about the prospect of contributing to ${values.company_name}\'s mission and would be grateful for the chance to do so. \n\nThank you for considering my application, and I look forward to hearing from you soon. \n\nJob Posting: ${values.job_posting}\n\nBest regards,\n\n${values.user_name}`


  const [file, setFile] = useState(null);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = e =>{
    console.log("file changed",e.target.files[0])
    setFile(e.target.files[0]);
  }

  const handleFillinTemplate = e => {
    console.log("filling template",values)
    setMailMessage(mailMessageTemp);
    console.log('new value is: ', mailMessage)
  }

  const handleSubmit = event => {
    console.log("submit form now ....")
    event.preventDefault();

    const formData = new FormData();
    formData.append("to", values.recruiter_email)
    formData.append("name", values.recruiter_email)
    formData.append("mailMessage", mailMessage)
    formData.append("subject", values.subject)
    if(!!file) {
      formData.append("file", file);
    }

    fetch('http://localhost:8080/send', {
      method: 'POST',
      body: formData,
      headers: {
        // 'Origin':'http://127.0.0.1:5173'
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <form className="m-4 p-4" onSubmit={handleSubmit}>
      <div className='mb-2'>
        <label className="m-1 font-poppins" htmlFor="user_name">Your Name:</label>
        <input className="ml-7 w-60 rounded-full text-black" type="text" id="user_name" name="user_name" value={values.user_name} onChange={handleChange} />
      </div>
      <div className='mb-2'>
        <label className="m-1 font-poppins" htmlFor="recruiter_name">Recruiter's Name:</label>
        <input className="ml-7 w-60 rounded-full text-black" type="text" id="recruiter_name" name="recruiter_name" value={values.recruiter_name} onChange={handleChange} />
      </div>
      <div className='mb-2'>
        <label className="m-1 font-poppins" htmlFor="company_name">Company Name:</label>
        <input className="ml-7 w-60 rounded-full text-black" type="text" id="company_name" name="company_name" value={values.company_name} onChange={handleChange} />
      </div>
      <div className='mb-2'>
        <label className="m-1 font-poppins" htmlFor="submission_date">Submission date:</label>
        <input className="ml-7 w-60 rounded-full text-black" type="text" id="submission_date" name="submission_date" value={values.submission_date} onChange={handleChange} placeholder="in form of mm/dd/yyyy"/>
      </div>
      <div className='mb-2'>
        <label className="m-1 font-poppins" htmlFor="job_title">Job Title:</label>
        <input className="ml-7 w-60 rounded-full text-black" type="text" id="job_title" name="job_title" value={values.job_title} onChange={handleChange} />
      </div>
      <div className='mb-2'>
        <label className="m-1 font-poppins" htmlFor="job_posting">Job Posting:</label>
        <input className="ml-7 w-60 rounded-full text-black" type="text" id="job_posting" name="job_posting" value={values.job_posting} onChange={handleChange} 
        placeholder='Input the job posting link'/>
      </div>
      <div>
        <label className="font-poppins w-[100px] m-1" htmlFor="recruiter_email">Email:</label>
        <input className="ml-8 w-60 rounded-full text-black" type="email" id="recruiter_email" name="recruiter_email" value={values.recruiter_email} onChange={handleChange} />
      </div>
      <div>
        <label className="font-poppins w-[100px] m-1" htmlFor="Subject">Subject:</label>
        <input className="ml-4 w-60 rounded-full text-black" type="subject" id="subject" name="subject" value={values.subject} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
        <button className='hover:bg-stone-700' type="button" onClick={handleFillinTemplate}>Fill in Template</button>
        <label className="font-poppins" htmlFor="content">Mail Message</label>
        <MailMessage message = {mailMessage}/>
      </div>
      <input type="file" onChange={handleFileChange} />
      <button className='hover:bg-stone-700' type="submit" onSubmit={handleSubmit}>Submit</button>
    </form>
  );
}

export default SendEmail

