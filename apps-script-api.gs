// ===== AGGIUNGI IN FONDO A Code.gs (non cancellare nulla di esistente) =====
const API_FUNZIONI = {
  convocatoria, guardarRespuesta, cambiarEstadoAdmin, marcarDesconvocado,
  guardarPartido, nuevoPartido, cambiarEstadoPartido, historial, estadisticas,
  respuestasPartidoHistorial, cambiarPresenciaHistorial,
  guardarJugador, nuevoJugador, eliminarJugador, contarVisita
};

function doPost(e) {
  let salida;
  try {
    const r = JSON.parse(e.postData.contents);
    const f = API_FUNZIONI[r.fn];
    if (!f) throw new Error('Funcion no valida');
    const data = f.apply(null, r.args || []);
    salida = { data: data === undefined ? null : data };
  } catch (err) {
    salida = { error: err.message };
  }
  return ContentService.createTextOutput(JSON.stringify(salida))
    .setMimeType(ContentService.MimeType.JSON);
}