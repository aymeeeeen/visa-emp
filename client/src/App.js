import React, { useState } from 'react';

const countries = [
  'Algeria',
  'France',
  'Canada',
  'Turkey',
  'UAE',
  'Morocco',
  'Spain',
  'Germany',
  'United Kingdom',
  'United States',
];

function App() {
  const [passport, setPassport] = useState('Algeria');
  const [destination, setDestination] = useState('France');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // Demo result for now. We'll hook this to the backend API soon.
    setResult(
      `${passport} → ${destination}: (demo) Visa status will appear here.`
    );
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '40px auto',
        padding: '0 16px',
        fontFamily: 'system-ui, Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Visa Explorer (Demo)</h1>
      <p style={{ marginTop: 0, color: '#555' }}>
        Select your passport and destination to check visa requirements.
      </p>

      <form
        onSubmit={handleSearch}
        style={{
          background: '#fff',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}
      >
        <label style={{ display: 'block', marginTop: 8, fontWeight: 600 }}>
          Passport nationality
        </label>
        <select
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #ddd',
          }}
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label style={{ display: 'block', marginTop: 16, fontWeight: 600 }}>
          Destination country
        </label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #ddd',
          }}
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            marginTop: 16,
            padding: '10px 16px',
            borderRadius: 10,
            border: '1px solid #0d6efd',
            background: '#0d6efd',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Check
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: 16,
            background: '#f6f8ff',
            padding: 12,
            borderRadius: 10,
            border: '1px solid #dbe1ff',
          }}
        >
          {result}
        </div>
      )}

      <footer style={{ marginTop: 32, fontSize: 12, color: '#777' }}>
        Demo UI — backend API coming next.
      </footer>
    </div>
  );
}

export default App;
