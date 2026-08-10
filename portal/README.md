# Portal del portfolio

El portal es un sitio estático y puede publicarse en Vercel sin ejecutar Docker.

## Vercel

En Vercel seleccioná este repositorio y configurá:

- **Root Directory:** `portal`
- **Framework Preset:** `Other`
- **Build Command:** vacío
- **Output Directory:** `.`

El portal quedará disponible incluso si Docker está apagado.

## URL de las demos

Editá `config.js` antes de publicar:

```js
window.PORTFOLIO_CONFIG = {
  demosOrigin: "https://TU-URL-PUBLICA-DE-LA-VPS",
};
```

En desarrollo local se deja `http://localhost:8080`, por lo que las demos funcionan
solo cuando el gateway y sus contenedores están levantados.

Si la VPS está apagada o Docker no está ejecutándose, el portal seguirá visible y el
popup mostrará que la demo no está disponible.