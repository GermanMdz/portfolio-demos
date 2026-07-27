export function mapearFecha(fecha: string): string {
  // const fecha = "2025-12-25";
  const [año, mes, dia] = fecha.split("-").map(Number);
  const date = new Date(año, mes - 1, dia); // mes - 1 porque enero es 0

  const diaSemana = date.toLocaleString("es-AR", { weekday: "long" });
  const mesTexto = date.toLocaleString("es-AR", { month: "long" });

  return `${diaSemana} ${date.getDate()} de ${mesTexto} ${date.getFullYear()}`;
}

export function mapearFechaCorta(fecha: string): string {
  // const fecha = "2025-12-25";
  const [año, mes, dia] = fecha.split("-").map(Number);
  const date = new Date(año, mes - 1, dia); // mes - 1 porque enero es 0

  const mesTexto = date.toLocaleString("es-AR", { month: "long" });

  return `${dia} de ${mesTexto}`;
}