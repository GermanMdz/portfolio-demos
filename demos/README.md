Plantilla y reglas para añadir nuevas demos al repositorio.

Cada demo debe ubicarse en `demos/<nombre-del-proyecto>` y contener:

- `README.md`: descripción de la demo, funcionalidad que muestra, cómo ejecutarla, qué está simulado.
- `Dockerfile` o definición de servicio en `docker-compose.yml` si requiere contenedor.
- Archivos estáticos y código de la demo.

Reglas esenciales:
1. No modificar otras demos existentes.
2. Mantener la interfaz lo más cercana posible al proyecto original.
3. Priorizar interacción y claridad — la demo debe mostrar el valor en < 1 minuto.

Flujo antes de implementar una demo:
1. Propondré la arquitectura específica de la demo.
2. Listaré los archivos que voy a crear.
3. Implementaré la demo tras tu aprobación.
