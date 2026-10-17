import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function OrbitScene() {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = host.current
    if (!el) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.z = 8.5
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)
    const group = new THREE.Group()
    scene.add(group)
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.12, 3), new THREE.MeshStandardMaterial({ color: 0xff7149, roughness: 0.24, metalness: 0.38, emissive: 0x42170f, emissiveIntensity: 0.55, flatShading: true }))
    group.add(core)
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 2), new THREE.MeshBasicMaterial({ color: 0xffc0a5, wireframe: true, transparent: true, opacity: 0.3 }))
    group.add(wire)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffaa88, transparent: true, opacity: 0.58, side: THREE.DoubleSide })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.012, 8, 160), ringMat)
    ring.rotation.set(0.9, 0.15, -0.35)
    group.add(ring)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.006, 6, 160), new THREE.MeshBasicMaterial({ color: 0x778e76, transparent: true, opacity: 0.65 }))
    ring2.rotation.set(1.4, -0.6, 0.45)
    group.add(ring2)
    scene.add(new THREE.HemisphereLight(0xc5d1c4, 0x281b18, 2.2))
    const light = new THREE.PointLight(0xff8d65, 18, 18)
    light.position.set(3, 3, 4)
    scene.add(light)
    const starsGeo = new THREE.BufferGeometry()
    const points = new Float32Array(210 * 3)
    for (let i = 0; i < points.length; i += 3) { points[i] = (Math.random() - 0.5) * 9; points[i + 1] = (Math.random() - 0.5) * 8; points[i + 2] = (Math.random() - 0.5) * 3 }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(points, 3))
    const stars = new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xc8d0be, size: 0.015, transparent: true, opacity: 0.75 }))
    scene.add(stars)
    const pointer = new THREE.Vector2()
    const onMove = (e: PointerEvent) => { const r = el.getBoundingClientRect(); pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2; pointer.y = -((e.clientY - r.top) / r.height - 0.5) * 2 }
    el.addEventListener('pointermove', onMove)
    const resize = () => { if (!el.clientWidth) return; camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight) }
    const observer = new ResizeObserver(resize); observer.observe(el)
    let frame = 0
    const animate = () => { frame = requestAnimationFrame(animate); group.rotation.y += 0.0022; group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.15, 0.025); group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, pointer.x * 0.08, 0.025); core.rotation.y -= 0.003; stars.rotation.y -= 0.00012; renderer.render(scene, camera) }
    animate()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); el.removeEventListener('pointermove', onMove); renderer.dispose(); scene.traverse(o => { if (o instanceof THREE.Mesh || o instanceof THREE.Points) { o.geometry.dispose(); const m = o.material; if (Array.isArray(m)) m.forEach(x => x.dispose()); else m.dispose() } }); renderer.domElement.remove() }
  }, [])
  return <div className="scene-wrap" aria-label="Interactive 3D abstract orange core surrounded by orbital rings" role="img"><div className="scene" ref={host} /><div className="scene-label mono"><span className="live-dot"/> INTERACTIVE FIELD <span>01 / 03</span></div></div>
}

