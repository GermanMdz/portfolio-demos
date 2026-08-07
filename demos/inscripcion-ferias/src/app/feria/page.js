function siteChrome(content) {
  return `
    <header class="site-header">
      <nav class="site-nav">
        <a class="site-logo" href="#" aria-label="Vivamos Vicente López"><span class="site-logo-mark">VIVAMOS<span>VICENTE LÓPEZ</span></span></a>
        <div class="site-links"><a href="#">INICIO</a><a class="active" href="#">FERIAS</a></div>
        <div class="site-auth"><button type="button">INGRESAR</button></div>
      </nav>
      <div class="color-bar"></div>
    </header>
    ${content}
    <footer class="site-footer"><div class="footer-grid">
      <div><h4>Contacto</h4><p>Municipalidad de Vicente López</p></div>
      <div><h4>Enlaces</h4><ul><li><a href="#">Trámites</a></li><li><a href="#">Servicios</a></li></ul></div>
      <div><h4>Redes</h4><p>Síguenos en nuestras redes</p></div>
    </div></footer>
  `;
}

export function renderFeriaPage({ root, feria, role, statusMessage, onSubscribe, onViewInscriptos }) {
  root.innerHTML = siteChrome(`
    <main class="page-shell">
      <section class="hero"><div class="hero-inner">
        <h1 class="hero-title">${feria.nombre}</h1>
        <p class="hero-location">📍 ${feria.direccion}</p>
      </div></section>
      <section class="content-section"><div class="content-inner">
        <div class="detail-grid">
          <div class="fair-image"><img src="${feria.imagen}" alt="Imagen de ${feria.nombre}" /></div>
          <div class="info-panel">
            <div class="info-item"><span class="info-icon">📅</span><div><p class="info-label">Fecha</p><p class="info-value">${feria.fecha}</p></div></div>
            <div class="info-item"><span class="info-icon">🕐</span><div><p class="info-label">Horario</p><p class="info-value">${feria.horario}</p></div></div>
            <div class="info-item"><span class="info-icon">📍</span><div><p class="info-label">Dirección</p><p class="info-value">${feria.direccion}</p></div></div>
          </div>
        </div>
        ${statusMessage ? `<div class="alert">${statusMessage}</div>` : ""}
        <div class="cta-card">
          <p>${role === "admin" ? "¿Querés ver las inscripciones actuales?" : "¿Querés participar de esta feria?"}</p>
          ${role === "admin" ? `<button class="button-muted" id="view-inscriptos">Ver inscripciones</button>` : `<button class="button-primary" id="subscribe">Inscribirse</button>`}
        </div>
      </div></section>
    </main>
  `);

  const action = document.getElementById(role === "admin" ? "view-inscriptos" : "subscribe");
  action.addEventListener("click", role === "admin" ? onViewInscriptos : onSubscribe);
}
