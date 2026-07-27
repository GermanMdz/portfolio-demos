# portfolio-demos

Este repositorio contiene demos interactivas reducidas de proyectos personales pensadas
para mostrar rápidamente funcionalidades relevantes a recruiters y visitantes.

Objetivo
- Proveer versiones demo que expliquen y muestren el valor de cada proyecto en < 1 minuto.
- Usar datos mock, lógica simplificada o simulaciones — NO reemplazan los repositorios originales.

Arquitectura general
- Gateway / Reverse proxy (Nginx) expuesto al usuario.
- Cada demo se ejecuta en su propio contenedor o conjunto de contenedores y está aislada.
- El gateway enruta rutas como `/demos/<nombre>` hacia el servicio correspondiente.

Arranque
Instalar Docker y Docker Compose en la máquina y ejecutar:

```bash
docker compose up
```

Estructura inicial
```
portfolio-demos/
├── README.md
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
└── demos/
    ├── inscripcion-ferias/
    │   ├── Dockerfile
    │   ├── README.md
    │   ├── nginx.conf
    │   ├── index.html
    │   ├── style.css
    │   └── src/
    └── (aquí añadiremos demos individuales)
```

Cómo añadir demos
1. Añadir un nuevo directorio en `demos/` con el nombre del proyecto.
2. Proveer un `Dockerfile` o definir el servicio en `docker-compose.yml` apuntando al nuevo contenedor.
3. Añadir un `README.md` en la carpeta del demo explicando la demo (qué simula y cómo interactuar).

Notas
- Por ahora sólo se ha creado la estructura base y el gateway; las demos se agregarán posteriormente
	siguiendo el flujo acordado: propondré arquitectura por demo antes de implementarla.

Más información
Ver [demos/README.md](demos/README.md) para la plantilla y reglas sobre cómo crear demos.