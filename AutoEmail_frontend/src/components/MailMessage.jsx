import React, { useState, useEffect} from 'react';



function MailMessage(props) {
  
  const [style, setStyle] = useState({});
  const [textareaValue, setTextareaValue] = useState(props.message);
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    setStyle({ height: "auto", overflow: "hidden" });
    setStyle({ height: event.target.scrollHeight + "px" });
  };

  useEffect(() => {

    const textarea = document.getElementById('autoresize-textarea');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setTextareaValue(props.message)
  }, [props.message]);

  return (
    <div>
      <textarea className="w-full border border-gray-400 text-black bg-stone-200 resize-none h-auto outline-none" id="autoresize-textarea" value={textareaValue} onChange={handleTextareaChange} style={style}/>
    </div>
  );
}

export default MailMessage