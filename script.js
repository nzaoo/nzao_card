// ===== Constants and Config =====
const CONFIG = {
  GREETING_HOURS: {
    MORNING: { start: 5, end: 12, text: 'Good morning ☀️', icon: '🌅' },
    AFTERNOON: { start: 12, end: 18, text: 'Good afternoon 🌤️', icon: '🌞' },
    NIGHT: { text: 'Good night 🌙', icon: '🌃' }
  },
  BIO_TEXT:
    "👋 Hey there, I'm Zaoo, a web developer in the learning phase, seeking knowledge and gaining experience to develop myself day by day.",
  TYPING_SPEED: 25,
  TYPING_PAUSE: 3000,
  PARALLAX_SENSITIVITY: 30,
  FADE_DELAY: 300,
  FADE_INTERVAL: 200,
  TOAST_DURATION: 2500
}

// ===== Cache DOM Elements =====
const elements = {
  subtitle: document.querySelector('.subtitle'),
  weatherIcon: document.getElementById('weather-icon'),
  phoneRow: document.querySelector('.info-row .label + div'),
  card: document.querySelector('.card'),
  bioText: document.getElementById('bio-text'),
  fadeItems: document.querySelectorAll('.fade-item')
}

// ===== Utility Functions =====
const getCurrentHour = () => new Date().getHours()

const getTimeOfDay = (hour) => {
  const { MORNING, AFTERNOON, NIGHT } = CONFIG.GREETING_HOURS
  if (hour >= MORNING.start && hour < MORNING.end) return MORNING
  if (hour >= AFTERNOON.start && hour < AFTERNOON.end) return AFTERNOON
  return NIGHT
}

const showToast = (msg) => {
  const toast = document.createElement('div')
  toast.textContent = msg
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#333',
    color: 'white',
    padding: '10px 18px',
    borderRadius: '8px',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    zIndex: '1000'
  })

  document.body.appendChild(toast)

  // Use requestAnimationFrame for smooth animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1'
    setTimeout(() => {
      toast.style.opacity = '0'
      setTimeout(() => toast.remove(), 300)
    }, CONFIG.TOAST_DURATION)
  })
}

// ===== Feature Implementations =====
const initGreetingAndWeather = () => {
  const hour = getCurrentHour()
  const timeOfDay = getTimeOfDay(hour)

  if (elements.subtitle) {
    elements.subtitle.textContent = timeOfDay.text
  }

  if (elements.weatherIcon) {
    elements.weatherIcon.textContent = timeOfDay.icon
  }
}

const initPhoneCopy = () => {
  if (!elements.phoneRow) return

  Object.assign(elements.phoneRow.style, {
    cursor: 'pointer'
  })
  elements.phoneRow.title = 'Click to copy'

  elements.phoneRow.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(elements.phoneRow.textContent)
      showToast('📞 Số điện thoại đã được sao chép!')
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err)
      showToast('❌ Không thể sao chép số điện thoại')
    }
  })
}

const initParallaxEffect = () => {
  if (!elements.card) return

  let animationId = null
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2

  const updateCardTransform = (clientX, clientY) => {
    const deltaX = (clientX - centerX) / CONFIG.PARALLAX_SENSITIVITY
    const deltaY = (clientY - centerY) / CONFIG.PARALLAX_SENSITIVITY
    elements.card.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`
  }

  document.addEventListener('mousemove', (e) => {
    if (animationId) cancelAnimationFrame(animationId)
    animationId = requestAnimationFrame(() => {
      updateCardTransform(e.clientX, e.clientY)
    })
  })
}

const initTypingEffect = () => {
  if (!elements.bioText) return

  let index = 0
  let timeoutId = null

  const typeChar = () => {
    if (index < CONFIG.BIO_TEXT.length) {
      elements.bioText.textContent += CONFIG.BIO_TEXT[index]
      index++
      timeoutId = setTimeout(typeChar, CONFIG.TYPING_SPEED)
    } else {
      timeoutId = setTimeout(() => {
        elements.bioText.textContent = ''
        index = 0
        typeChar()
      }, CONFIG.TYPING_PAUSE)
    }
  }

  typeChar()

  // Cleanup function for potential memory leaks
  window.addEventListener('beforeunload', () => {
    if (timeoutId) clearTimeout(timeoutId)
  })
}

const initFadeAnimation = () => {
  if (!elements.fadeItems.length) return

  elements.fadeItems.forEach((item, idx) => {
    setTimeout(() => {
      item.classList.add('show')
    }, CONFIG.FADE_DELAY + idx * CONFIG.FADE_INTERVAL)
  })
}

// ===== Initialize All Features =====
const init = () => {
  initGreetingAndWeather()
  initPhoneCopy()
  initParallaxEffect()
  initTypingEffect()
  initFadeAnimation()
}

// ===== Entry Point =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
