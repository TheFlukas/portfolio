class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]', // теперь это .header__top
    burgerButton: '[data-js-header-burger-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)

    this.focusableElements = 'a, button'

    this.bindEvents()
  }

  onBurgerButtonClick = () => {
    const isActive = this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)

    // overlay = .header__top
    this.overlayElement.classList.toggle(this.stateClasses.isActive)

    document.documentElement.classList.toggle(this.stateClasses.isLock)

    // aria-hidden для всего кроме header
    document.querySelectorAll('body > *:not(header)')
      .forEach(el => el.setAttribute('aria-hidden', isActive ? 'true' : 'false'))

    // фокус в меню
    if (isActive) {
      const firstFocusable = this.overlayElement.querySelector(this.focusableElements)
      firstFocusable && firstFocusable.focus()
    }
  }

  onTrapFocus = e => {
    if (!this.overlayElement.classList.contains(this.stateClasses.isActive)) return

    const focusables = Array.from(this.overlayElement.querySelectorAll(this.focusableElements))
    if (!focusables.length) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    if (e.key === 'Escape') {
      this.onBurgerButtonClick()
      this.burgerButtonElement.focus()
    }
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
    document.addEventListener('keydown', this.onTrapFocus)
  }
}

export default Header
