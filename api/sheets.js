// /api/sheets.js

export default async function handler(req, res) {
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw7LP5JTdlfg6X5yE5Rr9jzDdT_93WxySpS1tiJ9y9iHzl1ZXgbsxM4vqyt3Di3g_Vr/exec";

  // =============================
  // GET → Catálogo y Encomiendas
  // =============================
  if (req.method === "GET") {
    try {
      const query = new URLSearchParams(req.query).toString();
      const url = `${APPS_SCRIPT_URL}?${query}`;

      const response = await fetch(url);
      const data = await response.json();

      return res.status(200).json(data);
    } catch (err) {
      console.error("Error proxy GET:", err);
      return res.status(500).json({
        error: true,
        message: "Error en proxy GET",
      });
    }
  }

  // =============================
  // POST → Crear Pedido / Subir Comprobante
  // =============================
  if (req.method === "POST") {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route: req.body.route, // ← IMPORTANTE
          data: req.body,        // ← IMPORTANTE
        }),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error("Error proxy POST:", err);
      return res.status(500).json({
        error: true,
        message: "Error en proxy POST",
      });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
