import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CountryDetail() {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [visaInfo, setVisaInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('work');
  const [nationality, setNationality] = useState('Algeria'); // default nationality

  // Fetch visa info from backend for specific country + nationality
  const fetchVisaInfo = async (country, nationality) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/visa-requirements/${country}/${nationality}`
      );
      setVisaInfo(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch visa information');
      setVisaInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever countryName or nationality changes
  useEffect(() => {
    if (countryName) fetchVisaInfo(countryName, nationality);
  }, [countryName, nationality]);

  if (loading)
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
  if (error)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        {error}
      </p>
    );
  if (!visaInfo)
    return <p style={{ textAlign: 'center' }}>No data available</p>;

  // Render visa details dynamically
  const renderVisaDetails = (type) => {
    if (!visaInfo.visas[type]) return <p>No information available</p>;
    const visa = visaInfo.visas[type];

    return (
      <div style={{ lineHeight: '1.6' }}>
        {visa.description && (
          <p>
            <strong>Description:</strong> {visa.description}
          </p>
        )}

        {visa.documents && visa.documents.length > 0 && (
          <div>
            <strong>Documents required:</strong>
            <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
              {visa.documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {visa.processingTime && (
          <p>
            <strong>Processing time:</strong> {visa.processingTime}
          </p>
        )}

        {visa.cost && (
          <p>
            <strong>Cost of visa:</strong> {visa.cost}
          </p>
        )}

        {visa.financialRequirement && (
          <p>
            <strong>Financial requirements:</strong> {visa.financialRequirement}
          </p>
        )}

        {visa.notes && (
          <p>
            <strong>Additional information:</strong> {visa.notes}
          </p>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={() => navigate('/search')}
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#4f46e5',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        ← Back to Search
      </button>

      <h1>
        {visaInfo.flag} {visaInfo.country}
      </h1>

      {/* Nationality selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Select your nationality:
        </label>
        <select
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          style={{
            padding: '5px 10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        >
          {['Algeria', 'Tunisia', 'Morocco', 'France'].map((nat) => (
            <option key={nat} value={nat}>
              {nat}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['work', 'student', 'visitor', 'sources'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === tab ? '#4f46e5' : '#ddd',
              color: activeTab === tab ? '#fff' : '#000',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        style={{
          background: '#f4f4f9',
          padding: '20px',
          borderRadius: '12px',
          minHeight: '150px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab !== 'sources' ? (
          renderVisaDetails(activeTab)
        ) : visaInfo.sources && visaInfo.sources.length > 0 ? (
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            {visaInfo.sources.map((link, idx) => (
              <li key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sources available</p>
        )}
      </motion.div>
    </div>
  );
}
