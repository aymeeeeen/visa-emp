import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';

export default function Navbar() {
  const handleHover = (e, hover) => {
    e.currentTarget.style.color = hover ? '#a5b4fc' : 'white';
    e.currentTarget.style.transform = hover ? 'scale(1.05)' : 'scale(1)';
    e.currentTarget.style.transition = 'all 0.3s ease';
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <FaGlobe style={{ marginRight: '8px' }} />
        Visa Explorer
      </Link>
      <div style={styles.links}>
        <Link
          to="/"
          style={styles.link}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          Home
        </Link>
        <Link
          to="/search"
          style={styles.link}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          Search
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#4f46e5',
    color: 'white',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
};
