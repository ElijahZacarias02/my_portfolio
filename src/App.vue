<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Typed from 'typed.js'
import avatarImage from './assets/img/User-Avatar-Profile-Clip-Art-Transparent-PNG.png'
import { skillIconByName, skillIconFill } from './skillIconData.js'

const skill = (name) => ({ name, icon: skillIconByName[name] ?? null })
import exodiaproImage from './assets/img/exodiapro.png'
import goldencupemcImage from './assets/img/goldencupemc.jpg'
import resumePdf from './assets/file/Elijah_Zacarias_Resume.pdf'
const projects = [
  {
    title: 'GoldenCupEMC',
    description:
      "GoldenCupEMC's website was built from the ground up as a promotional tool, aiming to boost the business's online presence and attract new customers. With no prior design elements to work from, the project required a complete start. My focus was on understanding the company's objectives, organizing the website's content, and mapping out the user experience. This approach allowed me to develop a modern, user-friendly design that clearly presented the services offered and facilitated easy communication for potential clients.",
    impact:
      'Improved brand visibility and increased user engagement by delivering a fully responsive landing page that streamlined service inquiries across all devices.',
    role: 'Front-End Web Developer',
    responsibilities: [
      'Designed and implemented a responsive landing page from the ground up',
      'Ensured cross-browser and cross-device compatibility for consistent user experience',
      'Optimized website performance, accessibility, and loading speed',
      'Translated business requirements into clean, maintainable, and scalable front-end code',
      'Implemented reusable and well-organized components to improve maintainability and scalability',
    ],
    tags: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'PHP'],
    link: 'https://goldencupemc.netlify.app/',
    github: 'https://github.com/ElijahZacarias02/goldencupemc',
    image: goldencupemcImage,
  },

  {
    title: 'EXODiA PRO',
    description:
      "EXODiA PRO is a creative tool designed to help young idols discover their strengths and develop with confidence. The aim of the project was to create a feeling of inspiration, ease of use, and a sense of the brand's energy while still moving the user through the experience from start to finish. I collaborated with UI and UX designers throughout the project, working together on everything from user flows to layout and interactive elements. A large part of my involvement was in helping to inform how users would flow through the experience and ensuring that the design was intuitive, engaging, and motivational rather than overwhelming. Through simplicity, collaboration, and sound design principles, we were able to create a seamless digital experience that supports the development of talent, inspires creativity, and helps users feel confident as they discover and test their limits.",
    impact:
      'Successfully launched an infographic website that bridges aspiring idols, internal teams, sponsors, and event organizers through engaging visual content.',
    role: 'Full-Stack Web Developer',
    responsibilities: [
      'Developed responsive, user-friendly interfaces based on approved UI/UX designs',
      'Collaborated closely with UI/UX designers to ensure accurate implementation and visual consistency',
      'Ensured cross-browser and cross-device compatibility for a seamless user experience',
      'Built reusable, scalable components to improve maintainability and development efficiency',
      'Maintained consistent styling and layout across the entire application',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'CodeIgniter 3', 'MySQL'],
    link: 'https://exodiapro.com',
    github: 'https://github.com/ElijahZacarias02/exodiapro',
    image: exodiaproImage,
  },
]

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const skills = {
  'Front-End Web Development': [
    skill('HTML5'),
    skill('CSS3'),
    skill('Bootstrap 3, 4, & 5'),
    skill('Tailwind CSS'),
    skill('JavaScript'),
    skill('jQuery'),
    skill('Ajax'),
    skill('Vue'),
    skill('React'),
  ],
  'Back-End Web Development': [
    skill('PHP'),
    skill('CodeIgniter (2, 3 & 4 - MVC)'),
    skill('Laravel'),
    skill('Express.js'),
    skill('Node.js'),
    skill('MySQL'),
    skill('MongoDB'),
    skill('Supabase'),
  ],
  Tools: [
    skill('Version Control (Git & SVN)'),
    skill('GitHub'),
    skill('VS Code'),
    skill('Postman'),
  ],
}

