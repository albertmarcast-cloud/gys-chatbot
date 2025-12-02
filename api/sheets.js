// /pages/api/sheets.js
export default async function handler(req, res) {
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw7LP5JTdlfg6X5yE5Rr9jzDdT_93WxySpS1tiJ9y9iHzl1ZXgbsxM4vqyt3Di3g_Vr/exec";

  const route = req.query.route;

  // ============================
  // POST: crear pedido / upload
  // ============================
  if (req.method === "POST") {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route: route,    // ejemplo: crearPedido
          data: req.body,  // datos enviados por el bot
        }),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error proxy POST:", error);
      return res.status(500).json({
        error: true,
        message: "Error al conectar con Google Script (POST)",
      });
    }
  }

  // ============================
  // GET: catálogos / encomiendas
  // ============================
  if (req.method === "GET") {
    try {
      const params = new URLSearchParams(req.query).toString();
      const url = `${APPS_SCRIPT_URL}?${params}`;

      const response = await fetch(url);
      const data = await response.json();

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error proxy GET:", error);
      return res.status(500).json({
        error: true,
        message: "Error al conectar con Google Script (GET)",
      });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
