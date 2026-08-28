import emailjs from '@emailjs/browser'
import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Send,
  Server,
  Sparkles,
  X,
} from 'lucide-react'
import { profile, skills, experience, education } from './data/portfolio'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function App() {
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoadingProjects(false))
  }, [])

  const submitContact = async (e) => {
  e.preventDefault()
  setStatus('sending')

  try {
    await emailjs.send(
      'service_et325d9',
      'template_66yi9eq',
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      'WgooWi7TEexK1oul2'
    )

    setForm({ name: '', email: '', message: '' })
    setStatus('success')
  } catch (error) {
    console.error('EmailJS Error:', error)
    setStatus('error')
  }
}

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-mark">M</span>
          <span>{profile.name}</span>
        </a>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
              {item}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's Talk</a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse"></span> Available for opportunities</div>
            <h1>Building ideas into <span>real products.</span></h1>
            <p className="hero-text">{profile.tagline}</p>
            <div className="hero-actions">
              <a href="#projects" className="button primary">View My Work <ArrowUpRight size={18} /></a>
              <a href={profile.resumeUrl} className="button secondary"><Download size={18} /> Resume</a>
            </div>
            <div className="socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19} /></a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orb orb-one"></div>
            <div className="orb orb-two"></div>
            <div className="code-card">
              <div className="code-top"><span></span><span></span><span></span></div>
              <pre>{`const developer = {
  name: "${profile.name}",
  focus: ["Web", "Data", "AI"],
  mindset: "Keep learning"
};

developer.build();`}</pre>
            </div>
            <div className="floating-card">
              <Sparkles size={18} />
              <div><strong>Problem Solver</strong><small>Always learning</small></div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div><p className="label">About me</p><h2>Curious by nature.<br />Builder by choice.</h2></div>
          </div>
          <div className="about-grid">
            <p className="large-copy">{profile.about}</p>
            <div className="stats">
              <div><strong>7+</strong><span>Core Skills</span></div>
              <div><strong>∞</strong><span>Ideas to Build</span></div>
              <div><strong>100%</strong><span>Learning Mindset</span></div>
            </div>
          </div>
        </section>

        <section className="section dark-section" id="skills">
          <div className="section-heading light">
            <span className="section-number">02</span>
            <div><p className="label">My toolkit</p><h2>Technologies I work with.</h2></div>
          </div>
          <div className="skills-layout">
            <div className="skill-intro">
              <Code2 size={34} />
              <p>I choose tools based on the problem, while focusing on maintainable code and a smooth user experience.</p>
            </div>
            <div className="skill-list">
              {skills.map((skill, i) => <span key={skill}><b>{String(i + 1).padStart(2, '0')}</b>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <span className="section-number">03</span>
            <div><p className="label">Selected work</p><h2>Projects that turn<br />ideas into outcomes.</h2></div>
          </div>

          {loadingProjects ? (
            <div className="project-loading">Loading projects from MySQL...</div>
          ) : projects.length === 0 ? (
            <div className="empty-projects">No projects found. Add projects to MySQL using the API.</div>
          ) : (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className={`project-card ${index === 0 ? 'featured' : ''}`} key={project._id}>
                  <div className="project-image">
                    <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
                    <div className="project-icon"><Code2 size={34} /></div>
                  </div>
                  <div className="project-content">
                    <div className="project-tags">{(project.technologies || []).map(t => <span key={t}>{t}</span>)}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.link && project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-link">View project <ArrowUpRight size={16} /></a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section timeline-section" id="experience">
          <div className="section-heading">
            <span className="section-number">04</span>
            <div><p className="label">Journey</p><h2>Experience & education.</h2></div>
          </div>
          <div className="timeline">
            {experience.map(item => (
              <div className="timeline-item" key={item.title}>
                <span className="timeline-dot"></span>
                <span className="timeline-period">{item.period}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </div>
            ))}
            {education.map(item => (
              <div className="timeline-item" key={item.title}>
                <span className="timeline-dot"></span>
                <span className="timeline-period">{item.period}</span>
                <div><h3><GraduationCap size={18} /> {item.title}</h3><p>{item.description}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="label">05 — Get in touch</p>
              <h2>Have an idea?<br /><span>Let's build it.</span></h2>
              <p>I'm open to internships, entry-level opportunities, collaborations and interesting projects.</p>
              <a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={18} /></a>
            </div>
            <form onSubmit={submitContact} className="contact-form">
              <label>Name<input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" /></label>
              <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" /></label>
              <label>Message<textarea required rows="4" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell me about your idea..." /></label>
              <button className="button primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={17} /></button>
              {status === 'success' && <p className="form-success">Message saved successfully. Thank you!</p>}
              {status === 'error' && <p className="form-error">Could not send the message. Please try again.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed & built with React</span>
      </footer>
    </div>
  )
}

export default App
