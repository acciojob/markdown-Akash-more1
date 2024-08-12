import React, { useEffect, useState } from 'react';
import '../styles/App.css';

function App() {
  const [markdown, setMarkdown] = useState('# Hello, Markdown');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const parseMarkdown = (text) => {
    let html = text;

    // Headers
    html = html.replace(/###### (.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/##### (.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>');

    // Italic
    html = html.replace(/\*(.*)\*/gim, '<i>$1</i>');

    // Line breaks
    html = html.replace(/\n/gim, '<br>');

    return html.trim();
  };

  return (
    <div className='app'>
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <>
          <textarea
            className='textarea'
            value={markdown}
            onChange={handleChange}
          />
          <div
            className='preview'
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          ></div>
        </>
      )}
    </div>
  );
}

export default App;
