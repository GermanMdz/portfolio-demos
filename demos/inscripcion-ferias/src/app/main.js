import { FERIA, INSCRIPTOS } from "../data.js";
import { renderFeriaPage } from "./feria/page.js";
import { renderListadoInscriptos } from "../components/ListadoInscriptos.js";

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
    <main class="login-page">
      <section class="login-welcome">
        <div class="login-welcome-content">
          <p class="login-brand">INSCRIPCIÓN DE FERIAS</p>
          <h1>¡Bienvenido nuevamente!</h1>
          <p>Aquí puedes iniciar sesión y realizar tus inscripciones de manera rápida y sencilla.</p>
        </div>
      </section>

      <section class="login-form-panel">
        <div class="login-form-content">
          <h2>Iniciar sesión</h2>
          <p class="login-form-copy">Elegí cómo querés acceder a la demo</p>
          <div class="login-role-actions">
            <button class="login-role-button" id="user-login" type="button">
              <span class="login-role-icon">👤</span>
              <span><strong>Ingresar como usuario</strong><small>Inscribite en la feria</small></span>
            </button>
            <button class="login-role-button" id="admin-login" type="button">
              <span class="login-role-icon">⚙️</span>
              <span><strong>Ingresar como admin</strong><small>Consultá los inscriptos</small></span>
            </button>
          </div>
          <p class="login-demo-note">Acceso de demostración sin credenciales reales.</p>
        </div>
      </section>
    </main>
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
