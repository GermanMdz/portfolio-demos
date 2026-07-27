import { FERIA, INSCRIPTOS } from "../data.js";
import { renderFeriaPage } from "./feria/page.js";
import { renderListadoInscriptos } from "../../components/ListadoInscriptos.js";

const root = document.getElementById("root");
const basePath = "/demos/inscripcion-ferias";

const state = {
  role: null,
  subscribed: false,
  statusMessage: null,
};

window.addEventListener("popstate", () => {
  render();
});

function normalizePath(pathname) {
  let path = pathname;
  if (path.startsWith(basePath)) {
    path = path.slice(basePath.length);
  }
  if (!path) {
    path = "/";
  }
  return path;
}

function getRoute() {
  const path = normalizePath(window.location.pathname);
  if (!state.role) {
    return { page: "login" };
  }

  if (path === "/" || path === "/feria" || path === "/feria/1") {
    return { page: "feria" };
  }

  if (path === "/feria/1/inscriptos") {
    return { page: "inscriptos" };
  }

  return { page: "feria" };
}

function navigate(path) {
  const normalized = path.startsWith(basePath) ? path : `${basePath}${path}`;
  history.pushState(null, "", normalized);
  render();
}

function handleLogin(role) {
  state.role = role;
  state.subscribed = false;
  state.statusMessage = null;
  navigate("/feria/1");
}

function handleSubscribe() {
  state.subscribed = true;
  state.statusMessage = "¡Tu inscripción se registró correctamente!";
  render();
}

function handleViewInscriptos() {
  navigate("/feria/1/inscriptos");
}

function handleBackToFeria() {
  navigate("/feria/1");
}

function renderLoginPage() {
  root.innerHTML = `
    <div class="page-shell">
      <section class="hero">
        <div class="hero-content">
          <div>
            <span class="small-pill">Demo profesional</span>
            <h1 class="hero-title">Inscripción de Ferias</h1>
            <p class="hero-copy">Selecciona tu modo de acceso para ver la experiencia de usuario o la vista de administrador.</p>
          </div>
          <div class="card field-card">
            <p class="section-title">Iniciar sesión</p>
            <div class="button-group">
              <button class="button-solid" id="user-login">Ingresar como usuario</button>
              <button class="button-secondary" id="admin-login">Ingresar como admin</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section card field-card">
        <p class="section-title">Qué verás</p>
        <ul>
          <li>👉 Usuario: página de feria con botón de inscripción.</li>
          <li>👉 Admin: misma pantalla con botón de ver inscriptos.</li>
          <li>👉 Inscripciones ficticias en la lista de admin.</li>
        </ul>
      </section>
    </div>
  `;

  document.getElementById("user-login").addEventListener("click", () => {
    handleLogin("user");
  });

  document.getElementById("admin-login").addEventListener("click", () => {
    handleLogin("admin");
  });
}

function render() {
  const route = getRoute();

  if (route.page === "login") {
    renderLoginPage();
    return;
  }

  if (route.page === "feria") {
    renderFeriaPage({
      root,
      feria: FERIA,
      role: state.role,
      subscribed: state.subscribed,
      statusMessage: state.statusMessage,
      onSubscribe: handleSubscribe,
      onViewInscriptos: handleViewInscriptos,
    });
    return;
  }

  if (route.page === "inscriptos") {
    renderListadoInscriptos({
      root,
      feria: FERIA,
      inscriptos: INSCRIPTOS,
      onBack: handleBackToFeria,
    });
    return;
  }
}

render();
