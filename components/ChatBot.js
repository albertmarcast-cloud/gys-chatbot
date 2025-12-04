import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  ShoppingBag,
  Package,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Truck,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

// URL de tu Apps Script
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw7LP5JTdlfg6X5yE5Rr9jzDdT_93WxySpS1tiJ9y9iHzl1ZXgbsxM4vqyt3Di3g_Vr/exec";

// WhatsApp del negocio
const WHATSAPP_NEGOCIO = "50375936319";

// Departamentos y municipios
const DEPARTAMENTOS_MUNICIPIOS = {
  Ahuachapán: [
    "Ahuachapán",
    "Apaneca",
    "Atiquizaya",
    "Concepción de Ataco",
    "El Refugio",
    "Guaymango",
    "Jujutla",
    "San Francisco Menéndez",
    "San Lorenzo",
    "San Pedro Puxtla",
    "Tacuba",
    "Turín",
  ],
  Cabañas: [
    "Sensuntepeque",
    "Cinquera",
    "Dolores",
    "Guacotecti",
    "Ilobasco",
    "Jutiapa",
    "San Isidro",
    "Tejutepeque",
    "Victoria",
  ],
  Chalatenango: [
    "Chalatenango",
    "Agua Caliente",
    "Arcatao",
    "Azacualpa",
    "Cancasque",
    "Citalá",
    "Comalapa",
    "Concepción Quezaltepeque",
    "Dulce Nombre de María",
    "El Carrizal",
    "El Paraíso",
    "La Laguna",
    "La Palma",
    "La Reina",
    "Las Vueltas",
    "Nombre de Jesús",
    "Nueva Concepción",
    "Nueva Trinidad",
    "Ojos de Agua",
    "Potonico",
    "San Antonio de la Cruz",
    "San Antonio Los Ranchos",
    "San Fernando",
    "San Francisco Lempa",
    "San Francisco Morazán",
    "San Ignacio",
    "San Isidro Labrador",
    "San Luis del Carmen",
    "San Miguel de Mercedes",
    "San Rafael",
    "Santa Rita",
    "Tejutla",
  ],
  Cuscatlán: [
    "Cojutepeque",
    "Candelaria",
    "El Carmen",
    "El Rosario",
    "Monte San Juan",
    "Oratorio de Concepción",
    "San Bartolomé Perulapía",
    "San Cristóbal",
    "San José Guayabal",
    "San Pedro Perulapán",
    "San Rafael Cedros",
    "San Ramón",
    "Santa Cruz Analquito",
    "Santa Cruz Michapa",
    "Suchitoto",
    "Tenancingo",
  ],
  "La Libertad": [
    "Santa Tecla",
    "Antiguo Cuscatlán",
    "Chiltiupán",
    "Ciudad Arce",
    "Colón",
    "Comasagua",
    "Huizúcar",
    "Jayaque",
    "Jicalapa",
    "La Libertad",
    "Nuevo Cuscatlán",
    "Quezaltepeque",
    "Sacacoyo",
    "San José Villanueva",
    "San Juan Opico",
    "San Matías",
    "San Pablo Tacachico",
    "Tamanique",
    "Talnique",
    "Teotepeque",
    "Tepecoyo",
    "Zaragoza",
  ],
  "La Paz": [
    "Zacatecoluca",
    "Cuyultitán",
    "El Rosario",
    "Jerusalén",
    "Mercedes La Ceiba",
    "Olocuilta",
    "Paraíso de Osorio",
    "San Antonio Masahuat",
    "San Emigdio",
    "San Francisco Chinameca",
    "San Juan Nonualco",
    "San Juan Talpa",
    "San Juan Tepezontes",
    "San Luis La Herradura",
    "San Luis Talpa",
    "San Miguel Tepezontes",
    "San Pedro Masahuat",
    "San Pedro Nonualco",
    "San Rafael Obrajuelo",
    "Santa María Ostuma",
    "Santiago Nonualco",
    "Tapalhuaca",
  ],
  "La Unión": [
    "La Unión",
    "Anamorós",
    "Bolívar",
    "Concepción de Oriente",
    "Conchagua",
    "El Carmen",
    "El Sauce",
    "Intipucá",
    "Lislique",
    "Meanguera del Golfo",
    "Nueva Esparta",
    "Pasaquina",
    "Polorós",
    "San Alejo",
    "San José",
    "Santa Rosa de Lima",
    "Yayantique",
    "Yucuaiquín",
  ],
  Morazán: [
    "San Francisco Gotera",
    "Arambala",
    "Cacaopera",
    "Chilanga",
    "Corinto",
    "Delicias de Concepción",
    "El Divisadero",
    "El Rosario",
    "Gualococti",
    "Guatajiagua",
    "Joateca",
    "Jocoaitique",
    "Jocoro",
    "Lolotiquillo",
    "Meanguera",
    "Osicala",
    "Perquín",
    "San Carlos",
    "San Fernando",
    "San Isidro",
    "San Simón",
    "Sensembra",
    "Sociedad",
    "Torola",
    "Yamabal",
    "Yoloaiquín",
  ],
  "San Miguel": [
    "San Miguel",
    "Carolina",
    "Chapeltique",
    "Chinameca",
    "Chirilagua",
    "Ciudad Barrios",
    "Comacarán",
    "El Tránsito",
    "Lolotique",
    "Moncagua",
    "Nueva Guadalupe",
    "Nuevo Edén de San Juan",
    "Quelepa",
    "San Antonio del Mosco",
    "San Gerardo",
    "San Jorge",
    "San Luis de la Reina",
    "San Rafael Oriente",
    "Sesori",
    "Uluazapa",
  ],
  "San Salvador": [
    "San Salvador",
    "Aguilares",
    "Apopa",
    "Ayutuxtepeque",
    "Cuscatancingo",
    "Delgado",
    "El Paisnal",
    "Guazapa",
    "Ilopango",
    "Mejicanos",
    "Nejapa",
    "Panchimalco",
    "Rosario de Mora",
    "San Marcos",
    "San Martín",
    "Santiago Texacuangos",
    "Santo Tomás",
    "Soyapango",
    "Tonacatepeque",
  ],
  "San Vicente": [
    "San Vicente",
    "Apastepeque",
    "Guadalupe",
    "San Cayetano Istepeque",
    "San Esteban Catarina",
    "San Ildefonso",
    "San Lorenzo",
    "San Sebastián",
    "Santa Clara",
    "Santo Domingo",
    "Tecoluca",
    "Tepetitán",
    "Verapaz",
  ],
  "Santa Ana": [
    "Santa Ana",
    "Candelaria de la Frontera",
    "Chalchuapa",
    "Coatepeque",
    "El Congo",
    "El Porvenir",
    "Masahuat",
    "Metapán",
    "San Antonio Pajonal",
    "San Sebastián Salitrillo",
    "Santa Rosa Guachipilín",
    "Santiago de la Frontera",
    "Texistepeque",
  ],
  Sonsonate: [
    "Sonsonate",
    "Acajutla",
    "Armenia",
    "Caluco",
    "Cuisnahuat",
    "Izalco",
    "Juayúa",
    "Nahuizalco",
    "Nahulingo",
    "Salcoatitán",
    "San Antonio del Monte",
    "San Julián",
    "Santa Catarina Masahuat",
    "Santa Isabel Ishuatán",
    "Santo Domingo de Guzmán",
    "Sonzacate",
  ],
  Usulután: [
    "Usulután",
    "Alegría",
    "Berlín",
    "California",
    "Concepción Batres",
    "El Triunfo",
    "Ereguayquín",
    "Estanzuelas",
    "Jiquilisco",
    "Jucuapa",
    "Jucuarán",
    "Mercedes Umaña",
    "Nueva Granada",
    "Ozatlán",
    "Puerto El Triunfo",
    "San Agustín",
    "San Buenaventura",
    "San Dionisio",
    "San Francisco Javier",
    "Santa Elena",
    "Santa María",
    "Santiago de María",
    "Tecapán",
  ],
};

