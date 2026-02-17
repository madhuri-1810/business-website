import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ============================================================
// DATA
// ============================================================
const SERVICES = [
  { id: 1, icon: '🎨', title: 'UI/UX Design', desc: 'Pixel-perfect interfaces designed with users at the center. From wireframes to polished mockups that convert.', tags: ['Figma', 'Prototyping', 'Research'] },
  { id: 2, icon: '⚛️', title: 'React Development', desc: 'High-performance React applications with modern hooks, state management, and blazing fast rendering.', tags: ['React 18', 'Next.js', 'TypeScript'] },
  { id: 3, icon: '📱', title: 'Responsive Design', desc: 'Mobile-first layouts that work beautifully on every device — phone, tablet, or widescreen monitor.', tags: ['CSS Grid', 'Flexbox', 'Mobile-first'] },
  { id: 4, icon: '⚡', title: 'Performance Optimization', desc: 'Lighthouse scores above 95. Code splitting, lazy loading, and caching strategies for instant load times.', tags: ['Core Web Vitals', 'PWA', 'CDN'] },
  { id: 5, icon: '♿', title: 'Web Accessibility', desc: 'WCAG 2.1 AA compliant sites. Semantic HTML, ARIA attributes, keyboard navigation, screen reader support.', tags: ['WCAG 2.1', 'ARIA', 'a11y'] },
  { id: 6, icon: '🔗', title: 'API Integration', desc: 'Seamless connection to REST APIs, GraphQL, third-party services, and real-time data via WebSockets.', tags: ['REST', 'GraphQL', 'WebSocket'] },
];

const PORTFOLIO = [
  { id: 1, emoji: '🛒', title: 'E-Commerce Platform', cat: 'web',    sub: 'Web App · React · Node.js',       span: true  },
  { id: 2, emoji: '🏃', title: 'Health Tracking App',  cat: 'mobile', sub: 'Mobile · React Native',           span: false },
  { id: 3, emoji: '✏️', title: 'Brand Identity System',cat: 'brand',  sub: 'Branding · Design System',        span: false },
  { id: 4, emoji: '📊', title: 'Finance Dashboard',    cat: 'web',    sub: 'Web App · Data Visualization',    span: false },
  { id: 5, emoji: '🌐', title: 'SaaS Landing Page',    cat: 'web',    sub: 'Web · Conversion Optimized',      span: false },
  { id: 6, emoji: '🍕', title: 'Food Delivery App',    cat: 'mobile', sub: 'Mobile · UX Research',            span: false },
];

const TEAM = [
  { emoji: '👩‍💻', name: 'Anika Sharma',   role: 'Lead Developer',   desc: 'React wizard. 8 years building scalable frontends that delight users.' },
  { emoji: '👨‍🎨', name: 'Carlos Mendez', role: 'UI/UX Director',    desc: 'Ex-Google designer. Passionate about accessible, beautiful interfaces.' },
  { emoji: '👩‍🚀', name: 'Yuki Tanaka',   role: 'Performance Lead',  desc: 'Obsessed with Core Web Vitals. Never satisfied with anything below 95.' },
  { emoji: '👨‍💼', name: 'David Obi',      role: 'Project Manager',   desc: 'Keeps every project on track. Your dedicated point of contact from day one.' },
];

const TESTIMONIALS = [
  { stars: 5, text: '"NexaCore transformed our online presence completely. The React app they built loads in under 1.5 seconds and our conversions doubled."', name: 'Sarah Chen',     role: 'CEO, TechStart Inc.',     emoji: '👩' },
  { stars: 5, text: '"Absolute professionals. The accessibility audit alone was worth the investment — our site is now truly usable by everyone."',           name: 'Marcus Williams',role: 'Product Director, AccessNow', emoji: '👨' },
  { stars: 5, text: '"The dark/light mode and responsive layouts are flawless. Every client who sees our new site is impressed."',                            name: 'Priya Sharma',   role: 'Marketing Lead, Vibe Co.',emoji: '👩' },
  { stars: 5, text: '"They delivered a 98 Lighthouse score on launch day. Our SEO rankings jumped significantly in the first month."',                       name: 'James Okafor',   role: 'Founder, GrowthLab',      emoji: '👨' },
  { stars: 5, text: '"From wireframe to deployment in 3 weeks. Communication was excellent and the code quality exceeded our expectations."',                 name: 'Emily Park',     role: 'CTO, DataStream',         emoji: '👩' },
];

// ============================================================
// SMALL REUSABLE COMPONENTS
// ============================================================

// Reveal on scroll wrapper
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// Section Header
function SectionHead({ tag, title, sub, center = false }) {
  return (
    <Reveal className={`section-head ${center ? 'text-center' : ''}`}>
      <div className="section-tag">{tag}</div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  );
}

