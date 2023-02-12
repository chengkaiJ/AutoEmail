import React, { useState } from 'react';

function SendEmail() {

  const [textareaValue, setTextareaValue] = useState('');
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: 'About Application'
  });

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

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("to", values.email)
    formData.append("name", values.name)
    formData.append("mailMessage", textareaValue)
    formData.append("subject", values.subject)
    if(!!file) {
      formData.append("file", file);
    }

    fetch('http://localhost:8080/send', {
      method: 'POST',
      body: formData,
      headers: {
        'Origin':'http://localhost:5173'
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
        <label className="m-1 font-poppins" htmlFor="name">Name:</label>
        <input className="ml-7 w-40 rounded-full text-black" type="text" id="name" name="name" value={values.name} onChange={handleChange} />
      </div>
      <div>
        <label className="font-poppins w-[100px] m-1" htmlFor="email">Email:</label>
        <input className="ml-8 w-60 rounded-full text-black" type="email" id="email" name="email" value={values.email} onChange={handleChange} />
      </div>
      <div>
        <label className="font-poppins w-[100px] m-1" htmlFor="Subject">Subject:</label>
        <input className="ml-4 w-60 rounded-full text-black" type="subject" id="subject" name="subject" value={values.subject} onChange={handleChange} />
      </div>
      <div>
      <label className="font-poppins" htmlFor="content">Mail Message</label>
        <textarea className="w-full border border-gray-400 text-black bg-stone-200" id="content" value={textareaValue} onChange={handleTextareaChange}/>
      </div>
      <input type="file" onChange={handleFileChange} />
      <button className='hover:bg-stone-700' type="submit" onSubmit={handleSubmit}>Submit</button>
    </form>
  );
}

// function TextEditor({ className, handleChange, ...props }) {
  
//   const [style, setStyle] = useState({});

//   const handleInput = event => {
//     setStyle({ height: "auto", overflow: "hidden" });
//     setStyle({ height: event.target.scrollHeight + "px" });
//   };

//   return (
//     <div className="">
//         <textarea
//         className={`resize-none h-auto outline-none ${className}`}
//         onInput={handleInput}
//         style={style}
//         onChange={handleChange}
//         {...props}
//         />
//     </div>
//   );
// }


export default SendEmail

