<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Typed from 'typed.js'
import avatarImage from './assets/img/User-Avatar-Profile-Clip-Art-Transparent-PNG.png'
import exodiaproImage from './assets/img/exodiapro.png'
import goldencupemcImage from './assets/img/goldencupemc.jpg'
import resumePdf from './assets/file/Elijah_Zacarias_Resume.pdf'
const projects = [
  {
    title: 'EXODiA PRO',
    description:
      'EXODiA PRO is all about helping aspiring idols shine. Our passionate experts nurture talent, provide hands-on guidance, and craft an immersive journey that pushes boundaries and unlocks true potential.',
    impact:
      'Successfully launched an infographic website that bridges aspiring idols, internal teams, sponsors, and event organizers through engaging visual content.',
    role: 'Web Developer',
    responsibilities: [
      'Developed responsive and user-friendly interfaces',
      'Ensured cross-browser and cross-device compatibility',
      'Performance optimization',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    link: 'https://exodiapro.com',
    github: 'https://github.com/ElijahZacarias02/exodiapro',
    image: exodiaproImage,
  },
  {
    title: 'GoldenCupEMC',
    description:
      "Showcases Golden Cup's services including copier rentals, sales, maintenance, and consumables. The site is designed to help businesses, schools, and agencies find affordable and reliable copier solutions.",
    impact: 'Streamlined design workflow, reducing component development time by 50%',
    role: 'Frontend Developer',
    responsibilities: ['Component architecture', 'Design token system', 'Documentation'],
    tags: ['Design Tokens', 'Storybook', 'TypeScript'],
    link: 'https://goldencupemc.netlify.app/',
    github: 'https://github.com/ElijahZacarias02/goldencupemc',
    image: goldencupemcImage,
  },
]

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const skills = {
  'Front End Development': [
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'Bootstrap 3, 4, & 5', icon: '📱' },
    { name: 'PHP', icon: '🐘' },
    { name: 'MySQL', icon: '🗄️' },
  ],
  'Back End Development': [
    { name: 'Vue 3', icon: '💚' },
    { name: 'Tailwind', icon: '🎯' },
    { name: 'jQuery', icon: '📜' },
    { name: 'CodeIgniter 2, 3, & 4', icon: '🔥' },
    { name: 'Ajax', icon: '🔄' },
  ],
  Tools: [
    { name: 'Git', icon: '📦' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'VSCode', icon: '💻' },
    { name: 'Postman', icon: '📬' },
    { name: 'SVN', icon: '📂' },
  ],
}

const getSkillIcon = (category) => {
  const icons = {
    'Front End Development': '🎨',
    'Back End Development': '⚙️',
    Tools: '🛠️',
  }
  return icons[category] || '📦'
}

const experience = [
  {
    role: 'Web Developer',
    company: 'Prople BPO, Inc.',
    period: 'Nov 2023 — Present',
    summaries: [
      'Optimized database queries and reporting logic, improving load times by 40% and ensuring more reliable payroll data.',
      'Supported business continuity by maintaining and upgrading legacy systems while implementing modern UI improvements.',
      'Automated payroll and HR reporting, reducing manual Excel preparation time by hours per cycle and minimizing human error.',
    ],
  },
  {
    role: 'Full Stack Web Developer',
    company: 'LUCKY 8 STAR QUEST INC.',
    period: 'Oct 2019 — Jan 2023',
    summaries: [
      'Automated all manual processes of the company, increasing operational efficiency by 60%.',
      'Developed and managed well-functioning databases and applications serving 150+ daily active users.',
      'Ensured cross-platform optimization for mobile phones, improving mobile user experience by 50%.',
    ],
  },
  {
    role: 'Front End Web Developer',
    company: 'Freelance (Part-time)',
    period: '2018 — Present',
    summaries: [
      'Worked alongside UI/UX designers to create informative, responsive websites for 10+ clients.',
      'Ensured cross-platform optimization for mobile phones, achieving 100% mobile compatibility.',
      'Met both technical and consumer needs, maintaining 95% client satisfaction rate.',
    ],
  },
]

const activeSection = ref('hero')
const theme = ref('light')
const isLoading = ref(true)
let observer
let typedInstance = null
const typedElement = ref(null)

// Contact form state
const contactForm = ref({
  name: '',
  email: '',
  message: '',
})

const submitContactForm = () => {
  // In a real app, you'd send this to a backend
  const mailtoLink = `mailto:your-email@example.com?subject=Contact from ${contactForm.value.name}&body=${encodeURIComponent(contactForm.value.message)}%0D%0A%0D%0AFrom: ${contactForm.value.email}`
  window.location.href = mailtoLink
  // Reset form
  contactForm.value = { name: '', email: '', message: '' }
}

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = resumePdf
  link.download = 'Elijah_Zacarias_Resume.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const applyTheme = (value) => {
  document.documentElement.setAttribute('data-theme', value)
  localStorage.setItem('theme', value)
}

