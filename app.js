document.addEventListener('DOMContentLoaded', () => {
  
  // --- SESSION CHECK ---
  const existingUser = localStorage.getItem('radar_username');
  const existingEmail = localStorage.getItem('radar_useremail');
  
  if (existingUser && existingEmail) {
    // Already logged in, redirect directly to dashboard
    window.location.href = 'app.html';
    return;
  }

  // --- LOGIN SUBMISSION ---
  const loginForm = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('custName');
      const emailInput = document.getElementById('custEmail');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      
      if (name && email) {
        // Disable form and show access status
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verificando acceso...';
        
        // Save details to localStorage
        localStorage.setItem('radar_username', name);
        localStorage.setItem('radar_useremail', email);
        
        // Custom animation transition delay
        setTimeout(() => {
          submitBtn.textContent = '¡Acceso Concedido!';
          submitBtn.style.background = 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-blue) 100%)';
          
          setTimeout(() => {
            window.location.href = 'app.html';
          }, 600);
        }, 1000);
      }
    });
  }

  // --- PWA SERVICE WORKER & INSTALL PROMPT LOGIC ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('[PWA] Service Worker registrado con éxito', reg))
        .catch(err => console.error('[PWA] Error registrando Service Worker', err));
    });
  }

  let deferredPrompt;
  const pwaInstallBanner = document.getElementById('pwaInstallBanner');
  const pwaInstallBtn = document.getElementById('pwaInstallBtn');
  const pwaCloseBannerBtn = document.getElementById('pwaCloseBannerBtn');
  
  const iosInstallTooltip = document.getElementById('iosInstallTooltip');
  const iosCloseTooltipBtn = document.getElementById('iosCloseTooltipBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBanner) {
      pwaInstallBanner.style.display = 'block';
    }
  });

  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        deferredPrompt = null;
        if (pwaInstallBanner) pwaInstallBanner.style.display = 'none';
      });
    });
  }

  if (pwaCloseBannerBtn && pwaInstallBanner) {
    pwaCloseBannerBtn.addEventListener('click', () => {
      pwaInstallBanner.style.display = 'none';
    });
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  function isInStandaloneMode() {
    return ('standalone' in window.navigator) && (window.navigator.standalone);
  }

  if (isIOS() && !isInStandaloneMode()) {
    setTimeout(() => {
      if (iosInstallTooltip) {
        iosInstallTooltip.style.display = 'block';
        setTimeout(() => {
          iosInstallTooltip.style.display = 'none';
        }, 12000);
      }
    }, 3000);
  }

  if (iosCloseTooltipBtn && iosInstallTooltip) {
    iosCloseTooltipBtn.addEventListener('click', () => {
      iosInstallTooltip.style.display = 'none';
    });
  }

  window.addEventListener('appinstalled', (evt) => {
    console.log('[PWA] Radar de Ingresos instalado con éxito');
    if (pwaInstallBanner) pwaInstallBanner.style.display = 'none';
  });
});
