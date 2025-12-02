export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // URL del Apps Script desplegado como App Web
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw7LP5JTdlfg6X5yE5Rr9jzDdT_93WxySpS1tiJ9y9iHzl1ZXgbsxM4vqyt3Di3g_Vr/exec";

  try {
    // Enviar al Apps Script:
    //  - route: para el router del doPost
    //  - data: el cuerpo original que manda tu bot
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "crearPedido",
        data: req.body,
      }),
    });

    const data = await response.json();

    // Reenviar la respuesta al frontend/bot
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en proxy:", error);
    return res.status(500).json({
      error: true,
      message: "Error al conectar con Google Sheets",
    });
  }
}
