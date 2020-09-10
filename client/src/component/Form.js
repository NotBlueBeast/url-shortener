import React, { useState } from 'react';
import './Form.css';

export default function Form() {
  const [Err, setErr] = useState(null);
  const [Slug, setSlug] = useState('');
  const [Url, setUrl] = useState('');
  const [Suc, setSuc] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://localhost:5000/add';
    const body = {
      slug: Slug,
      url: Url,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.status === 404) {
      setErr('Slug Already Exist');
      setTimeout(() => {
        setErr(null);
        setSlug('');
        setUrl('');
      }, 3000);
    } else {
      const json = await res.json();
      console.log(json);
    }
  }

  return (
    <div style={{ width: '700px' }}>
      <form onSubmit={handleSubmit}>
        <input
          style={{ padding: '25px', fontSize: '17px' }}
          required
          placeholder="Slug"
          className="u-half-width"
          type="text"
          value={Slug}
          onChange={(e) => {
            setSlug(e.target.value);
          }}></input>
        <input
          style={{ padding: '25px', fontSize: '17px' }}
          required
          placeholder="URL"
          className="u-full-width"
          type="text"
          value={Url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}></input>
        <button
          style={{ fontSize: '13px', color: 'white' }}
          type="submit"
          className="u-full-width">
          Create
        </button>
      </form>
      {Err ? (
        <div
          style={{
            background: 'red',
            color: 'white',
            fontSize: '17px',
            padding: '10px',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}>
          {Err}
        </div>
      ) : null}
    </div>
  );
}
