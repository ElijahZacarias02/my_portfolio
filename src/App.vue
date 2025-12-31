<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Typed from 'typed.js'
import avatarImage from './assets/User-Avatar-Profile-Clip-Art-Transparent-PNG.png'

const projects = [
  {
    title: 'EXODiA PRO',
    description:
      'EXODiA PRO is all about helping aspiring idols shine. Our passionate experts nurture talent, provide hands-on guidance, and craft an immersive journey that pushes boundaries and unlocks true potential.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Ajax', 'CodeIgniter 3', 'MySQL'],
    link: '#',
  },
  {
    title: 'Design System',
    description: 'Token-driven component library with accessible primitives.',
    tags: ['Design Tokens', 'Storybook', 'TypeScript'],
    link: '#',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time insights dashboard with charts, filters, and theming.',
    tags: ['Data Viz', 'State Management', 'API Integration'],
    link: '#',
  },
]

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const skills = {
  Frontend: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'Bootstrap 3, 4, & 5',
    'Tailwind',
    'Vue 3',
    'jQuery',
    'Ajax',
  ],
  Backend: ['PHP', 'CodeIgniter 2, 3, & 4', 'MySQL'],
  Tools: ['Git', 'GitHub', 'VSCode', 'Postman', 'SVN'],
}

const getSkillIcon = (category) => {
  const icons = {
    Frontend: '💻',
    Backend: '⚙️',
    Tools: '🛠️',
  }
  return icons[category] || '📦'
}

const experience = [
  {
    role: 'Web Developer',
    company: 'Prople BPO, Inc.',
    period: '2023 — Present',
    summaries: [
      'Optimized database queries and reporting logic, resulting in faster load times and more reliable payroll data.',
      'Supported business continuity by maintaining and upgrading legacy systems while implementing modern UI improvements.',
      'Automated payroll and HR reporting significantly reduce manual Excel preparation time and minimize human error.',
    ],
  },
  {
    role: 'Full Stack Web Developer',
    company: 'LUCKY 8 STAR QUEST INC.',
    period: '2019 — 2023',
    summaries: [
      'Automated all the manual processes of the company.',
      'Developed and managed well-functioning databases and applications.',
      'Ensure cross-platform optimization for mobile phones.',
    ],
  },
  {
    role: 'Front End Web Developer',
    company: 'Freelance',
    period: '2018 — Present',
    summaries: [
      'Worked alongside UI/UX to create an informative website.',
      'Ensuring cross-platform optimization for mobile phones.',
      'Meeting both technical and consumer needs.',
    ],
  },
]

const activeSection = ref('hero')
const theme = ref('light')
let observer
let typedInstance = null
const typedElement = ref(null)

const applyTheme = (value) => {
  document.documentElement.setAttribute('data-theme', value)
  localStorage.setItem('theme', value)
}

