/**
 * Global Button Effects Initializer
 * Automatically adds ripple and magnetic effects to buttons site-wide
 */

// Button selectors that should have effects
const BUTTON_SELECTORS = [
    '.btn-primary',
    '.btn-secondary',
    '.nav-cta',
    '.hpg-card-cta',
    '.quote-btn-primary',
    '.quote-btn-secondary',
    '.submit-btn',
    '.submit-btn-premium',
    '.mobile-nav-cta',
    '.floating-cta',
    '[data-btn-effects]', // Custom attribute for opt-in
].join(', ');

// Configuration
const CONFIG = {
    magneticStrength: 0.25,
    magneticRadius: 80,
    rippleDuration: 600,
};

/**
 * Create ripple effect at click position
 */
function createRipple(event) {
    const button = event.currentTarget;
    
    // Don't create ripple if button is disabled
    if (button.disabled || button.classList.contains('disabled')) return;
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    // Remove any existing ripples
    const existingRipples = button.querySelectorAll('.btn-ripple');
    existingRipples.forEach(r => r.remove());

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
    `;

    button.appendChild(ripple);

    // Clean up after animation
    setTimeout(() => {
        if (ripple.parentNode === button) {
            ripple.remove();
        }
    }, CONFIG.rippleDuration);
}

/**
 * Handle magnetic effect on mouse move
 */
function handleMagneticMove(event) {
    const button = event.currentTarget;
    
    // Skip if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distX = event.clientX - centerX;
    const distY = event.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < CONFIG.magneticRadius) {
        const strength = (1 - distance / CONFIG.magneticRadius) * CONFIG.magneticStrength;
        const moveX = distX * strength;
        const moveY = distY * strength;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

/**
 * Reset magnetic effect on mouse leave
 */
function handleMagneticLeave(event) {
    const button = event.currentTarget;
    button.style.transform = '';
}

/**
 * Initialize effects on a single button
 */
function initButton(button) {
    // Skip if already initialized
    if (button.dataset.effectsInit) return;
    
    // Add ripple effect
    button.addEventListener('click', createRipple);
    
    // Add magnetic effect (only for buttons with magnetic class or primary buttons)
    if (button.classList.contains('btn-magnetic') || 
        button.classList.contains('btn-primary') ||
        button.classList.contains('nav-cta')) {
        button.addEventListener('mousemove', handleMagneticMove);
        button.addEventListener('mouseleave', handleMagneticLeave);
    }
    
    // Mark as initialized
    button.dataset.effectsInit = 'true';
}

/**
 * Initialize effects on all matching buttons
 */
function initAllButtons() {
    const buttons = document.querySelectorAll(BUTTON_SELECTORS);
    buttons.forEach(initButton);
}

/**
 * Observe DOM for dynamically added buttons
 */
function observeDOM() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if the added node is a button
                    if (node.matches && node.matches(BUTTON_SELECTORS)) {
                        initButton(node);
                    }
                    // Check for buttons within the added node
                    if (node.querySelectorAll) {
                        const buttons = node.querySelectorAll(BUTTON_SELECTORS);
                        buttons.forEach(initButton);
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    return observer;
}

/**
 * Main initialization function
 * Call this once when the app loads
 */
export function initButtonEffects() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAllButtons();
            observeDOM();
        });
    } else {
        initAllButtons();
        observeDOM();
    }
}

/**
 * Manually trigger ripple effect (for programmatic clicks)
 */
export function triggerRipple(button, x = null, y = null) {
    const rect = button.getBoundingClientRect();
    const event = {
        currentTarget: button,
        clientX: x ?? rect.left + rect.width / 2,
        clientY: y ?? rect.top + rect.height / 2,
    };
    createRipple(event);
}

export default initButtonEffects;
