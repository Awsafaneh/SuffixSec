// SufixShield Pro - Main Application JavaScript

// Navigation and routing
const routes = {
  "/": "home",
  "/login": "login",
  "/signup": "signup",
  "/dashboard": "dashboard",
  "/pricing": "pricing",
  "/contact": "contact",
}

function initRouter() {
  window.addEventListener("popstate", handleRouteChange)
  handleRouteChange()
}

function navigate(path) {
  window.history.pushState({}, "", path)
  handleRouteChange()
}

function handleRouteChange() {
  const path = window.location.pathname
  const page = routes[path] || "home"
  loadPage(page)
}

function loadPage(page) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"))
  const pageEl = document.getElementById(`${page}-page`)
  if (pageEl) {
    pageEl.classList.add("active")
  }
}

// Billing toggle functionality
function initBillingToggle() {
  const toggleBtns = document.querySelectorAll(".toggle-btn")
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      updatePricing(btn.dataset.period)
    })
  })
}

function updatePricing(period) {
  const amounts = document.querySelectorAll(".amount")
  amounts.forEach((el) => {
    const monthly = Number.parseFloat(el.dataset.monthly)
    const yearly = Number.parseFloat(el.dataset.yearly)
    if (period === "yearly") {
      el.textContent = "$" + yearly
    } else {
      el.textContent = "$" + monthly
    }
  })
}

// Demo functionality
function startDemo() {
  const demoInput = document.getElementById("demoInput")
  const domain = demoInput.value || "example.com"
  const demoResults = document.getElementById("demoResults")
  const progressFill = document.getElementById("progressFill")
  const progressText = document.getElementById("progressText")
  const findingsContainer = document.getElementById("findingsContainer")

  demoResults.style.display = "block"
  findingsContainer.style.display = "none"
  progressFill.style.width = "0%"
  progressText.textContent = "Initializing scan..."

  let progress = 0
  const progressInterval = setInterval(() => {
    progress += Math.random() * 30
    if (progress > 100) progress = 100
    progressFill.style.width = progress + "%"

    if (progress < 30) {
      progressText.textContent = "Scanning " + domain + "..."
    } else if (progress < 60) {
      progressText.textContent = "Analyzing TLS certificates..."
    } else if (progress < 90) {
      progressText.textContent = "Checking security headers..."
    } else {
      progressText.textContent = "Generating findings..."
    }

    if (progress >= 100) {
      clearInterval(progressInterval)
      setTimeout(() => {
        findingsContainer.style.display = "block"
      }, 500)
    }
  }, 300)
}

// FAQ accordion functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all other FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active")
    }
  })

  // Toggle current item
  faqItem.classList.toggle("active")
}

function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question")
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      toggleFAQ(this)
    })
  })
}

// Form handling
function handleSubmit(event) {
  event.preventDefault()
  const form = event.target
  const formData = new FormData(form)

  // Simulate form submission
  showToast("Message sent successfully! We'll get back to you soon.")
  form.reset()
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById("toast")
  toast.textContent = message
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Smooth scrolling
function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

// Header scroll effect
function initHeader() {
  const header = document.getElementById("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.2)"
    } else {
      header.style.boxShadow = "none"
    }
  })
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeIn 0.6s ease forwards"
        observer.unobserve(entry.target)
      }
    })
  })

  document.querySelectorAll(".feature-card, .step-card, .pricing-card, .trust-card").forEach((el) => {
    observer.observe(el)
  })
}

// PWA installation prompt
function initPWA() {
  let deferredPrompt

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
    deferredPrompt = e
  })

  window.addEventListener("appinstalled", () => {
    console.log("PWA installed successfully")
  })
}

// Initialize everything on load
document.addEventListener("DOMContentLoaded", () => {
  initRouter()
  initBillingToggle()
  initFAQ()
  initHeader()
  initScrollAnimations()
  initPWA()

  // Set up form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit)
  }

  // Set up demo button
  const demoButton = document.querySelector('[onclick="startDemo()"]')
  if (demoButton) {
    demoButton.addEventListener("click", startDemo)
  }
})

// Scroll event listener for smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  })
})