const experience = [
  {
    role: 'Web Developer',
    company: 'Prople BPO, Inc.',
    period: 'Nov 2023 — March 2026',
    summaries: [
      'Developed and maintained web-based applications supporting finance, HR, and transaction-processing services, ensuring stable daily operations.',
      'Optimized database queries and reporting workflows to improve payroll and HR system performance and data reliability for client operations.',
      'Maintained and enhanced legacy systems used by multiple clients while introducing modern UI/UX improvements, delivering usability gains with zero downtime or service disruption.',
      'Designed and implemented automated payroll and HR reporting processes, reducing manual Excel-based reporting and improving overall data accuracy.',
      'Collaborated with cross-functional teams to deliver new features and resolve production issues across client-facing applications, improving turnaround time and system stability.',
    ],
  },
  {
    role: 'Full-Stack Web Developer',
    company: 'LUCKY 8 STAR QUEST INC.',
    period: 'Oct 2020 — Oct 2023',
    summaries: [
      'Developed and maintained web applications supporting gaming and entertainment operations, improving system reliability and user workflows.',
      'Automated manual operational processes using web technologies and backend systems (CodeIgniter 3, MySQL), increasing efficiency and reducing repetitive tasks.',
      'Designed, managed, and optimized MySQL databases supporting high-volume daily usage, ensuring data integrity, fast query performance, and minimal downtime.',
      'Built custom APIs and integrated system modules to streamline gaming and reporting workflows, reducing data processing errors and enabling real-time data access.',
      'Implemented responsive web design techniques to ensure consistent performance across mobile, tablet, and desktop devices, improving usability and reducing support requests.',
    ],
  },
  {
    role: 'Front-End Web Developer',
    company: 'Freelance (Part-time)',
    period: 'June 2018 — March 2026',
    summaries: [
      'Delivered responsive, client-focused websites, integrating SEO best practices (semantic HTML, optimized metadata, Core Web Vitals, and mobile-first design) to improve usability, performance, and search visibility across devices.',
      'Collaborated directly with clients to gather requirements, iterate on feedback, and deliver projects on schedule.',
      'Translated UI/UX designs into pixel-accurate, accessible interfaces, reducing design-to-development revisions.',
      'Implemented mobile-first and responsive design approaches, improving user engagement on mobile devices.',
      'Maintained and enhanced existing websites by resolving UI issues and implementing improvements that reduced support requests.',
    ],
  },
]

const education = [
  {
    degree: 'BS INFORMATION TECHNOLOGY',
    school: 'STI COLLEGE MAKATI',
    year: '2015 - 2019',
  },
]

const activeSection = ref('hero')
const theme = ref('light')
const isLoading = ref(true)
const mobileNavOpen = ref(false)
const showAllProjects = ref(false)
const visibleProjects = computed(() => (showAllProjects.value ? projects : projects.slice(0, 2)))
let observer
let typedInstance = null
const typedElement = ref(null)
let scrollHandler = null
let scrollTimeout = null

const contactForm = ref({
  name: '',
  email: '',
  message: '',
})
const isSubmitting = ref(false)
const submitStatus = ref(null)
const submitMessage = ref('')

const aboutExpanded = ref(false)
const aboutText =
  '5+ years of experience delivering responsive, scalable, and user-friendly web applications across finance, HR, and gaming/entertainment sectors. Built and maintained client-facing systems supporting business-critical operations, with a focus on reliability, usability, and performance. Adept at full-stack development with a track record of translating business requirements into practical, production-ready digital solutions.'
const ABOUT_PREVIEW_WORDS = 50
const aboutWords = aboutText.split(/\s+/)
const aboutPreview =
  aboutWords.length > ABOUT_PREVIEW_WORDS
    ? aboutWords.slice(0, ABOUT_PREVIEW_WORDS).join(' ') + '...'
    : aboutText
const aboutNeedsExpand = aboutWords.length > ABOUT_PREVIEW_WORDS

const PROJECT_DESC_PREVIEW_WORDS = 50
const projectDescExpanded = ref({})
const getProjectDescriptionPreview = (description, limit = PROJECT_DESC_PREVIEW_WORDS) => {
  if (!description || typeof description !== 'string') return ''
  const words = description.trim().split(/\s+/)
  if (words.length <= limit) return description
  return words.slice(0, limit).join(' ') + '...'
}
const projectDescriptionNeedsExpand = (description, limit = PROJECT_DESC_PREVIEW_WORDS) => {
  if (!description || typeof description !== 'string') return false
  return description.trim().split(/\s+/).length > limit
}
const toggleProjectDescription = (title) => {
  const current = projectDescExpanded.value
  projectDescExpanded.value = { ...current, [title]: !current[title] }
}

const submitContactForm = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  submitStatus.value = null
  submitMessage.value = ''

  try {
    const response = await fetch('https://formspree.io/f/xeeozznb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactForm.value.name,
        email: contactForm.value.email,
        message: contactForm.value.message,
      }),
    })

    if (response.ok) {
      submitStatus.value = 'success'
      submitMessage.value = 'Thank you! Your message has been sent successfully.'
      contactForm.value = { name: '', email: '', message: '' }
    } else {
      throw new Error('Failed to send message')
    }
  } catch (error) {
    submitStatus.value = 'error'
    submitMessage.value = 'Sorry, there was an error sending your message. Please try again later.'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
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
  mobileNavOpen.value = false
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

const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  applyTheme(theme.value)
}