// ============================================================
// NAV COMPONENT
// ============================================================
function Nav({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <a href="#home" className="skip-link">Skip to main content</a>
      <nav role="navigation" aria-label="Main navigation">
        <a href="#home" className="logo" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
          Nexa<span>Core</span>
        </a>
        <ul className="nav-links" role="list">
          {['home','services','portfolio','about','contact'].map(id => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button className="nav-cta" onClick={() => scrollTo('contact')}>Get Started</button>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle mobile menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu open" role="dialog" aria-label="Mobile navigation">
          {['home','services','portfolio','about','contact'].map(id => (
            <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
              {id === 'home' ? '🏠' : id === 'services' ? '🛠️' : id === 'portfolio' ? '🖼️' : id === 'about' ? '👥' : '📞'} {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="home" aria-label="Hero section">
      <div className="hero-blob" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-tag">
            <div className="tag-dot" aria-hidden="true" />
            Now Accepting New Clients
          </div>
          <h1 className="hero-title">
            We Build<br /><em>Digital</em><br />Experiences
          </h1>
          <p className="hero-sub">
            Premium web solutions that combine cutting-edge technology with
            thoughtful design — crafted for businesses that refuse to be ordinary.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('services')}>Explore Services</button>
            <button className="btn-secondary" onClick={() => scrollTo('portfolio')}>View Our Work</button>
          </div>
          <div className="hero-stats" role="list" aria-label="Company statistics">
            {[['12+','Years Active'],['340+','Projects Done'],['98%','Client Satisfaction']].map(([num, label]) => (
              <div className="stat-item" role="listitem" key={label}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card">
            <div className="card-header">
              <div className="card-avatar">🚀</div>
              <div className="card-info">
                <div className="card-name">Project Dashboard</div>
                <div className="card-role">Live performance metrics</div>
              </div>
              <div className="card-badge">LIVE</div>
            </div>
            <div className="card-metric-row">
              <div className="card-metric"><div className="metric-val">98</div><div className="metric-lab">Lighthouse Score</div></div>
              <div className="card-metric"><div className="metric-val">1.2s</div><div className="metric-lab">Load Time</div></div>
            </div>
            {[['Accessibility','WCAG AA','96%'],['Performance','95%','95%'],['Mobile Ready','100%','100%']].map(([label, badge, width]) => (
              <div key={label} style={{ marginTop: '0.8rem' }}>
                <div className="card-bar-label"><span>{label}</span><span>{badge}</span></div>
                <div className="card-bar"><div className="card-bar-fill" style={{ width }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVICES SECTION
// ============================================================
function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="container">
        <SectionHead tag="What We Offer" title="Services Built<br/>for Scale" sub="From concept to deployment, we deliver end-to-end digital solutions that perform." />
        <div className="services-grid" role="list">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.1} className="">
              <article className="service-card" role="listitem" tabIndex={0}>
                <div className="service-icon" aria-hidden="true">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-tags">
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PORTFOLIO SECTION
// ============================================================
function Portfolio() {
  const [active, setActive] = useState('all');
  const filters = ['all', 'web', 'mobile', 'brand'];
  const filtered = active === 'all' ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === active);

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <SectionHead tag="Our Work" title="Projects That<br/>Make an Impact" sub="A curated selection of our finest work across industries." />
        <div className="filter-bar" role="group" aria-label="Portfolio filter">
          {filters.map(f => (
            <button key={f} className={`filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="portfolio-grid" id="portfolioGrid" role="list">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07} className="">
              <div className={`portfolio-item ${p.span && active === 'all' ? 'span2' : ''}`}
                role="listitem" tabIndex={0} aria-label={`${p.title} project`}>
                <div className="portfolio-bg"><div className="portfolio-emoji">{p.emoji}</div></div>
                <div className="portfolio-overlay">
                  <div className="port-title">{p.title}</div>
                  <div className="port-cat">{p.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS SECTION
// ============================================================
function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="testimonials" aria-labelledby="testi-heading">
      <div className="container">
        <SectionHead tag="Client Love" title="What Our Clients Say" center />
      </div>
      <div className="testi-overflow" role="region" aria-label="Testimonials">
        <div className="testi-track">
          {doubled.map((t, i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars" aria-label={`${t.stars} stars`}>{'★'.repeat(t.stars)}</div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-author">
                <div className="testi-av" aria-hidden="true">{t.emoji}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <div className="about-visual">
              <div className="about-img-wrap" role="img" aria-label="NexaCore team">
                <span style={{ position: 'relative', zIndex: 1, fontSize: '5rem' }}>🏢</span>
              </div>
              <div className="about-badge" aria-label="12 years in business">
                <span>12+</span>Years of Excellence
              </div>
            </div>
          </Reveal>
          <div className="about-content">
            <Reveal>
              <div className="section-tag">Our Story</div>
              <h2 className="section-title" id="about-heading">
                We're Builders.<br />We're Designers.<br />
                We're <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>NexaCore.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="about-body">
                Founded in 2012, NexaCore started as a two-person studio obsessed with clean code and beautiful design.
                Today, we're a 25-strong team delivering world-class digital products to startups and Fortune 500 companies alike.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="about-body">
                We believe every pixel matters. Every millisecond counts. Every user deserves an experience
                that respects their time, ability, and intelligence.
              </p>
            </Reveal>
            <div className="about-features">
              {[
                ['🎯', 'Mission-Driven',     'We align technology with your business goals, not the other way around.'],
                ['🔬', 'Research-First',     'Every design decision is backed by user research and real data.'],
                ['🌍', 'Globally Accessible','We build for everyone — WCAG 2.1 AA is our baseline, not a bonus.'],
              ].map(([icon, title, desc], i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <div className="about-feat">
                    <div className="feat-icon" aria-hidden="true">{icon}</div>
                    <div className="feat-text">
                      <strong>{title}</strong>
                      <span>{desc}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div style={{ marginTop: '5rem' }}>
          <SectionHead tag="The People" title="Meet the Team" center />
          <div className="team-grid" role="list">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="team-card" role="listitem">
                  <div className="team-avatar" aria-hidden="true">{m.emoji}</div>
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                  <div className="team-desc">{m.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT SECTION
// ============================================================
function Contact() {
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', service: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())                        e.firstName = 'Please enter your first name.';
    if (!form.lastName.trim())                         e.lastName  = 'Please enter your last name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email  = 'Please enter a valid email.';
    if (form.message.trim().length < 10)               e.message   = 'Message must be at least 10 characters.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSuccess(true);
      setForm({ firstName: '', lastName: '', email: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  const update = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
          <SectionHead
            tag="Get in Touch"
            title={`Let's Build Something<br/><em style="color:var(--accent)">Amazing Together</em>`}
            sub="Ready to start your project? Send us a message and we'll get back within 24 hours."
            center
          />
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {[
              ['📧','Email Us',        'hello@nexacore.design'],
              ['📞','Call Us',         '+1 (555) 234-5678'],
              ['📍','Visit Us',        '42 Creative Hub, San Francisco, CA 94102'],
              ['🕒','Working Hours',   'Mon–Fri: 9AM–6PM PST'],
            ].map(([icon, label, val], i) => (
              <Reveal key={label} delay={i * 0.1}>
                <div className="contact-item">
                  <div className="contact-icon" aria-hidden="true">{icon}</div>
                  <div className="contact-detail">
                    <strong>{label}</strong>
                    <span>{val}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="contact-form" role="form" aria-label="Contact form">
              {success && (
                <div className="form-success" role="alert">
                  🎉 Message sent! We'll be in touch within 24 hours.
                </div>
              )}
              <div className="form-row">
                {[['firstName','First Name','John','given-name'],['lastName','Last Name','Doe','family-name']].map(([id,label,ph,auto]) => (
                  <div className="form-group" key={id}>
                    <label htmlFor={id}>{label} *</label>
                    <input type="text" id={id} placeholder={ph} autoComplete={auto}
                      value={form[id]} onChange={e => update(id, e.target.value)}
                      className={errors[id] ? 'error' : ''} aria-required="true"
                      aria-invalid={!!errors[id]} />
                    {errors[id] && <span className="error-msg" role="alert">{errors[id]}</span>}
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" placeholder="john@company.com" autoComplete="email"
                  value={form.email} onChange={e => update('email', e.target.value)}
                  className={errors.email ? 'error' : ''} aria-required="true"
                  aria-invalid={!!errors.email} />
                {errors.email && <span className="error-msg" role="alert">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interested In</label>
                <select id="service" value={form.service} onChange={e => update('service', e.target.value)}>
                  <option value="">Select a service...</option>
                  {['UI/UX Design','React Development','Responsive Design','Performance Optimization','Web Accessibility','API Integration'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea id="message" placeholder="Tell us about your project..."
                  value={form.message} onChange={e => update('message', e.target.value)}
                  className={errors.message ? 'error' : ''} aria-required="true"
                  aria-invalid={!!errors.message} />
                {errors.message && <span className="error-msg" role="alert">{errors.message}</span>}
              </div>
              <button className="btn-primary" type="button" onClick={handleSubmit}
                style={{ width: '100%', padding: '1rem' }}>
                Send Message →
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <footer role="contentinfo">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#home" className="logo" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
            Nexa<span>Core</span>
          </a>
          <p className="footer-desc">
            Building exceptional digital experiences since 2012. Premium React development,
            UI/UX design, and performance optimization.
          </p>
          <div className="footer-social" aria-label="Social media links">
            {[['𝕏','Twitter'],['in','LinkedIn'],['⌥','GitHub'],['🏀','Dribbble']].map(([icon, label]) => (
              <a key={label} className="social-btn" href="#home" aria-label={label}
                onClick={e => e.preventDefault()}>{icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Pages</h4>
          <ul>
            {['home','services','portfolio','about','contact'].map(id => (
              <li key={id}>
                <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {['UI/UX Design','React Dev','Responsive Design','Performance','Accessibility'].map(s => (
              <li key={s}><a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            {['Privacy Policy','Terms of Service','Cookie Policy','Accessibility'].map(l => (
              <li key={l}><a href="#home" onClick={e => e.preventDefault()}>{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 <span>NexaCore</span>. All rights reserved.</p>
        <p>Built with ❤️ using React, CSS Grid & JavaScript ES6+</p>
      </div>
    </footer>
  );
}

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================
function ScrollTopBtn() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <button id="scrollTop" className={show ? 'show' : ''}
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  return (
    <div id="app-root" className={theme}>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollTopBtn />
    </div>
  );
}