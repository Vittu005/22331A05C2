import { useState } from 'react';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`);
      if (response.ok) {
        const data = await response.text();
        setShortenedUrl(data);
      } else {
        setError('Failed to shorten URL');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button onClick={handleShorten}>Shorten</button>
      </div>
      {error && <p className="error">{error}</p>}
      {shortenedUrl && (
        <div className="result-container">
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;