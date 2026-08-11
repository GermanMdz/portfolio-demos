/* The deployed portal and both demos share this single Cloud Run service. */
window.PORTFOLIO_CONFIG = {
  demosOrigin: window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://portfolio-demos-afgzbch5ra-rj.a.run.app",
};