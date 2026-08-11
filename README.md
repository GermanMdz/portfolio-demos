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
docker compose up --build
```

Abrir el portal principal en [http://localhost:8080](http://localhost:8080). Desde la página principal,
cada proyecto se muestra en una card y su demo se abre dentro de un popup interactivo.

El portal también puede verse sin Docker sirviendo únicamente la carpeta `portal/`:

```bash
python -m http.server 4173 --directory portal
```

Abrir [http://localhost:4173](http://localhost:4173). En este modo el portfolio se verá,
pero las demos no estarán disponibles hasta levantar Docker.

Publicación del portal en Vercel
- Root Directory: `portal`
- Framework Preset: `Other`
- Build Command: vacío
- Output Directory: `.`
- Antes de publicar, reemplazar `portfolio-demos-xxxxx.run.app` en `portal/vercel.json` por
    la URL única del servicio Cloud Run. El frontend usa esas rutas relativas en producción.

Publicación de las demos en Cloud Run
El archivo `docker-compose.yml` se despliega como un único servicio de Cloud Run con tres
contenedores en cada instancia: `gateway` (ingress), `inscripcion-ferias` e `ia`. El gateway
es el único contenedor con `ports`; las demos usan `expose` y se resuelven por sus nombres de
servicio dentro de la instancia. El gateway escucha en `8080`, IA en `5000` y ferias en `5001`;
Cloud Run exige que sólo el ingress declare el puerto `8080`.

Este flujo usa la funcionalidad Compose de Cloud Run, actualmente en beta. Requiere Google
Cloud CLI instalada y autenticada, un proyecto seleccionado y facturación habilitada:

```powershell
$PROJECT_ID = "tu-project-id"
$REGION = "southamerica-east1"

gcloud auth login
gcloud config set project $PROJECT_ID
gcloud services enable run.googleapis.com,cloudbuild.googleapis.com,artifactregistry.googleapis.com,storage.googleapis.com
```

Concede a tu usuario los roles `roles/run.admin`, `roles/iam.serviceAccountUser` y
`roles/cloudbuild.builds.editor` (o sus equivalentes más restrictivos). Luego, desde la raíz
del repositorio, ejecuta el despliegue completo:

```powershell
gcloud beta run compose up docker-compose.yml `
    --project=$PROJECT_ID `
    --region=$REGION
```

Cloud Run compila los servicios con `build`, publica las imágenes en el repositorio administrado
`cloud-run-source-deploy` de Artifact Registry y crea un único servicio con una URL única. Si el
comando solicita instalar componentes beta, responde `y`. Para permitir el acceso público desde
Vercel:

```powershell
gcloud run services add-iam-policy-binding portfolio-demos `
    --project=$PROJECT_ID `
    --region=$REGION `
    --member="allUsers" `
    --role="roles/run.invoker"
```

Si el servicio recibe otro nombre durante el primer despliegue, usa ese nombre en el comando
anterior. Copia la URL única resultante en los dos archivos de configuración de Vercel.

También se puede preparar Artifact Registry explícitamente antes del despliegue:

```powershell
gcloud artifacts repositories create portfolio-demos `
    --repository-format=docker `
    --location=$REGION `
    --project=$PROJECT_ID

gcloud auth configure-docker ${REGION}-docker.pkg.dev
```

Estructura inicial
```
portfolio-demos/
├── README.md
├── docker-compose.yml
├── portal/
│   ├── index.html
│   ├── portal.css
│   └── portal.js
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
    ├── ia/
    │   ├── Dockerfile
    │   ├── README.md
    │   ├── app.py
    │   ├── model/
    │   ├── templates/
    │   └── static/
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