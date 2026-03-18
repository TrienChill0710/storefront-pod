/**
 * Preview Design Popup - Interactive Script
 * Progress flow: 10% → 80% → 90% → 100% → Done (Add to card)
 * Each step takes 2 seconds
 */

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('previewOverlay');
  const popup = document.getElementById('previewPopup');
  const closeBtn = document.getElementById('closeBtn');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const applyText = document.getElementById('applyText');
  const progressArea = document.getElementById('progressArea');
  const gradientOverlay = document.getElementById('gradientOverlay');
  const centerLoader = document.getElementById('centerLoader');
  const previewImage = document.getElementById('previewImage');
  const ctaBtn = document.getElementById('ctaBtn');
  const ctaText = ctaBtn.querySelector('.cta-text');
  const spinnerIcon = ctaBtn.querySelector('.spinner-icon');

  // Progress steps: each step runs every 2 seconds
  const steps = [
    { percent: 10,  text: 'Appling Number of Dogs...',    button: 'Starting',    blur: 24 },
    { percent: 80,  text: "Appling Mom's Skin Color...",  button: 'Analyzing',   blur: 14 },
    { percent: 90,  text: "Appling Mom's Hair Color...",  button: 'Almost done', blur: 6 },
    { percent: 100, text: 'Completed',                    button: 'Done',        blur: 1 },
  ];

  let currentStep = 0;
  let progressInterval = null;

  // Initialize first step immediately
  function init() {
    const firstStep = steps[0];
    updateProgress(firstStep.percent, firstStep.text);
    updateButton(firstStep.button);
    previewImage.style.filter = `blur(${firstStep.blur}px)`;

    // Start stepping through the rest after 2s
    progressInterval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        updateProgress(step.percent, step.text);
        updateButton(step.button);

        // Gradually reduce blur
        previewImage.style.filter = `blur(${step.blur}px)`;
      } else {
        clearInterval(progressInterval);
        // After 2s from "Done" state, transition to final state
        setTimeout(onProgressComplete, 2000);
      }
    }, 2000);
  }

  // Update progress bar and text
  function updateProgress(percent, text) {
    progressFill.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
    if (text) {
      applyText.textContent = text;
    }
  }

  // Update CTA button text
  function updateButton(text) {
    ctaText.textContent = text;
  }

  // Final state: hide overlay & loader, show product, "Add to card" button
  function onProgressComplete() {
    // Step 1: Fade out gradient, loader, and progress area
    gradientOverlay.classList.add('hidden');
    centerLoader.classList.add('hidden');
    progressArea.classList.add('hidden');

    // Step 2: After fade out (500ms), swap image
    setTimeout(() => {
      previewImage.style.transition = 'filter 0.6s ease, opacity 0.3s ease';
      previewImage.style.opacity = '0';

      setTimeout(() => {
        previewImage.src = 'assets/product_mockup.png';
        previewImage.style.filter = 'blur(0px)';
        previewImage.style.opacity = '1';
        previewImage.classList.add('loaded');

        // Step 3: After image loaded, update button
        spinnerIcon.style.display = 'none';
        ctaText.textContent = 'Add to card';
        ctaBtn.classList.add('cta-btn--primary');
        ctaBtn.disabled = false;
      }, 300);
    }, 500);
  }

  // Close popup
  function closePopup() {
    popup.style.animation = 'slideDown 0.3s ease-in forwards';
    overlay.style.animation = 'fadeOut 0.3s ease-in forwards';

    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  }

  // Event listeners
  closeBtn.addEventListener('click', closePopup);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  });

  ctaBtn.addEventListener('click', () => {
    if (!ctaBtn.disabled && ctaBtn.classList.contains('cta-btn--primary')) {
      console.log('Add to cart clicked!');
      // Handle add to cart action here
    }
  });

  // Start the animation
  init();
});

// Close animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(20px) scale(0.97);
    }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);
