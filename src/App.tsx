import { useEffect, useRef, useState } from 'react'
import { education, experience, navigation, profile, projects, skills } from './data.ts'

type Theme = 'light' | 'dark'
type IconName = (typeof navigation)[number]['icon'] | 'sun' | 'moon' | 'arrow' | 'external' | 'download' | 'pin' | 'spark' | 'school' | 'university' | 'palette' | 'award' | 'dashboard' | 'lock'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9.5V21h14V9.5M9 21v-7h6v7" /></>,
    person: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    grid: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    external: <><path d="M14 3h7v7M10 14 21 3" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></>,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 17v3h16v-3" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    school: <><path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" /><path d="M6 11v5c3.8 3 8.2 3 12 0v-5M21.5 9v6" /></>,
    university: <><path d="m3 9 9-5 9 5M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M2 18h20" /></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.8 1.8 0 0 1 1.3-3.1H18a3 3 0 0 0 3-3c0-4.7-4-8.5-9-8.5Z" /><path d="M7.5 10h.01M11 7.5h.01M15 8h.01" strokeWidth="3" /></>,
    award: <><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1 7 4.5-2.5 4.5 2.5-1-7M10 9l1.3 1.3L14.5 7" /></>,
    dashboard: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10m6-10v5h6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></>,
  }

  return <svg {...shared}>{paths[name]}</svg>
}

function Portrait() {
  if (profile.portraitSrc) {
    return <img className="portrait-image" src={profile.portraitSrc} alt={`${profile.name} portrait placeholder`} />
  }

  return (
    <div className="portrait-monogram" aria-label={`${profile.name} monogram`}>
      <span>G</span><span>V</span>
      <i aria-hidden="true" />
    </div>
  )
}

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}