const handleNavClick = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  applyTheme(theme.value)
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    theme.value = stored
  } else {
    theme.value = 'light'
  }
  applyTheme(theme.value)

  const sections = document.querySelectorAll('section[id]')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      root: null,
      threshold: 0.35,
      rootMargin: '-10% 0px -45% 0px',
    },
  )

  sections.forEach((section) => observer.observe(section))

  // Initialize Typed.js
  nextTick(() => {
    if (typedElement.value) {
      typedInstance = new Typed(typedElement.value, {
        strings: ['Frontend Development', 'Backend Development'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true,
      })
    }
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (typedInstance) typedInstance.destroy()
})
</script>

<template>
  <div class="page">
    <header class="topbar">
      <div class="brand">Elijah Zacarias</div>
      <nav class="nav">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          :class="[{ active: activeSection === link.id }]"
          @click.prevent="handleNavClick(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>
      <button class="toggle" type="button" @click="toggleTheme">
        <span class="toggle_icon" aria-hidden="true">{{ theme === 'light' ? '☀︎' : '☾' }}</span>
      </button>
    </header>

    <main class="content">
      <section class="hero" id="hero">
        <div class="hero_copy">
          <div class="hero_greeting">
            <span class="wave-emoji">👋</span>
            <span class="greeting-text">Hello There!</span>
          </div>
          <h1>I'm <span class="grad">Elijah Zacarias</span></h1>
          <p class="hero_into">I am into <span ref="typedElement" class="typed-text"></span></p>
          <p class="lede">
            I develop intuitive, user-friendly web applications tailored to client requirements,
            with a strong focus on detail, scalability, and performance.
          </p>
          <div class="hero_actions">
            <a class="button primary" href="#contact">Download my resume</a>
          </div>
        </div>
        <div class="hero_card">
          <img :src="avatarImage" alt="Elijah Zacarias" class="hero_avatar" />
        </div>
      </section>

      <section class="panel" id="skills">
        <div class="panel_header">
          <h2>Tech Stacks</h2>
        </div>
        <div class="skills">
          <div v-for="(items, category) in skills" :key="category" class="skill-block">
            <h3>
              <span class="skill-icon">{{ getSkillIcon(category) }}</span>
              {{ category }}
            </h3>
            <div class="tags">
              <span v-for="item in items" :key="item" class="tag">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel" id="projects">
        <div class="panel_header">
          <h2>Projects</h2>
        </div>
        <div class="grid">
          <article v-for="project in projects" :key="project.title" class="card">
            <div class="card_header">
              <h3>{{ project.title }}</h3>
              <div class="card_actions">
                <a
                  :href="
                    project.link && project.link !== '#' ? project.link : 'https://exodiapro.com/'
                  "
                  target="_blank"
                  rel="noreferrer"
                  class="arrow"
                  aria-label="Open project"
                  >↗</a
                >
                <a
                  :href="project.github || 'https://github.com/ElijahZacarias02/exodiapro'"
                  class="github-icon"
                  aria-label="View on GitHub"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <p class="muted">{{ project.description }}</p>
            <div class="tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </article>
        </div>
      </section>

      <section class="panel" id="experience">
        <div class="panel_header">
          <h2>Experience</h2>
        </div>
        <div class="experience">
          <div class="timeline">
            <div v-for="item in experience" :key="item.role" class="timeline_item">
              <div class="timeline_dot" />
              <div class="timeline_content">
                <p class="eyebrow">{{ item.period }}</p>
                <h4>{{ item.role }} — {{ item.company }}</h4>
                <ul class="timeline_summaries">
                  <li v-for="(summary, index) in item.summaries" :key="index" class="muted">
                    {{ summary }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta" id="contact">
        <div>
          <p class="eyebrow">Let’s Make It Happen</p>
          <h2>Have a project in mind?</h2>
          <p class="lede">
            I’m ready to help bring your project to life. Share your objectives and deadlines, and
            we’ll plan the best approach together.
          </p>
        </div>
        <div class="cta_actions">
          <a
            class="button ghost icon-button"
            href="https://www.linkedin.com/in/elijah-zacarias-6a1937193/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077b5">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              ></path>
            </svg>
          </a>
          <a
            class="button ghost icon-button"
            href="https://www.instagram.com/r1a2i0n2/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
              <defs>
                <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color: #833ab4; stop-opacity: 1" />
                  <stop offset="50%" style="stop-color: #fd1d1d; stop-opacity: 1" />
                  <stop offset="100%" style="stop-color: #fcaf45; stop-opacity: 1" />
                </linearGradient>
              </defs>
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              ></path>
            </svg>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 3.5rem;
  color: var(--text-primary);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  z-index: 2;
  gap: 0.75rem;
}

.brand {
  font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
}

.nav {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.nav a {
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.nav a:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.nav a.active {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.pill {
  background: linear-gradient(120deg, #4f46e5, #22d3ee);
  color: #0b1021 !important;
  font-weight: 600;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  border: 1px solid var(--panel-border);
  background: var(--panel-strong);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

.toggle:hover {
  background: var(--hover-bg);
  transform: translateY(-1px);
}

.toggle_icon {
  font-size: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
  margin-top: 1rem;
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: start;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: var(--shadow-strong);
}

.hero_greeting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.wave-emoji {
  font-size: 1.5rem;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-20deg);
  }
}

.greeting-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.hero_copy h1 {
  font-size: clamp(2.2rem, 3vw, 2.9rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
  margin: 0.35rem 0 0.75rem;
}

.hero_into {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: 0.75rem 0;
  font-weight: 500;
}

.typed-text {
  color: var(--text-primary);
  font-weight: 600;
}

.grad {
  background: linear-gradient(120deg, #a855f7, #22d3ee);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
  font-size: 0.85rem;
  font-weight: 600;
}

.lede {
  color: var(--text-muted);
  max-width: 60ch;
  line-height: 1.6;
}

.hero_actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.25rem 0;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.65rem 1.1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid var(--panel-border);
  color: var(--text-primary);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.2s ease;
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.button.primary {
  background: linear-gradient(120deg, #4f46e5, #22d3ee);
  color: #0b1021;
  border: none;
}

.button.ghost {
  background: var(--ghost-bg);
}

.button.icon-button {
  padding: 0.65rem;
  min-width: 44px;
}

.button.icon-button svg {
  display: block;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat_number {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.stat_label {
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.hero_card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero_avatar {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1;
}

.hero_card h3 {
  margin: 0 0 0.5rem;
}

.panel {
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: var(--shadow-soft);
}

.panel_header h2 {
  margin: 0.25rem 0;
  letter-spacing: -0.02em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.card {
  padding: 1.15rem;
  border-radius: 16px;
  border: 1px solid var(--panel-border);
  background: var(--panel-strong);
  transition:
    transform 0.15s ease,
    border-color 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  border-color: var(--text-dim);
}

.card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.card_actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.arrow {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s ease;
}

.arrow:hover {
  color: var(--text-primary);
}

.github-icon {
  color: var(--text-muted);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.github-icon:hover {
  color: var(--text-primary);
}

.muted {
  color: var(--text-muted);
  line-height: 1.55;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag {
  padding: 0.35rem 0.6rem;
  background: var(--chip-bg);
  border-radius: 999px;
  font-size: 0.9rem;
  border: 1px solid var(--chip-border);
}

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.skill-block {
  padding: 1rem;
  border: 1px solid var(--panel-border);
  border-radius: 16px;
  background: var(--panel-bg);
}

.skill-block h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
}

.skill-icon {
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.experience {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.timeline {
  position: relative;
  padding-left: 1.25rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #4f46e5, transparent);
}

.timeline_item {
  position: relative;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
}

.timeline_dot {
  position: absolute;
  left: -0.35rem;
  top: 0.3rem;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(120deg, #22d3ee, #a855f7);
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.03);
}

.timeline h4 {
  margin: 0.25rem 0;
}

.timeline_summaries {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timeline_summaries li {
  position: relative;
  padding-left: 1.25rem;
  line-height: 1.55;
}

.timeline_summaries li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--text-dim);
  font-weight: bold;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 20px;
  border: 1px solid var(--panel-border);
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(34, 211, 238, 0.12));
  padding: 1.5rem;
  flex-wrap: wrap;
}

.cta_actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .topbar {
    position: static;
  }

  .nav {
    display: none;
  }

  .page {
    padding: 1.75rem 1.1rem 2.5rem;
  }

  .content {
    gap: 2rem;
  }
}
</style>