const handleNavClick = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const header = document.querySelector('.topbar')
    const headerHeight = header ? header.offsetHeight : 20
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight - 20

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
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

  // Prevent scrolling during loading
  document.body.style.overflow = 'hidden'

  // Hide loading page after a short delay or when page is ready
  const hideLoading = () => {
    setTimeout(() => {
      isLoading.value = false
      document.body.style.overflow = ''
    }, 800) // 800ms delay for smooth transition
  }

  if (document.readyState === 'complete') {
    hideLoading()
  } else {
    window.addEventListener('load', hideLoading)
  }

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
        strings: ['Front End Development', 'Back End Development'],
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
  <!-- Loading Page -->
  <Transition name="loading-fade">
    <div v-if="isLoading" class="loading-page">
      <div class="loading-content">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <h2 class="loading-text">Elijah Zacarias</h2>
        <p class="loading-subtext">Loading Portfolio...</p>
      </div>
    </div>
  </Transition>

  <div class="page" :class="{ 'page-loaded': !isLoading }">
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
      <button
        class="toggle"
        type="button"
        @click="toggleTheme"
        :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
      >
        <span class="toggle_icon" aria-hidden="true">{{ theme === 'light' ? '☀︎' : '☾' }}</span>
        <span class="toggle_label">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</span>
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
          <p class="hero_into">
            <span class="hero_value">I am into</span>
            <span ref="typedElement" class="typed-text"></span>
          </p>
          <p class="lede">
            I develop intuitive, user-friendly web applications tailored to client requirements,
            with a strong focus on detail, scalability, and performance.
          </p>
          <div class="hero_actions">
            <a class="button primary" href="#" @click.prevent="downloadResume"
              >Download my resume</a
            >
            <a class="button ghost" href="#projects" @click.prevent="handleNavClick('projects')"
              >View Projects</a
            >
            <a class="button ghost" href="#contact" @click.prevent="handleNavClick('contact')"
              >Contact Me</a
            >
          </div>
        </div>
        <div class="hero_card">
          <img :src="avatarImage" alt="Elijah Zacarias" class="hero_avatar" />
        </div>
      </section>

      <section class="panel" id="about">
        <div class="panel_header">
          <h2>About Me</h2>
        </div>
        <div class="about_content">
          <p class="lede">
            I love taking complex business ideas and turning them into simple, easy-to-use
            experiences. I care about writing clean code and crafting thoughtful designs, making
            sure everything not only works well but also looks great for the user.
          </p>
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
              <span
                v-for="item in items"
                :key="typeof item === 'string' ? item : item.name"
                class="tag"
              >
                <span v-if="typeof item === 'object' && item.icon" class="tag-icon">{{
                  item.icon
                }}</span>
                {{ typeof item === 'string' ? item : item.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel" id="projects">
        <div class="panel_header">
          <h2>Projects</h2>
        </div>
        <div class="projects_grid">
          <article v-for="project in projects" :key="project.title" class="project_card">
            <div v-if="project.image" class="project_image">
              <img :src="project.image" :alt="project.title" />
            </div>
            <div v-else class="project_image_placeholder">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <div class="project_content">
              <div class="project_header">
                <div>
                  <h3 class="project_title">{{ project.title }}</h3>
                  <p v-if="project.role" class="project_role">
                    <strong>Role:</strong> {{ project.role }}
                  </p>
                </div>
              </div>
              <p class="project_description">{{ project.description }}</p>
              <p v-if="project.impact" class="project_impact">{{ project.impact }}</p>
              <div
                v-if="project.responsibilities && project.responsibilities.length"
                class="project_responsibilities"
              >
                <p class="project_responsibilities_title"><strong>Responsibilities:</strong></p>
                <ul class="project_responsibilities_list">
                  <li v-for="(resp, idx) in project.responsibilities" :key="idx">{{ resp }}</li>
                </ul>
              </div>
              <div class="project_tags">
                <span v-for="tag in project.tags" :key="tag" class="project_tag">{{ tag }}</span>
              </div>
              <div class="project_buttons">
                <a
                  v-if="project.link && project.link !== '#'"
                  :href="project.link"
                  target="_blank"
                  rel="noreferrer"
                  class="button primary project_button"
                >
                  🔗 Live Demo
                </a>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noreferrer"
                  class="button ghost project_button"
                >
                  💻 Source Code
                </a>
                <span
                  v-else-if="project.link && project.link === '#'"
                  class="button ghost project_button disabled"
                >
                  Source available upon request
                </span>
              </div>
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
        <div class="contact_header">
          <p class="eyebrow">Let's Make It Happen</p>
          <h2>Have a project in mind?</h2>
          <p class="lede">
            I'm ready to help bring your project to life. Share your objectives and deadlines, and
            we'll plan the best approach together.
          </p>
          <p class="availability">
            <strong>Open to:</strong> Full-time opportunities • Freelance projects
          </p>
        </div>
        <div class="contact_content">
          <form class="contact_form" @submit.prevent>
            <div class="form_group">
              <label for="name">Name</label>
              <input id="name" type="text" required placeholder="Your name" />
            </div>
            <div class="form_group">
              <label for="email">Email</label>
              <input id="email" type="email" required placeholder="your.email@example.com" />
            </div>
            <div class="form_group">
              <label for="message">Message</label>
              <textarea
                id="message"
                required
                rows="5"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <button type="submit" disabled class="button primary">Send Message</button>
          </form>
          <div class="contact_social">
            <h3>Connect with me</h3>
            <div class="social_links">
              <a
                class="button ghost social_link"
                href="https://www.linkedin.com/in/elijah-zacarias-6a1937193/"
                target="_blank"
                rel="noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077b5">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  ></path>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                class="button ghost social_link"
                href="https://github.com/ElijahZacarias02"
                target="_blank"
                rel="noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  ></path>
                </svg>
                <span>GitHub</span>
              </a>
              <a
                class="button ghost social_link"
                href="https://www.instagram.com/r1a2i0n2/"
                target="_blank"
                rel="noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E4405F">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  ></path>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