// ======================
//  COMPONENTE PRINCIPAL
// ======================
export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [catalogo, setCatalogo] = useState([]);
  const [encomiendistas, setEncomiendistas] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [loadingEncomiendas, setLoadingEncomiendas] = useState(false);

  const [sessionData, setSessionData] = useState({
    step: "inicio",
    nombre: "",
    telefono: "",
    carrito: [],
    departamento: "",
    municipio: "",
    direccion: "",
    punto_referencia: "",
    tipo_entrega: "",
    metodo_pago: "",
    encomiendista: "",
    encomiendista_nombre: "",
    encomiendista_telefono: "",
    costo_envio: 0,
    dia_entrega: "",
    hora_entrega: "",
    foto_comprobante_base64: "",
    factura_generada: "",
  });

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [encomiendaIndex, setEncomiendaIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showEncomiendaCarousel, setShowEncomiendaCarousel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedTalla, setSelectedTalla] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    addMessage(
      "¡Hola! 💚 Bienvenido/a a GyS Importadora ✨\n\nPor favor, dime tu NOMBRE COMPLETO:",
      "bot"
    );
  }, []);

  const addMessage = (text, sender, options = null) => {
    setMessages((prev) => [
      ...prev,
      { text, sender, options, timestamp: new Date() },
    ]);
  };

  // ===================================
  //     CARGAR CATÁLOGO DESDE SCRIPT
  // ===================================
  const cargarCatalogo = async (categoria = "") => {
    setLoadingCatalog(true);
    try {
      let url = `${SCRIPT_URL}?route=catalog&limit=100`;
      if (categoria && categoria !== "todos") {
        url += `&categoria=${encodeURIComponent(categoria)}`;
      }
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        addMessage("❌ Error al cargar el catálogo. Intenta de nuevo.", "bot");
        setCatalogo([]);
      } else {
        setCatalogo(data.items || []);
        if (data.items && data.items.length > 0) {
          addMessage(
            `✨ Encontré ${data.items.length} productos disponibles. Usa las flechas para navegar:`,
            "bot"
          );
        } else {
          addMessage("No encontré productos en esta categoría 😔", "bot");
        }
      }
    } catch (e) {
      addMessage("❌ Error de conexión. Verifica tu internet.", "bot");
      setCatalogo([]);
    }
    setLoadingCatalog(false);
  };

  // ===================================
  //   CARGAR ENCOMIENDISTAS DESDE SCRIPT
  // ===================================
  const cargarEncomiendistas = async (tipoEnvio) => {
    setLoadingEncomiendas(true);
    try {
      const url = `${SCRIPT_URL}?route=encomiendas&tipo_entrega=${encodeURIComponent(
        tipoEnvio
      )}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        setEncomiendistas([]);
        return { success: false, items: [] };
      }

      const items = data.items || [];
      setEncomiendistas(items);
      return { success: items.length > 0, items };
    } catch (e) {
      setEncomiendistas([]);
      return { success: false, items: [] };
    } finally {
      setLoadingEncomiendas(false);
    }
  };

  // ===================================
  //      NAVEGAR ENTRE ENCOMIENDISTAS
  // ===================================
  const handleEncomiendaNav = (direction) => {
    if (!encomiendistas.length) return;
    if (direction === "next") {
      setEncomiendaIndex((prev) => (prev + 1) % encomiendistas.length);
    } else {
      setEncomiendaIndex(
        (prev) => (prev - 1 + encomiendistas.length) % encomiendistas.length
      );
    }
  };

  // ===================================
  //   FILTRAR CATÁLOGO POR CATEGORÍA
  // ===================================
  const getFilteredCatalog = () => {
    if (selectedCategory === "todos") return catalogo;
    return catalogo.filter((item) =>
      (item.CATEGORIA || "")
        .toLowerCase()
        .includes(selectedCategory.toLowerCase())
    );
  };

  // ===================================
  //      CARRUSEL DE PRODUCTOS
  // ===================================
  const handleCarouselNav = (direction) => {
    const filtered = getFilteredCatalog();
    if (!filtered.length) return;

    if (direction === "next") {
      setCarouselIndex((prev) => (prev + 1) % filtered.length);
    } else {
      setCarouselIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }

    setSelectedTalla("");
    setCantidad(1);
  };

  // ===================================
  //   PRECIO BÁSICO (CATÁLOGO PREVIEW)
  // ===================================
  const calcularPrecioPreview = (producto, cant) => {
    if (cant >= 30) return producto.PRECIO_CAJA_MAYOR30 || producto.PRECIO_UNIDAD;
    if (cant >= 12) return producto.PRECIO_DOCENA || producto.PRECIO_UNIDAD;
    if (cant >= 6) return producto.PRECIO_MEDIADOCENA || producto.PRECIO_UNIDAD;
    if (cant >= 2) return producto.PRECIO_PAR || producto.PRECIO_UNIDAD;
    return producto.PRECIO_UNIDAD;
  };

  // ===================================
  //   PRECIO POR ITEM (CON TRANSFERENCIA)
  // ===================================
  const calcularPrecioItem = (item, metodoPago) => {
    const cant = Number(item.CANTIDAD || 1);
    const esTransferencia = metodoPago === "Transferencia";

    const baseUnidad = Number(item.PRECIO_UNIDAD || 0);
    const basePar = Number(item.PRECIO_PAR || baseUnidad);
    const baseMedia = Number(item.PRECIO_MEDIADOCENA || baseUnidad);
    const baseDocena = Number(item.PRECIO_DOCENA || baseUnidad);
    const baseCaja = Number(item.PRECIO_CAJA_MAYOR30 || baseUnidad);

    const depoUnidad = Number(item.PRECIO_UNIDAD_DEPOSITO || baseUnidad);
    const depoPar = Number(item.PRECIO_PAR_DEPOSITO || depoUnidad);
    const depoMedia = Number(item.PRECIO_MEDIADOCENA_DEPOSITO || depoUnidad);
    const depoDocena = Number(item.PRECIO_DOCENA_DEPOSITO || depoUnidad);
    const depoCaja = Number(item.PRECIO_CAJA_MAYOR30_DEPOSITO || depoUnidad);

    const precioUnidad = esTransferencia ? depoUnidad : baseUnidad;
    const precioPar = esTransferencia ? depoPar : basePar;
    const precioMedia = esTransferencia ? depoMedia : baseMedia;
    const precioDocena = esTransferencia ? depoDocena : baseDocena;
    const precioCaja = esTransferencia ? depoCaja : baseCaja;

    if (cant >= 30) return precioCaja || precioUnidad;
    if (cant >= 12) return precioDocena || precioUnidad;
    if (cant >= 6) return precioMedia || precioUnidad;
    if (cant >= 2) return precioPar || precioUnidad;
    return precioUnidad;
  };

  // ===================================
  //   INCENTIVO DE CANTIDAD (SOLO CARRITO)
  //   - Agrupa por misma categoría + mismo PRECIO_UNIDAD
  //   - Solo muestra si faltan 1 ó 2 piezas al siguiente nivel
  //   - Para caja, solo si faltan <= 10
  // ===================================
  const calcularIncentivoCantidad = (item, carrito) => {
    const categoria = (item.CATEGORIA || "").toString();
    const precioBase = Number(item.PRECIO_UNIDAD || 0);
    if (!categoria || !precioBase) return "";

    const grupo = carrito.filter(
      (p) =>
        (p.CATEGORIA || "") === categoria &&
        Number(p.PRECIO_UNIDAD || 0) === precioBase
    );

    const cantidadGrupo = grupo.reduce(
      (sum, p) => sum + Number(p.CANTIDAD || 0),
      0
    );
    if (cantidadGrupo <= 0) return "";

    const precios = {
      unidad: Number(item.PRECIO_UNIDAD || 0),
      par: Number(item.PRECIO_PAR || 0),
      media: Number(item.PRECIO_MEDIADOCENA || 0),
      docena: Number(item.PRECIO_DOCENA || 0),
      caja: Number(item.PRECIO_CAJA_MAYOR30 || 0),
    };

    // Ya está en caja, no hay siguiente nivel
    if (cantidadGrupo >= 30) return "";

    let siguienteMeta = null;
    let etiquetaMeta = "";
    let precioNuevo = 0;

    if (cantidadGrupo >= 12) {
      siguienteMeta = 30;
      etiquetaMeta = "caja";
      precioNuevo = precios.caja;
    } else if (cantidadGrupo >= 6) {
      siguienteMeta = 12;
      etiquetaMeta = "docena";
      precioNuevo = precios.docena;
    } else if (cantidadGrupo >= 2) {
      siguienteMeta = 6;
      etiquetaMeta = "media docena";
      precioNuevo = precios.media;
    } else {
      siguienteMeta = 2;
      etiquetaMeta = "par";
      precioNuevo = precios.par;
    }

    if (!precioNuevo) return "";

    const faltan = siguienteMeta - cantidadGrupo;

    if (etiquetaMeta === "caja") {
      // Para caja solo si faltan 10 o menos
      if (faltan <= 0 || faltan > 10) return "";
    } else {
      // Para los demás niveles solo si faltan 1 o 2
      if (faltan <= 0 || faltan > 2) return "";
    }

    const textoPiezas =
      faltan === 1 ? "Solo 1 pieza más" : `Solo ${faltan} piezas más`;

    return (
      "💡 Aprovecha:\n" +
      `${textoPiezas} para llegar a ${etiquetaMeta}.\n` +
      `¡Te baja el precio a $${precioNuevo.toFixed(2)} c/u!`
    );
  };

  // ===================================
  //     AGREGAR PRODUCTO AL CARRITO
  //     - Consolida por CODIGO_INTERNO + TALLA + COLOR
  // ===================================
  const agregarAlCarrito = () => {
    const filtered = getFilteredCatalog();
    const currentProduct = filtered[carouselIndex];
    if (!currentProduct) return;

    if (!selectedTalla && currentProduct.TALLAS_DISPONIBLES?.length > 0) {
      addMessage("⚠️ Por favor selecciona una talla", "bot");
      return;
    }

    // Precio preliminar solo para mostrar (se recalcula luego según método de pago)
    const precioPre = calcularPrecioPreview(currentProduct, cantidad);

    const item = {
      CODIGO_INTERNO: currentProduct.CODIGO_INTERNO,
      CODIGO: currentProduct.CODIGO,
      CATEGORIA: currentProduct.CATEGORIA,
      DESCRIPCION: currentProduct.DESCRIPCION,
      TALLA: selectedTalla || currentProduct.TALLA_SIMPLE || "N/A",
      COLOR: currentProduct.COLOR,
      CANTIDAD: cantidad,

      // Precios normales
      PRECIO_UNIDAD: currentProduct.PRECIO_UNIDAD,
      PRECIO_PAR: currentProduct.PRECIO_PAR,
      PRECIO_MEDIADOCENA: currentProduct.PRECIO_MEDIADOCENA,
      PRECIO_DOCENA: currentProduct.PRECIO_DOCENA,
      PRECIO_CAJA_MAYOR30: currentProduct.PRECIO_CAJA_MAYOR30,

      // Precios depósito (transferencia)
      PRECIO_UNIDAD_DEPOSITO: currentProduct.PRECIO_UNIDAD_DEPOSITO,
      PRECIO_PAR_DEPOSITO: currentProduct.PRECIO_PAR_DEPOSITO,
      PRECIO_MEDIADOCENA_DEPOSITO: currentProduct.PRECIO_MEDIADOCENA_DEPOSITO,
      PRECIO_DOCENA_DEPOSITO: currentProduct.PRECIO_DOCENA_DEPOSITO,
      PRECIO_CAJA_MAYOR30_DEPOSITO: currentProduct.PRECIO_CAJA_MAYOR30_DEPOSITO,

      // Pre-cálculo (se volverá a calcular según método de pago real)
      PRECIO_UNITARIO: currentProduct.PRECIO_UNIDAD,
      PRECIO_APLICADO: precioPre,
      DESCUENTO_POR_CANTIDAD: 0,
      SUBTOTAL_ITEM: precioPre * cantidad,
      FOTO: currentProduct.FOTO || "",
    };

    // ✅ Consolidar por CODIGO_INTERNO + TALLA + COLOR
    setSessionData((prev) => {
      const carrito = [...prev.carrito];
      const idxExistente = carrito.findIndex(
        (p) =>
          p.CODIGO_INTERNO === item.CODIGO_INTERNO &&
          p.TALLA === item.TALLA &&
          p.COLOR === item.COLOR
      );

      if (idxExistente >= 0) {
        const actualizado = { ...carrito[idxExistente] };
        actualizado.CANTIDAD =
          Number(actualizado.CANTIDAD || 0) + Number(cantidad || 1);
        carrito[idxExistente] = actualizado;
        return { ...prev, carrito };
      } else {
        return { ...prev, carrito: [...carrito, item] };
      }
    });

    addMessage(
      `✅ Agregado: ${item.DESCRIPCION} (${item.TALLA}) x${cantidad} = $${(
        precioPre * cantidad
      ).toFixed(2)}`,
      "bot"
    );

    addMessage("¿Qué deseas hacer?", "bot", [
      { label: "➕ Agregar más productos", value: "agregar_mas" },
      { label: "🛒 Ver mi carrito", value: "ver_carrito" },
      { label: "✅ Continuar con el pedido", value: "continuar_pedido" },
    ]);

    setSelectedTalla("");
    setCantidad(1);
  };
  // ===================================
  //   MOSTRAR CARRITO (FORMATO EXACTO)
  // ===================================
  const mostrarCarrito = () => {
    const carrito = sessionData.carrito;

    if (!carrito.length) {
      addMessage("🛒 Tu carrito está vacío.", "bot");
      return;
    }

    let texto = "🛒 *Tu carrito actual:*\n\n";

    carrito.forEach((item, idx) => {
      const precioUnit = calcularPrecioItem(item, sessionData.metodo_pago);
      const subtotal = precioUnit * item.CANTIDAD;

      texto += `${idx + 1}. ${item.DESCRIPCION} (${item.TALLA})\n`;
      texto += `Cantidad: ${item.CANTIDAD} → $${subtotal.toFixed(2)}\n\n`;

      // Incentivo solo en carrito
      const incentivo = calcularIncentivoCantidad(item, carrito);
      if (incentivo) {
        texto += incentivo + "\n\n";
      }
    });

    addMessage(texto, "bot");

    addMessage("¿Qué deseas hacer ahora?", "bot", [
      { label: "➕ Agregar más productos", value: "agregar_mas" },
      { label: "🧾 Continuar al resumen", value: "continuar_resumen" },
      { label: "🗑 Vaciar carrito", value: "vaciar_carrito" },
    ]);
  };

  // ===================================
  //   CÁLCULO TOTAL (SEGÚN MÉTODO PAGO)
  // ===================================
  const calcularTotalCarrito = (metodoPago) => {
    return sessionData.carrito.reduce((sum, item) => {
      const precio = calcularPrecioItem(item, metodoPago);
      return sum + precio * item.CANTIDAD;
    }, 0);
  };

  // ===================================
  //   INCENTIVO TRANSFERENCIA EN TIEMPO REAL
  //   (SE MUESTRA CUANDO EL BOT PIDE MÉTODO DE PAGO)
  // ===================================
  const mostrarIncentivoTransferencia = () => {
    const totalNormal = calcularTotalCarrito("Efectivo");
    const totalTransferencia = calcularTotalCarrito("Transferencia");

    // si es igual, no mostrar incentivo
    if (totalTransferencia >= totalNormal) return "";

    return (
      "💳 *Paga con transferencia y tu total baja a $" +
      totalTransferencia.toFixed(2) +
      `.*\n¡Aprovecha el mejor precio!`
    );
  };

  // ===================================
  //   MOSTRAR RESUMEN FINAL DETALLADO
  // ===================================
  const mostrarResumen = () => {
    const carrito = sessionData.carrito;

    if (!carrito.length) {
      addMessage("🛒 Tu carrito está vacío.", "bot");
      return;
    }

    let texto = "📦 *Resumen de tu pedido:*\n\n";

    carrito.forEach((item, idx) => {
      const precioUnit = calcularPrecioItem(item, sessionData.metodo_pago);
      const subtotal = precioUnit * item.CANTIDAD;

      texto += `*Producto #${idx + 1}*\n`;
      texto += `Código interno: ${item.CODIGO_INTERNO}\n`;
      texto += `Categoría: ${item.CATEGORIA}\n`;
      texto += `Descripción: ${item.DESCRIPCION}\n`;
      texto += `Color: ${item.COLOR}\n`;
      texto += `Talla: ${item.TALLA}\n`;
      texto += `Cantidad: ${item.CANTIDAD}\n`;
      texto += `Precio: $${precioUnit.toFixed(2)} c/u\n`;
      texto += `Subtotal: $${subtotal.toFixed(2)}\n\n`;
    });

    // ------ DATOS DE ENTREGA ------
    texto += "📍 *Datos de entrega:*\n";
    texto += `Departamento: ${sessionData.departamento}\n`;
    texto += `Municipio: ${sessionData.municipio}\n`;
    texto += `Referencia: ${sessionData.punto_referencia}\n`;
    texto += `Tipo de entrega: ${sessionData.tipo_entrega}\n\n`;

    // ------ MÉTODO DE PAGO ------
    texto += "💰 *Método de pago:* " + sessionData.metodo_pago + "\n\n";

    // ------ TOTAL ------
    const total = calcularTotalCarrito(sessionData.metodo_pago);
    texto += `TOTAL A PAGAR: *$${total.toFixed(2)}*\n\n`;

    addMessage(texto, "bot");

    addMessage("¿Deseas confirmar tu pedido?", "bot", [
      { label: "✅ Sí, confirmar", value: "confirmar_pedido" },
      { label: "🛒 Volver al carrito", value: "ver_carrito" },
    ]);
  };
  // ===================================
  //             PROCESAR MENSAJES
  // ===================================
  const processMessage = async (userInput) => {
    addMessage(userInput, "user");
    const input = userInput.toLowerCase().trim();
    const session = sessionData;

    // 1) NOMBRE
    if (session.step === "inicio") {
      const partes = userInput.trim().split(/\s+/);
      if (partes.length >= 2) {
        setSessionData((prev) => ({
          ...prev,
          nombre: userInput.trim(),
          step: "telefono",
        }));
        addMessage(
          `Gracias ${userInput.trim()} 😊\n\nAhora, ¿cuál es tu número de teléfono?`,
          "bot"
        );
      } else {
        addMessage(
          "Por favor, necesito tu nombre completo (nombre y apellido) 😊",
          "bot"
        );
      }
      return;
    }

    // 2) TELÉFONO
    if (session.step === "telefono") {
      const tel = userInput.replace(/[^0-9]/g, "");
      if (tel.length >= 8) {
        setSessionData((prev) => ({
          ...prev,
          telefono: tel,
          step: "menu",
        }));
        addMessage("Perfecto 📱 ¿Qué deseas hacer?", "bot", [
          { label: "🛍️ Ver catálogo", value: "catalogo" },
          { label: "👤 Hablar con agente", value: "agente" },
        ]);
      } else {
        addMessage(
          "Por favor, ingresa un número de teléfono válido (8 dígitos)",
          "bot"
        );
      }
      return;
    }

    // 3) MENÚ PRINCIPAL
    if (input === "catalogo") {
      setShowCarousel(true);
      setCarouselIndex(0);
      cargarCatalogo(selectedCategory);
      return;
    }

    if (input === "agente") {
      const msg = `Hola, soy ${session.nombre} y necesito ayuda con un pedido`;
      const url = `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(
        msg
      )}`;
      addMessage("Conectándote con un asesor... 👋", "bot");
      setTimeout(() => window.open(url, "_blank"), 1000);
      return;
    }

    if (input === "agregar_mas") {
      setShowCarousel(true);
      return;
    }

    if (input === "ver_carrito") {
      mostrarCarrito();
      return;
    }

    if (input === "continuar_resumen") {
      if (!session.carrito.length) {
        addMessage("⚠️ Tu carrito está vacío.", "bot");
        return;
      }
      setSessionData((prev) => ({ ...prev, step: "tipo_entrega" }));
      addMessage("📦 ¿Cómo deseas recibir tu pedido?", "bot", [
        { label: "🏠 Personalizado ($3.50)", value: "envio_personalizado" },
        { label: "📍 Punto fijo", value: "envio_punto_fijo" },
        { label: "📦 Casillero", value: "envio_casillero" },
      ]);
      return;
    }

    // ===================================
    //        TIPO DE ENTREGA
    // ===================================
    if (input === "envio_personalizado") {
      setSessionData((prev) => ({
        ...prev,
        tipo_entrega: "PERSONALIZADO",
        costo_envio: 3.5,
        step: "pide_departamento",
      }));

      addMessage("🏠 Envío personalizado.\n\n📍 Selecciona tu departamento:", "bot",
        Object.keys(DEPARTAMENTOS_MUNICIPIOS).map((dep) => ({
          label: dep,
          value: `dep_${dep}`,
        }))
      );
      return;
    }

    if (input.startsWith("dep_") && session.step === "pide_departamento") {
      const depText = input.replace("dep_", "");
      const departamento = Object.keys(DEPARTAMENTOS_MUNICIPIOS).find(
        (d) => d.toLowerCase() === depText.toLowerCase()
      );

      setSessionData((prev) => ({
        ...prev,
        departamento: departamento,
        step: "pide_municipio",
      }));

      const municipios = DEPARTAMENTOS_MUNICIPIOS[departamento];

      addMessage(`📍 ${departamento}\n\nSelecciona tu municipio:`, "bot",
        municipios.map((m) => ({
          label: m,
          value: `mun_${m}`,
        }))
      );
      return;
    }

    if (input.startsWith("mun_") && session.step === "pide_municipio") {
      const municipio = input.replace("mun_", "");

      setSessionData((prev) => ({
        ...prev,
        municipio,
        step: "pide_referencia",
      }));

      addMessage(
        `📍 ${sessionData.departamento} - ${municipio}\n\nIngresa tu punto de referencia:`,
        "bot"
      );
      return;
    }

    if (session.step === "pide_referencia") {
      setSessionData((prev) => ({
        ...prev,
        punto_referencia: userInput.trim(),
        direccion: userInput.trim(),
        encomiendista: "PERSONALIZADO",
        encomiendista_nombre: "Envío Personalizado",
        step: "metodo_pago",
      }));

      // ----- INCENTIVO TRANSFERENCIA -----
      const incentivo = mostrarIncentivoTransferencia();

      addMessage(
        `Perfecto 🙌\n\nSelecciona tu método de pago:\n\n${incentivo}`,
        "bot",
        [
          { label: "💵 Contra entrega", value: "pago_efectivo" },
          { label: "💳 Transferencia", value: "pago_transferencia" },
        ]
      );
      return;
    }

    // ===================================
    //          MÉTODO DE PAGO
    // ===================================
    if (input === "pago_efectivo") {
      setSessionData((prev) => ({
        ...prev,
        metodo_pago: "Efectivo",
        step: "resumen_final",
      }));
      mostrarResumen();
      return;
    }

    if (input === "pago_transferencia") {
      setSessionData((prev) => ({
        ...prev,
        metodo_pago: "Transferencia",
        step: "resumen_final",
      }));
      mostrarResumen();
      return;
    }

    // ===================================
    //      CONFIRMACIÓN DEL PEDIDO
    // ===================================
    if (input === "confirmar_pedido") {
      crearPedidoConComprobante();
      return;
    }

    addMessage("No entendí tu opción 😅 intenta nuevamente.", "bot");
  };

  // ===================================
  //   GUARDAR PEDIDO + ENVIAR WHATSAPP
  // ===================================
  const crearPedidoConComprobante = async () => {
    const metodo = sessionData.metodo_pago;
    const subtotal = calcularTotalCarrito(metodo);
    const totalFinal = subtotal + sessionData.costo_envio;

    const productosLimpios = sessionData.carrito.map((item) => {
      const precio = calcularPrecioItem(item, metodo);
      return {
        ...item,
        PRECIO_APLICADO: precio,
        SUBTOTAL_ITEM: precio * item.CANTIDAD,
      };
    });

    const pedido = {
      telefono: sessionData.telefono,
      nombre: sessionData.nombre,
      departamento: sessionData.departamento,
      municipio: sessionData.municipio,
      referencia: sessionData.punto_referencia,
      tipo_entrega: sessionData.tipo_entrega,
      metodo_pago: metodo,
      costo_envio: sessionData.costo_envio,
      total: totalFinal,
      productos: productosLimpios,
    };

    try {
      await fetch(`${SCRIPT_URL}?route=crearPedido`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });
    } catch (e) {
      console.log("Error guardando en Sheets, enviando solo a WhatsApp");
    }

    enviarWhatsApp(totalFinal);
  };

  // ===================================
  //         ENVIAR A WHATSAPP
  // ===================================
  const enviarWhatsApp = (totalFinal) => {
    let msg = `🛍️ *Nuevo pedido – GyS Importadora*\n\n`;

    msg += `👤 Cliente: ${sessionData.nombre}\n`;
    msg += `📱 Teléfono: ${sessionData.telefono}\n\n`;

    msg += `📦 *Productos:*\n`;

    sessionData.carrito.forEach((item, idx) => {
      const precio = calcularPrecioItem(item, sessionData.metodo_pago);
      const sub = precio * item.CANTIDAD;

      msg += `${idx + 1}. ${item.DESCRIPCION} (${item.TALLA})\n`;
      msg += `   Cant: ${item.CANTIDAD} x $${precio.toFixed(
        2
      )} = $${sub.toFixed(2)}\n`;
    });

    msg += `\n💰 Total: $${totalFinal.toFixed(2)}\n`;

    msg += `📍 ${sessionData.departamento} - ${sessionData.municipio}\n`;
    msg += `Referencia: ${sessionData.punto_referencia}\n\n`;

    msg += `💳 Pago: ${sessionData.metodo_pago}\n`;

    msg += `\n✨ Pedido generado automáticamente desde el chat\n`;

    const url = `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(
      msg
    )}`;

    addMessage("Abriendo WhatsApp… 📱", "bot");
    setTimeout(() => window.open(url, "_blank"), 600);
  }; }
