// /pages/api/sheets.js

export default async function handler(req, res) {
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw7LP5JTdlfg6X5yE5Rr9jzDdT_93WxySpS1tiJ9y9iHzl1ZXgbsxM4vqyt3Di3g_Vr/exec";

  // ============================
  // 🔵 GET → Catálogo / Encomiendas / Pedido
  // ============================
  if (req.method === "GET") {
    try {
      const qs = new URLSearchParams(req.query).toString();
      const url = `${APPS_SCRIPT_URL}?${qs}`;

      const response = await fetch(url);
      const data = await response.json();

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error proxy GET:", error);
      return res.status(500).json({
        error: true,
        message: "Error en proxy GET",
      });
    }
  }

  // ============================
  // 🔴 POST → Crear Pedido / Subir Comprobante
  // ============================
  if (req.method === "POST") {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error proxy POST:", error);
      return res.status(500).json({
        error: true,
        message: "Error en proxy POST",
      });
    }
  }

  // Otros métodos no permitidos
  return res.status(405).json({ error: "Método no permitido" });
}
