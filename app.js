document.addEventListener('DOMContentLoaded', () => {
  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');
    
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
      // Toggle active state
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Simulator Teaser Logic ---
  const capitalSlider = document.getElementById('capitalSlider');
  const timeSlider = document.getElementById('timeSlider');
  const capitalVal = document.getElementById('capitalVal');
  const timeVal = document.getElementById('timeVal');
  const skillBtns = document.querySelectorAll('.skill-btn');
  const resultBox = document.getElementById('simulatorResult');

  let selectedSkills = new Set(['ninguna']);

  // Handle sliders displays
  if (capitalSlider && capitalVal) {
    capitalSlider.addEventListener('input', (e) => {
      capitalVal.textContent = `$${e.target.value}`;
      runDiagnosis();
    });
  }

  if (timeSlider && timeVal) {
    timeSlider.addEventListener('input', (e) => {
      timeVal.textContent = `${e.target.value} horas`;
      runDiagnosis();
    });
  }

  // Handle skill selection
  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const skill = btn.dataset.skill;
      
      if (skill === 'ninguna') {
        selectedSkills.clear();
        selectedSkills.add('ninguna');
        skillBtns.forEach(b => {
          if (b.dataset.skill !== 'ninguna') b.classList.remove('active');
        });
        btn.classList.add('active');
      } else {
        // Remove "ninguna"
        selectedSkills.delete('ninguna');
        const noneBtn = Array.from(skillBtns).find(b => b.dataset.skill === 'ninguna');
        if (noneBtn) noneBtn.classList.remove('active');
        
        if (selectedSkills.has(skill)) {
          selectedSkills.delete(skill);
          btn.classList.remove('active');
        } else {
          selectedSkills.add(skill);
          btn.classList.add('active');
        }
        
        if (selectedSkills.size === 0) {
          selectedSkills.add('ninguna');
          if (noneBtn) noneBtn.classList.add('active');
        }
      }
      runDiagnosis();
    });
  });

  function runDiagnosis() {
    const capital = parseInt(capitalSlider.value);
    const time = parseInt(timeSlider.value);
    
    let routeTitle = "";
    let routeDesc = "";
    let friction = 0;
    let mainTask = "";

    // Diagnosis algorithms
    if (capital < 150) {
      if (time < 6) {
        routeTitle = "Afiliación de Contenido Corto (Tiktok/Reels)";
        routeDesc = "Ideal para iniciar sin capital. Creas cuentas temáticas usando clips editados y vendes infoproductos de terceros a comisión.";
        friction = 25;
        mainTask = "Crear cuenta de creador y elegir 1 nicho rentable en Hotmart.";
      } else {
        routeTitle = "Servicios Freelance (Redacción / Edición de Video)";
        routeDesc = "Aprovechas tu alto tiempo disponible para intercambiarlo por ingresos en plataformas como Fiverr y Upwork sin invertir capital.";
        friction = 15;
        mainTask = "Montar portafolio con 3 proyectos ficticios y enviarlo a 10 prospectos.";
      }
    } else if (capital >= 150 && capital < 500) {
      if (time < 8) {
        routeTitle = "Micro-Agencia de Automatizaciones / IA";
        routeDesc = "Vendes soluciones simples con herramientas no-code a negocios locales que buscan ahorrar tiempo en tareas operativas.";
        friction = 35;
        mainTask = "Configurar una automatización de respuestas de Instagram con ManyChat para un negocio de tu zona.";
      } else {
        routeTitle = "Creador de Contenido & Infoproductores";
        routeDesc = "Empaquetas tu conocimiento (o el de un experto) en un ebook o curso corto y lo vendes usando anuncios de bajo presupuesto.";
        friction = 40;
        mainTask = "Escribir la estructura del temario de tu guía en Google Docs.";
      }
    } else { // Capital >= 500
      if (time < 6) {
        routeTitle = "E-Commerce bajo modelo High-Ticket Dropshipping";
        routeDesc = "Vendes productos caros importados directamente al cliente final, usando tu capital para pauta publicitaria optimizada de conversión rápida.";
        friction = 50;
        mainTask = "Buscar 3 proveedores locales que cuenten con stock inmediato para despachar.";
      } else {
        routeTitle = "Agencia Digital Completa (Growth Partner)";
        routeDesc = "Te conviertes en socio de crecimiento de marcas cobrando un porcentaje de las ventas que les generes, financiando herramientas premium.";
        friction = 30;
        mainTask = "Definir tu propuesta de valor de escala de facturación y mapear 15 prospectos.";
      }
    }

    // Apply skill adjustments to friction index
    if (selectedSkills.has('marketing') && (routeTitle.includes('Afiliación') || routeTitle.includes('E-Commerce') || routeTitle.includes('Agencia'))) {
      friction -= 10;
    }
    if (selectedSkills.has('ventas') && routeTitle.includes('Servicios')) {
      friction -= 10;
    }
    if (selectedSkills.has('programacion') && routeTitle.includes('Automatizaciones')) {
      friction -= 15;
    }
    if (selectedSkills.has('diseno') && routeTitle.includes('Freelance')) {
      friction -= 10;
    }

    // Safeguard friction limit
    if (friction < 10) friction = 10;
    if (friction > 95) friction = 95;

    // Display result with animations
    resultBox.innerHTML = `
      <div class="result-content" style="animation: fadeIn 0.4s ease-out forwards;">
        <h4>🏆 Ruta Recomendada: ${routeTitle}</h4>
        <p>${routeDesc}</p>
        <div class="result-metrics">
          <div class="metric-item">
            <span class="metric-lbl">Índice de Fricción</span>
            <span class="metric-val" style="color: ${friction < 35 ? '#10b981' : (friction < 60 ? '#3b82f6' : '#ef4444')}">${friction}%</span>
          </div>
          <div class="metric-item">
            <span class="metric-lbl">Paso Inicial Exacto</span>
            <span class="metric-val" style="font-size: 0.9rem; color: #fff; font-weight: 500;">${mainTask}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Run first diagnosis on load
  runDiagnosis();

  // --- Checkout Modal Logic ---
  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('.open-checkout-trigger');
  
  const step1 = document.getElementById('checkoutStep1');
  const step2 = document.getElementById('checkoutStep2');
  const successScreen = document.getElementById('checkoutSuccess');
  
  const form1 = document.getElementById('checkoutFormStep1');
  const form2 = document.getElementById('checkoutFormStep2');
  
  const progressStep1 = document.getElementById('progStep1');
  const progressStep2 = document.getElementById('progStep2');
  const progressStep3 = document.getElementById('progStep3');

  function openModal() {
    modal.classList.add('active');
    resetModal();
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  function resetModal() {
    step1.style.display = 'block';
    step2.style.display = 'none';
    successScreen.style.display = 'none';
    
    progressStep1.className = 'checkout-step active';
    progressStep2.className = 'checkout-step';
    progressStep3.className = 'checkout-step';
    
    form1.reset();
    form2.reset();
  }

  // Bind trigger buttons
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside the card
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle Step 1 Form Submit
  if (form1) {
    form1.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic input validation
      const name = document.getElementById('custName').value.trim();
      const email = document.getElementById('custEmail').value.trim();
      
      if (name && email) {
        // Save customer details to localStorage for the App
        localStorage.setItem('radar_username', name);
        localStorage.setItem('radar_useremail', email);
        
        // Proceed to Step 2
        step1.style.display = 'none';
        step2.style.display = 'block';
        
        progressStep1.className = 'checkout-step completed';
        progressStep2.className = 'checkout-step active';
      }
    });
  }

  // Handle Step 2 Form Submit (Simulate payment processing)
  if (form2) {
    form2.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form2.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Procesando Pago Seguro...';
      
      // Simulate API delay
      setTimeout(() => {
        step2.style.display = 'none';
        successScreen.style.display = 'block';
        
        progressStep2.className = 'checkout-step completed';
        progressStep3.className = 'checkout-step active';
        
        // Auto-redirect to app.html after 3.5 seconds
        setTimeout(() => {
          window.location.href = 'app.html';
        }, 3500);
      }, 2000);
    });
  }
});