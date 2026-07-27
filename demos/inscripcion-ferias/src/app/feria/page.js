export function renderFeriaPage({ root, feria, role, subscribed, statusMessage, onSubscribe, onViewInscriptos }) {
  root.innerHTML = `
    <div class="page-shell">
      <section class="hero">
        <div class="hero-content">
          <div>
            <span class="small-pill">Inscripción Ferias</span>
            <h1 class="hero-title">${feria.nombre}</h1>
            <p class="hero-copy">${feria.resumen}</p>
          </div>
          <div class="card field-card">
            <p class="section-title">${role === "admin" ? "Vista administrador" : "Vista participante"}</p>
            <p>${role === "admin" ? "Revisa inscripciones y genera listados para la feria." : "Inscríbete para participar en esta feria de emprendedores."}</p>
          </div>
        </div>
      </section>

      <section class="section card field-card">
        <div class="info-card">
          <div class="info-item">
            <strong>Nombre</strong>
            <span>${feria.nombre}</span>
          </div>
          <div class="info-item">
            <strong>Fecha</strong>
            <span>${feria.fecha}</span>
          </div>
          <div class="info-item">
            <strong>Horario</strong>
            <span>${feria.horario}</span>
          </div>
          <div class="info-item">
            <strong>Ubicación</strong>
            <span>${feria.ubicacion}</span>
          </div>
        </div>

        <div class="section" style="margin-top: 28px; display: flex; gap: 16px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
          <div>
            <p class="section-title">Acciones</p>
            <p class="hero-copy" style="margin-top: 0;">${role === "admin" ? "Accede a la lista de inscriptos para ver quiénes se registraron." : "Haz clic en inscribirse para simular la confirmación de tu cupo."}</p>
          </div>
          <div class="button-group" style="grid-template-columns: repeat(2, minmax(0, 1fr)); width: auto;">
            ${role === "admin" ? `
              <button class="button-secondary" id="view-inscriptos">Ver inscriptos</button>
            ` : `
              <button class="button-solid" id="subscribe">Inscribirse</button>
            `}
          </div>
        </div>

        ${statusMessage ? `<div class="alert">${statusMessage}</div>` : ""}
      </section>
    </div>
  `;

  if (role === "admin") {
    document.getElementById("view-inscriptos").addEventListener("click", onViewInscriptos);
  } else {
    document.getElementById("subscribe").addEventListener("click", onSubscribe);
  }
}