function ParticleField({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { x: -1000, y: -1000 }
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random(), y: Math.random(), size: 1.5 + Math.random() * 2.5,
      rotation: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.006,
      vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
    }))
    let frame = 0
    let startTimer = 0
    let active = false
    let width = 0
    let height = 0
    let pixelRatio = 1
    const color = theme === 'dark' ? '185, 164, 237' : '117, 85, 183'
    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }
    const draw = () => {
      context.clearRect(0, 0, width, height)
      for (const particle of particles) {
        let x = particle.x * width
        let y = particle.y * height
        const dx = x - pointer.x
        const dy = y - pointer.y
        const distance = Math.hypot(dx, dy)
        if (distance < 115 && distance > 0) {
          const push = (115 - distance) / 115
          x += (dx / distance) * push * 26
          y += (dy / distance) * push * 26
        }
        context.save()
        context.translate(x, y)
        context.rotate(particle.rotation)
        context.fillStyle = `rgba(${color}, ${theme === 'dark' ? 0.25 : 0.16})`
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        context.restore()
        if (!reducedMotion.matches) {
          particle.x += particle.vx / Math.max(width, 1)
          particle.y += particle.vy / Math.max(height, 1)
          particle.rotation += particle.spin
          if (particle.x < -0.03 || particle.x > 1.03) particle.vx *= -1
          if (particle.y < -0.03 || particle.y > 1.03) particle.vy *= -1
        }
      }
      if (active && !document.hidden) frame = window.requestAnimationFrame(draw)
    }
    const startAnimation = () => {
      if (active || reducedMotion.matches || document.hidden) return
      window.clearTimeout(startTimer)
      active = true
      frame = window.requestAnimationFrame(draw)
    }
    const scheduleAnimation = () => { startTimer = window.setTimeout(startAnimation, 5000) }
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      startAnimation()
    }
    const onPointerLeave = () => { pointer.x = -1000; pointer.y = -1000 }
    const onResize = () => { resize(); if (!active) draw() }
    const onVisibilityChange = () => {
      if (document.hidden) {
        active = false
        window.cancelAnimationFrame(frame)
      } else {
        startAnimation()
      }
    }
    resize()
    draw()
    if (document.readyState === 'complete') scheduleAnimation()
    else window.addEventListener('load', scheduleAnimation, { once: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('blur', onPointerLeave)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(startTimer)
      window.removeEventListener('load', scheduleAnimation)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('blur', onPointerLeave)
    }
  }, [theme])
  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('gv-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('gv-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#15131a' : '#f8f7fa')
  }, [theme])

  useEffect(() => {
    const initialId = window.location.hash.slice(1)
    if (!initialId) return
    const heading = document.getElementById(initialId)?.querySelector<HTMLElement>('h1, h2')
    if (!heading) return
    const frame = window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = 'auto'
      heading.scrollIntoView({ behavior: 'auto', block: 'start' })
      window.requestAnimationFrame(() => document.documentElement.style.removeProperty('scroll-behavior'))
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const targets = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActiveSection(visible.target.id)
          visible.target.classList.add('is-visible')
        }
      },
      { rootMargin: '-15% 0px -65% 0px', threshold: [0, 0.2, 0.5, 0.8] },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light')
  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const section = document.getElementById(id)
    const heading = section?.querySelector<HTMLElement>('h1, h2')
    if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
    setActiveSection(id)
  }

  return (
    <>
      <ParticleField theme={theme} />
      <div className="site-shell">
        <header className="topbar">
          <a className="brand" href="#home" aria-label="Gurgen Varzhapetyan, home">
            <span className="brand-mark">GV</span>
            <span className="brand-copy"><strong>Gurgen Varzhapetyan</strong><small>Software Engineer</small></span>
          </a>
          <div className="topbar-right">
            <span className="availability"><i /> Available for remote opportunities</span>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </header>

        <main>
          <section className="hero section-frame" id="home" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> Software Engineer · Gyumri, Armenia</p>
              <h1 id="hero-title">Building useful products<br /><em>from interface to infrastructure.</em></h1>
              <p className="hero-summary">I’m Gurgen, a full-stack engineer focused on production web applications, B2B SaaS platforms, and APIs.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#resume">Explore my experience <Icon name="arrow" size={16} /></a>
                <a className="button button-quiet" href={profile.cvPath} download><Icon name="download" size={16} /> Download CV</a>
              </div>
              <div className="hero-meta"><Icon name="pin" size={15} /><span>Gyumri, Armenia</span><span className="meta-divider" /><span>Open to international remote opportunities</span></div>
            </div>
            <aside className="hero-profile" aria-label="Profile overview">
              <div className="profile-card-top"><span className="card-label">PROFILE / 01</span><span className="profile-card-spark"><Icon name="spark" size={17} /></span></div>
              <Portrait />
              <h2>{profile.name}</h2>
              <p>{profile.role}</p>
              <div className="profile-card-rule" />
              <div className="profile-card-bottom"><span>TypeScript</span><span>React</span><span>AWS</span></div>
            </aside>
            <div className="hero-index" aria-hidden="true"><span>01</span><i /></div>
          </section>

          <section className="section-frame about-section" id="about" aria-labelledby="about-title">
            <SectionHeading eyebrow="A little about me" title="I care about the whole system." note="Frontend roots. Full-stack ownership. A product mindset." />
            <div className="about-grid">
              <div className="about-story">
                <p className="lead-copy">{profile.summary}</p>
                <p>{profile.detail}</p>
                <p>{profile.availability}</p>
              </div>
              <div className="about-aside">
                <div className="aside-number">04<span>+</span></div>
                <p>years building web products</p>
                <div className="aside-rule" />
                <p className="aside-stack">A stack spanning the browser, backend services, data stores, and cloud infrastructure.</p>
              </div>
            </div>
            <div className="skills-wrap">
              <div className="skills-heading"><span className="eyebrow">Core toolkit</span><span className="skill-count">{String(skills.length).padStart(2, '0')} technologies</span></div>
              <div className="skill-list">{skills.map((skill, index) => <span className="skill-chip" key={skill}><small>{String(index + 1).padStart(2, '0')}</small>{skill}</span>)}</div>
            </div>
          </section>

          <section className="section-frame resume-section" id="resume" aria-labelledby="resume-title">
            <SectionHeading eyebrow="The path so far" title="Experience & education" note="A steady move from frontend craft into end-to-end engineering." />
            <div className="resume-columns">
              <div>
                <div className="subsection-title"><span className="subsection-icon"><Icon name="briefcase" size={17} /></span><h3>Experience</h3></div>
                <div className="timeline">
                  {experience.map((job, index) => <article className="timeline-item" key={job.company}>
                    <div className="timeline-rail"><span className={index === 0 ? 'timeline-dot is-current' : 'timeline-dot'} /></div>
                    <div className="timeline-content">
                      <div className="timeline-meta"><span>{job.dates}</span>{index === 0 && <span className="current-tag">Current</span>}</div>
                      <h4>{job.role}</h4><p className="timeline-company">{job.company}<span> · {job.location}</span></p>
                      {job.highlights.length > 0 && <ul className="experience-list">{job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
                    </div>
                  </article>)}
                </div>
              </div>
              <div className="education-column">
                <div className="subsection-title"><span className="subsection-icon"><Icon name="spark" size={17} /></span><h3>Education</h3></div>
                <div className="education-list">
                  {education.map((item) => <article className="education-card" key={item.school}>
                    <span className="education-icon"><Icon name={item.icon} size={19} /></span>
                    <div><span className="education-date">{item.dates}</span><h4>{item.school}</h4><p>{item.degree}</p></div>
                  </article>)}
                </div>
                <div className="learning-note"><span className="learning-indicator" /><div><strong>Always learning</strong><p>Exploring tools and workflows that make software development more thoughtful and effective.</p></div></div>
              </div>
            </div>
          </section>

          <section className="section-frame projects-section" id="projects" aria-labelledby="projects-title">
            <SectionHeading eyebrow="Selected work" title="Products I’ve helped build." note="Selected work from Brain Fors and LifeBeget." />
            <div className="project-grid">
              {projects.map((project) => {
                const content = <>
                  <div className="project-top"><span className="project-icon"><Icon name={project.icon} size={20} /></span>{project.href && <Icon name="external" size={16} />}</div>
                  <div className="project-copy"><span className="project-type">{project.type}</span><h3>{project.name}</h3><p>{project.description}</p></div>
                  <div className="project-bottom"><span>{project.href ? 'Visit project' : 'Confidential contribution'}</span>{project.href && <Icon name="arrow" size={16} />}</div>
                </>
                return project.href
                  ? <a className="project-card project-link" href={project.href} target="_blank" rel="noreferrer" key={project.name}>{content}</a>
                  : <article className="project-card" key={project.name}>{content}</article>
              })}
            </div>
          </section>

          <section className="section-frame contact-section" id="contact" aria-labelledby="contact-title">
            <div className="contact-panel">
              <div className="contact-main">
                <p className="eyebrow"><span className="eyebrow-line" /> Let’s connect</p>
                <h2 id="contact-title">Have a good problem<br /><em>to solve together?</em></h2>
                <p className="contact-copy">I’m interested in international software engineering opportunities and teams building thoughtful products.</p>
                <a className="button button-primary" href={`mailto:${profile.email}`}>Start a conversation <Icon name="arrow" size={16} /></a>
              </div>
              <div className="contact-details">
                <a className="contact-row" href={`mailto:${profile.email}`}><span className="contact-icon"><Icon name="mail" size={17} /></span><span><small>Email</small><strong>{profile.email}</strong></span><Icon name="arrow" size={15} /></a>
                <a className="contact-row" href={`tel:${profile.phone}`}><span className="contact-icon"><Icon name="person" size={17} /></span><span><small>Phone</small><strong>{profile.phoneLabel}</strong></span><Icon name="arrow" size={15} /></a>
                <a className="contact-row" href={profile.linkedIn} target="_blank" rel="noreferrer"><span className="contact-icon linkedin-icon">in</span><span><small>LinkedIn</small><strong>Connect with me</strong></span><Icon name="external" size={15} /></a>
                <div className="contact-location"><Icon name="pin" size={16} />{profile.location}</div>
              </div>
            </div>
            <footer className="footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>Designed and built with care <i>✳</i></span><a href="#home">Back to top ↑</a></footer>
          </section>
        </main>
      </div>

      <nav className="bottom-nav" aria-label="Main navigation">
        {navigation.map((item) => <a key={item.id} className={activeSection === item.id ? 'nav-item active' : 'nav-item'} href={`#${item.id}`} onClick={(event) => navigateToSection(event, item.id)} aria-current={activeSection === item.id ? 'location' : undefined}>
          <Icon name={item.icon} size={17} /><span>{item.label}</span>
        </a>)}
      </nav>
    </>
  )
}

export default App
