// SuffixSec - Main Application JavaScript

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

// Form handling
function handleContactSubmit(event) {
  event.preventDefault()
  const form = event.target
  alert("Thank you for your message! We will get back to you soon.")
  form.reset()
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

  document.querySelectorAll(".feature-card, .stat-card, .pricing-card").forEach((el) => {
    observer.observe(el)
  })
}

// PWA installation prompt
function initPWA() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
  })

  window.addEventListener("appinstalled", () => {
    console.log("PWA installed successfully")
  })
}

// Initialize everything on load
document.addEventListener("DOMContentLoaded", () => {
  initHeader()
  initScrollAnimations()
  initPWA()

  // Register service worker for PWA
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {})
  }
})
