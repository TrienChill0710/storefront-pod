/**
 * Preview Design Popup — AI Orb Loading Effect
 * 
 * PHASE 1: Loading (0% → 100%)
 *   - Orb plasma effect fills the image area
 *   - Progress bar advances with randomized increments
 *   - Label changes per progress stage
 * 
 * PHASE 2: Complete (100%)
 *   - Orb fades out, design image fades in
 *   - Progress hides, CTA becomes active
 */

document.addEventListener('DOMContentLoaded', () => {
  // —— DOM Elements ——
  const overlay       = document.getElementById('previewOverlay');
  const popup         = document.getElementById('previewPopup');
  const closeBtn      = document.getElementById('closeBtn');
  const orbContainer  = document.getElementById('orbContainer');
  const orbLabel      = document.getElementById('orbLabel');
  const previewImage  = document.getElementById('previewImage');
  const progressSection = document.getElementById('progressSection');
  const progressFill  = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const progressLabel = document.getElementById('progressLabel');
  const ctaBtn        = document.getElementById('ctaBtn');
  const ctaText       = document.getElementById('ctaText');
  const spinnerIcon   = document.getElementById('spinnerIcon');

  // —— State ——
  let progress = 0;
  let intervalId = null;
  let imageLoaded = false;

  // Pre-load the reveal image
  const revealImg = new Image();
  revealImg.src = 'https://picsum.photos/320/220';
  revealImg.onload = () => { imageLoaded = true; };

  // —— Stage Labels ——
  function getStageLabel(pct) {
    if (pct <= 30) return 'Applying your customization...';
    if (pct <= 60) return 'Rendering design details...';
    if (pct <= 90) return 'Almost there...';
    if (pct <= 99) return 'Finalizing...';
    return 'Your design is ready!';
  }

  function getOrbLabel(pct) {
    if (pct < 100) return 'Generating your design...';
    return '';
  }

  // —— Update UI ——
  function updateUI(pct) {
    progressFill.style.width = `${pct}%`;
    progressPercent.textContent = `${Math.round(pct)}%`;
    progressLabel.textContent = getStageLabel(pct);
    orbLabel.textContent = getOrbLabel(pct);
  }

  // —— Progress Simulation ——
  function startProgress() {
    intervalId = setInterval(() => {
      if (progress >= 99) {
        // Hold at 99%, then jump to 100 after 1s
        clearInterval(intervalId);
        setTimeout(() => {
          progress = 100;
          updateUI(100);
          onComplete();
        }, 1000);
        return;
      }

      let increment;
      if (progress < 80) {
        // Normal speed: 1–4%
        increment = 1 + Math.random() * 3;
      } else {
        // Slow down: 0.3–0.8%
        increment = 0.3 + Math.random() * 0.5;
      }

      progress = Math.min(progress + increment, 99);
      updateUI(progress);
    }, 400);
  }

  // —— Phase 2: Complete Transition ——
  function onComplete() {
    // 1) Fade out orb
    orbContainer.classList.add('fade-out');

    // 2) After orb fades (800ms), reveal the image
    setTimeout(() => {
      // Ensure picsum image is set on the img element
      previewImage.src = revealImg.src;
      previewImage.classList.add('revealed');

      // 3) Hide progress area
      progressSection.classList.add('hidden');

      // 4) Activate the CTA button
      setTimeout(() => {
        spinnerIcon.classList.add('hidden');
        ctaText.textContent = 'View full preview';
        ctaBtn.disabled = false;
        ctaBtn.classList.add('active');
      }, 300);
    }, 800);
  }

  // —— Close Popup ——
  function closePopup() {
    popup.style.animation = 'slideDown 0.3s ease-in forwards';
    overlay.style.animation = 'fadeOut 0.3s ease-in forwards';
    setTimeout(() => {
      overlay.style.display = 'none';
      clearInterval(intervalId);
    }, 300);
  }

  // —— Event Listeners ——
  closeBtn.addEventListener('click', closePopup);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });

  ctaBtn.addEventListener('click', () => {
    if (!ctaBtn.disabled && ctaBtn.classList.contains('active')) {
      console.log('View full preview clicked!');
      // Handle preview action here
    }
  });

  // —— Init ——
  updateUI(0);
  startProgress();
});
