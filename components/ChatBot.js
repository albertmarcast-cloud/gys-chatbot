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
    "Tecoluca",
  ],
};

// ======================
//  COMPONENTE PRINCIPAL
// ======================
export default function ChatBot(  ) {
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
  const [categoriasDinamicas, setCategoriasDinamicas] = useState([]);
  const [selectedTalla, setSelectedTalla] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [toastMessage, setToastMessage] = useState(null); // Nuevo estado para el Toast

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Lógica para ocultar el Toast después de 3 segundos
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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
      // 1. Cargar SIEMPRE el catálogo completo para obtener todas las categorías
      let url = `${SCRIPT_URL}?route=catalog&limit=100`;
      // Se elimina el filtro por categoría en la URL para cargar todo
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        addMessage("❌ Error al cargar el catálogo. Intenta de nuevo.", "bot");
        setCatalogo([]);
      } else {
        const items = data.items || [];
        setCatalogo(items);

        // Extraer categorías únicas y dinámicas de TODO el catálogo
        if (items.length > 0) {
          const categorias = [
            ...new Set(
              items.map((item) => item.CATEGORIA).filter(Boolean)
            ),
          ];
          setCategoriasDinamicas(categorias);
        }
        
        // El mensaje debe reflejar el catálogo filtrado (si aplica)
        const filteredItems = getFilteredCatalog(); // Usar la función de filtrado local
        if (filteredItems.length > 0) {
          addMessage(
            `✨ Encontré ${filteredItems.length} productos disponibles. Usa las flechas para navegar:`,
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
  const cargarEncomiendistas = async (tipoEnvio, departamento = "", municipio = "") => {
    setLoadingEncomiendas(true);
    try {
      let url = `${SCRIPT_URL}?route=encomiendas&tipo_entrega=${encodeURIComponent(
        tipoEnvio
      )}`;

      // **NUEVA LÓGICA DE FILTRADO POR UBICACIÓN**
      if (departamento) {
        url += `&departamento=${encodeURIComponent(departamento)}`;
      }
      if (municipio) {
        url += `&municipio=${encodeURIComponent(municipio)}`;
      }

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
  //       SELECCIONAR ENCOMIENDISTA
  // ===================================
  const seleccionarEncomienda = () => {
    const enc = encomiendistas[encomiendaIndex];
    if (!enc) return;

    setSessionData((prev) => ({
      ...prev,
      encomiendista: enc.ID_ENCOMIENDISTA,
      encomiendista_nombre: enc.ENCOMIENDISTA,
      encomiendista_telefono: enc.TELEFONO_ENCOMIENDISTA,
      departamento: enc.DEPARTAMENTO,
      municipio: enc.MUNICIPIO,
      costo_envio: enc.COSTO_ENVIO,
      dia_entrega: enc.DIA_ENTREGA || "",
      hora_entrega: enc.HORA_ENTREGA || "",
      punto_referencia: enc.PUNTO_REFERENCIA || "",
      step: "metodo_pago",
    }));

    setShowEncomiendaCarousel(false);

    const tipoTexto =
      sessionData.tipo_entrega === "PUNTO FIJO" ? "punto fijo" : "casillero";

    // --- INCENTIVO TRANSFERENCIA (3) ---
    const costoEnvio = enc.COSTO_ENVIO;
    const totalContraEntrega = calcularTotalCarrito(
      "Contra entrega",
      sessionData.carrito,
      costoEnvio
    );
    const totalTransferencia = calcularTotalCarrito(
      "Transferencia",
      sessionData.carrito,
      costoEnvio
    );
    let incentivoTexto = "";
    if (totalTransferencia < totalContraEntrega) {
      incentivoTexto = `\n\n💳 Paga con transferencia y tu total baja a $${totalTransferencia.toFixed(
        2
      )}. ¡Aprovecha el mejor precio!`;
    }
    // -----------------------------------

    addMessage(
      `✅ Seleccionaste ${tipoTexto}: ${enc.ENCOMIENDISTA}\n📍 ${enc.DEPARTAMENTO} - ${enc.MUNICIPIO}\n🏪 ${enc.PUNTO_REFERENCIA}\n💵 Costo: $${enc.COSTO_ENVIO}\n\n¿Cómo deseas pagar?${incentivoTexto}`,
      "bot",
      [
        { label: "💵 Contra entrega", value: "contra_entrega" },
        { label: "💳 Transferencia", value: "transferencia" },
      ]
    );
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
  //   PRECIO BÁSICO (CATÁLOGO PREVIEW)
  // ===================================
  const calcularPrecioPreview = (producto, cant) => {
    if (cant >= 30)
      return producto.PRECIO_CAJA_MAYOR30 || producto.PRECIO_UNIDAD;
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
  //     CALCULAR TOTAL DEL CARRITO
  // ===================================
  const calcularTotalCarrito = (metodoPago, carrito, costoEnvio) => {
    const subtotal = carrito.reduce((sum, item) => {
      const precio = calcularPrecioItem(item, metodoPago);
      return sum + precio * item.CANTIDAD;
    }, 0);
    return subtotal + costoEnvio;
  };

  // ===================================
  //     AGREGAR PRODUCTO AL CARRITO
  // ===================================
  const agregarAlCarrito = () => {
    const filtered = getFilteredCatalog();
    const currentProduct = filtered[carouselIndex];
    if (!currentProduct) return;

    if (!selectedTalla && currentProduct.TALLAS_DISPONIBLES?.length > 0) {
      setToastMessage("⚠️ Por favor selecciona una talla");
      return;
    }

    // Precio preliminar solo para mostrar (se recalcula luego según método de pago)
    const precioPre = calcularPrecioPreview(currentProduct, cantidad);

    const newItem = {
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

    setSessionData((prev) => {
      const existingIndex = prev.carrito.findIndex(
        (cartItem) =>
          cartItem.CODIGO_INTERNO === newItem.CODIGO_INTERNO &&
          cartItem.TALLA === newItem.TALLA
      );

      let newCarrito;
      let newCantidad;
      let newPricePre;

      if (existingIndex > -1) {
        // Consolidar: sumar cantidad y recalcular subtotal
        newCarrito = [...prev.carrito];
        const existingItem = newCarrito[existingIndex];
        newCantidad = existingItem.CANTIDAD + newItem.CANTIDAD;

        // Recalcular precio basado en la nueva cantidad total
        newPricePre = calcularPrecioPreview(currentProduct, newCantidad);

        newCarrito[existingIndex] = {
          ...existingItem,
          CANTIDAD: newCantidad,
          PRECIO_APLICADO: newPricePre,
          SUBTOTAL_ITEM: newPricePre * newCantidad,
        };
      } else {
        // Agregar nuevo item
        newCarrito = [...prev.carrito, newItem];
        newCantidad = newItem.CANTIDAD;
        newPricePre = newItem.PRECIO_APLICADO;
      }

      // El mensaje de confirmación debe usar la cantidad y precio del item agregado/consolidado
      setToastMessage(
        `✅ Agregado: ${newItem.DESCRIPCION} (${newItem.TALLA}) x${newItem.CANTIDAD} = $${(
          newItem.PRECIO_APLICADO * newItem.CANTIDAD
        ).toFixed(2)}`
      );

      return {
        ...prev,
        carrito: newCarrito,
        step: "menu_flotante", // Nuevo paso para activar la barra flotante
      };
    });

    // Los botones de acción se manejarán con la barra flotante
    // addMessage("¿Qué deseas hacer?", "bot"); // Mensaje simple para indicar que se esperan acciones (ya no es necesario)

    setSelectedTalla("");
    setCantidad(1);
  };

  // ===================================
  //            MOSTRAR CARRITO
  // ===================================
  const mostrarCarrito = () => {
    if (sessionData.carrito.length === 0) {
      addMessage("🛒 Tu carrito está vacío", "bot");
      setShowCarousel(false); // Ocultar catálogo si el carrito está vacío
      return;
    }

    setShowCarousel(false); // Ocultar catálogo para que el scroll funcione correctamente

    let texto = "🛒 *TU CARRITO:*\n\n";

    let subtotal = 0;
    const metodo = sessionData.metodo_pago || "Contra entrega";
    const incentivos = {}; // Para el punto 2.B

    sessionData.carrito.forEach((item, idx) => {
      const precio = calcularPrecioItem(item, metodo);
      const subItem = precio * item.CANTIDAD;

      // 1.A Formato corto y claro por producto
      texto += `${idx + 1}. ${item.DESCRIPCION} (${item.TALLA})\n`;
      texto += `   Cantidad: ${item.CANTIDAD} → $${subItem.toFixed(2)}\n\n`;

      subtotal += subItem;

      // 1.B Incentivo de cantidad (Agrupar por categoría + precio) - Lógica para incentivos
      const key = `${item.CATEGORIA}_${precio.toFixed(2)}`;
      if (!incentivos[key]) {
        incentivos[key] = {
          categoria: item.CATEGORIA,
          precio: precio,
          cantidad: 0,
          item: item,
        };
      }
      incentivos[key].cantidad += item.CANTIDAD;
    });

    // Lógica de incentivos (1.B) - Se muestran antes del subtotal final, agrupados por producto.
    Object.values(incentivos).forEach((group) => {
      const currentQty = group.cantidad;
      const item = group.item;
      let targetQty = 0;
      let targetPrice = 0;
      let targetName = "";
      let remaining = 0;

      // Buscar el siguiente nivel de descuento
      if (currentQty === 1) {
        targetQty = 2;
        targetPrice = calcularPrecioItemConCantidad(item, metodo, 2);
        targetName = "par";
        remaining = 1;
      } else if (currentQty >= 4 && currentQty <= 5) {
        targetQty = 6;
        targetPrice = calcularPrecioItemConCantidad(item, metodo, 6);
        targetName = "media docena";
        remaining = 6 - currentQty;
      } else if (currentQty >= 10 && currentQty <= 11) {
        targetQty = 12;
        targetPrice = calcularPrecioItemConCantidad(item, metodo, 12);
        targetName = "docena";
        remaining = 12 - currentQty;
      } else if (currentQty >= 20 && currentQty <= 29) {
        targetQty = 30;
        targetPrice = calcularPrecioItemConCantidad(item, metodo, 30);
        targetName = "caja";
        remaining = 30 - currentQty;
      }

      // Mostrar incentivo solo si el precio baja y cumple la condición de "faltan"
      if (targetQty > 0 && targetPrice < group.precio) {
        const ahorro = (group.precio - targetPrice) * targetQty;
        texto += `\n✨ *INCENTIVO ${group.categoria.toUpperCase()}*:\n`;
        texto += `  ¡Te faltan ${remaining} para llevar ${targetName} y ahorrar $${ahorro.toFixed(
          2
        )}!\n`;
      }
    });

    texto += `\n\n*SUBTOTAL:* $${subtotal.toFixed(2)}`;

    addMessage(texto, "bot", [
      { label: "➕ Agregar más", value: "agregar_mas" },
      { label: "✅ Continuar pedido", value: "continuar_pedido" },
      { label: "❌ Cancelar", value: "cancelar" },
    ]);
  };

  // Función auxiliar para calcular precio con cantidad específica (para incentivos)
  const calcularPrecioItemConCantidad = (item, metodoPago, cant) => {
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
  //            MOSTRAR RESUMEN
  // ===================================
  const mostrarResumen = () => {
    const metodo = sessionData.metodo_pago || "Contra entrega";
    const costoEnvio = Number(sessionData.costo_envio || 0);
    const subtotal = sessionData.carrito.reduce((sum, item) => {
      const precio = calcularPrecioItem(item, metodo);
      return sum + precio * item.CANTIDAD;
    }, 0);
    const total = subtotal + costoEnvio;

    let texto = "📝 *RESUMEN DE TU PEDIDO:*\n\n";

    // Productos
    sessionData.carrito.forEach((item, idx) => {
      const precio = calcularPrecioItem(item, metodo);
      const subItem = precio * item.CANTIDAD;
      texto += `${idx + 1}. ${item.DESCRIPCION} (${item.TALLA}) x${
        item.CANTIDAD
      } → $${subItem.toFixed(2)}\n`;
    });

    // Envío
    let tipoTexto = sessionData.tipo_entrega;
    if (tipoTexto === "PERSONALIZADO") tipoTexto = "🏠 PERSONALIZADO";
    if (tipoTexto === "PUNTO FIJO") tipoTexto = "📍 PUNTO FIJO";
    if (tipoTexto === "CASILLERO") tipoTexto = "📦 CASILLERO";
    if (tipoTexto === "RETIRO EN TIENDA") tipoTexto = "🏪 RETIRO EN TIENDA";

    texto += `\n\n*DETALLES DEL ENVÍO:*\n`;
    texto += `🚚 Tipo: ${tipoTexto}\n`;
    texto += `📍 Ubicación: ${sessionData.departamento} - ${sessionData.municipio}\n`;

    if (sessionData.punto_referencia) {
      texto += `📌 Referencia: ${sessionData.punto_referencia}\n`;
    }

    if (sessionData.encomiendista_nombre) {
      texto += `🚛 Encomendista: ${sessionData.encomiendista_nombre}\n`;
    }

    texto += `\n*COSTOS:*\n`;
    texto += `💰 Subtotal: $${subtotal.toFixed(2)}\n`;
    texto += `💵 Costo de Envío: $${costoEnvio.toFixed(2)}\n`;
    texto += `💳 Método de Pago: ${metodo}\n`;
    texto += `\n*TOTAL A PAGAR:* $${total.toFixed(2)}`;

    addMessage(texto, "bot", [
      { label: "✅ Confirmar pedido", value: "confirmar_pedido" },
      { label: "❌ Cancelar", value: "cancelar" },
    ]);
  };

  // ===================================
  //       CREAR PEDIDO EN SCRIPT
  // ===================================
  const crearPedidoConComprobante = async () => {
    addMessage("Guardando tu pedido en el sistema... 💾", "bot");

    const metodo = sessionData.metodo_pago || "Contra entrega";
    const costoEnvio = Number(sessionData.costo_envio || 0);
    const subtotal = sessionData.carrito.reduce((sum, item) => {
      const precio = calcularPrecioItem(item, metodo);
      return sum + precio * item.CANTIDAD;
    }, 0);
    const total = subtotal + costoEnvio;

    const payload = {
      route: "saveOrder",
      nombre: sessionData.nombre,
      telefono: sessionData.telefono,
      departamento: sessionData.departamento,
      municipio: sessionData.municipio,
      direccion: sessionData.punto_referencia, // Usamos punto_referencia como dirección
      tipo_entrega: sessionData.tipo_entrega,
      metodo_pago: sessionData.metodo_pago,
      costo_envio: costoEnvio,
      subtotal: subtotal,
      total: total,
      encomiendista: sessionData.encomiendista_nombre,
      comprobante_base64: sessionData.foto_comprobante_base64,
      items: sessionData.carrito.map((item) => ({
        codigo: item.CODIGO_INTERNO,
        descripcion: item.DESCRIPCION,
        talla: item.TALLA,
        color: item.COLOR,
        cantidad: item.CANTIDAD,
        precio_unitario: calcularPrecioItem(item, metodo),
        subtotal_item: calcularPrecioItem(item, metodo) * item.CANTIDAD,
      })),
    };

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        addMessage(
          `✅ ¡Pedido #${data.factura} guardado con éxito!`,
          "bot"
        );
        setSessionData((prev) => ({
          ...prev,
          step: "finalizado",
          factura_generada: data.factura,
        }));

        await subirComprobanteDespuesDeFactura(data.factura);
      } else {
        addMessage(
          "⚠️ Error al guardar en el sistema. Se enviará por WhatsApp.",
          "bot"
        );
      }

      enviarWhatsApp(subtotal, total);
    } catch (e) {
      addMessage(
        "⚠️ No se pudo conectar con el sistema\nEnviando el pedido por WhatsApp...",
        "bot"
      );
      enviarWhatsApp(subtotal, total);
    }
  };

  // ===================================
  //         FILE → BASE64
  // ===================================
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = String(reader.result).split(",")[1];
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    addMessage("📸 Recibiendo comprobante, procesando imagen...", "bot");

    try {
      const base64 = await fileToBase64(file);
      setSessionData((prev) => ({
        ...prev,
        foto_comprobante_base64: base64,
      }));

      addMessage(
        "✅ Comprobante recibido.\n\nAhora te muestro el resumen para confirmar tu pedido:",
        "bot"
      );

      setSessionData((prev) => ({ ...prev, step: "confirmar" }));
      mostrarResumen();
    } catch (e) {
      addMessage(
        "⚠️ Hubo un error leyendo la imagen. Intenta subirla nuevamente.",
        "bot"
      );
    }
  };

  // ===================================
  //             WHATSAPP
  // ===================================
  const enviarWhatsApp = (subtotal, total) => {
    const metodo = sessionData.metodo_pago || "Contra entrega";

    let mensaje = `🛍️ *NUEVO PEDIDO - GyS Importadora*\n\n`;
    mensaje += `👤 *Cliente:* ${sessionData.nombre.toUpperCase()}\n`;
    mensaje += `📱 *Teléfono:* ${sessionData.telefono.toUpperCase()}\n\n`;

    mensaje += `📦 *PRODUCTOS (${sessionData.carrito.length}):*\n`;
    sessionData.carrito.forEach((item, idx) => {
      const precio = calcularPrecioItem(item, metodo);
      const subItem = precio * item.CANTIDAD;
      // Formato detallado (mini-factura) para WhatsApp
      mensaje += `\nProducto #${idx + 1}\n`;
      mensaje += `Código interno: ${item.CODIGO_INTERNO}\n`;
      mensaje += `Categoría: ${item.CATEGORIA}\n`;
      mensaje += `Descripción: ${item.DESCRIPCION}\n`;
      mensaje += `Color: ${item.COLOR}\n`;
      mensaje += `Talla: ${item.TALLA}\n`;
      mensaje += `Cantidad: ${item.CANTIDAD}\n`;
      mensaje += `Precio: $${precio.toFixed(2)} c/u\n`;
      mensaje += `Subtotal: $${subItem.toFixed(2)}\n`;
    });

    mensaje += `\n💰 subtotal: $${subtotal.toFixed(2)}\n`;
    mensaje += `💵 costo_envio: $${sessionData.costo_envio.toFixed(2)}\n`;
    mensaje += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;

    let tipoTexto = sessionData.tipo_entrega;
    if (tipoTexto === "PERSONALIZADO") tipoTexto = "🏠 PERSONALIZADO";
    if (tipoTexto === "PUNTO FIJO") tipoTexto = "📍 PUNTO FIJO";
    if (tipoTexto === "CASILLERO") tipoTexto = "📦 CASILLERO";
    if (tipoTexto === "RETIRO EN TIENDA") tipoTexto = "🏪 RETIRO EN TIENDA";

    // DETALLES DEL ENVÍO (Nuevo orden solicitado)
    mensaje += `*DETALLES DEL ENVÍO:*\n`;
    mensaje += `🚚 envío: ${tipoTexto}\n`;
    mensaje += `📍 departamento: ${sessionData.departamento}\n`;
    mensaje += `🗺️ municipio: ${sessionData.municipio}\n`;

    if (sessionData.punto_referencia) {
      mensaje += `📌 punto_referencia: ${sessionData.punto_referencia}\n`;
    }

    if (
      sessionData.encomiendista_nombre &&
      sessionData.tipo_entrega !== "PERSONALIZADO" &&
      sessionData.tipo_entrega !== "RETIRO EN TIENDA"
    ) {
      mensaje += `🚛 encomendista: ${sessionData.encomiendista_nombre}\n`;
    }

    if (sessionData.dia_entrega) {
      mensaje += `📅 dia_entrega: ${sessionData.dia_entrega}\n`;
    }

    if (sessionData.hora_entrega) {
      mensaje += `⏰ hora_entrega: ${sessionData.hora_entrega}\n`;
    }

    mensaje += `💳 método_pago: ${metodo}\n\n`;
    mensaje += `✨ _Pedido desde chatbot automático_`;

    const url = `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(
      mensaje
      )}`;

    addMessage("Abriendo WhatsApp para confirmar tu pedido... 📱", "bot");
    // Usar window.location.href para máxima compatibilidad en iOS/móviles
    window.location.href = url;
  };

  // ===================================
  //          PROCESAR MENSAJES
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
      setSessionData((prev) => ({ ...prev, step: "menu_flotante" })); // Activar barra flotante
      return;
    }

    if (input === "agente") {
      const msg = `Hola, soy ${session.nombre} y necesito ayuda con un pedido`;
      const url = `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(
        msg
        )}`;
      addMessage("Conectándote con un asesor... 👋", "bot");
      window.location.href = url;
      return;
    }

    if (input === "agregar_mas") {
      setShowCarousel(true);
      setSessionData((prev) => ({ ...prev, step: "menu_flotante" })); // Asegurar que el FAB esté visible
      return;
    }

    if (input === "ver_carrito") {
      mostrarCarrito();
      setSessionData((prev) => ({ ...prev, step: "menu_flotante" })); // Mantener barra flotante después de ver carrito
      return;
    }

    // 4) CONTINUAR PEDIDO -> INICIA FLUJO DE ENVÍO POR UBICACIÓN
    if (input === "continuar_pedido") {
      if (session.carrito.length === 0) {
        addMessage(
          "⚠️ Tu carrito está vacío. Agrega productos primero.",
          "bot"
        );
        return;
      }
      setShowCarousel(false);
      setSessionData((prev) => ({ ...prev, step: "seleccionar_departamento_envio" })); // Nuevo paso

      addMessage(
        "📦 ¡Excelente! Para ver tus opciones de envío, primero dime:\n\n📍 ¿De qué departamento eres?",
        "bot",
        Object.keys(DEPARTAMENTOS_MUNICIPIOS).map((dep) => ({
          label: dep,
          value: `dep_envio_${dep}`,
        }))
      );
      return;
    }

    // 5) SELECCIÓN DE DEPARTAMENTO (Manejo de la respuesta del paso 4)
    if (session.step === "seleccionar_departamento_envio" && input.startsWith("dep_envio_")) {
      const departamento = input.substring(10);
      setSessionData((prev) => ({
        ...prev,
        departamento: departamento,
        step: "seleccionar_municipio_envio", // Nuevo paso
      }));
      addMessage(`✅ Seleccionaste *${departamento}*.\n\n¿Cuál es tu municipio?`, "bot",
        DEPARTAMENTOS_MUNICIPIOS[departamento].map((mun) => ({
          label: mun,
          value: `mun_envio_${mun}`,
        }))
      );
      return;
    }

    // 6) SELECCIÓN DE MUNICIPIO (Manejo de la respuesta del paso 5)
    if (session.step === "seleccionar_municipio_envio" && input.startsWith("mun_envio_")) {
      const municipio = input.substring(10);
      setSessionData((prev) => ({
        ...prev,
        municipio: municipio,
        step: "mostrar_opciones_envio_filtradas", // Nuevo paso
      }));
      // Continuar al nuevo paso para mostrar opciones filtradas
      processMessage("mostrar_opciones_envio_filtradas");
      return;
    }

    // 7) MOSTRAR OPCIONES DE ENVÍO FILTRADAS (Nuevo paso de lógica)
    if (input === "mostrar_opciones_envio_filtradas") {
      const { departamento, municipio } = session;
      addMessage(`🔍 Buscando opciones de envío para *${departamento} - ${municipio}*...`, "bot");

      // 7.1) Cargar Puntos Fijos y Casilleros para la ubicación
      const [puntosFijos, casilleros] = await Promise.all([
        cargarEncomiendistas("PUNTO FIJO", departamento, municipio),
        cargarEncomiendistas("CASILLERO", departamento, municipio),
      ]);

      const opciones = [];

      // 7.2) Opción 1: Retiro en Tienda (Siempre disponible)
      opciones.push({ label: "🏪 RETIRO EN TIENDA ($0.00)", value: "tipo_retiro_tienda" });

      // 7.3) Opción 2: Punto Fijo (Si hay disponibilidad)
      if (puntosFijos.success && puntosFijos.items.length > 0) {
        opciones.push({ label: `📍 PUNTO FIJO (${puntosFijos.items.length} opciones)`, value: "tipo_punto_fijo" });
      }

      // 7.4) Opción 3: Casillero (Si hay disponibilidad)
      if (casilleros.success && casilleros.items.length > 0) {
        opciones.push({ label: `📦 CASILLERO (${casilleros.items.length} opciones)`, value: "tipo_casillero" });
      }

      // 7.5) Opción 4: Envío Personalizado (Siempre disponible, costo fijo)
      opciones.push({ label: "🏠 PERSONALIZADO ($3.50)", value: "tipo_personalizado" });

      setSessionData((prev) => ({ ...prev, step: "seleccionar_tipo_entrega" }));

      addMessage(
        `✨ Estas son las opciones de envío disponibles para *${departamento} - ${municipio}*:\n\n¿Cuál deseas elegir?`,
        "bot",
        opciones
      );
      return;
    }

    // 8) SELECCIÓN DEL TIPO DE ENTREGA (Manejo de la respuesta del paso 7)
    if (session.step === "seleccionar_tipo_entrega") {
      // Lógica para TIPO_PERSONALIZADO (Ahora va directo a pedir punto de referencia)
      if (input === "tipo_personalizado") {
        setSessionData((prev) => ({
          ...prev,
          tipo_entrega: "PERSONALIZADO",
          costo_envio: 3.5,
          step: "punto_referencia_personalizado", // Va directo a pedir punto de referencia
        }));
        addMessage(
          `🏠 Envío PERSONALIZADO ($3.50) a *${session.departamento} - ${session.municipio}*.\n\nPor favor, dame un punto de referencia exacto (colonia, calle, casa, etc.) para la entrega:`,
          "bot"
        );
        return;
      }

      // Lógica para RETIRO EN TIENDA (Ahora va directo a método de pago)
      if (input === "tipo_retiro_tienda") {
        setSessionData((prev) => ({
          ...prev,
          tipo_entrega: "RETIRO EN TIENDA",
          costo_envio: 0,
          departamento: "TIENDA",
          municipio: "TIENDA",
          punto_referencia: "RETIRO EN TIENDA",
          encomiendista: "RETIRO EN TIENDA",
          encomiendista_nombre: "Retiro en Tienda",
          dia_entrega: "INMEDIATO",
          hora_entrega: "HORARIO DE TIENDA",
          step: "metodo_pago",
        }));
        addMessage(
          "✅ Has seleccionado *RETIRO EN TIENDA*.\n\n¿Cómo deseas pagar?",
          "bot",
          [
            { label: "💵 Contra entrega", value: "contra_entrega" },
            { label: "💳 Transferencia", value: "transferencia" },
          ]
        );
        return;
      }

      // Lógica para PUNTO FIJO (Ahora usa la ubicación ya seleccionada)
      if (input === "tipo_punto_fijo") {
        setSessionData((prev) => ({
          ...prev,
          tipo_entrega: "PUNTO FIJO",
          step: "cargando_puntos_fijos",
        }));
        addMessage("📍 Buscando puntos fijos disponibles... 🔍", "bot");
        // Recargar con filtros de ubicación
        const resultado = await cargarEncomiendistas("PUNTO FIJO", session.departamento, session.municipio);
        if (resultado.success && resultado.items.length > 0) {
          setEncomiendaIndex(0);
          setShowEncomiendaCarousel(true);
          addMessage(
            `✨ Encontré ${resultado.items.length} punto(s) fijo(s) disponible(s) en *${session.departamento} - ${session.municipio}*.\n\nUsa las flechas para navegar:`,
            "bot"
          );
        } else {
          // Esto no debería pasar si el botón se mostró, pero es un fallback
          addMessage("⚠️ No hay puntos fijos disponibles para esta ubicación.", "bot");
          // Volver a mostrar opciones
          processMessage("mostrar_opciones_envio_filtradas");
        }
        return;
      }

      // Lógica para CASILLERO (Ahora usa la ubicación ya seleccionada)
      if (input === "tipo_casillero") {
        setSessionData((prev) => ({
          ...prev,
          tipo_entrega: "CASILLERO",
          step: "cargando_casilleros",
        }));
        addMessage("📦 Buscando casilleros disponibles... 🔍", "bot");
        // Recargar con filtros de ubicación
        const resultado = await cargarEncomiendistas("CASILLERO", session.departamento, session.municipio);
        if (resultado.success && resultado.items.length > 0) {
          setEncomiendaIndex(0);
          setShowEncomiendaCarousel(true);
          addMessage(
            `✨ Encontré ${resultado.items.length} casillero(s) disponible(s) en *${session.departamento} - ${session.municipio}*.\n\nUsa las flechas para navegar:`,
            "bot"
          );
        } else {
          // Esto no debería pasar si el botón se mostró, pero es un fallback
          addMessage("⚠️ No hay casilleros disponibles para esta ubicación.", "bot");
          // Volver a mostrar opciones
          processMessage("mostrar_opciones_envio_filtradas");
        }
        return;
      }
    }

    // 9) PUNTO DE REFERENCIA (Solo para Personalizado)
    if (session.step === "punto_referencia_personalizado") {
      setSessionData((prev) => ({
        ...prev,
        punto_referencia: userInput.trim(),
        direccion: userInput.trim(),
        encomiendista: "PERSONALIZADO",
        encomiendista_nombre: "Envío Personalizado",
        dia_entrega: "1-2 días hábiles",
        hora_entrega: "Horario de 8am a 5pm",
        costo_envio: 3.5,
        step: "metodo_pago",
      }));

      // --- INCENTIVO TRANSFERENCIA (3) ---
      const costoEnvio = Number(session.costo_envio || 0);
      const totalContraEntrega = calcularTotalCarrito("Contra entrega", session.carrito, costoEnvio);
      const totalTransferencia = calcularTotalCarrito("Transferencia", session.carrito, costoEnvio);
      let incentivoTexto = "";
      if (totalTransferencia < totalContraEntrega) {
        incentivoTexto = `\n\n💳 Paga con transferencia y tu total baja a $${totalTransferencia.toFixed(2)}. ¡Aprovecha el mejor precio!`;
      }
      // -----------------------------------

      addMessage(
        `✅ Recibido.\n\n*Resumen de Envío:*\n📍 ${session.departamento} - ${session.municipio}\n📌 ${userInput.trim()}\n💵 Costo: $${session.costo_envio.toFixed(2)}\n\n¿Cómo deseas pagar?${incentivoTexto}`,
        "bot",
        [
          { label: "💵 Contra entrega", value: "contra_entrega" },
          { label: "💳 Transferencia", value: "transferencia" },
        ]
      );
      return;
    }

    // 10) MÉTODO DE PAGO
    if (input === "contra_entrega") {
      setSessionData((prev) => ({
        ...prev,
        metodo_pago: "Contra entrega",
        foto_comprobante_base64: "",
        step: "confirmar",
      }));
      mostrarResumen();
      return;
    }

    if (input === "transferencia") {
      setSessionData((prev) => ({
        ...prev,
        metodo_pago: "Transferencia",
        step: "esperando_comprobante",
      }));
      addMessage(
        "💳 Has elegido *Transferencia*.\n\n📸 Puedes subir *la foto del comprobante* usando el botón 📷 de abajo.\n\nSi aún no la tienes, puedes continuar sin subirla.",
        "bot",
        [
          { label: "📷 Subir comprobante ahora", value: "subir_ahora" },
          { label: "➡️ Enviarlo después", value: "subir_despues" },
        ]
      );
      return;
    }

    if (input === "subir_ahora") {
      addMessage(
        "Pulsa el botón 📷 de abajo para seleccionar la foto del comprobante.",
        "bot"
      );
      return;
    }

    if (input === "subir_despues") {
      // No hay comprobante todavía, pero dejamos continuar
      setSessionData((prev) => ({
        ...prev,
        step: "confirmar",
      }));
      addMessage(
        "Perfecto 👍 Podrás enviar el comprobante después.\n\nTe muestro el resumen:",
        "bot"
      );
      mostrarResumen();
      return;
    }

    // 11) CONFIRMAR / CANCELAR
    if (input === "confirmar_pedido") {
      await crearPedidoConComprobante();
      return;
    }

    if (input === "cancelar") {
      addMessage(
        "❌ Pedido cancelado. Si deseas, puedes empezar de nuevo.",
        "bot"
      );
      return;
    }

    // Default
    addMessage("No entendí esa opción 😅 Usa los botones disponibles.", "bot");
  };

  // ===================================
  //           RENDERIZADO
  // ===================================
  // ... (El resto del código de renderizado permanece igual)
  
  return (
    <div className="chat-container">
      {/* ... (Contenido del chat) ... */}
    </div>
  );
}
