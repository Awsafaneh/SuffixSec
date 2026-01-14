// SuffixSec - Main JavaScript File

// Auth Functions
function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  if (email && password) {
    const user = {
      email: email,
      name: email.split("@")[0],
      plan: "Professional",
      joinDate: new Date().toLocaleDateString(),
    }

    localStorage.setItem("suffixsec_user", JSON.stringify(user))
    alert("Login successful! Redirecting to dashboard...")
    window.location.href = "dashboard.html"
  }
}

function handleSignup(event) {
  event.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirm-password").value

  if (password !== confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  if (name && email && password) {
    const user = {
      email: email,
      name: name,
      plan: "Starter",
      joinDate: new Date().toLocaleDateString(),
    }

    localStorage.setItem("suffixsec_user", JSON.stringify(user))
    alert("Account created successfully! Redirecting to dashboard...")
    window.location.href = "dashboard.html"
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("suffixsec_user")
    window.location.href = "index.html"
  }
}

// Navigation Functions
function goToLogin() {
  window.location.href = "login.html"
}

function goToSignup() {
  window.location.href = "signup.html"
}

function toggleDemo() {
  alert("Demo video coming soon!")
}

function contactSales() {
  alert("Sales team will contact you soon!")
}

function handleContactSubmit(event) {
  event.preventDefault()
  alert("Thank you for reaching out! We will get back to you soon.")
  event.target.reset()
}

// Dashboard Functions
let currentPage = "overview"

function switchPage(pageName) {
  // Hide current page
  const currentPageEl = document.getElementById(currentPage + "-page")
  if (currentPageEl) {
    currentPageEl.classList.remove("active")
  }

  // Update nav items
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Show new page
  const newPageEl = document.getElementById(pageName + "-page")
  if (newPageEl) {
    newPageEl.classList.add("active")
  }

  // Update active nav item
  const navButtons = document.querySelectorAll(".nav-item")
  navButtons.forEach((btn) => {
    if (btn.onclick && btn.onclick.toString().includes(pageName)) {
      btn.classList.add("active")
    }
  })

  currentPage = pageName

  // Update page title
  const pageTitles = {
    overview: "Dashboard Overview",
    risks: "Vulnerability Risks",
    plans: "Subscription Plans",
    profile: "User Profile",
    notifications: "Notifications",
    settings: "Settings",
  }
  document.getElementById("pageTitle").textContent = pageTitles[pageName] || "Dashboard"
}

// PWA install prompt handling
let deferredPrompt
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault()
  deferredPrompt = e
  showInstallPrompt()
})

function showInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt()
  }
}

// Sidebar toggle for mobile
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  if (sidebar) {
    sidebar.style.display = sidebar.style.display === "none" ? "flex" : "none"
  }
}

// User menu toggle
function toggleUserMenu() {
  const menu = document.getElementById("userMenu")
  if (menu) {
    menu.classList.toggle("show")
  }
}

// Close menu when clicking elsewhere
document.addEventListener("click", (e) => {
  if (!e.target.closest(".user-profile")) {
    const menu = document.getElementById("userMenu")
    if (menu) menu.classList.remove("show")
  }
})

// Authentication check
function checkUserAuth() {
  const user = localStorage.getItem("suffixsec_user")
  if (!user && window.location.pathname.includes("dashboard")) {
    alert("Please login first")
    window.location.href = "login.html"
  }
}

// Load user data on dashboard
function loadUserData() {
  const user = JSON.parse(localStorage.getItem("suffixsec_user") || "{}")
  if (user.name) {
    const userName = document.getElementById("userName")
    if (userName) userName.textContent = user.name
    const profileName = document.getElementById("profileName")
    if (profileName) profileName.textContent = user.name
    const profileEmail = document.getElementById("profileEmail")
    if (profileEmail) profileEmail.textContent = user.email
    const profileNameInput = document.getElementById("profileNameInput")
    if (profileNameInput) profileNameInput.value = user.name
    const profileEmailInput = document.getElementById("profileEmailInput")
    if (profileEmailInput) profileEmailInput.value = user.email
  }
}

// Profile update handler
function handleProfileUpdate(event) {
  event.preventDefault()
  const name = document.getElementById("profileNameInput").value
  const email = document.getElementById("profileEmailInput").value
  const user = JSON.parse(localStorage.getItem("suffixsec_user") || "{}")
  user.name = name
  user.email = email
  localStorage.setItem("suffixsec_user", JSON.stringify(user))
  alert("Profile updated successfully!")
  loadUserData()
}

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// Responsive design media queries
if (window.innerWidth < 768) {
  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar")
    if (sidebar) {
      sidebar.style.display = "none"
    }
  })
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    const sidebar = document.getElementById("sidebar")
    if (sidebar) {
      sidebar.style.display = "flex"
    }
  }
})

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  checkUserAuth()
  if (document.getElementById("sidebar")) {
    loadUserData()
  }

  // Set first nav item as active
  const firstNavItem = document.querySelector(".nav-item")
  if (firstNavItem) {
    firstNavItem.classList.add("active")
  }
})

// Smooth scroll for anchor links
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
