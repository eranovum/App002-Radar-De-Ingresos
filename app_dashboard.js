document.addEventListener('DOMContentLoaded', () => {
  // --- 1. CONFIGURACIÓN INICIAL Y BIENVENIDA ---
  const userName = localStorage.getItem('radar_username') || 'Emprendedor';
  const userEmail = localStorage.getItem('radar_useremail') || 'info@ejemplo.com';
  
  // Actualizar perfil de usuario en Sidebar
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userAvatar = document.getElementById('userAvatar');
  if (userNameDisplay) userNameDisplay.textContent = userName;
  if (userAvatar) userAvatar.textContent = userName.charAt(0).toUpperCase();

  // Mostrar fecha actual formateada
  const currentDateDisplay = document.getElementById('currentDateDisplay');
  if (currentDateDisplay) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = new Date().toLocaleDateString('es-ES', options);
  }

  // --- 2. NAVEGACIÓN ENTRE SECCIONES (TABS) ---
  const allNavLinks = document.querySelectorAll('.nav-item, .bottom-nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const panelTitle = document.getElementById('panelTitle');

  allNavLinks.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPanelId = item.dataset.target;
      
      // Sincronizar estado activo de todos los links de navegación con el mismo target
      allNavLinks.forEach(nav => {
        if (nav.dataset.target === targetPanelId) {
          nav.classList.add('active');
        } else {
          nav.classList.remove('active');
        }
      });
      
      // Activar panel
      tabPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Actualizar título de cabecera
      const titleSpan = item.querySelector('span');
      if (panelTitle && titleSpan) {
        panelTitle.textContent = titleSpan.textContent;
      }

      // Cerrar sidebar si estuviese abierto
      const sidebar = document.getElementById('sidebar');
      if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }

      // Si navega a Checklist de Arranque, recargar contenidos
      if (targetPanelId === 'checklist-panel') {
        loadChecklistArranque();
      }
    });
  });

  // Cerrar Sesión (Logout)
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('radar_username');
    localStorage.removeItem('radar_useremail');
    localStorage.removeItem('radar_diagnosis_completed');
    localStorage.removeItem('radar_assigned_route_id');
    localStorage.removeItem('radar_plan_progress');
    window.location.href = 'index.html';
  };

  const headerLogoutBtn = document.getElementById('headerLogoutBtn');
  const sidebarLogoutLink = document.getElementById('sidebarLogoutLink');

  if (headerLogoutBtn) headerLogoutBtn.addEventListener('click', handleLogout);
  if (sidebarLogoutLink) sidebarLogoutLink.addEventListener('click', handleLogout);


  // --- 3. BASE DE DATOS DE 15 RUTAS DE INGRESOS PASIVOS ---
  const routesDatabase = [
    {
      id: 1,
      title: "Afiliación de Contenido Corto (TikTok/Reels)",
      desc: "Creación de cuentas temáticas en redes sociales publicando clips de video atractivos de terceros (desarrollo personal, negocios, etc.) y vendiendo infoproductos a comisión mediante enlaces en tu perfil.",
      difficulty: "baja",
      baseFriction: 20,
      minCapital: 0,
      minTime: 4,
      matchSkills: ["video", "redaccion"],
      initialTask: "Crear una cuenta tematica en TikTok/Instagram y afiliarse a un producto digital de $20-$40 en Hotmart.",
      tools: [
        { name: "Hotmart", desc: "Plataforma de infoproductos para afiliarse gratis y cobrar comisiones.", url: "https://hotmart.com" },
        { name: "CapCut", desc: "Editor de video gratuito para PC/móvil con plantillas y subtítulos automáticos.", url: "https://capcut.com" },
        { name: "TikTok Creative Center", desc: "Para buscar canciones y ganchos virales en tendencia.", url: "https://ads.tiktok.com/business/creativecenter" }
      ],
      templates: [
        {
          name: "Guion de Video Viral (30s)",
          code: "Gancho (0-3s): \"Por esta razón el 99% de las personas nunca logra sus metas...\"\r\nContenido (3-20s): \"El error número 1 no es la falta de talento, sino la falta de un plan matemático claro. Si no sabes cuánto te cuesta cada paso, vas a ciegas.\"\r\nLlamado a la Acción (20-30s): \"He dejado una herramienta gratuita en mi perfil para calcular tu plan en 5 minutos. Ve ahora mismo antes de que la quite.\""
        },
        {
          name: "Bio Optimizada de Instagram",
          code: "👇 ¿Buscando tu ruta de ingresos?\r\n🎯 Te enseño a filtrar la niebla de opciones.\r\n🎁 Reclama tu diagnóstico de 15 min GRATIS aquí:\r\n[TU_ENLACE_DE_AFILIADO]"
        }
      ]
    },
    {
      id: 2,
      title: "Servicios Freelance de Edición / Redacción",
      desc: "Ofrecer habilidades de edición de video rápido para creadores de contenido o redacción de correos y guiones para emprendedores en plataformas globales.",
      difficulty: "baja",
      baseFriction: 15,
      minCapital: 0,
      minTime: 8,
      matchSkills: ["video", "redaccion", "diseno"],
      initialTask: "Crear 3 muestras de trabajo ficticias y abrir tu perfil en Fiverr y Upwork.",
      tools: [
        { name: "Fiverr", desc: "Plataforma para ofrecer tus microservicios digitales de forma directa.", url: "https://fiverr.com" },
        { name: "Upwork", desc: "Bolsa de trabajo para postular a ofertas freelance de empresas internacionales.", url: "https://upwork.com" },
        { name: "Loom", desc: "Para grabar propuestas rápidas de video enviadas a clientes potenciales.", url: "https://loom.com" }
      ],
      templates: [
        {
          name: "Propuesta Fría a Creadores de Contenido",
          code: "Hola [Nombre del Creador],\r\nMe encanta tu canal, especialmente el video sobre [Tema]. Noté que tus Shorts no tienen subtítulos dinámicos de neón, los cuales suben la retención un 40%.\r\nHe editado un clip de 30 segundos de tu último video largo para mostrarte la diferencia. Te lo adjunto gratis.\r\nSi te interesa subir tu retención este mes, responde a este mensaje. ¡Un saludo!\r\n[Tu Nombre]"
        }
      ]
    },
    {
      id: 3,
      title: "Micro-Agencia de Automatizaciones No-Code / IA",
      desc: "Creación y venta de chatbots conversacionales de Instagram (ManyChat) o flujos automáticos de leads mediante Make/Zapier para comercios y profesionales locales.",
      difficulty: "moderada",
      baseFriction: 30,
      minCapital: 50,
      minTime: 6,
      matchSkills: ["programacion", "ventas"],
      initialTask: "Configurar un chatbot de respuestas automáticas en tu propia cuenta usando la versión gratuita de ManyChat.",
      tools: [
        { name: "ManyChat", desc: "Herramienta oficial autorizada por Meta para automatizar Instagram y WhatsApp.", url: "https://manychat.com" },
        { name: "Make (Integromat)", desc: "Plataforma no-code potente para conectar bases de datos con correos e IA.", url: "https://make.com" },
        { name: "ChatGPT API", desc: "Para dar inteligencia y respuestas complejas a tus chatbots configurados.", url: "https://openai.com/api/" }
      ],
      templates: [
        {
          name: "Pitch para Negocios de Instagram",
          code: "Hola [Dueño de Negocio],\r\nNoté que al comentar tu última publicación tardan más de 2 horas en responder con el enlace de compra.\r\nEsto hace que pierdan hasta el 50% de las ventas por impulso.\r\nPuedo configurarles un asistente de IA oficial que responda instantáneamente por MD en menos de 2 segundos.\r\n¿Te interesaría ver una demo gratuita de 1 minuto para tu cuenta? Dime un 'Sí' y te la envío.\r\nAtentamente, [Tu Nombre]"
        }
      ]
    },
    {
      id: 4,
      title: "Creador de Infoproductos y Guías Digitales",
      desc: "Empaquetar un conocimiento específico tuyo o de un experto en un ebook, plantilla o minicurso, distribuyéndolo de forma global en plataformas sin costes de inventario.",
      difficulty: "moderada",
      baseFriction: 35,
      minCapital: 50,
      minTime: 10,
      matchSkills: ["redaccion", "diseno", "marketing"],
      initialTask: "Escribir el índice detallado de tu guía digital y crear la portada 3D en Canva.",
      tools: [
        { name: "Gumroad", desc: "Plataforma gratuita para subir productos digitales y procesar cobros de inmediato.", url: "https://gumroad.com" },
        { name: "Canva", desc: "Editor visual ideal para maquetar ebooks y crear banners promocionales gratis.", url: "https://canva.com" },
        { name: "Mailerlite", desc: "Herramienta de email marketing gratis para hasta 1,000 suscriptores.", url: "https://mailerlite.com" }
      ],
      templates: [
        {
          name: "Estructura de la Oferta Irresistible (Landing Page)",
          code: "Título: [Cómo Resolver Problema X Sin Sufrir Y]\r\nSubtítulo: Una guía práctica paso a paso diseñada para profesionales ocupados que no tienen tiempo de ver tutoriales teóricos.\r\n¿Qué incluye?\r\n- Manual PDF de 45 páginas con planes exactos.\r\n- Plantilla de Notion lista para usar.\r\n- Garantía de devolución de 7 días.\r\nPrecio especial de lanzamiento: Solo $17 USD (Valor normal $49 USD)."
        }
      ]
    },
    {
      id: 5,
      title: "E-Commerce High-Ticket Dropshipping",
      desc: "Creación de una tienda online de productos de alto valor (muebles, equipamiento deportivo, maquinaria menor) de proveedores nacionales que envían directamente al cliente final, usando anuncios optimizados en Google Search.",
      difficulty: "alta",
      baseFriction: 55,
      minCapital: 600,
      minTime: 8,
      matchSkills: ["marketing", "ventas"],
      initialTask: "Mapear 5 proveedores locales de productos de más de $200 USD y acordar despacho directo.",
      tools: [
        { name: "Shopify", desc: "La plataforma líder para crear tu tienda virtual en minutos.", url: "https://shopify.com" },
        { name: "Google Merchant Center", desc: "Para listar tus productos directamente en la sección de Google Shopping.", url: "https://google.com/retail" }
      ],
      templates: [
        {
          name: "Email de Alianza de Distribución con Proveedor",
          code: "Estimado Encargado de Ventas de [Nombre de Proveedor],\r\nMi nombre es [Tu Nombre], director comercial de [Tu Marca]. Estamos expandiendo nuestro catálogo online en la categoría de [Categoría de Productos] en el mercado nacional.\r\nNos interesa listar sus productos en nuestra plataforma. Nosotros nos encargamos de todo el marketing digital y facturación al cliente.\r\nUna vez pagado, les enviamos la orden de despacho junto con la etiqueta para que su bodega lo despache.\r\n¿Con quién podría agendar una llamada de 5 minutos esta semana para revisar condiciones comerciales?\r\nSaludos cordiales,\r\n[Tu Nombre]"
        }
      ]
    },
    {
      id: 6,
      title: "Agencia Digital Completa (Growth Partner)",
      desc: "Convertirte en socio de crecimiento de marcas medianas o creadores consolidados. Te encargas de optimizar sus anuncios y correos cobrando un porcentaje fijo de la facturación incremental.",
      difficulty: "alta",
      baseFriction: 45,
      minCapital: 150,
      minTime: 12,
      matchSkills: ["marketing", "ventas", "redaccion"],
      initialTask: "Diseñar tu oferta comercial basada en rendimiento y prospectar 15 creadores o agencias locales.",
      tools: [
        { name: "Meta Ads Manager", desc: "Administrador comercial para pautar en Facebook e Instagram.", url: "https://business.facebook.com" },
        { name: "Klaviyo", desc: "Herramienta avanzada de email marketing especializada en e-commerce.", url: "https://klaviyo.com" }
      ],
      templates: [
        {
          name: "Propuesta Comercial Basada en Rendimiento",
          code: "Nuestra Oferta:\r\nOptimizamos tus campañas publicitarias y secuencias de email durante 30 días costo CERO.\r\nNo cobramos tarifa mensual de servicio (fee).\r\nSolo cobramos un 15% de la facturación extra que comprobemos haberte generado por encima de tu promedio actual.\r\nSi no te generamos ventas adicionales, no nos debes absolutamente nada."
        }
      ]
    },
    {
      id: 7,
      title: "Newsletter de Nicho de Pago (Substack)",
      desc: "Curación de noticias, datos analizados u oportunidades semanales de un sector específico (tecnología, finanzas, empleo remoto) distribuidas vía correo bajo suscripción mensual premium.",
      difficulty: "baja",
      baseFriction: 25,
      minCapital: 0,
      minTime: 6,
      matchSkills: ["redaccion", "marketing"],
      initialTask: "Elegir un nicho informativo y configurar tu publicación gratuita en Substack.",
      tools: [
        { name: "Substack", desc: "Herramienta ideal para publicar newsletters y cobrar suscripciones integradas.", url: "https://substack.com" },
        { name: "TweetDeck / X Pro", desc: "Para monitorear tendencias e información de nicho al instante.", url: "https://twitter.com" }
      ],
      templates: [
        {
          name: "Estructura del Primer Envío Semanal",
          code: "Asunto: 🎯 [Resumen del Sector] + Tendencias de la Semana\r\nIntroducción (100 palabras): Lo que cambió esta semana en el sector y por qué te afecta.\r\nBloque 1: Análisis del dato clave de la semana.\r\nBloque 2: 3 recursos curados recomendados.\r\nLlamado a la acción: Pásate al plan de pago por $5/mes para acceder a nuestra base de datos histórica exclusiva."
        }
      ]
    },
    {
      id: 8,
      title: "Impresión bajo Demanda (Print on Demand)",
      desc: "Diseñar camisetas, tazas o fundas de teléfono ingeniosas y listarlas en tiendas virtuales. La producción y envío al cliente final se subcontrata a un proveedor automático que solo cobra al concretarse la venta.",
      difficulty: "moderada",
      baseFriction: 30,
      minCapital: 100,
      minTime: 6,
      matchSkills: ["diseno", "marketing"],
      initialTask: "Subir 3 diseños originales orientados a un público apasionado (médicos, programadores, cat lovers) en Printful conectado a Etsy.",
      tools: [
        { name: "Printify / Printful", desc: "Proveedores integrables que imprimen y despachan por ti.", url: "https://printify.com" },
        { name: "Etsy", desc: "Marketplace global con millones de compradores buscando diseños creativos.", url: "https://etsy.com" }
      ],
      templates: [
        {
          name: "Fórmula de Título Optimizada para SEO de Etsy",
          code: "Camiseta de Algodón [Nicho/Profesión] - Regalo Divertido para [Público Objetivo] - Ropa de Diseño Creativo Cómoda - Unisex [Elemento Clave del Diseño]"
        }
      ]
    },
    {
      id: 9,
      title: "Desarrollo de Micro-SaaS (No-Code)",
      desc: "Crear una pequeña aplicación web o extensión de navegador resuelva un problema muy acotado para un nicho laboral usando constructores visuales, cobrando una membresía mensual baja.",
      difficulty: "alta",
      baseFriction: 50,
      minCapital: 200,
      minTime: 12,
      matchSkills: ["programacion", "marketing"],
      initialTask: "Mapear un proceso manual repetitivo en tu sector laboral que tome más de 30 minutos al día para automatizar.",
      tools: [
        { name: "Bubble", desc: "La plataforma de desarrollo no-code web más completa y escalable.", url: "https://bubble.io" },
        { name: "Glide", desc: "Ideal para crear aplicaciones móviles progresivas a partir de hojas de cálculo.", url: "https://glideapps.com" }
      ],
      templates: [
        {
          name: "Estructura de la Propuesta MVP",
          code: "Funcionalidad Única (Core Feature): Exportar en 1 clic los comentarios de LinkedIn a un Excel limpio con correos corporativos detectados.\r\nAudiencia Inicial: Reclutadores IT y Agencias de Ventas.\r\nPrecio: $9 USD/mes de suscripción recurrente."
        }
      ]
    },
    {
      id: 10,
      title: "Canal Automatizado de YouTube (Faceless)",
      desc: "Crear un canal temático sin mostrar tu rostro contratando freelancers económicos o usando IA para la locución, redacción de guion y edición visual de videos explicativos monetizando con Google Adsense.",
      difficulty: "alta",
      baseFriction: 45,
      minCapital: 100,
      minTime: 6,
      matchSkills: ["video", "redaccion"],
      initialTask: "Abrir canal temático y redactar el guion de tu primer video informativo de 8 minutos usando IA.",
      tools: [
        { name: "ElevenLabs", desc: "Herramienta líder de generación de voz con IA ultra realista en español.", url: "https://elevenlabs.io" },
        { name: "CapCut Pro", desc: "Para compilar clips de stock y música sin copyright rápidamente.", url: "https://capcut.com" }
      ],
      templates: [
        {
          name: "Estructura de Guion Enganchador (8 min)",
          code: "0:00 - 0:30 (El Gancho): Promete revelar el secreto oculto de [Tema] sin aburrir.\r\n0:30 - 1:30 (La Introducción): Explica el contexto y por qué la mayoría de personas se equivoca.\r\n1:30 - 7:00 (Los Puntos Claves): 3 revelaciones explicadas dinámicamente con clips cada 4 segundos.\r\n7:00 - 8:00 (Outro): Llamado a suscribirse y sugerencia de hacer clic en el siguiente video recomendado."
        }
      ]
    },
    {
      id: 11,
      title: "Venta de Plantillas Digitales (Notion / Canva)",
      desc: "Diseñar espacios de trabajo en Notion para nichos o kits de gráficos en Canva y venderlos de forma recurrente mediante una tienda online minimalista.",
      difficulty: "baja",
      baseFriction: 20,
      minCapital: 0,
      minTime: 4,
      matchSkills: ["diseno", "marketing"],
      initialTask: "Construir tu primera plantilla interactiva de Notion orientada a organizar finanzas o proyectos.",
      tools: [
        { name: "Notion", desc: "Herramienta organizativa donde crearás y compartirás tus plantillas.", url: "https://notion.so" },
        { name: "Gumroad", desc: "Para procesar los pagos y entregar de forma segura la plantilla compartida.", url: "https://gumroad.com" }
      ],
      templates: [
        {
          name: "Mensaje promocional en Grupos Temáticos",
          code: "Hola a todos,\r\nMe costaba mucho organizar mis clientes freelance usando libretas y hojas sueltas, así que diseñé este 'Freelance Dashboard' sencillo en Notion durante el fin de semana.\r\nPermite controlar facturas, tareas y entregas en un solo lugar.\r\nSi alguno le sirve, lo he subido gratis para la comunidad por tiempo limitado. Les dejo el enlace abajo:\r\n[ENLACE_DE_GUMROAD]"
        }
      ]
    },
    {
      id: 12,
      title: "Consultoría de SEO Local y Google Maps",
      desc: "Optimizar el perfil comercial de negocios cercanos en Google Maps (fotos, palabras clave, opiniones) para que consigan llamadas orgánicas cobrando un pago único o mensual recurrente.",
      difficulty: "moderada",
      baseFriction: 25,
      minCapital: 0,
      minTime: 6,
      matchSkills: ["marketing", "ventas"],
      initialTask: "Escribir una lista de 10 negocios de tu zona en Google Maps sin reclamar o sin opiniones recientes.",
      tools: [
        { name: "Google Perfil de Negocio", desc: "Plataforma oficial gratuita de Google para gestionar perfiles locales.", url: "https://google.com/business" },
        { name: "Canva", desc: "Para crear banners y portadas profesionales para los perfiles de tus clientes.", url: "https://canva.com" }
      ],
      templates: [
        {
          name: "Guion de Llamada / Visita en Frío",
          code: "\"Hola, disculpa. Estaba buscando [Servicio del Negocio, ej: cerrajero/dentista] por Maps en mi celular y me costó mucho encontrar su dirección exacta porque no tienen su perfil reclamado oficialmente en Google.\r\nEsto hace que pierdan clientes diarios frente a [Competencia directa].\r\nYo me dedico a configurar perfiles de negocios locales para que salgan en los primeros resultados. ¿Podría hablar con el encargado para comentarle cómo funciona en 2 minutos?\""
        }
      ]
    },
    {
      id: 13,
      title: "Manejo de Comunidades Pagadas (Skool)",
      desc: "Crear y liderar un grupo exclusivo de debate sobre un nicho de interés común cobrando una cuota de acceso mensual baja, proveyendo valor continuo mediante recursos y dinámicas grupales.",
      difficulty: "moderada",
      baseFriction: 35,
      minCapital: 100,
      minTime: 10,
      matchSkills: ["ventas", "redaccion", "marketing"],
      initialTask: "Definir el gran beneficio que obtendrán tus miembros y estructurar las temáticas del grupo en Skool.",
      tools: [
        { name: "Skool", desc: "Plataforma premium e intuitiva diseñada para albergar comunidades y cursos integrados.", url: "https://skool.com" },
        { name: "Discord", desc: "Alternativa gratuita para montar canales de chat temáticos cerrados.", url: "https://discord.com" }
      ],
      templates: [
        {
          name: "Copy de Página de Membresía Skool",
          code: "La Comunidad de [Nicho/Objetivo]\r\nEl único grupo donde profesionales latinoamericanos comparten semanalmente tácticas reales sobre [Tema].\r\n¿Qué obtienes?\r\n- Llamada grupal de preguntas y respuestas semanal.\r\n- Biblioteca de plantillas y recursos compartidos.\r\n- Red de contactos activa del sector.\r\nPrecio: Solo $15 USD al mes. Cancela cuando quieras."
        }
      ]
    },
    {
      id: 14,
      title: "Cierre de Ventas Remoto (Remote Closer)",
      desc: "Intermediar llamadas de venta en nombre de coaches, infoproductores o agencias extranjeras de alto costo. Cobras una comisión del 10% al 20% por cada negocio cerrado desde tu casa.",
      difficulty: "moderada",
      baseFriction: 30,
      minCapital: 0,
      minTime: 10,
      matchSkills: ["ventas"],
      initialTask: "Anotar tu experiencia comercial y enviar 10 propuestas a coaches e infoproductores en Instagram.",
      tools: [
        { name: "Calendly", desc: "Herramienta que usarán tus prospectos para agendar llamadas en tu agenda digital.", url: "https://calendly.com" },
        { name: "Zoom", desc: "Para realizar las videoconferencias de cierre de venta de forma profesional.", url: "https://zoom.us" }
      ],
      templates: [
        {
          name: "Mensaje a Coaches de Alto Valor (Instagram DM)",
          code: "Hola [Nombre del Coach],\r\nExcelente tu contenido sobre [Tema]. Me imagino que con la cantidad de leads calificados que te escriben por DM, tu tiempo para agendar llamadas de venta uno a uno está colapsado.\r\nSoy un Closer de Ventas certificado especializado en tu nicho.\r\nPuedo encargarme de gestionar tus DMs calificados y agendar/cerrar las llamadas a comisión por éxito.\r\n¿Te interesaría delegar esta tarea y liberar tu agenda esta semana? Un saludo,\r\n[Tu Nombre]"
        }
      ]
    },
    {
      id: 15,
      title: "Agencia de Contenido UGC (User Generated Content)",
      desc: "Actuar como intermediario conectando a creadores independientes que graban videos naturales con marcas locales que buscan pautar anuncios creíbles en redes sociales.",
      difficulty: "moderada",
      baseFriction: 30,
      minCapital: 50,
      minTime: 8,
      matchSkills: ["marketing", "ventas", "video"],
      initialTask: "Reclutar 5 creadores de contenido emergentes y armar un portafolio digital en formato PDF.",
      tools: [
        { name: "CapCut mobile", desc: "Para compilar y empaquetar los videos creados antes del envío.", url: "https://capcut.com" },
        { name: "Google Drive", desc: "Para almacenar los videos en crudo y compartirlos de manera organizada.", url: "https://drive.google.com" }
      ],
      templates: [
        {
          name: "Propuesta de UGC para Marcas Modernas",
          code: "Hola Equipo de [Marca],\r\nNoté que sus anuncios pagados de Instagram utilizan imágenes estáticas de producto tradicionales.\r\nHoy en día, los videos caseros tipo 'UGC' generados por clientes reales convierten un 300% más en conversión de compra.\r\nTengo un equipo de 5 creadores listos para grabar demostraciones reales y testimonios orgánicos de su producto desde $90 USD por lote de 3 videos.\r\n¿Podemos coordinar para enviarles algunas muestras similares que ya hemos grabado? Saludos,\r\n[Tu Nombre]"
        }
      ]
    }
  ];

  // Generador de Tareas Diarias basado en la categoría de ruta
  function generate30DayTasks(routeId, routeTitle) {
    const tasks = [];
    
    // Route 1: Short-form Affiliate
    if (routeId === 1) {
      tasks.push({ day: 1, title: "Investigación de Nichos Virales", desc: "Elige entre desarrollo personal, finanzas o curiosidades. Busca 3 cuentas de referencia con más de 100k seguidores." });
      tasks.push({ day: 2, title: "Selección de Infoproducto en Hotmart", desc: "Regístrate en Hotmart. Selecciona un curso con más de 4.0 estrellas de calificación y comisión del 60%+." });
      tasks.push({ day: 3, title: "Creación de Identidad de Marca", desc: "Crea cuentas en Instagram y TikTok usando nombres como 'MenteActiva' o 'FinanzasPro'. Diseña logo minimalista en Canva." });
      tasks.push({ day: 4, title: "Búsqueda de Material en Alta Definición", desc: "Descarga videos de stock sin copyright (Pexels) o fragmentos de podcasts populares de YouTube para editar." });
      tasks.push({ day: 5, title: "Primer Corte en CapCut", desc: "Importa un podcast corto. Recorta tiempos muertos, agrega subtítulos dinámicos de neón y exporta en 1080p." });
      tasks.push({ day: 6, title: "Definición del Gancho y la Bio", desc: "Ajusta la biografía de tu perfil agregando un llamado de acción claro y tu enlace acortado de afiliado." });
      tasks.push({ day: 7, title: "Publicación del Primer Video", desc: "Sube tu primer reel/clip con música en tendencia. No añadas más de 5 hashtags relacionados." });
      tasks.push({ day: 8, title: "Optimización de Ganchos (Hook)", desc: "Revisa el segundo 3 de tu video. Si las vistas son bajas, rediseña el gancho textual con colores de alto contraste." });
      tasks.push({ day: 9, title: "Creación de Plan de Contenidos", desc: "Anota ideas para 6 videos siguientes usando la técnica de 'Problema -> Agitación -> Solución'." });
      tasks.push({ day: 10, title: "Edición por Lotes (Batch Editing)", desc: "Graba o edita 3 videos cortos de una sola vez para programarlos a lo largo de la semana." });
      tasks.push({ day: 11, title: "Monitoreo de Comentarios en TikTok", desc: "Responde a cada duda de tus usuarios incitándolos a visitar el enlace de tu biografía." });
      tasks.push({ day: 12, title: "Configuración de Link en Bio", desc: "Usa Linktree o Beacons para agrupar tu recurso gratuito y el enlace directo de compra del curso." });
      tasks.push({ day: 13, title: "Análisis de Canciones en Tendencia", desc: "Explora la sección de sonidos populares de TikTok y guarda 3 audios para tus próximos posts." });
      tasks.push({ day: 14, title: "Auditoría de Retención del Video", desc: "Entra a estadísticas. Si los usuarios abandonan a la mitad, añade cortes de imagen rápidos cada 3 segundos." });
      tasks.push({ day: 15, title: "Recalibración del Algoritmo", desc: "Si tus vistas siguen en cero, cambia los títulos de portada por preguntas que generen controversia." });
      tasks.push({ day: 16, title: "Publicación Doble Diaria", desc: "Sube dos videos al día (mañana y noche) para duplicar tus oportunidades de viralidad." });
      tasks.push({ day: 17, title: "Estrategia de Interacción Orgánica", desc: "Comenta en 5 cuentas grandes de tu mismo sector aportando valor real para ganar seguidores calificados." });
      tasks.push({ day: 18, title: "Uso de Encuestas en Stories", desc: "Publica historias en Instagram preguntando sobre las metas y dolores de tu audiencia." });
      tasks.push({ day: 19, title: "Creación de Lead Magnet Simple", desc: "Redacta un PDF de 2 páginas con consejos prácticos del nicho y regálalo a cambio de que te manden un DM." });
      tasks.push({ day: 20, title: "Testeo de Mensajes Directos (DM)", desc: "Prepara una plantilla de respuesta para cuando te pregunten precios. Ofrece el bono adicional del afiliado." });
      tasks.push({ day: 21, title: "Análisis de la Competencia", desc: "Busca qué clips de tus competidores se hicieron virales esta semana y replica el formato con tu propia voz/edición." });
      tasks.push({ day: 22, title: "Introducción de Llamados de Acción Medios", desc: "Coloca un texto a mitad del video diciendo: 'Guarda este video si te sirve de recordatorio'." });
      tasks.push({ day: 23, title: "Optimización de Hashtags y SEO", desc: "Añade términos de búsqueda exactos en la descripción de tus videos (ej: 'cómo ahorrar dinero joven')." });
      tasks.push({ day: 24, title: "Maquetación de Oferta Especial", desc: "Aprovecha descuentos temporales de la plataforma Hotmart y publícalo en tus historias como oferta express." });
      tasks.push({ day: 25, title: "Seguimiento a Leads Interesados", desc: "Chatea con los usuarios que guardaron tus videos o te preguntaron en comentarios en los días anteriores." });
      tasks.push({ day: 26, title: "Automatización de Respuestas", desc: "Configura respuestas rápidas en tu teclado para enviar el enlace de afiliado al instante sin escribir todo." });
      tasks.push({ day: 27, title: "Control de Clics en Enlace", desc: "Revisa estadísticas de tu Linktree. Si hay clics pero no ventas, ajusta la descripción del infoproducto." });
      tasks.push({ day: 28, title: "Re-edición de Clip Viral", desc: "Toma tu video con más vistas, cámbiale la música de fondo y los primeros 2 segundos, y vuélvelo a subir." });
      tasks.push({ day: 29, title: "Primer Recuento de Comisiones", desc: "Evalúa tus ganancias. Si lograste tu primera comisión, comparte una captura borrando datos sensibles para ganar autoridad." });
      tasks.push({ day: 30, title: "Planificación de Crecimiento Mensual", desc: "Felicidades, completaste la ruta. Reinvierte ganancias en software pro o pauta publicitaria." });
    }
    // Route 3: ManyChat IA Agency
    else if (routeId === 3) {
      tasks.push({ day: 1, title: "Estudio de Automatizaciones Clave", desc: "Aprende el flujo de automatización 'Comentario a DM' de ManyChat. Configura tu propia cuenta de prueba." });
      tasks.push({ day: 2, title: "Definición del Nicho Local", desc: "Elige entre restaurantes, inmobiliarias locales o consultorías. Lista 10 negocios de tu zona en un Excel." });
      tasks.push({ day: 3, title: "Construcción de la Demo Inicial", desc: "Crea un flujo simple que salude y envíe un cupón PDF de descuento cuando simulas escribirle a tu cuenta." });
      tasks.push({ day: 4, title: "Grabación de Video de Demostración", desc: "Graba la pantalla de tu celular con Loom mostrando cómo funciona la automatización en tiempo real." });
      tasks.push({ day: 5, title: "Redacción de Propuesta Corta", desc: "Diseña un texto directo enfocado en el beneficio comercial (ahorrar tiempo, no perder leads)." });
      tasks.push({ day: 6, title: "Lista de Prospección Directa", desc: "Busca 15 perfiles de Instagram de negocios locales con más de 2k seguidores que respondan lento los comentarios." });
      tasks.push({ day: 7, title: "Envío de Propuestas Personalizadas", desc: "Envía a los 15 prospectos el video Loom que grabaste, adaptando el nombre del negocio." });
      tasks.push({ day: 8, title: "Seguimiento a Respuestas", desc: "Responde dudas iniciales. Ofrece configurarles una prueba gratis de 14 días sin compromiso." });
      tasks.push({ day: 9, title: "Reunión de Demostración (Zoom)", desc: "Agenda una llamada corta de 10 min para mostrarles cómo capturar datos de clientes en vivo." });
      tasks.push({ day: 10, title: "Configuración de Cuenta del Cliente", desc: "Pide acceso de editor a la página de Meta de tu primer cliente de prueba." });
      tasks.push({ day: 11, title: "Diseño del Flujo de Bienvenida", desc: "Crea el flujo oficial de ManyChat: bienvenida, preguntas frecuentes y enlace a reservas." });
      tasks.push({ day: 12, title: "Integración con Google Sheets", desc: "Conecta ManyChat con una hoja de cálculo usando Make.com para registrar contactos automáticamente." });
      tasks.push({ day: 13, title: "Pruebas de Estrés del Chatbot", desc: "Escribe palabras con errores ortográficos al bot para asegurarte de que los triggers responden." });
      tasks.push({ day: 14, title: "Lanzamiento Oficial del Bot", desc: "Activa el bot en producción y pídele al cliente que publique un Reel invitando a comentar para probar." });
      tasks.push({ day: 15, title: "Análisis del Primer Día", desc: "Revisa si el bot entregó los cupones y capturó los correos en la hoja de Sheets correctamente." });
      tasks.push({ day: 16, title: "Optimización de Textos del Bot", desc: "Acorta los párrafos de respuesta del bot. Hazlos más directos y añade emojis amigables." });
      tasks.push({ day: 17, title: "Estudio de Flujos de WhatsApp", desc: "Aprende cómo funciona el canal de WhatsApp Business en ManyChat para ofrecer el servicio adicional." });
      tasks.push({ day: 18, title: "Propuesta de Upgrade de Pago", desc: "Presenta las métricas de prueba de 7 días al cliente y plantéale un fee mensual de mantenimiento de $150 USD." });
      tasks.push({ day: 19, title: "Firma de Contrato y Primer Cobro", desc: "Cobra tu primer adelanto. Configura cobros recurrentes usando Stripe o PayPal." });
      tasks.push({ day: 20, title: "Soporte y Optimización Semanal", desc: "Limpia la base de datos de Sheets y añade nuevas preguntas frecuentes detectadas en los chats." });
      tasks.push({ day: 21, title: "Creación de Caso de Estudio", desc: "Escribe un documento de 1 página resumiendo cuántas conversaciones automatizó el bot este mes." });
      tasks.push({ day: 22, title: "Prospección por Recomendación", desc: "Pide al cliente que te presente con otros 2 dueños de negocio a cambio de un mes gratis de mantenimiento." });
      tasks.push({ day: 23, title: "Optimización de Marca Propia", desc: "Crea tu propia landing de servicio y añade el logo de tu primer cliente verificado." });
      tasks.push({ day: 24, title: "Automatización de Secuencia de Nutrición", desc: "Configura un mensaje automático de seguimiento a las 24 horas de capturado el lead." });
      tasks.push({ day: 25, title: "Testeo de Flujos de IA Avanzados", desc: "Aprende a integrar OpenAI con ManyChat para responder consultas complejas de menú o catálogo." });
      tasks.push({ day: 26, title: "Envío de Reporte Mensual de Conversiones", desc: "Entrega un reporte limpio con el número de leads totales capturados este mes." });
      tasks.push({ day: 27, title: "Actualización de Respuestas del Bot", desc: "Ajusta respuestas según las quejas o confusiones que hayan tenido los clientes." });
      tasks.push({ day: 28, title: "Estrategia de Fidelización", desc: "Ofrece un flujo especial para días festivos o cupones de cumpleaños sin cargo adicional." });
      tasks.push({ day: 29, title: "Segundo Proceso de Facturación", desc: "Genera el cobro del segundo mes de servicio. Consolida tus costos fijos de herramientas." });
      tasks.push({ day: 30, title: "Escalamiento a Nuevos Sectores", desc: "Empieza a contactar con nichos similares usando los resultados demostrados de tu primer caso de éxito." });
    }
    // Route 2 & 15: Freelance Services (Video/Design)
    else if (routeId === 2 || routeId === 15) {
      tasks.push({ day: 1, title: "Definición del Servicio Core", desc: "Elige entre edición de videos cortos (Reels) o diseño de carruseles de Instagram. Crea tu portafolio." });
      tasks.push({ day: 2, title: "Investigación de Tarifas Freelance", desc: "Busca en Fiverr y Upwork cuánto cobran los perfiles de tu mismo nivel. Fija tarifas de inicio bajas." });
      tasks.push({ day: 3, title: "Apertura de Perfil en Fiverr", desc: "Crea tu cuenta de vendedor. Redacta descripciones del 'Gig' optimizadas con palabras clave." });
      tasks.push({ day: 4, title: "Apertura de Perfil en Upwork", desc: "Configura tu biografía. Detalla tu experiencia y sube tus 3 mejores muestras de trabajo." });
      tasks.push({ day: 5, title: "Creación de Portafolio Behance/Drive", desc: "Sube tus proyectos de muestra a una carpeta ordenada de Drive o Behance para compartir con 1 clic." });
      tasks.push({ day: 6, title: "Estrategia de Prospección Directa", desc: "Identifica a 10 creadores de contenido pequeños que suban material diario con baja edición gráfica." });
      tasks.push({ day: 7, title: "Envío de Muestras Gratuitas", desc: "Toma un video de un creador, edítalo gratis en CapCut y envíaselo por DM como propuesta de valor." });
      tasks.push({ day: 8, title: "Postulación a Ofertas en Upwork", desc: "Aplica a 3 ofertas de trabajo activas redactando propuestas muy personalizadas." });
      tasks.push({ day: 9, title: "Seguimiento a Mensajes de Clientes", desc: "Responde de inmediato a cualquier consulta. La velocidad de respuesta influye en el algoritmo de Fiverr." });
      tasks.push({ day: 10, title: "Cierre del Primer Cliente Beta", desc: "Ofrece un paquete inicial de 5 piezas a mitad de precio a cambio de una reseña de 5 estrellas." });
      tasks.push({ day: 11, title: "Ejecución del Primer Pedido", desc: "Dedica tus bloques de tiempo a diseñar/editar las primeras muestras. Envía borradores para feedback." });
      tasks.push({ day: 12, title: "Ajuste e Incorporación de Correcciones", desc: "Corrige los detalles indicados por el cliente de inmediato y mantén comunicación fluida." });
      tasks.push({ day: 13, title: "Entrega Final y Solicitud de Reseña", desc: "Entrega el proyecto finalizado. Solicita amablemente que califiquen tu servicio con 5 estrellas." });
      tasks.push({ day: 14, title: "Optimización del Perfil de Fiverr", desc: "Añade etiquetas adicionales a tu Gig basándote en lo que buscó tu primer cliente." });
      tasks.push({ day: 15, title: "Segunda Ronda de Prospección Directa", desc: "Contacta a otros 10 prospectos en redes enviando testimonios o capturas del trabajo anterior." });
      tasks.push({ day: 16, title: "Estructura de Contrato de Servicios", desc: "Redacta un acuerdo simple que defina tiempos de entrega y límites de revisiones por pedido." });
      tasks.push({ day: 17, title: "Postulación Avanzada en Upwork", desc: "Usa tus primeros 'Connects' para aplicar a proyectos a largo plazo de agencias internacionales." });
      tasks.push({ day: 18, title: "Creación de Plantillas de Trabajo", desc: "Crea presets y plantillas de diseño reutilizables para recortar tu tiempo de producción un 50%." });
      tasks.push({ day: 19, title: "Cierre del Segundo Cliente regular", desc: "Cierra un cliente recurrente que requiera entregas semanales fijas de contenido." });
      tasks.push({ day: 20, title: "Gestión de Tiempos de Entrega", desc: "Organiza tu calendario de entregas para no saturar tus bloques de tiempo de la semana." });
      tasks.push({ day: 21, title: "Ajuste de Precios e Incremento de Valor", desc: "Aumenta tus tarifas de Fiverr un 20% tras haber acumulado tus primeras 3 opiniones positivas." });
      tasks.push({ day: 22, title: "Testeo de Nuevas Habilidades", desc: "Aprende un efecto visual de tendencia o técnica de redacción para ofrecerlo como un 'extra' adicional." });
      tasks.push({ day: 23, title: "Prospección a Agencias Locales", desc: "Envía tu portafolio a agencias digitales de tu país para actuar como editor externo a demanda." });
      tasks.push({ day: 24, title: "Optimización de Flujo de Entrega", desc: "Usa herramientas de transferencia de archivos rápidas para no perder calidad visual." });
      tasks.push({ day: 25, title: "Seguimiento a Clientes Inactivos", desc: "Escribe a tus clientes de semanas anteriores ofreciéndoles una oferta para sus siguientes publicaciones." });
      tasks.push({ day: 26, title: "Consolidación de Testimonios", desc: "Reúne las capturas de tus opiniones positivas en un archivo de Notion presentable." });
      tasks.push({ day: 27, title: "Automatización de Mensajería de Bienvenida", desc: "Configura respuestas de FAQ rápidas en Fiverr para cuando estés fuera de tu horario laboral." });
      tasks.push({ day: 28, title: "Revisión de Flujo de Caja", desc: "Calcula tus ingresos y comisiones descontando la cuota de la plataforma (20% en Fiverr/Upwork)." });
      tasks.push({ day: 29, title: "Retiro Seguro de Fondos", desc: "Configura tu cuenta bancaria local o monedero digital (Payoneer/PayPal) y realiza tu primer retiro." });
      tasks.push({ day: 30, title: "Planificación de Escala Freelance", desc: "Felicidades. Establece metas para conseguir tus primeros clientes directos fuera de las plataformas." });
    }
    // All other routes: Balanced Hybrid Generator
    else {
      const routeKeywords = routeTitle.split(" ");
      const coreNoun = routeKeywords[0] || "Activo";
      
      tasks.push({ day: 1, title: `Estudio de la Ruta: ${coreNoun}`, desc: `Analiza las mecánicas de la ruta de ${routeTitle} y sus especificaciones técnicas.` });
      tasks.push({ day: 2, title: "Investigación del Nicho y Competidores", desc: "Identifica 3 marcas o competidores de referencia en redes. Anota sus puntos fuertes." });
      tasks.push({ day: 3, title: "Definición del Cliente Objetivo", desc: "Mapea el perfil del comprador ideal, sus necesidades prioritarias y presupuesto habitual." });
      tasks.push({ day: 4, title: "Apertura de Cuentas y Configuración Inicial", desc: "Crea las cuentas operativas y correos profesionales necesarios para el proyecto." });
      tasks.push({ day: 5, title: "Diseño del MVP (Mínimo Producto Viable)", desc: "Estructura la versión básica de tu oferta para poder validarla de forma rápida." });
      tasks.push({ day: 6, title: "Establecimiento de Tarifas y Oferta", desc: "Define el precio inicial de validación del servicio o producto digital." });
      tasks.push({ day: 7, title: "Publicación o Testeo Inicial", desc: "Presenta el concepto en foros o redes temáticas para medir el interés básico." });
      tasks.push({ day: 8, title: "Montaje de Infraestructura Tecnológica", desc: "Configura las páginas o enlaces de aterrizaje necesarios para el proyecto." });
      tasks.push({ day: 9, title: "Pruebas Operativas de Enlace", desc: "Realiza simulaciones de interacción y pasarelas de pago para asegurar el correcto flujo." });
      tasks.push({ day: 10, title: "Creación de Lead Magnet / Recurso Gratis", desc: "Diseña un gancho promocional para atraer tus primeros prospectos interesados." });
      tasks.push({ day: 11, title: "Maquetación de Guiones y Copys", desc: "Redacta los textos publicitarios y de prospección para tus campañas orgánicas." });
      tasks.push({ day: 12, title: "Lanzamiento Silencioso (Soft Launch)", desc: "Envía la propuesta a tus primeros contactos clave y redes cercanas." });
      tasks.push({ day: 13, title: "Ajuste de Calendario Semanal", desc: "Utiliza tu planeador de Agenda Viable para consolidar bloques de prospección." });
      tasks.push({ day: 14, title: "Inicio de Prospección Orgánica Activa", desc: "Sal a contactar prospectos de forma directa y personalizada en redes." });
      tasks.push({ day: 15, title: "Diagnóstico de Mitad de Camino", desc: "Evalúa tus bloqueos técnicos o de captación. Usa el Recalibrador si es necesario." });
      tasks.push({ day: 16, title: "Publicación Regular de Contenido", desc: "Sube posts o videos orientados a resolver las dudas frecuentes de tu audiencia." });
      tasks.push({ day: 17, title: "Optimización de Mensaje Directo (DM)", desc: "Ajusta tu guion de conversación según las respuestas de los leads previos." });
      tasks.push({ day: 18, title: "Interacción en Comunidades Temáticas", desc: "Comenta aportando valor en grupos de Facebook o hilos del nicho." });
      tasks.push({ day: 19, title: "Seguimiento a Leads Interesados", desc: "Vuelve a contactar a los contactos que mostraron interés inicial pero no concretaron." });
      tasks.push({ day: 20, title: "Revisión de Métricas e Interacciones", desc: "Analiza el porcentaje de clics en tu enlace. Ajusta títulos si las visitas son bajas." });
      tasks.push({ day: 21, title: "Optimización de la Propuesta de Valor", desc: "Añade bonus de velocidad o facilidades de pago para empujar decisiones." });
      tasks.push({ day: 22, title: "Testeo de Ángulo Comercial Alternativo", desc: "Prueba enfocar tu oferta en resolver un dolor diferente del cliente ideal." });
      tasks.push({ day: 23, title: "Cierre del Primer Cliente / Venta", desc: "¡Momento clave! Cierra tu primera conversión y celebra el hito." });
      tasks.push({ day: 24, title: "Entrega del Servicio / Producto", desc: "Enfócate en proveer la mejor experiencia de entrega para consolidar la confianza." });
      tasks.push({ day: 25, title: "Recolección de Testimonio Inicial", desc: "Pide una breve opinión por chat a tu cliente sobre los resultados." });
      tasks.push({ day: 26, title: "Automatización de Procesos Repetitivos", desc: "Configura respuestas de teclado o plantillas fijas de correo electrónico." });
      tasks.push({ day: 27, title: "Auditoría Financiera Inicial", desc: "Calcula los márgenes reales del proyecto descontando comisiones." });
      tasks.push({ day: 28, title: "Optimización del Embudo de Ventas", desc: "Alinea las descripciones de tu enlace según las dudas que tuvo el comprador." });
      tasks.push({ day: 29, title: "Plan de Reinversión de Ganancias", desc: "Fija presupuestos para herramientas premium de cara al siguiente mes." });
      tasks.push({ day: 30, title: "Cierre de Mes y Siguiente Hoja de Ruta", desc: "¡Felicidades! Completaste el ciclo de validación. Listo para escalar." });
    }
    
    return tasks;
  }


  // --- 4. CONTROLADOR DEL WIZARD DE DIAGNÓSTICO ---
  const diagnosticForm = document.getElementById('diagnosticForm');
  const wizardSlides = document.querySelectorAll('.wizard-step-slide');
  const wizardProgress = document.getElementById('wizardProgress');
  const currentStepNum = document.getElementById('currentStepNum');
  const wizardCapital = document.getElementById('wizardCapital');
  const wizardCapitalDisplay = document.getElementById('wizardCapitalDisplay');
  const wizardTime = document.getElementById('wizardTime');
  const wizardTimeDisplay = document.getElementById('wizardTimeDisplay');
  const skillCardOptions = document.querySelectorAll('.skill-card-option');
  
  let currentStep = 1;
  let wizardSkills = new Set(['ninguna']);

  // Actualizar valores numéricos de los sliders en pantalla
  if (wizardCapital) {
    wizardCapital.addEventListener('input', (e) => {
      wizardCapitalDisplay.textContent = `$${e.target.value} USD`;
    });
  }

  if (wizardTime) {
    wizardTime.addEventListener('input', (e) => {
      wizardTimeDisplay.textContent = `${e.target.value} horas / semana`;
    });
  }

  // Multi-select Habilidades
  skillCardOptions.forEach(card => {
    card.addEventListener('click', () => {
      const skill = card.dataset.skill;
      
      if (skill === 'ninguna') {
        wizardSkills.clear();
        wizardSkills.add('ninguna');
        skillCardOptions.forEach(c => {
          if (c.dataset.skill !== 'ninguna') c.classList.remove('active');
        });
        card.classList.add('active');
      } else {
        wizardSkills.delete('ninguna');
        const noneCard = Array.from(skillCardOptions).find(c => c.dataset.skill === 'ninguna');
        if (noneCard) noneCard.classList.remove('active');
        
        if (wizardSkills.has(skill)) {
          wizardSkills.delete(skill);
          card.classList.remove('active');
        } else {
          wizardSkills.add(skill);
          card.classList.add('active');
        }
        
        // Si no queda ninguna seleccionada, activar "ninguna"
        if (wizardSkills.size === 0) {
          wizardSkills.add('ninguna');
          if (noneCard) noneCard.classList.add('active');
        }
      }
    });
  });

  // Botones de Navegación del Wizard
  const nextBtns = document.querySelectorAll('.next-step-btn');
  const prevBtns = document.querySelectorAll('.prev-step-btn');

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < 5) {
        goToStep(currentStep + 1);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  });

  function goToStep(step) {
    // Validar y ocultar slide actual
    const currentSlide = document.querySelector(`.wizard-step-slide[data-step="${currentStep}"]`);
    if (currentSlide) currentSlide.classList.remove('active');
    
    currentStep = step;
    
    // Mostrar nuevo slide
    const nextSlide = document.querySelector(`.wizard-step-slide[data-step="${currentStep}"]`);
    if (nextSlide) nextSlide.classList.add('active');

    // Actualizar barra e indicador
    if (currentStepNum) currentStepNum.textContent = currentStep;
    if (wizardProgress) {
      wizardProgress.style.width = `${currentStep * 20}%`;
    }
  }

  // Submit del Diagnóstico (Matriz de Fricción)
  if (diagnosticForm) {
    diagnosticForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const capitalVal = parseInt(wizardCapital.value);
      const timeVal = parseInt(wizardTime.value);
      const riskVal = document.querySelector('input[name="wizardRisk"]:checked').value;
      const goalVal = document.querySelector('input[name="wizardGoal"]:checked').value;

      // Ejecutar Algoritmo de Matriz de Fricción
      runFrictionMatrix(capitalVal, timeVal, wizardSkills, riskVal, goalVal);
    });
  }

  function runFrictionMatrix(capital, time, skills, risk, goal) {
    // 1. Filtrar rutas viables por requerimientos mínimos absolutos
    let viableRoutes = routesDatabase.filter(r => r.minCapital <= capital && r.minTime <= time);
    
    // Si ninguna cumple (valores extremadamente bajos), dar las rutas de entrada mínima
    if (viableRoutes.length === 0) {
      viableRoutes = routesDatabase.filter(r => r.minCapital === 0);
    }

    // 2. Calcular fricción personalizada para cada ruta viable
    const routeScores = viableRoutes.map(route => {
      let finalFriction = route.baseFriction;

      // Ajuste por habilidades
      if (!skills.has('ninguna')) {
        route.matchSkills.forEach(ms => {
          if (skills.has(ms)) {
            finalFriction -= 8; // Disminuye fricción si posee la habilidad
          }
        });
      }

      // Ajuste por Tolerancia al Riesgo
      if (risk === 'bajo' && route.difficulty === 'alta') {
        finalFriction += 20; // Mucho riesgo psicológico
      } else if (risk === 'alto' && route.difficulty === 'alta') {
        finalFriction -= 10; // Listo para acelerar modelos difíciles
      }

      // Ajuste por Objetivos
      if (goal === 'automatizado' && (route.id === 1 || route.id === 4 || route.id === 11 || route.id === 10)) {
        finalFriction -= 5; // Encaja con ingresos pasivos puros
      } else if (goal === 'rapido' && route.difficulty === 'baja') {
        finalFriction -= 7; // Encaja con monetizar de inmediato
      }

      // Limitar fricción entre 10% y 95%
      finalFriction = Math.max(10, Math.min(95, finalFriction));

      return {
        route: route,
        score: finalFriction
      };
    });

    // 3. Seleccionar la ruta con menor Índice de Fricción
    routeScores.sort((a, b) => a.score - b.score);
    const winner = routeScores[0];

    // 4. Guardar diagnóstico en localStorage
    const diagnosisResult = {
      routeId: winner.route.id,
      frictionScore: winner.score,
      date: new Date().toISOString(),
      completedTasks: [] // lista de índices de días completados
    };

    localStorage.setItem('radar_diagnosis', JSON.stringify(diagnosisResult));

    // 5. Renderizar Dashboard
    renderDashboard(winner.route, winner.score, []);
  }


  // --- 5. RENDERIZADO DEL DASHBOARD Y PLAN DE 30 DIAS ---
  function renderDashboard(route, frictionScore, completedTasks) {
    const wizardContainer = document.getElementById('radar-wizard-container');
    const dashboardContainer = document.getElementById('radar-dashboard-container');
    
    if (wizardContainer) wizardContainer.style.display = 'none';
    if (dashboardContainer) dashboardContainer.style.display = 'block';

    // Rellenar información de la ruta
    const routeTitle = document.getElementById('assignedRouteTitle');
    const routeComplexity = document.getElementById('assignedRouteComplexity');
    const routeDesc = document.getElementById('assignedRouteDesc');

    if (routeTitle) routeTitle.textContent = route.title;
    if (routeComplexity) {
      routeComplexity.textContent = `Dificultad: ${route.difficulty.toUpperCase()}`;
      routeComplexity.className = `badge-complexity ${route.difficulty}`;
    }
    if (routeDesc) routeDesc.textContent = route.desc;

    // Rellenar Indicador de Fricción
    const gaugePercent = document.getElementById('frictionGaugePercentage');
    const gaugeFill = document.getElementById('frictionGaugeFill');
    const gaugeLabel = document.getElementById('frictionGaugeLabel');

    if (gaugePercent) gaugePercent.textContent = `${frictionScore}%`;
    if (gaugeFill) {
      // Radio = 40. Perímetro = 2 * PI * r = 251.2
      const offset = 251.2 - (251.2 * frictionScore) / 100;
      gaugeFill.style.strokeDashoffset = offset;
      
      // Color según nivel de fricción
      if (frictionScore < 30) {
        gaugeFill.style.stroke = 'var(--accent-green)';
        if (gaugeLabel) gaugeLabel.textContent = 'Baja';
      } else if (frictionScore < 55) {
        gaugeFill.style.stroke = 'var(--accent-blue)';
        if (gaugeLabel) gaugeLabel.textContent = 'Moderada';
      } else {
        gaugeFill.style.stroke = 'var(--accent-red)';
        if (gaugeLabel) gaugeLabel.textContent = 'Alta';
      }
    }

    // Renderizar Plan de 30 Días
    const week1Tasks = document.getElementById('week1-tasks');
    const week2Tasks = document.getElementById('week2-tasks');
    const week3Tasks = document.getElementById('week3-tasks');
    const week4Tasks = document.getElementById('week4-tasks');

    if (week1Tasks && week2Tasks && week3Tasks && week4Tasks) {
      // Limpiar tareas anteriores
      week1Tasks.innerHTML = '';
      week2Tasks.innerHTML = '';
      week3Tasks.innerHTML = '';
      week4Tasks.innerHTML = '';

      const tasks30 = generate30DayTasks(route.id, route.title);

      tasks30.forEach((task, index) => {
        const isChecked = completedTasks.includes(index);
        const li = document.createElement('li');
        li.className = `task-item ${isChecked ? 'checked' : ''}`;
        li.dataset.index = index;
        
        li.innerHTML = `
          <label class="task-checkbox-container">
            <input type="checkbox" class="task-check-input" ${isChecked ? 'checked' : ''}>
            <span class="checkmark"></span>
          </label>
          <div class="task-text">
            <h5>Día ${task.day}: ${task.title}</h5>
            <p>${task.desc}</p>
          </div>
        `;

        // Clasificar por semanas
        if (task.day <= 7) {
          week1Tasks.appendChild(li);
        } else if (task.day <= 15) {
          week2Tasks.appendChild(li);
        } else if (task.day <= 23) {
          week3Tasks.appendChild(li);
        } else {
          week4Tasks.appendChild(li);
        }
      });

      // Registrar eventos para los checkboxes de tareas
      const checkInputs = document.querySelectorAll('.task-check-input');
      checkInputs.forEach(input => {
        input.addEventListener('change', (e) => {
          const taskItem = e.target.closest('.task-item');
          const taskIndex = parseInt(taskItem.dataset.index);
          
          if (e.target.checked) {
            taskItem.classList.add('checked');
            if (!completedTasks.includes(taskIndex)) {
              completedTasks.push(taskIndex);
            }
          } else {
            taskItem.classList.remove('checked');
            completedTasks = completedTasks.filter(idx => idx !== taskIndex);
          }

          // Guardar estado de progreso en local
          const localData = JSON.parse(localStorage.getItem('radar_diagnosis'));
          localData.completedTasks = completedTasks;
          localStorage.setItem('radar_diagnosis', JSON.stringify(localData));

          // Actualizar barra de progreso del plan
          updatePlanProgress(completedTasks.length, 30);
        });
      });

      // Actualizar barra de progreso al cargar
      updatePlanProgress(completedTasks.length, 30);
    }
  }

  function updatePlanProgress(completedCount, totalCount) {
    const percent = Math.round((completedCount / totalCount) * 100);
    const percentDisplay = document.getElementById('planProgressPercent');
    const barFill = document.getElementById('planProgressBar');

    if (percentDisplay) percentDisplay.textContent = `${percent}%`;
    if (barFill) barFill.style.width = `${percent}%`;
  }

  // Acordeón de semanas
  const weekHeaders = document.querySelectorAll('.week-header-btn');
  weekHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.week-section');
      const isActive = section.classList.contains('active');
      const content = section.querySelector('.week-content');
      const icon = header.querySelector('.week-toggle-icon');

      // Cerrar otros
      document.querySelectorAll('.week-section').forEach(sec => {
        sec.classList.remove('active');
        sec.querySelector('.week-content').style.maxHeight = null;
        sec.querySelector('.week-toggle-icon').textContent = '+';
      });

      if (!isActive) {
        section.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 1500 + 'px';
        icon.textContent = '−';
      }
    });
  });

  // Botón Reiniciar Radar
  const restartDiagnosisBtn = document.getElementById('restartDiagnosisBtn');
  if (restartDiagnosisBtn) {
    restartDiagnosisBtn.addEventListener('click', () => {
      localStorage.removeItem('radar_diagnosis');
      
      // Resetear estados del Wizard
      currentStep = 1;
      wizardSkills.clear();
      wizardSkills.add('ninguna');
      skillCardOptions.forEach(c => {
        c.classList.remove('active');
        if (c.dataset.skill === 'ninguna') c.classList.add('active');
      });
      document.querySelector('input[name="wizardRisk"][value="bajo"]').checked = true;
      document.querySelector('input[name="wizardGoal"][value="rapido"]').checked = true;
      
      if (wizardCapital) wizardCapital.value = 200;
      if (wizardCapitalDisplay) wizardCapitalDisplay.textContent = '$200 USD';
      if (wizardTime) wizardTime.value = 8;
      if (wizardTimeDisplay) wizardTimeDisplay.textContent = '8 horas / semana';

      goToStep(1);

      // Mostrar Wizard y ocultar Dashboard
      const wizardContainer = document.getElementById('radar-wizard-container');
      const dashboardContainer = document.getElementById('radar-dashboard-container');
      if (wizardContainer) wizardContainer.style.display = 'block';
      if (dashboardContainer) dashboardContainer.style.display = 'none';
    });
  }

  // --- 6. BONO 1: LOGICA DEL FILTRO ANTIHUMO ---
  const antihumoForm = document.getElementById('antihumoForm');
  const antihumoResultBox = document.getElementById('antihumoResultBox');

  if (antihumoForm && antihumoResultBox) {
    antihumoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const business = document.getElementById('smokeBusiness').value;
      const promisedIncome = parseInt(document.getElementById('smokePromise').value) || 2000;
      const guruCapital = parseInt(document.getElementById('smokeCapital').value) || 100;
      const promisedHours = parseInt(document.getElementById('smokeHours').value) || 2;

      let realCapital = 0;
      let timeToFirstDollar = "";
      let riskFactor = 0;
      let bsScore = 0;
      let itemizedCosts = [];
      let verdictBadge = "";
      let verdictTitle = "";
      let verdictDesc = "";

      // Algoritmo de cálculo según modelo
      if (business === 'trading') {
        realCapital = 1000; // Capital mínimo para no quemar cuenta de inmediato
        timeToFirstDollar = "6 a 12 meses (de estudio técnico diario)";
        riskFactor = 95;
        bsScore = 88;
        itemizedCosts = [
          { item: "Curso / Academia de señales", cost: 150 },
          { item: "Software graficador (TradingView Pro)", cost: 15 },
          { item: "Capital mínimo de fondeo recomendado", cost: 500 },
          { item: "Colateral de pérdidas en cuenta", cost: 335 }
        ];
        verdictBadge = "humo-alto";
        verdictTitle = "Altísimo Humo Comercial";
        verdictDesc = "El trading requiere años de disciplina mental y control matemático. Las promesas de duplicar tu dinero en 1 hora con una app móvil son falsas. Es estadísticamente probable que pierdas tu capital inicial en los primeros 15 días si no tienes educación técnica formal.";
      } else if (business === 'dropshipping') {
        realCapital = 450;
        timeToFirstDollar = "3 a 5 semanas (para validación de productos)";
        riskFactor = 65;
        bsScore = 70;
        itemizedCosts = [
          { item: "Suscripción de Tienda (Shopify)", cost: 39 },
          { item: "Nombre de dominio (.com)", cost: 14 },
          { item: "Herramienta de importación (Zendrop/Dsers)", cost: 15 },
          { item: "Pauta publicitaria mínima de testeo", cost: 300 },
          { item: "Aplicaciones de conversión (Upsells/Reviews)", cost: 82 }
        ];
        verdictBadge = "humo-medio";
        verdictTitle = "Humo Moderado / Requiere Capital";
        verdictDesc = "El dropshipping funciona, pero no con $0 de inversión como te venden en TikTok. Sin un presupuesto mínimo de $300 a $500 USD para publicidad pagada en Facebook/TikTok Ads, tu tienda no recibirá visitas y no generará ventas.";
      } else if (business === 'amazon') {
        realCapital = 1500;
        timeToFirstDollar = "2 a 4 meses (importación y aduanas)";
        riskFactor = 75;
        bsScore = 80;
        itemizedCosts = [
          { item: "Cuenta de Vendedor Profesional Amazon", cost: 40 },
          { item: "Herramienta de búsqueda (Helium 10)", cost: 97 },
          { item: "Compra mínima stock inicial (China)", cost: 800 },
          { item: "Flete de envío e importación local", cost: 300 },
          { item: "Campaña publicitaria de lanzamiento PPC", cost: 263 }
        ];
        verdictBadge = "humo-alto";
        verdictTitle = "Estrategia de Capital Intensivo";
        verdictDesc = "Vender marca propia en Amazon exige capital por adelantado para comprar inventario físico e importarlo. Empezar con $100 es imposible. Si te quedas sin stock, Amazon penalizará tu posicionamiento, exigiéndote re-invertir más capital rápidamente.";
      } else if (business === 'afiliados') {
        realCapital = 80;
        timeToFirstDollar = "2 a 3 semanas (orgánico constante)";
        riskFactor = 35;
        bsScore = 60;
        itemizedCosts = [
          { item: "Afiliación de producto (Hotmart)", cost: 0 },
          { item: "Herramientas de edición (CapCut pro)", cost: 10 },
          { item: "Comisiones por procesamiento de cobros", cost: 15 },
          { item: "Presupuesto de respaldo", cost: 55 }
        ];
        verdictBadge = "humo-medio";
        verdictTitle = "Esquema Hype de Ventas en Cadena";
        verdictDesc = "El marketing de afiliados con productos educativos reales es un gran modelo. Sin embargo, ten cuidado con las promesas de 'hazte rico vendiendo el mismo curso de cómo vender el curso'. Vende herramientas prácticas o conocimientos consolidados.";
      } else if (business === 'inmobiliario') {
        realCapital = 350;
        timeToFirstDollar = "6 a 8 semanas (negociación intensa)";
        riskFactor = 50;
        bsScore = 75;
        itemizedCosts = [
          { item: "Herramientas de tasación de mercado", cost: 30 },
          { item: "Gastos de fotografía profesional de muestra", cost: 120 },
          { item: "Campaña de contacto a propietarios", cost: 100 },
          { item: "Garantías de contrato de co-hosting", cost: 100 }
        ];
        verdictBadge = "humo-medio";
        verdictTitle = "Servicio de Negociación Comercial";
        verdictDesc = "El co-hosting de Airbnb consiste en convencer a un propietario de que tú gestiones su inmueble en la app. El humo radica en que 'no necesitas dinero'. Necesitas habilidades de venta avanzadas para que un extraño te confíe las llaves de su propiedad de miles de dólares.";
      } else if (business === 'youtube') {
        realCapital = 280;
        timeToFirstDollar = "2 a 4 meses (monetización de canal)";
        riskFactor = 45;
        bsScore = 55;
        itemizedCosts = [
          { item: "Software de edición de video (Premiere/CapCut Pro)", cost: 15 },
          { item: "Locución profesional de prueba (Fiverr/ElevenLabs)", cost: 35 },
          { item: "Diseño de miniaturas atractivas (3 clics)", cost: 30 },
          { item: "Guionista de apoyo inicial", cost: 100 },
          { item: "Inversión en SEO / Promoción inicial", cost: 100 }
        ];
        verdictBadge = "humo-medio";
        verdictTitle = "YouTube Faceless Automatizado";
        verdictDesc = "Crear canales sin mostrar el rostro funciona, pero requiere consistencia y calidad extrema. El 'humo' está en pensar que harás $10,000 en el primer mes subiendo videos hechos 100% por IA genérica. YouTube penaliza el contenido repetitivo sin valor real.";
      } else if (business === 'mlm') {
        realCapital = 500;
        timeToFirstDollar = "3 a 6 meses (reclutamiento constante)";
        riskFactor = 90;
        bsScore = 95;
        itemizedCosts = [
          { item: "Kit de inicio obligatorio / Membresía", cost: 150 },
          { item: "Consumo mensual mínimo de productos", cost: 100 },
          { item: "Entradas a convenciones / Eventos de liderazgo", cost: 150 },
          { item: "Material publicitario y prospección", cost: 100 }
        ];
        verdictBadge = "humo-alto";
        verdictTitle = "Esquema Piramidal / Red de Mercadeo";
        verdictDesc = "Cuidado absoluto. Los negocios multinivel tradicionales prometen libertad financiera inmediata vendiendo productos o reclutando personas en academias de liderazgo. Estadísticamente, el 97% de los participantes pierde dinero o recupera menos del costo de su kit inicial.";
      } else if (business === 'plantillas') {
        realCapital = 35;
        timeToFirstDollar = "1 a 2 semanas (orgánico directo)";
        riskFactor = 15;
        bsScore = 20;
        itemizedCosts = [
          { item: "Suscripción de herramienta base (Canva/Notion)", cost: 10 },
          { item: "Plataforma de entrega gratuita (Gumroad/Ko-fi)", cost: 0 },
          { item: "Pauta de prueba opcional en Meta Ads", cost: 25 }
        ];
        verdictBadge = "humo-bajo";
        verdictTitle = "Modelo Altamente Viable / Legítimo";
        verdictDesc = "Este es uno de los modelos con menor humo. Vender plantillas de Notion, kits de diseño o recursos de Excel resuelve problemas reales e inmediatos. Los costos fijos son bajísimos y el riesgo financiero es casi nulo.";
      } else { // Custom
        realCapital = Math.round(promisedIncome * 0.25) + 150;
        timeToFirstDollar = "4 a 8 semanas";
        riskFactor = 50;
        bsScore = 55;
        itemizedCosts = [
          { item: "Software de automatización base", cost: 50 },
          { item: "Costos de adquisición de clientes", cost: 100 },
          { item: "Respaldo operativo", cost: Math.round(promisedIncome * 0.2) }
        ];
        verdictBadge = "humo-medio";
        verdictTitle = "Modelo No Validado Estándar";
        verdictDesc = "Cualquier negocio digital serio requiere al menos un 20% a 30% de reinversión de tus ingresos esperados en costos operativos y marketing. Desconfía si la promesa promete ingresos inmediatos con cero esfuerzo y cero herramientas de pago.";
      }
      // Renderizar resultados con animaciones
      antihumoResultBox.innerHTML = `
        <div class="result-antihumo-box">
          <div class="verdict-header">
            <span class="verdict-badge ${verdictBadge}">${verdictTitle}</span>
            <h4 style="color: #fff; font-size: 1.2rem;">Índice BS de la Promesa: <strong style="color: ${bsScore > 75 ? 'var(--accent-red)' : 'var(--accent-yellow)'}">${bsScore}% Humo</strong></h4>
          </div>

          <div class="verdict-summary-grid">
            <div class="v-item">
              <span class="v-lbl">Capital Real de Arranque</span>
              <div class="v-val">$${realCapital} USD</div>
            </div>
            <div class="v-item">
              <span class="v-lbl">Tiempo para 1ra Venta</span>
              <div class="v-val" style="font-size: 0.85rem; line-height: 1.3; font-weight: 700; color: var(--accent-blue);">${timeToFirstDollar}</div>
            </div>
          </div>

          <div class="cost-breakdown">
            <h5>📊 Desglose de Costos Reales Escondidos:</h5>
            <ul>
              ${itemizedCosts.map(c => `<li><span>${c.item}</span><strong>$${c.cost} USD</strong></li>`).join('')}
              <li style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 0.5rem; padding-top: 0.5rem; color: #fff;">
                <span>Total Real Estimado:</span>
                <strong style="color: var(--accent-green); font-size: 0.95rem;">$${realCapital} USD</strong>
              </li>
            </ul>
          </div>

          <p class="v-text">
            <strong>⚠️ Veredicto Real del Filtro:</strong><br>
            ${verdictDesc}
          </p>
        </div>
      `;
    });
  }


  // --- 7. BONO 2: LOGICA DE LA AGENDA VIABLE ---
  const agendaForm = document.getElementById('agendaForm');
  const agendaResultBox = document.getElementById('agendaResultBox');
  const agendaActionContainer = document.getElementById('agendaActionContainer');
  const exportAgendaBtn = document.getElementById('exportAgendaBtn');

  let currentAgendaState = null;

  if (agendaForm && agendaResultBox) {
    agendaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const jobTime = document.getElementById('agendaJobTime').value;
      const dailyHours = parseInt(document.getElementById('agendaDailyHours').value);
      
      const daysOfWeek = [
        { id: 'mon', name: 'Lunes' },
        { id: 'tue', name: 'Martes' },
        { id: 'wed', name: 'Miércoles' },
        { id: 'thu', name: 'Jueves' },
        { id: 'fri', name: 'Viernes' },
        { id: 'sat', name: 'Sábado' },
        { id: 'sun', name: 'Domingo' }
      ];

      // Filtrar días activos
      const activeDays = daysOfWeek.map(d => {
        return {
          id: d.id,
          name: d.name,
          active: document.getElementById(`chk-${d.id}`).checked
        };
      });

      // Cargar diagnóstico actual para contextualizar tareas de la agenda
      const localDiagnosis = JSON.parse(localStorage.getItem('radar_diagnosis'));
      let routeTitle = "tu proyecto";
      if (localDiagnosis) {
        const rData = routesDatabase.find(r => r.id === localDiagnosis.routeId);
        if (rData) {
          routeTitle = rData.title.split(" (")[0]; // Nombre corto
        }
      }

      // Definir bloques de tiempo según horario laboral
      let jobPills = [];
      let projectTimeRange = "";
      
      if (jobTime === '9-18') {
        jobPills = ['09:00 - 18:00 (Trabajo Oficina)'];
        projectTimeRange = "19:30 - " + (19.5 + dailyHours) + ":30";
      } else if (jobTime === '8-14') {
        jobPills = ['08:00 - 14:00 (Media Jornada)'];
        projectTimeRange = "16:00 - " + (16 + dailyHours) + ":00";
      } else if (jobTime === '14-22') {
        jobPills = ['14:00 - 22:00 (Turno Tarde/Noche)'];
        projectTimeRange = "09:30 - " + (9.5 + dailyHours) + ":30";
      } else { // Libre
        jobPills = ['Horario Flexible'];
        projectTimeRange = "10:00 - " + (10 + dailyHours) + ":00";
      }

      // Guardar estado actual de la agenda para exportar
      currentAgendaState = {
        routeTitle: routeTitle,
        dailyHours: dailyHours,
        jobTime: jobTime,
        activeDays: activeDays,
        jobPills: jobPills,
        projectTimeRange: projectTimeRange
      };

      // Renderizar calendario
      let htmlContent = `
        <div class="agenda-schedule-box">
          <div class="calendar-header">
            <h4>📅 Tu Agenda de Trabajo Generada</h4>
            <span class="badge-complexity" style="background: rgba(59, 130, 246, 0.1); color: var(--accent-blue);">Sostenible</span>
          </div>
          <div class="calendar-grid">
      `;

      activeDays.forEach(day => {
        htmlContent += `
          <div class="calendar-day-row" style="${!day.active ? 'opacity: 0.55; background: none;' : ''}">
            <span class="day-name">${day.name}</span>
            <div class="day-blocks">
        `;

        if (day.active) {
          // Agregar bloque de trabajo regular (lunes a viernes normalmente)
          if (day.name !== 'Sábado' && day.name !== 'Domingo') {
            jobPills.forEach(p => {
              htmlContent += `<span class="time-block-pill work">💼 ${p}</span>`;
            });
          }

          // Agregar bloques específicos del proyecto
          if (dailyHours === 1) {
            htmlContent += `<span class="time-block-pill project">⚡ ${projectTimeRange} • Enfoque: Tarea Diaria de ${routeTitle}</span>`;
          } else if (dailyHours === 2) {
            htmlContent += `
              <span class="time-block-pill project">⚡ Bloque 1 (60 min) • Ejecutar Tarea del Plan</span>
              <span class="time-block-pill project">📣 Bloque 2 (60 min) • Marketing / Prospección</span>
            `;
          } else { // 3 horas
            htmlContent += `
              <span class="time-block-pill project">🧠 Bloque 1 (60 min) • Estudio y Planificación</span>
              <span class="time-block-pill project">⚡ Bloque 2 (90 min) • Trabajo Duro / Construcción</span>
              <span class="time-block-pill project">📣 Bloque 3 (30 min) • Publicación y Mensajes</span>
            `;
          }
        } else {
          htmlContent += `<span class="time-block-pill work" style="border-style: dashed;">☀️ Descanso Programado / Sueño</span>`;
        }

        htmlContent += `
            </div>
          </div>
        `;
      });

      htmlContent += `
          </div>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 1.5rem; text-align: center;">
            💡 <strong>Consejo del Radar:</strong> Sostener 2 horas al día de enfoque sin celular rinde más que 10 horas el fin de semana cansado. Respeta tus bloques marcados.
          </p>
        </div>
      `;

      agendaResultBox.innerHTML = htmlContent;
      
      // Mostrar contenedor de exportación
      if (agendaActionContainer) {
        agendaActionContainer.style.display = 'flex';
      }
    });
  }

  // Listener para exportar la agenda a archivo de texto
  if (exportAgendaBtn) {
    exportAgendaBtn.addEventListener('click', () => {
      if (!currentAgendaState) return;

      let textAgenda = "=========================================\n";
      textAgenda += "        MI AGENDA VIABLE GENERADA        \n";
      textAgenda += "=========================================\n";
      textAgenda += "Ruta de Ingresos: " + currentAgendaState.routeTitle + "\n";
      textAgenda += "Horas diarias de Enfoque: " + currentAgendaState.dailyHours + " horas\n";
      textAgenda += "Jornada Laboral: " + (currentAgendaState.jobTime === '9-18' ? 'Oficina Completa' : currentAgendaState.jobTime === '8-14' ? 'Media Jornada' : currentAgendaState.jobTime === '14-22' ? 'Tarde/Noche' : 'Flexible/Libre') + "\n\n";

      currentAgendaState.activeDays.forEach(day => {
        textAgenda += "📅 " + day.name.toUpperCase() + ":\n";
        if (day.active) {
          if (day.name !== 'Sábado' && day.name !== 'Domingo') {
            currentAgendaState.jobPills.forEach(p => {
              textAgenda += "  - Jornada: " + p + "\n";
            });
          }
          if (currentAgendaState.dailyHours === 1) {
            textAgenda += "  - Proyecto (" + currentAgendaState.projectTimeRange + "): ⚡ Tarea Diaria del Plan\n";
          } else if (currentAgendaState.dailyHours === 2) {
            textAgenda += "  - Proyecto Bloque 1 (60 min): ⚡ Ejecutar Tarea de Radar de Ingresos\n";
            textAgenda += "  - Proyecto Bloque 2 (60 min): 📣 Marketing / Prospección Comercial\n";
          } else {
            textAgenda += "  - Proyecto Bloque 1 (60 min): 🧠 Estudio y Planificación Semanal\n";
            textAgenda += "  - Proyecto Bloque 2 (90 min): ⚡ Trabajo Duro y Construcción de Activos\n";
            textAgenda += "  - Proyecto Bloque 3 (30 min): 📣 Publicación de Contenidos y Mensajes Directos\n";
          }
        } else {
          textAgenda += "  - ☀️ Descanso / Sueño Programado\n";
        }
        textAgenda += "\n";
      });

      textAgenda += "=========================================\n";
      textAgenda += "Generado automáticamente por la App Radar de Ingresos.\n";
      textAgenda += "¡Constancia diaria mata intensidad esporádica!";

      // Descargar como archivo
      const blob = new Blob([textAgenda], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Mi_Agenda_Viable.txt';
      link.click();
      
      showToast("💾 ¡Agenda descargada con éxito!");
    });
  }


  // --- 8. BONO 3: LOGICA DE CHECKLIST DE ARRANQUE ---
  function loadChecklistArranque() {
    const checklistRouteName = document.getElementById('checklistRouteName');
    const toolsContainer = document.getElementById('checklistToolsList');
    const templatesContainer = document.getElementById('checklistTemplatesList');

    // Cargar diagnóstico actual
    const localDiagnosis = JSON.parse(localStorage.getItem('radar_diagnosis'));
    
    if (!localDiagnosis) {
      if (checklistRouteName) checklistRouteName.textContent = "Sin Diagnóstico Activo";
      if (toolsContainer) toolsContainer.innerHTML = '<div class="result-placeholder">Por favor realiza tu diagnóstico en el panel del Radar de Ingresos primero.</div>';
      if (templatesContainer) templatesContainer.innerHTML = '';
      return;
    }

    const currentRoute = routesDatabase.find(r => r.id === localDiagnosis.routeId);
    if (!currentRoute) return;

    // Actualizar nombre de la ruta
    if (checklistRouteName) checklistRouteName.textContent = currentRoute.title.split(" (")[0];

    // Rellenar herramientas recomendadas
    if (toolsContainer) {
      toolsContainer.innerHTML = currentRoute.tools.map(tool => `
        <div class="tool-item-row">
          <div class="tool-info-left">
            <h5>${tool.name}</h5>
            <p>${tool.desc}</p>
          </div>
          <a href="${tool.url}" target="_blank" class="tool-link-btn">Visitar Sitio &rarr;</a>
        </div>
      `).join('');
    }

    // Rellenar plantillas de copy
    if (templatesContainer) {
      templatesContainer.innerHTML = currentRoute.templates.map((tpl, tIndex) => `
        <div class="template-card">
          <div class="template-card-header">
            <span>${tpl.name}</span>
            <button class="copy-btn" data-tpl-idx="${tIndex}">Copiar Texto</button>
          </div>
          <pre class="template-body-code" id="tpl-text-${tIndex}">${tpl.code}</pre>
        </div>
      `).join('');

      // Agregar evento de copiado
      const copyBtns = templatesContainer.querySelectorAll('.copy-btn');
      copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = btn.dataset.tplIdx;
          const codeText = document.getElementById(`tpl-text-${idx}`).textContent;
          
          navigator.clipboard.writeText(codeText).then(() => {
            const originalText = btn.textContent;
            btn.textContent = '¡Copiado!';
            btn.style.color = 'var(--accent-green)';
            setTimeout(() => {
              btn.textContent = originalText;
              btn.style.color = 'var(--accent-blue)';
            }, 2000);
          }).catch(err => {
            console.error('Error al copiar: ', err);
          });
        });
      });
    }
  }


  // --- 9. BONO 4: LOGICA DEL RECALIBRADOR ---
  const recalibradorForm = document.getElementById('recalibradorForm');
  const recalibradorResultBox = document.getElementById('recalibradorResultBox');

  if (recalibradorForm && recalibradorResultBox) {
    recalibradorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const days = document.querySelector('input[name="recalDays"]:checked').value;
      const blocker = document.querySelector('input[name="recalBlocker"]:checked').value;

      let recTitle = "";
      let recDesc = "";
      let recAction = "";
      let recScript = "";
      let rescueTasks = [];

      if (blocker === 'tiempo') {
        recTitle = "Pivote de Gestión de Tiempo: Micro-Tareas Mobile-First";
        recDesc = "Cuando el tiempo es escaso, cometes el error de intentar sentarte 2 horas seguidas por la noche. Si estás muy cansado, abandonarás. Debes fragmentar tu proyecto en micro-acciones de 15 minutos que puedas realizar desde tu teléfono móvil durante tus tiempos muertos cotidianos (trayectos, esperas, almuerzos).";
        recAction = "Fragmenta tu día en 3 bloques independientes de 15 minutos enfocados en un único entregable.";
        rescueTasks = [
          "Identificar 3 bloques de 15 minutos en mi rutina diaria (tránsito, almuerzo, espera).",
          "Instalar Notion y CapCut en mi teléfono móvil para avanzar sin computador.",
          "Completar la micro-tarea de prospección o redacción del día desde el móvil."
        ];
      } else if (blocker === 'tecnico') {
        recTitle = "Pivote de Herramientas: Simplificación Drástica No-Code";
        recDesc = "El bloqueo técnico (diseñar la web perfecta, conectar pasarelas complejas) es la mayor excusa de parálisis por análisis. Para validar si tu oferta tiene demanda real, no necesitas un sitio web corporativo completo de $500 USD.";
        recAction = "Sustituye la complejidad tecnológica por canales de comunicación directa uno a uno.";
        rescueTasks = [
          "Detener la construcción web y crear un link directo a WhatsApp (api.whatsapp.com/send).",
          "Optimizar el perfil de Instagram/LinkedIn con mi oferta explícita de valor.",
          "Configurar un enlace de cobro manual (PayPal, Stripe Link o datos de transferencia)."
        ];
      } else if (blocker === 'leads') {
        recTitle = "Pivote de Atracción: Tráfico Outbound Directo";
        recDesc = "Esperar a que subas contenido orgánico y la gente te descubra de forma mágica toma meses de constancia algorítmica. Si no tienes leads, debes pasar de esperar tráfico pasivo a salir a buscarlo activamente (Outbound prospección).";
        recAction = "Establece contacto directo con clientes calificados aportando valor por adelantado.";
        rescueTasks = [
          "Buscar y listar 10 perfiles de clientes ideales activos en redes sociales.",
          "Dejar comentarios detallados que aporten valor en sus últimas 2 publicaciones.",
          "Enviar un mensaje directo personalizado ofreciendo una auditoría o recurso de ayuda gratuito."
        ];
        recScript = "Ejemplo de Mensaje:\r\n\"Hola [Nombre]. Estuve revisando tu perfil y el contenido sobre [Tema] está excelente. Noté un pequeño error en tu enlace de contacto que te hace perder conversiones de compra por celular. Te grabé este video rápido de 1 minuto mostrándote cómo corregirlo gratis. ¡Un saludo!\r\n[Enlace a video corto de Loom]\"";
      } else { // ventas
        recTitle = "Pivote de Cierre: Oferta de Entrada Irresistible (Low-Ticket)";
        recDesc = "Si tienes interesados pero nadie compra al dar el precio, tienes un problema de 'Percepción de Valor'. El cliente percibe que el riesgo de darte su dinero es mayor que el beneficio prometido, principalmente porque todavía no confía en tu marca.";
        recAction = "Diseña una oferta de bajo costo y alto valor para romper la barrera de confianza inicial.";
        rescueTasks = [
          "Simplificar mi oferta principal a un servicio 'Beta' acotado y de rápida entrega.",
          "Establecer un precio irresistible (entre $9 y $19 USD) exclusivo para las primeras 3 personas.",
          "Presentar la oferta agregando una garantía total de devolución si no ven resultados en 7 días."
        ];
        recScript = "Guion de Seguimiento:\r\n\"Hola [Nombre]. Sé que estuvimos conversando sobre implementar el sistema en tu negocio y tu mayor duda es la inversión. Estoy buscando 3 casos de éxito beta para probar una nueva optimización rápida de Manychat esta semana.\r\nTe ofrezco el montaje completo por solo $15 USD (en lugar de $80) con la única condición de que si logramos configurar tus primeras respuestas me grabes un video-testimonio de 30 segundos compartiendo tu experiencia. ¿Te subes al grupo beta? Solo tengo 3 cupos.\"";
      }

      // Renderizar Recalibrador
      recalibradorResultBox.innerHTML = `
        <h4>⚙️ ${recTitle}</h4>
        <p>${recDesc}</p>
        
        <div class="rescue-checklist-container" style="margin-top: 1.5rem;">
          <h5 style="color: #fff; font-size: 0.9rem; margin-bottom: 0.8rem;">📋 Tus 3 Acciones Inmediatas (Checklist de Rescate):</h5>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">${recAction}</p>
          <ul class="task-list" style="padding: 0; gap: 0.6rem;">
            ${rescueTasks.map((t, idx) => `
              <li class="task-item recal-task-item" style="padding: 0.8rem 1rem; background: rgba(5, 8, 17, 0.45);">
                <label class="task-checkbox-container">
                  <input type="checkbox" class="recal-task-check" data-idx="${idx}">
                  <span class="checkmark"></span>
                </label>
                <div class="task-text">
                  <h5 style="font-size: 0.82rem; font-weight: 600; line-height: 1.4; color: var(--text-primary); margin-bottom: 0;">${t}</h5>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

        ${recScript ? `
          <div class="recal-script-card" style="margin-top: 1.5rem;">
            <div class="template-card-header" style="background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.2);">
              <span>Guion de Acción Inmediata:</span>
              <button class="copy-btn" id="copyRecalScriptBtn">Copiar Guion</button>
            </div>
            <pre class="template-body-code" id="recalScriptText" style="max-height: 120px;">${recScript}</pre>
          </div>
        ` : ''}
      `;
      recalibradorResultBox.style.display = 'block';

      // Agregar eventos a los checkboxes de rescate
      const recalChecks = recalibradorResultBox.querySelectorAll('.recal-task-check');
      recalChecks.forEach(chk => {
        chk.addEventListener('change', () => {
          const item = chk.closest('.recal-task-item');
          if (chk.checked) {
            item.classList.add('checked');
            const checkedH5 = item.querySelector('.task-text h5');
            if (checkedH5) checkedH5.style.textDecoration = 'line-through';
          } else {
            item.classList.remove('checked');
            const checkedH5 = item.querySelector('.task-text h5');
            if (checkedH5) checkedH5.style.textDecoration = 'none';
          }

          // Verificar si todos están completos
          const allChecked = Array.from(recalChecks).every(c => c.checked);
          if (allChecked) {
            showToast("🎉 ¡Felicidades! Has completado tus 3 acciones de rescate.");
          }
        });
      });

      // Configurar botón de copiado del recalibrador si existe
      const copyRecalScriptBtn = document.getElementById('copyRecalScriptBtn');
      if (copyRecalScriptBtn) {
        copyRecalScriptBtn.addEventListener('click', () => {
          const scriptText = document.getElementById('recalScriptText').textContent;
          navigator.clipboard.writeText(scriptText).then(() => {
            const originalText = copyRecalScriptBtn.textContent;
            copyRecalScriptBtn.textContent = '¡Copiado!';
            copyRecalScriptBtn.style.color = 'var(--accent-green)';
            setTimeout(() => {
              copyRecalScriptBtn.textContent = originalText;
              copyRecalScriptBtn.style.color = 'var(--accent-blue)';
            }, 2000);
          });
        });
      }
    });
  }


  // --- 10. VERIFICAR DIAGNÓSTICO EN LOCAL STORAGE AL CARGAR ---
  const savedDiagnosis = localStorage.getItem('radar_diagnosis');
  if (savedDiagnosis) {
    try {
      const data = JSON.parse(savedDiagnosis);
      const matchedRoute = routesDatabase.find(r => r.id === data.routeId);
      if (matchedRoute) {
        renderDashboard(matchedRoute, data.frictionScore, data.completedTasks || []);
      } else {
        // En caso de corrupción de datos, limpiar
        localStorage.removeItem('radar_diagnosis');
        goToStep(1);
      }
    } catch (e) {
      console.error(e);
      localStorage.removeItem('radar_diagnosis');
      goToStep(1);
    }
  } else {
    // Si no hay datos previos, iniciar en paso 1
    goToStep(1);
  }

  // --- 11. REGISTRO DE SERVICE WORKER (PWA) Y PROMPT DE INSTALACIÓN ---
  
  // Registrar Service Worker
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

  // Capturar evento de instalación nativa (Android/Chrome/Edge)
  window.addEventListener('beforeinstallprompt', (e) => {
    // Evitar que el navegador muestre su banner por defecto
    e.preventDefault();
    // Guardar el evento para dispararlo luego
    deferredPrompt = e;
    // Mostrar banner de instalación personalizado
    if (pwaInstallBanner) {
      pwaInstallBanner.style.display = 'block';
    }
  });

  // Evento click para disparar la instalación
  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', () => {
      if (!deferredPrompt) return;
      
      // Mostrar prompt de instalación
      deferredPrompt.prompt();
      
      // Esperar la respuesta del usuario
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] El usuario aceptó la instalación');
        } else {
          console.log('[PWA] El usuario canceló la instalación');
        }
        // Limpiar el prompt deferred
        deferredPrompt = null;
        // Ocultar banner
        if (pwaInstallBanner) pwaInstallBanner.style.display = 'none';
      });
    });
  }

  // Cerrar banner manual
  if (pwaCloseBannerBtn && pwaInstallBanner) {
    pwaCloseBannerBtn.addEventListener('click', () => {
      pwaInstallBanner.style.display = 'none';
    });
  }

  // DETECCION DE FALLBACK PARA iOS (Safari)
  // Safari en iOS no soporta el evento 'beforeinstallprompt', pero se puede agregar a inicio de forma manual.
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  function isInStandaloneMode() {
    return ('standalone' in window.navigator) && (window.navigator.standalone);
  }

  // Si está en iOS y no está ya instalada (modo standalone), mostrar ayuda de instalación
  if (isIOS() && !isInStandaloneMode()) {
    // Retrasar la visualización 3 segundos para que no interfiera inmediatamente
    setTimeout(() => {
      if (iosInstallTooltip) {
        iosInstallTooltip.style.display = 'block';
        
        // Auto-cerrar después de 12 segundos para no obstruir la pantalla
        setTimeout(() => {
          iosInstallTooltip.style.display = 'none';
        }, 12000);
      }
    }, 3000);
  }

  // Cerrar tooltip iOS
  if (iosCloseTooltipBtn && iosInstallTooltip) {
    iosCloseTooltipBtn.addEventListener('click', () => {
      iosInstallTooltip.style.display = 'none';
    });
  }

  // Escuchar cuando la app es instalada con éxito
  window.addEventListener('appinstalled', (evt) => {
    console.log('[PWA] Radar de Ingresos instalado con éxito');
    if (pwaInstallBanner) pwaInstallBanner.style.display = 'none';
    showToast("🎉 ¡Radar de Ingresos instalado con éxito!");
  });

  // Helper global para mostrar Toasts (Notificaciones flotantes)
  function showToast(msg, bg = 'var(--accent-green)') {
    // Remover tosts previos si los hay
    const oldToasts = document.querySelectorAll('.app-toast');
    oldToasts.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '2.5rem';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = bg;
    toast.style.color = '#fff';
    toast.style.padding = '0.9rem 1.8rem';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), var(--shadow-glow)';
    toast.style.zIndex = '99999';
    toast.style.fontWeight = '800';
    toast.style.fontSize = '0.82rem';
    toast.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    toast.style.animation = 'pwaSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    toast.textContent = msg;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3500);
  }
});
