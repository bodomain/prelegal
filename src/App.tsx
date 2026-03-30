import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="brand">Pelegal</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#solutions">Solutions</a>
            <a href="#contact" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Contact Us</a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-tag">The Future of Legal Tech</div>
            <h1 className="hero-title">
              Redefining Legal<br />
              <span style={{ color: 'var(--secondary)' }}>Through Technology</span>
            </h1>
            <p className="hero-subtitle">
              Pelegal brings innovative, intelligent software solutions to the legal industry, streamlining operations and maximizing efficiency for forward-looking law firms.
            </p>
            <div className="hero-cta">
              <a href="#start" className="btn btn-primary">Get Started</a>
              <a href="#demo" className="btn btn-secondary">Request Demo</a>
            </div>
          </div>
        </section>

        <section id="services" className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Our Solutions</h2>
              <p className="section-subtitle">
                We empower legal professionals with state-of-the-art tools designed for the modern practice.
              </p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">☁️</div>
                <h3 className="feature-title">Cloud Infrastructure</h3>
                <p className="feature-text">
                  Secure, compliant cloud solutions tailored for law firms, ensuring your data is protected and accessible anywhere.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Workflow Automation</h3>
                <p className="feature-text">
                  Automate repetitive tasks, document generation, and client intake to focus on what matters most — the law.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h3 className="feature-title">Advanced Security</h3>
                <p className="feature-text">
                  Enterprise-grade security protocols, end-to-end encryption, and comprehensive audit trails for peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Pelegal. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
