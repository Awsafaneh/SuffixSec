// ============================================
// SuffixSec - Single Page Application
// Client-side routing with clean URLs
// ============================================

const app = {
  currentUser: null,
  currentPage: "home",
  navigationHistory: ["home"],

  init() {
    this.checkAuth()
    this.renderApp()
    this.setupRouting()
    this.registerServiceWorker()
  },

  checkAuth() {
    const user = localStorage.getItem("suffixsec_user")
    this.currentUser = user ? JSON.parse(user) : null
  },

  setupRouting() {
    window.addEventListener("popstate", () => this.handleRoute())
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-route]")
      if (link) {
        e.preventDefault()
        const route = link.getAttribute("data-route")
        this.navigate(route)
      }
    })

    this.handleRoute()
  },

  handleRoute() {
    const path = window.location.pathname.split("/").pop() || "home"
    this.currentPage = path
    this.render()
  },

  navigate(route) {
    window.history.pushState(null, "", `/${route}`)
    this.currentPage = route
    if (this.navigationHistory[this.navigationHistory.length - 1] !== route) {
      this.navigationHistory.push(route)
    }
    this.render()
  },

  goBack() {
    if (this.navigationHistory.length > 1) {
      this.navigationHistory.pop()
      const previousPage = this.navigationHistory[this.navigationHistory.length - 1]
      window.history.pushState(null, "", `/${previousPage}`)
      this.currentPage = previousPage
      this.render()
    }
  },

  renderApp() {
    const app = document.getElementById("app")
    app.innerHTML = `
      <div class="app-container">
        <header class="header">
          <div class="container">
            <div class="header-content">
              <!-- Add back button for dashboard pages -->
              <div class="header-left" id="headerLeft">
                <a class="logo" data-route="home">
                  <span class="logo-icon">🔐</span>
                  <span class="logo-text">SuffixSec</span>
                </a>
              </div>
              <nav class="nav-menu" id="mainNav">
                <a class="nav-link" data-route="features">Features</a>
                <a class="nav-link" data-route="pricing">Pricing</a>
                <a class="nav-link" data-route="testimonials">Testimonials</a>
                <a class="nav-link" data-route="teams">Teams</a>
                <a class="nav-link" data-route="contact">Contact</a>
              </nav>
              <div class="header-actions" id="headerActions">
                <a class="btn-secondary" data-route="login">Sign In</a>
                <a class="btn-primary" data-route="signup">Get Started</a>
              </div>
            </div>
          </div>
        </header>
        <main id="pageContent"></main>
      </div>
    `
  },

  render() {
    const pageContent = document.getElementById("pageContent")
    const mainNav = document.getElementById("mainNav")
    const headerActions = document.getElementById("headerActions")
    const headerLeft = document.getElementById("headerLeft")

    // Update navigation visibility
    if (this.currentPage.includes("dashboard")) {
      mainNav.style.display = "none"
      headerLeft.innerHTML = `
        <button class="btn-back" onclick="app.goBack()" title="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      `
      if (this.currentUser) {
        headerActions.innerHTML = `<button class="btn-secondary" onclick="app.logout()">Logout</button>`
      }
    } else {
      mainNav.style.display = "flex"
      headerLeft.innerHTML = `
        <a class="logo" data-route="home">
          <span class="logo-icon">🔐</span>
          <span class="logo-text">SuffixSec</span>
        </a>
      `
      if (!this.currentUser) {
        headerActions.innerHTML = `
          <a class="btn-secondary" data-route="login">Sign In</a>
          <a class="btn-primary" data-route="signup">Get Started</a>
        `
      } else {
        headerActions.innerHTML = `
          <a class="btn-primary" data-route="dashboard">Dashboard</a>
          <button class="btn-secondary" onclick="app.logout()">Logout</button>
        `
      }
    }

    // Render page content
    const pages = {
      home: this.renderHome.bind(this),
      login: this.renderLogin.bind(this),
      signup: this.renderSignup.bind(this),
      dashboard: this.renderDashboard.bind(this),
      features: this.renderFeatures.bind(this),
      pricing: this.renderPricing.bind(this),
      contact: this.renderContact.bind(this),
    }

    if (pages[this.currentPage]) {
      pageContent.innerHTML = pages[this.currentPage]()
    } else {
      pageContent.innerHTML = this.renderHome()
      this.navigate("home")
    }
  },

  renderHome() {
    return `
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">
              Next-Gen
              <span class="gradient-text">Code Security</span>
              Platform
            </h1>
            <p class="hero-description">
              Harness the power of AI to detect zero-day vulnerabilities, simulate sophisticated attacks, and protect your source code with <span class="highlight-text">enterprise-grade security</span> that scales with your business.
            </p>
            <div class="hero-buttons">
              <a class="btn-primary" data-route="signup">Start Free Trial</a>
              <button class="btn-secondary" onclick="app.navigate('features')">
                ▶ Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="stats">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">👁️</div>
              <div class="stat-number">96.2%</div>
              <div class="stat-label">Vulnerability Detection Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⚡</div>
              <div class="stat-number">Zero-Day</div>
              <div class="stat-label">Discovery Capable</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🛡️</div>
              <div class="stat-number">24/7</div>
              <div class="stat-label">Continuous Monitoring</div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  renderFeatures() {
    return `
      <section class="features" style="padding: 100px 0;">
        <div class="container">
          <h2 class="section-title">Powerful Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🔍</div>
              <h3 class="feature-title">Advanced Scanning</h3>
              <p class="feature-description">Deep code analysis with machine learning to identify vulnerabilities before they become threats.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚔️</div>
              <h3 class="feature-title">Attack Simulation</h3>
              <p class="feature-description">Simulate sophisticated attacks to test your security measures and improve defenses.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3 class="feature-title">Detailed Reports</h3>
              <p class="feature-description">Comprehensive vulnerability reports with actionable insights and remediation guidance.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🤖</div>
              <h3 class="feature-title">AI-Powered Analytics</h3>
              <p class="feature-description">Machine learning models continuously learn from new threats to improve detection accuracy.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔗</div>
              <h3 class="feature-title">Telegram Integration</h3>
              <p class="feature-description">Real-time notifications via Telegram bot for critical security alerts.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📈</div>
              <h3 class="feature-title">Performance Tracking</h3>
              <p class="feature-description">Track security metrics over time and visualize improvements in your security posture.</p>
            </div>
          </div>
        </div>
      </section>
    `
  },

  renderPricing() {
    return `
      <section class="pricing" style="padding: 100px 0;">
        <div class="container">
          <h2 class="section-title">Simple, Transparent Pricing</h2>
          <div class="pricing-grid">
            <div class="pricing-card">
              <h3 class="pricing-title">Starter</h3>
              <div class="pricing-amount">$29<span class="pricing-period">/month</span></div>
              <ul class="pricing-features">
                <li>✓ Up to 5 projects</li>
                <li>✓ Basic scanning</li>
                <li>✓ Weekly reports</li>
                <li>✓ Email support</li>
              </ul>
              <button class="btn-primary btn-block">Get Started</button>
            </div>
            <div class="pricing-card featured">
              <div class="badge">POPULAR</div>
              <h3 class="pricing-title">Professional</h3>
              <div class="pricing-amount">$99<span class="pricing-period">/month</span></div>
              <ul class="pricing-features">
                <li>✓ Unlimited projects</li>
                <li>✓ Advanced scanning</li>
                <li>✓ Daily reports</li>
                <li>✓ Priority support</li>
              </ul>
              <button class="btn-primary btn-block">Start Free Trial</button>
            </div>
            <div class="pricing-card">
              <h3 class="pricing-title">Enterprise</h3>
              <div class="pricing-amount">Custom</div>
              <ul class="pricing-features">
                <li>✓ Everything in Pro</li>
                <li>✓ Dedicated support</li>
                <li>✓ Custom integrations</li>
              </ul>
              <button class="btn-secondary btn-block">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
    `
  },

  renderLogin() {
    return `
      <section class="auth-section">
        <div class="container">
          <div class="auth-wrapper">
            <div class="auth-card">
              <h1 class="auth-title">Welcome Back</h1>
              <p class="auth-subtitle">Sign in to access your security dashboard</p>
              <form onsubmit="app.handleLogin(event)" class="auth-form">
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-input" placeholder="you@example.com" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-input" placeholder="••••••••" required>
                </div>
                <button type="submit" class="btn-primary btn-block">Sign In</button>
              </form>
              <div class="auth-divider">Don't have an account?</div>
              <a class="btn-secondary btn-block" data-route="signup">Create Account</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  renderSignup() {
    return `
      <section class="auth-section">
        <div class="container">
          <div class="auth-wrapper">
            <div class="auth-card">
              <h1 class="auth-title">Create Account</h1>
              <p class="auth-subtitle">Join thousands securing their code</p>
              <form onsubmit="app.handleSignup(event)" class="auth-form">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <input type="text" class="form-input" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-input" placeholder="you@example.com" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-input" placeholder="••••••••" required>
                </div>
                <button type="submit" class="btn-primary btn-block">Create Account</button>
              </form>
              <div class="auth-divider">Already have an account?</div>
              <a class="btn-secondary btn-block" data-route="login">Sign In</a>
            </div>
          </div>
        </div>
      </section>
    `
  },

  renderDashboard() {
    if (!this.currentUser) {
      this.navigate("login")
      return ""
    }

    return `
      <section class="dashboard-section">
        <div class="container">
          <div class="dashboard-header">
            <h1 class="dashboard-title">Security Dashboard</h1>
            <p class="dashboard-subtitle">Welcome back, ${this.currentUser.name}</p>
          </div>

          <div class="dashboard-grid">
            <div class="stat-box">
              <div class="stat-box-icon">🔍</div>
              <div class="stat-box-label">Vulnerabilities Found</div>
              <div class="stat-box-value">12</div>
              <div class="stat-box-change">↑ 3 this week</div>
            </div>
            <div class="stat-box">
              <div class="stat-box-icon">⚡</div>
              <div class="stat-box-label">Critical Issues</div>
              <div class="stat-box-value">2</div>
              <div class="stat-box-change">0 this week</div>
            </div>
            <div class="stat-box">
              <div class="stat-box-icon">📊</div>
              <div class="stat-box-label">Scans Completed</div>
              <div class="stat-box-value">47</div>
              <div class="stat-box-change">↑ 8 this week</div>
            </div>
            <div class="stat-box">
              <div class="stat-box-icon">🛡️</div>
              <div class="stat-box-label">Security Score</div>
              <div class="stat-box-value">92%</div>
              <div class="stat-box-change success">↑ 5% this week</div>
            </div>
          </div>

          <div class="dashboard-content">
            <div class="content-card">
              <h2 class="content-title">Recent Vulnerabilities</h2>
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Severity</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Backend API</td>
                    <td><span class="badge-danger">Critical</span></td>
                    <td>SQL Injection</td>
                    <td>Today</td>
                  </tr>
                  <tr>
                    <td>Frontend App</td>
                    <td><span class="badge-warning">Medium</span></td>
                    <td>XSS Vulnerability</td>
                    <td>Yesterday</td>
                  </tr>
                  <tr>
                    <td>Mobile SDK</td>
                    <td><span class="badge-success">Low</span></td>
                    <td>Outdated Dependency</td>
                    <td>2 days ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    `
  },

  renderContact() {
    return `
      <section class="contact-section" style="padding: 100px 0;">
        <div class="container">
          <h2 class="section-title">Get in Touch</h2>
          <div class="contact-content">
            <div class="contact-info">
              <h3>Contact Information</h3>
              <p>Email: support@suffixsec.com</p>
              <p>Phone: +1 (800) 555-0100</p>
            </div>
          </div>
        </div>
      </section>
    `
  },

  handleLogin(event) {
    event.preventDefault()
    const form = event.target
    const email = form.querySelector('input[type="email"]').value
    const name = email.split("@")[0]

    const user = {
      name: name,
      email: email,
      plan: "Professional",
      joinDate: new Date().toLocaleDateString(),
    }

    localStorage.setItem("suffixsec_user", JSON.stringify(user))
    this.currentUser = user
    this.navigate("dashboard")
  },

  handleSignup(event) {
    event.preventDefault()
    const form = event.target
    const name = form.querySelector('input[type="text"]').value
    const email = form.querySelector('input[type="email"]').value

    const user = {
      name: name,
      email: email,
      plan: "Starter",
      joinDate: new Date().toLocaleDateString(),
    }

    localStorage.setItem("suffixsec_user", JSON.JSON.stringify(user))
    this.currentUser = user
    this.navigate("dashboard")
  },

  logout() {
    localStorage.removeItem("suffixsec_user")
    this.currentUser = null
    this.navigationHistory = ["home"]
    this.navigate("home")
  },

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {})
    }
  },
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  app.init()
})
