import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // <-- for navigation

export default function Search() {
  const [visaData, setVisaData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/visa-requirements')
      .then((res) => {
        setVisaData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  const filteredData = visaData.filter((item) =>
    item.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (country) => {
    // Navigate to detail page with country name as param
    navigate(`/country/${country}`);
  };

  if (loading) {
    return (
      <motion.div
        style={styles.spinnerContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          style={styles.spinner}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
        <p>Loading visa data...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.p
        style={{ ...styles.message, color: 'red' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.p>
    );
  }

  return (
    <div style={styles.container}>
      {/* Search box */}
      <motion.div
        style={styles.searchBox}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <FaSearch style={{ marginRight: '10px', color: '#555' }} />
        <input
          type="text"
          placeholder="Search a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </motion.div>

      {/* No results */}
      {filteredData.length === 0 ? (
        <p style={styles.noResults}>No countries found</p>
      ) : (
        <div style={styles.cardGrid}>
          {filteredData.map((item, index) => (
            <motion.div
              key={index}
              style={styles.card}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                backgroundColor: '#eff6ff',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCardClick(item.country)} // <-- card is clickable
            >
              <h2 style={styles.country}>
                {item.flag || '🏳️'} {item.country}
              </h2>
              <p style={styles.requirement}>{item.requirement}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '80vh',
    background: 'linear-gradient(to bottom right, #f4f4f9, #e0e7ff)',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '0 auto 30px',
    padding: '10px 15px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  country: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  requirement: {
    color: '#555',
  },
  message: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
  },
  noResults: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    color: '#1e3a8a',
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    fontFamily: 'Arial, sans-serif',
    color: '#4f46e5',
  },
  spinner: {
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #4f46e5',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    marginBottom: '10px',
  },
};
