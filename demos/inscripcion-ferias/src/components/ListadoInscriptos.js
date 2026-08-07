function siteChrome(content) {
  return `
    <header class="site-header"><nav class="site-nav">
      <a class="site-logo" href="#" aria-label="Vivamos Vicente López"><span class="site-logo-mark">VIVAMOS<span>VICENTE LÓPEZ</span></span></a>
      <div class="site-links"><a href="#">INICIO</a><a class="active" href="#">FERIAS</a></div>
      <div class="site-auth"><button type="button">INGRESAR</button></div>
    </nav><div class="color-bar"></div></header>
    ${content}
    <footer class="site-footer"><div class="footer-grid">
      <div><h4>Contacto</h4><p>Municipalidad de Vicente López</p></div>
      <div><h4>Enlaces</h4><ul><li><a href="#">Trámites</a></li><li><a href="#">Servicios</a></li></ul></div>
      <div><h4>Redes</h4><p>Síguenos en nuestras redes</p></div>
    </div></footer>
  `;
}

export function renderListadoInscriptos({ root, feria, inscriptos, onBack }) {
  root.innerHTML = siteChrome(`
    <main class="listing-wrap"><section class="listing-card">
      <div class="listing-header"><div>
        <h1 class="listing-title">Usuarios inscriptos</h1>
        <p class="listing-subtitle"><strong>${feria.nombre}</strong></p>
      </div><button class="button-primary listing-button" id="generate-listings">Generar listados</button></div>
      ${inscriptos.length === 0 ? `<p class="empty">No hay inscripciones.</p>` : `<ul class="registrants">${inscriptos.map((user) => `
        <li class="registrant"><div class="avatar">${user.nombre.charAt(0)}</div><div><span class="registrant-name">${user.nombre}</span><span class="registrant-email">${user.email}</span></div></li>
      `).join("")}</ul>`}
      <div id="listing-message"></div>
    </section><button class="button-muted" style="margin-top:18px" id="back-button">Volver</button></main>
  `);

  document.getElementById("back-button").addEventListener("click", onBack);
  document.getElementById("generate-listings").addEventListener("click", () => {
    document.getElementById("listing-message").innerHTML = '<div class="alert">Listados generados para la demo.</div>';
  });
}
