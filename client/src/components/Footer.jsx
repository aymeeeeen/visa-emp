import React from 'react';
import { FaGlobe } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <FaGlobe style={{ marginRight: '8px' }} />
        <span>Visa Explorer © 2025</span>
      </div>
      <div style={styles.links}>
        <a href="#" style={styles.link}>
          Privacy Policy
        </a>
        <a href="#" style={styles.link}>
          Terms of Service
        </a>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '40px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
};