const projects = [
  { number: '01', name: 'Smart Reminder Bag', type: 'CONNECTED OBJECT · IOT', description: 'A everyday carry companion that remembers what matters. Thoughtful hardware meets a calm, useful software experience.', tags: ['IoT', 'Embedded systems', 'Product thinking'], color: 'project-orange', mark: '↗', visual: 'bag' },
  { number: '02', name: 'SRM Fire Protection', type: 'SAFETY · DIGITAL EXPERIENCE', description: 'A clearer way to navigate fire protection and safety services, built around trust, clarity, and getting the right help quickly.', tags: ['Web design', 'Accessibility', 'Service UX'], color: 'project-sage', mark: '⌁', visual: 'safety' },
]
const skills = ['React', 'TypeScript', 'JavaScript', 'Three.js', 'Node.js', 'Python', 'UI engineering', 'Creative coding', 'Product thinking', 'Prototyping', 'Git', 'CSS']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out', delay: 0.15 })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } }))
    })
    return () => ctx.revert()
  }, [])
  const closeMenu = () => setMenuOpen(false)
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar"><a href="#top" className="wordmark" aria-label="DRaX home"><span className="wordmark-icon">D<span>✳</span></span><span className="wordmark-name">DRaX<span className="wordmark-dot">.</span></span></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'CLOSE' : 'MENU'} <span>{menuOpen ? '×' : '+'}</span></button>
      <nav id="primary-nav" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{[['About','#about'],['Work','#work'],['Journey','#journey'],['Contact','#contact']].map(([label,href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}<a className="nav-cta" href="mailto:tejavepati@gmail.com">Let’s talk <span>↗</span></a></nav>
    </header>
    <main id="main">
      <section className="hero section-shell" id="top" aria-labelledby="hero-title"><div className="hero-copy"><div className="eyebrow mono"><span className="live-dot"/> DEVELOPER · BUILDER · CURIOUS MIND</div><h1 id="hero-title">Ideas into<br/><span className="accent">something</span><br/>real<span className="hero-period">.</span></h1><p className="hero-intro">I’m Teja Vepati — I build thoughtful digital experiences where technology meets the everyday.</p><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span>↓</span></a><a className="text-link" href="#about">A little about me <span>↗</span></a></div><div className="hero-meta mono"><span>BASED IN INDIA</span><span>OPEN TO WHAT’S NEXT <i className="status-dot"/></span></div></div><OrbitScene/><div className="hero-index mono">PORTFOLIO / 2025—26</div></section>
      <div className="ticker" aria-label="Design, build, learn, repeat"><div className="ticker-track">{Array.from({length: 2}, (_,i) => <span key={i}>DESIGN <b>✳</b> BUILD <b>✳</b> LEARN <b>✳</b> REPEAT <b>✳</b> MAKE IT MATTER <b>✳</b> </span>)}</div></div>
      <section id="about" className="section about section-shell"><div className="section-kicker mono reveal"><span>01</span> / THE PERSON</div><div className="about-grid"><h2 className="section-title reveal">Curiosity is<br/>my <span className="accent">compass.</span></h2><div className="about-body reveal"><p className="lead">I’m a developer who loves connecting the dots between an interesting problem and a useful thing someone can actually use.</p><p>From connected objects to digital experiences, I enjoy moving across the whole process: asking better questions, shaping a direction, and building the details that make something feel right.</p><p>My approach is equal parts systems thinking and hands-on experimentation. The best work, to me, is clear, considered, and a little unexpected.</p><a className="inline-link" href="#journey">More about my journey <span>↘</span></a></div></div></section>
      <section id="work" className="section work-section"><div className="section-shell"><div className="section-kicker mono reveal"><span>02</span> / SELECTED WORK <span className="kicker-side">A FEW THINGS I’VE MADE</span></div><div className="work-heading reveal"><h2 className="section-title">Built with<br/><span className="accent">intention.</span></h2><span className="mono work-count">( 02 PROJECTS )</span></div><div className="project-list">{projects.map(project => <article className="project-card reveal" key={project.number}><div className={`project-art ${project.color}`} aria-hidden="true"><div className={`art-shape ${project.visual}`}><span>{project.mark}</span></div><div className="art-coordinate mono">T.V / {project.number}</div><div className="art-lines"/></div><div className="project-info"><div className="mono project-type"><span>{project.number}</span> {project.type}</div><h3>{project.name}</h3><p>{project.description}</p><ul className="tag-list">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a href="#contact" className="project-link" aria-label={`Discuss ${project.name}`}>Let’s talk about it <span>↗</span></a></div></article>)}</div></div></section>
      <section id="skills" className="section skills-section section-shell"><div className="section-kicker mono reveal"><span>03</span> / THE TOOLKIT</div><div className="skills-grid"><div className="reveal"><h2 className="section-title">Tools are<br/><span className="accent">a starting point.</span></h2><p className="skills-copy">I reach for the right tool for the job, and stay curious enough to keep finding better ones.</p></div><div className="skill-cloud reveal">{skills.map((s,i)=><span key={s} className={i<3 ? 'skill-pill skill-strong' : 'skill-pill'}>{s}<sup>{String(i+1).padStart(2,'0')}</sup></span>)}</div></div></section>
      <section id="journey" className="section journey-section"><div className="section-shell"><div className="section-kicker mono reveal"><span>04</span> / THE JOURNEY</div><div className="journey-grid"><h2 className="section-title reveal">Always<br/><span className="accent">in progress.</span></h2><div className="timeline reveal"><div className="timeline-item"><span className="timeline-mark">01</span><div><div className="mono timeline-date">THE FOUNDATION</div><h3>Learning by making</h3><p>Every new project is a chance to stretch my understanding — from the first sketch through the last edge case.</p></div></div><div className="timeline-item"><span className="timeline-mark">02</span><div><div className="mono timeline-date">THE PRACTICE</div><h3>Ideas meet real needs</h3><p>Building for everyday contexts taught me to value reliability, accessibility, and the small details people notice.</p></div></div><div className="timeline-item"><span className="timeline-mark">03</span><div><div className="mono timeline-date">RIGHT NOW</div><h3>Exploring what’s possible</h3><p>Combining software, interaction, and physical computing to make experiences feel more human.</p></div></div></div></div></div></section>
      <section className="explore-section section-shell"><div className="explore-panel reveal"><div><div className="mono explore-label">CURRENTLY EXPLORING / 2025—26</div><h2>Curiosity, meet<br/><span className="accent">capability.</span></h2></div><div className="explore-list"><div><span>01</span><p>Spatial interfaces & WebGL</p><i>↗</i></div><div><span>02</span><p>Intelligent everyday objects</p><i>↗</i></div><div><span>03</span><p>Design systems that scale</p><i>↗</i></div><div><span>04</span><p>Making the web feel alive</p><i>↗</i></div></div><div className="explore-stamp" aria-hidden="true">STAY<br/>CURIOUS<span>✳</span></div></div></section>
      <section id="contact" className="section contact-section section-shell"><div className="section-kicker mono reveal"><span>05</span> / YOUR MOVE</div><div className="contact-main reveal"><div className="mono contact-note"><span className="live-dot"/> OPEN TO GOOD CONVERSATIONS</div><h2>Let’s make<br/>a little <span className="accent">noise.</span></h2><p>Have a thoughtful problem, an interesting collaboration, or just want to say hello? My inbox is open.</p><a className="button button-light" href="mailto:tejavepati@gmail.com">Start a conversation <span>↗</span></a></div><div className="contact-footer mono"><a href="mailto:tejavepati@gmail.com">TEJAVEPATI@GMAIL.COM</a><span>TEJA VEPATI · DRAX</span><a href="#top">BACK TO TOP ↑</a></div></section>
    </main>
    <footer className="site-footer section-shell"><span>© 2025—26 TEJA VEPATI</span><span>MADE WITH CURIOSITY <b>✳</b></span><span>DESIGNED & BUILT BY DRaX</span></footer>
  </>
}

export default App