const toggleProjects = () => {
  showAllProjects.value = !showAllProjects.value
  requestAnimationFrame(() => {
    window.dispatchEvent(new Event('resize'))
  })
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    theme.value = stored
  } else {
    theme.value = 'light'
  }
  applyTheme(theme.value)

  document.body.style.overflow = 'hidden'

  const hideLoading = () => {
    setTimeout(() => {
      isLoading.value = false
      document.body.style.overflow = ''
    }, 800)
  }

  if (document.readyState === 'complete') {
    hideLoading()
  } else {
    window.addEventListener('load', hideLoading)
  }

  const sections = document.querySelectorAll('section[id]')
  const header = document.querySelector('.topbar')
  const headerHeight = header ? header.offsetHeight : 80

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + headerHeight + 100

    let currentSection = 'hero'
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.id
      }
    })

    activeSection.value = currentSection
  }

  const intersectingSections = new Map()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.set(entry.target.id, entry.intersectionRatio)
        } else {
          intersectingSections.delete(entry.target.id)
        }
      })

      if (intersectingSections.size > 0) {
        const maxEntry = Array.from(intersectingSections.entries()).reduce((a, b) =>
          a[1] > b[1] ? a : b,
        )
        activeSection.value = maxEntry[0]
      }
    },
    {
      root: null,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: '-15% 0px -50% 0px',
    },
  )

  sections.forEach((section) => observer.observe(section))

  scrollHandler = () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(updateActiveSection, 10)
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })

  updateActiveSection()

  nextTick(() => {
    if (typedElement.value) {
      typedInstance = new Typed(typedElement.value, {
        strings: ['Front-End Web Development', 'Back-End Web Development'],
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
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<template>
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

  <div class="page" :class="{ 'page-loaded': !isLoading, 'mobile-nav-open': mobileNavOpen }">
    <header class="topbar">
      <div class="topbar_inner">
        <div class="brand">Elijah Zacarias</div>
        <nav class="nav nav_desktop" aria-label="Main navigation">
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
        <div class="topbar_actions">
          <button
            class="toggle"
            type="button"
            @click="toggleTheme"
            :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
          >
            <span class="toggle_icon" aria-hidden="true">
              <svg
                v-if="theme === 'light'"
                class="toggle_svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                />
              </svg>
              <svg
                v-else
                class="toggle_svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
            <span class="toggle_label">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</span>
          </button>
          <button
            class="nav_toggle"
            type="button"
            aria-label="Toggle menu"
            :aria-expanded="mobileNavOpen"
            @click="toggleMobileNav"
          >
            <span class="nav_toggle_bar" :class="{ open: mobileNavOpen }"></span>
            <span class="nav_toggle_bar" :class="{ open: mobileNavOpen }"></span>
            <span class="nav_toggle_bar" :class="{ open: mobileNavOpen }"></span>
          </button>
        </div>
      </div>
      <Transition name="mobile-nav">
        <div
          v-if="mobileNavOpen"
          class="nav_backdrop"
          aria-hidden="true"
          @click="mobileNavOpen = false"
        ></div>
      </Transition>
      <Transition name="mobile-nav-slide">
        <nav v-if="mobileNavOpen" class="nav nav_mobile" aria-label="Mobile navigation">
          <div class="nav_mobile_brand">Elijah Zacarias</div>
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
      </Transition>
    </header>

    <main class="content">
      <section class="hero" id="hero">
        <div class="hero_copy">
          <div class="hero_greeting">
            <span class="greeting-text">Hello There!</span>
          </div>
          <h1>I'm <span class="grad">Elijah Zacarias</span></h1>
          <p class="hero_into">
            <span class="hero_value">I am into</span>
            <span ref="typedElement" class="typed-text"></span>
          </p>
          <p class="intro-text">
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
          <p class="intro-text">
            {{ aboutExpanded ? aboutText : aboutPreview }}
          </p>
          <button
            v-if="aboutNeedsExpand"
            type="button"
            class="about_see_more"
            :aria-expanded="aboutExpanded"
            @click="aboutExpanded = !aboutExpanded"
          >
            <span class="about_see_more_text">{{ aboutExpanded ? 'See less' : 'See more' }}</span>
            <span
              class="about_see_more_icon"
              :class="{ expanded: aboutExpanded }"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </section>

      <section class="panel" id="skills">
        <div class="panel_header">
          <h2>Tech Stacks</h2>
        </div>
        <div class="skills">
          <div v-for="(items, category) in skills" :key="category" class="skill-block">
            <h3>
              <span class="skill-icon" aria-hidden="true">
                <svg
                  v-if="category === 'Front-End Web Development'"
                  class="skill-category-svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linejoin="round"
                >
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
                  <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
                  <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
                  <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
                </svg>
                <svg
                  v-else-if="category === 'Back-End Web Development'"
                  class="skill-category-svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <ellipse cx="12" cy="6" rx="7" ry="2.5" />
                  <path d="M5 6v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V6" />
                  <path d="M5 11v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
                </svg>
                <svg
                  v-else
                  class="skill-category-svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                  />
                </svg>
              </span>
              {{ category }}
            </h3>
            <div class="tags">
              <span
                v-for="item in items"
                :key="typeof item === 'string' ? item : item.name"
                class="tag"
              >
                <svg
                  v-if="typeof item === 'object' && item.icon"
                  class="tag-icon-svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                >
                  <title>{{ item.icon.title }}</title>
                  <path
                    :fill="skillIconFill(item.icon.hex, theme === 'dark')"
                    :d="item.icon.path"
                  />
                </svg>
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
          <article v-for="project in visibleProjects" :key="project.title" class="project_card">
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
              <p class="project_description">
                {{
                  projectDescExpanded[project.title]
                    ? project.description
                    : getProjectDescriptionPreview(project.description)
                }}
              </p>
              <button
                v-if="projectDescriptionNeedsExpand(project.description)"
                type="button"
                class="about_see_more project_see_more"
                :aria-expanded="!!projectDescExpanded[project.title]"
                @click="toggleProjectDescription(project.title)"
              >
                <span class="about_see_more_text">
                  {{ projectDescExpanded[project.title] ? 'See less' : 'See more' }}
                </span>
                <span
                  class="about_see_more_icon"
                  :class="{ expanded: projectDescExpanded[project.title] }"
                  aria-hidden="true"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
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
                  <svg
                    class="project_button_icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live demo
                </a>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noreferrer"
                  class="button ghost project_button"
                >
                  <svg
                    class="project_button_icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  Source code
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
        <div v-if="projects.length > 2" class="projects_actions">
          <button type="button" class="button ghost" @click="toggleProjects">
            {{ showAllProjects ? 'View fewer projects' : 'View more projects' }}
          </button>
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

      <section class="panel" id="education">
        <div class="panel_header">
          <h2>Education</h2>
        </div>
        <div class="experience">
          <div class="timeline">
            <div v-for="item in education" :key="item.degree" class="timeline_item">
              <div class="timeline_dot" />
              <div class="timeline_content">
                <p class="eyebrow">{{ item.year }}</p>
                <h4>{{ item.degree }} | {{ item.school }}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta" id="contact">
        <div class="contact_header">
          <p class="eyebrow">Let's Make It Happen</p>
          <h2>Have a project in mind?</h2>
          <p class="intro-text">
            I'm ready to help bring your project to life. Share your objectives and deadlines, and
            we'll plan the best approach together.
          </p>
          <p class="availability">
            <strong>Open to:</strong> Full-time opportunities • Freelance projects
          </p>
        </div>
        <div class="contact_content">
          <form class="contact_form" @submit.prevent="submitContactForm">
            <div class="form_group">
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                v-model="contactForm.name"
                required
                placeholder="Your name"
                :disabled="isSubmitting"
              />
            </div>
            <div class="form_group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model="contactForm.email"
                required
                placeholder="your.email@example.com"
                :disabled="isSubmitting"
              />
            </div>
            <div class="form_group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="contactForm.message"
                required
                rows="5"
                placeholder="Tell me about your project..."
                :disabled="isSubmitting"
              ></textarea>
            </div>
            <div v-if="submitMessage" class="form_status" :class="submitStatus">
              {{ submitMessage }}
            </div>
            <button type="submit" :disabled="isSubmitting" class="button primary">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
          <div class="contact_social">
            <h3>Connect with me</h3>
            <div class="social_links">
              <a
                class="button ghost social_link"
                href="https://linkedin.com/in/ebzacarias"
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
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer_content">
        <div class="footer_brand">
          <p class="footer_name">Elijah Zacarias</p>
          <p class="footer_tagline">Full-Stack Web Developer</p>
        </div>
        <div class="footer_links">
          <a
            class="footer_link"
            href="https://linkedin.com/in/ebzacarias"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              ></path>
            </svg>
          </a>
          <a
            class="footer_link"
            href="https://github.com/ElijahZacarias02"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path>
            </svg>
          </a>
        </div>
        <div class="footer_copyright">
          <p>&copy; {{ new Date().getFullYear() }} Elijah Zacarias. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
