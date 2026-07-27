export function renderListadoInscriptos({ root, feria, inscriptos, onBack }) {
  root.innerHTML = `
    <div class="page-shell">
      <section class="hero" style="background: linear-gradient(135deg, #312e81 0%, #0f172a 100%);">
        <div class="hero-content">
          <div>
            <span class="small-pill">Admin</span>
            <h1 class="hero-title">Listado de inscriptos</h1>
            <p class="hero-copy">Visualiza quiénes se registraron para la feria.</p>
          </div>
          <div class="card field-card">
            <p class="section-title">Feria</p>
            <p>${feria.nombre}</p>
          </div>
        </div>
      </section>

      <section class="section card table-card">
        <div class="table-header">
          <span>Nombre</span>
          <span>Email</span>
          <span>Estado</span>
        </div>
        ${inscriptos
          .map(
            (inscrito) => `
            <div class="table-row">
              <span>${inscrito.nombre}</span>
              <span>${inscrito.email}</span>
              <span><span class="badge">${inscrito.estado}</span></span>
            </div>
          `
          )
          .join("")}
      </section>

      <button class="button-secondary" style="margin-top: 18px;" id="back-button">Volver a la feria</button>
    </div>
  `;

  document.getElementById("back-button").addEventListener("click", onBack);
}
