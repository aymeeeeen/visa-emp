import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const handleHover = (e, hover) => {
    e.target.style.backgroundColor = hover ? '#6366f1' : '#4f46e5';
    e.target.style.transform = hover ? 'scale(1.05)' : 'scale(1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={styles.container}
    >
      <h1 style={styles.title}>🌍 Discover Visa Requirements Worldwide</h1>
      <p style={styles.subtitle}>
        Quickly check visa requirements for any country and plan your next trip
        with confidence.
      </p>
      <Link
        to="/search"
        style={styles.button}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        Get Started
      </Link>
    </motion.div>
  );
}

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1e3a8a',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#4b5563',
    marginBottom: '30px',
    maxWidth: '600px',
  },
  button: {
    padding: '12px 30px',
    backgroundColor: '#4f46e5',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '12px',
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease',
  },
};
