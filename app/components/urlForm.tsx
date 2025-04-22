'use client';

import { useState } from 'react';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setCopied(false);

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        body: JSON.stringify({ url, alias }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data.shortUrl) {
        setMessage(data.shortUrl);
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      if (err instanceof Error){
        setMessage(err.message);
      } else{
        setMessage('Unexpected error.');
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Custom alias (e.g., mylink)"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        required
      />
      <button type="submit">Shorten</button>

      {message && (
        <div className="link-container">
          <a href={message} className="short-url" target="_blank">{message}</a>
          <button type="button" className="copy-btn" onClick={copyToClipboard}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </form>
  );
}
