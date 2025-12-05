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
        const items = data.items || [];
        setCatalogo(items);

        // Extraer categorías únicas y dinámicas
        if (items.length > 0) {
          const categorias = [...new Set(items.map(item => item.CATEGORIA).filter(Boolean))];
          setCategoriasDinamicas(categorias);
        }
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
  const cargarEncomiendistas = async (tipoEnvio, departamento = "", municipio = "") => {
    setLoadingEncomiendas(true);
    try {
      let url = `${SCRIPT_URL}?route=encomiendas&tipo_entrega=${encodeURIComponent(
        tipoEnvio
      )}`;
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
    const costoEnvio = Number(enc.COSTO_ENVIO || 0);
    const totalContraEntrega = calcularTotalCarrito("Contra entrega", sessionData.carrito, costoEnvio);
    const totalTransferencia = calcularTotalCarrito("Transferencia", sessionData.carrito, costoEnvio);
    let incentivoTexto = "";
    if (totalTransferencia < totalContraEntrega) {
      incentivoTexto = `\n\n💳 Paga con transferencia y tu total baja a $${totalTransferencia.toFixed(2)}. ¡Aprovecha el mejor precio!`;
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

  // Función auxiliar para calcular precio con una cantidad específica
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
  //   CALCULAR TOTAL DEL CARRITO
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
        let mostrar = false;
        if (targetQty === 2 && remaining === 1) mostrar = true;
        if (targetQty === 6 && remaining <= 2) mostrar = true;
        if (targetQty === 12 && remaining <= 2) mostrar = true;
        if (targetQty === 30 && remaining <= 10) mostrar = true;

        if (mostrar) {
          const ahorroPorUnidad = group.precio - targetPrice;
          const ahorroTotal = ahorroPorUnidad * targetQty;
          texto += `\n✨ *INCENTIVO ${group.categoria.toUpperCase()}*:\n`;
          texto += `   Te faltan *${remaining}* para llevar ${targetQty} (${targetName}) y ahorrar $${ahorroTotal.toFixed(
            2
          )} en total.\n\n`;
        }
      }
    });

    texto += `\n*SUBTOTAL:* $${subtotal.toFixed(2)}\n`;

    if (sessionData.costo_envio > 0) {
      texto += `*ENVÍO:* $${sessionData.costo_envio.toFixed(2)}\n`;
    }

    const total = subtotal + sessionData.costo_envio;
    texto += `*TOTAL:* $${total.toFixed(2)}\n`;

    // 3.B Incentivo de pago con transferencia
    if (metodo === "Contra entrega") {
      const totalTransferencia = calcularTotalCarrito(
        "Transferencia",
        sessionData.carrito,
        sessionData.costo_envio
      );
      if (totalTransferencia < total) {
        const ahorro = total - totalTransferencia;
        texto += `\n💳 Paga con *Transferencia* y tu total baja a *$${totalTransferencia.toFixed(
          2
        )}* (Ahorro de $${ahorro.toFixed(2)}).\n`;
      }
    }

    addMessage(texto, "bot", [
      { label: "➕ Agregar más productos", value: "agregar_mas" },
      { label: "✅ Continuar pedido", value: "continuar_pedido" },
    ]);
  };

  // ===================================
  //           MOSTRAR RESUMEN
  // ===================================
  const mostrarResumen = () => {
    let texto = "📝 *RESUMEN DE TU PEDIDO:*\n\n";

    let subtotal = 0;
    const metodo = sessionData.metodo_pago || "Contra entrega";

    texto += `📦 *PRODUCTOS (${sessionData.carrito.length}):*\n`;
    sessionData.carrito.forEach((item, idx) => {
      const precio = calcularPrecioItem(item, metodo);
      const subItem = precio * item.CANTIDAD;
      subtotal += subItem;

      // Formato simple para resumen final
      texto += `${item.CANTIDAD}x ${item.DESCRIPCION} (${item.TALLA}) → $${subItem.toFixed(
        2
      )}\n`;
    });

    texto += `\n*SUBTOTAL:* $${subtotal.toFixed(2)}\n`;

    if (sessionData.costo_envio > 0) {
      texto += `*ENVÍO:* $${sessionData.costo_envio.toFixed(2)}\n`;
    }

    const total = subtotal + sessionData.costo_envio;
    texto += `*TOTAL A PAGAR:* $${total.toFixed(2)}\n\n`;

    // 3.A Orden de datos de envío
    texto += `*DETALLES DE ENTREGA:*\n`;
    texto += `🚚 Tipo: ${sessionData.tipo_entrega}\n`;
    texto += `📍 ${sessionData.departamento} - ${sessionData.municipio}\n`;
    if (sessionData.punto_referencia) {
      texto += `📌 Punto de Referencia: ${sessionData.punto_referencia}\n`;
    }
    if (sessionData.encomiendista_nombre) {
      texto += `🚛 Encomendista: ${sessionData.encomiendista_nombre}\n`;
    }
    if (sessionData.dia_entrega) {
      texto += `📅 Día: ${sessionData.dia_entrega}\n`;
    }
    if (sessionData.hora_entrega) {
      texto += `⏰ Hora: ${sessionData.hora_entrega}\n`;
    }

    texto += `\n*MÉTODO DE PAGO:* ${sessionData.metodo_pago}\n`;

    if (sessionData.metodo_pago === "Transferencia") {
      texto += `\n*COMPROBANTE:* ${
        sessionData.foto_comprobante_base64 ? "✅ Recibido" : "❌ Pendiente"
      }\n`;
    }

    addMessage(texto, "bot", [
      { label: "✅ Confirmar y enviar pedido", value: "confirmar_pedido" },
      { label: "❌ Cancelar y empezar de nuevo", value: "cancelar" },
    ]);
  };

  // ===================================
  //        MANEJO DE ARCHIVOS
  // ===================================
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Solo la parte base64
      reader.onerror = (error) => reject(error);
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

    let tipoTexto = sessionData.tipo_entrega;
    if (tipoTexto === "PERSONALIZADO") tipoTexto = "🏠 PERSONALIZADO";
    if (tipoTexto === "PUNTO FIJO") tipoTexto = "📍 PUNTO FIJO";
    if (tipoTexto === "CASILLERO") tipoTexto = "📦 CASILLERO";

    // DETALLES DEL ENVÍO (Nuevo orden solicitado)
    mensaje += `*DETALLES DEL ENVÍO:*\n`;
    mensaje += `🚚 envío: ${tipoTexto}\n`;
    mensaje += `📍 departamento: ${sessionData.departamento}\n`;
    mensaje += `🗺️ municipio: ${sessionData.municipio}\n`;

    if (sessionData.punto_referencia) {
      mensaje += `📌 punto_referencia: ${sessionData.punto_referencia}\n`;
    }

    if (sessionData.encomiendista_nombre && sessionData.tipo_entrega !== "PERSONALIZADO") {
      mensaje += `🚛 encomendista: ${sessionData.encomiendista_nombre}\n`;
    }

    if (sessionData.dia_entrega) {
      mensaje += `📅 dia_entrega: ${sessionData.dia_entrega}\n`;
    }

    if (sessionData.hora_entrega) {
      mensaje += `⏰ hora_entrega: ${sessionData.hora_entrega}\n`;
    }

    mensaje += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;

    mensaje += `💳 método_pago: ${sessionData.metodo_pago}\n\n`;
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
        setSessionData((prev) => ({ ...prev, step: "menu" })); // Asegurar que el paso sea "menu" para mostrar el FAB
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
      setTimeout(() => window.open(url, "_blank"), 1000);
      return;
    }

    if (input === "agregar_mas") {
      setShowCarousel(true);
      // Recargar el catálogo con la categoría actual (que persiste en el estado)
      cargarCatalogo(selectedCategory);
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

    // 5) SELECCIÓN DE DEPARTAMENTO
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

    // 6) SELECCIÓN DE MUNICIPIO
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

    // 8) SELECCIÓN DEL TIPO DE ENTREGA (Nuevo paso)
    if (session.step === "seleccionar_tipo_entrega") {
      // Lógica para TIPO_PERSONALIZADO (Ahora va directo a pedir punto de referencia)
      if (input === "tipo_personalizado") {
        setSessionData((prev) => ({
          ...prev,
          tipo_entrega: "PERSONALIZADO",
          costo_envio: 3.5,
          step: "punto_referencia", // Va directo a pedir punto de referencia
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
          encomiendista_nombre: "RETIRO EN TIENDA",
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
    if (session.step === "punto_referencia") {
      setSessionData((prev) => ({
        ...prev,
        punto_referencia: userInput.trim(),
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
    if (session.step === "metodo_pago") {
      if (input === "contra_entrega") {
        setSessionData((prev) => ({
          ...prev,
          metodo_pago: "Contra entrega",
          step: "confirmar",
        }));
        addMessage(
          "✅ Seleccionaste *Contra entrega*.\n\nAhora te muestro el resumen para confirmar tu pedido:",
          "bot"
        );
        mostrarResumen();
        return;
      }

      if (input === "transferencia") {
        setSessionData((prev) => ({
          ...prev,
          metodo_pago: "Transferencia",
          step: "subir_comprobante",
        }));
        addMessage(
          "✅ Seleccionaste *Transferencia*.\n\nPor favor, realiza la transferencia a una de nuestras cuentas y sube el comprobante:",
          "bot"
        );
        // Aquí podrías mostrar la información de las cuentas bancarias
        addMessage(
          "🏦 *Cuentas Bancarias:*\n\n" +
          "1. Banco Agrícola - Cuenta XXXXX\n" +
          "2. Banco Cuscatlán - Cuenta YYYYY\n\n" +
          "Una vez realizada, sube la foto del comprobante.",
          "bot"
        );
        return;
      }
    }

    // 11) CONFIRMAR PEDIDO
    if (session.step === "confirmar" && input === "confirmar_pedido") {
      if (session.metodo_pago === "Transferencia" && !session.foto_comprobante_base64) {
        addMessage(
          "⚠️ Por favor, sube el comprobante de transferencia antes de confirmar.",
          "bot"
        );
        setSessionData((prev) => ({ ...prev, step: "subir_comprobante" }));
        return;
      }

      // Enviar a Google Apps Script
      addMessage("⏳ Enviando tu pedido a GyS Importadora...", "bot");

      const subtotal = session.carrito.reduce((sum, item) => {
        const precio = calcularPrecioItem(item, session.metodo_pago);
        return sum + precio * item.CANTIDAD;
      }, 0);
      const total = subtotal + session.costo_envio;

      try {
        const res = await fetch(`${SCRIPT_URL}?route=save_order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...session,
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2),
            carrito: session.carrito.map(item => ({
              ...item,
              PRECIO_APLICADO: calcularPrecioItem(item, session.metodo_pago).toFixed(2),
              SUBTOTAL_ITEM: (calcularPrecioItem(item, session.metodo_pago) * item.CANTIDAD).toFixed(2),
            })),
          }),
        });
        const data = await res.json();

        if (data.success) {
          setSessionData((prev) => ({
            ...prev,
            step: "finalizado",
            factura_generada: data.factura_id,
          }));
          addMessage(
            `🎉 *¡PEDIDO CONFIRMADO!* 🎉\n\nTu pedido ha sido registrado con éxito. Número de factura: *${data.factura_id}*.\n\nEn breve nos comunicaremos contigo para coordinar la entrega.\n\n¡Gracias por tu compra!`,
            "bot"
          );
          enviarWhatsApp(subtotal, total); // Enviar respaldo a WhatsApp
        } else {
          addMessage(
            `❌ *ERROR AL REGISTRAR PEDIDO* ❌\n\nHubo un problema al guardar tu pedido. Por favor, contacta a un agente:`,
            "bot",
            [{ label: "📞 Contactar agente", value: "agente" }]
          );
        }
      } catch (e) {
        addMessage(
          `❌ *ERROR DE CONEXIÓN* ❌\n\nNo pudimos conectar con el servidor. Por favor, contacta a un agente:`,
          "bot",
          [{ label: "📞 Contactar agente", value: "agente" }]
        );
      }
      return;
    }

    if (input === "cancelar") {
      setSessionData({
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
      setMessages([]);
      setShowCarousel(false);
      setShowEncomiendaCarousel(false);
      setSelectedCategory("todos");
      setCarouselIndex(0);
      setEncomiendaIndex(0);
      setCantidad(1);
      addMessage(
        "¡Hola! 💚 Bienvenido/a a GyS Importadora ✨\n\nPor favor, dime tu NOMBRE COMPLETO:",
        "bot"
      );
      return;
    }

    // 12) MENSAJES NO RECONOCIDOS
    if (session.step === "inicio") {
      addMessage("Por favor, dime tu nombre completo (nombre y apellido) 😊", "bot");
      return;
    }
    if (session.step === "telefono") {
      addMessage("Por favor, ingresa un número de teléfono válido (8 dígitos)", "bot");
      return;
    }
    if (session.step === "menu") {
      addMessage("Por favor, selecciona una opción del menú principal.", "bot", [
        { label: "🛍️ Ver catálogo", value: "catalogo" },
        { label: "👤 Hablar con agente", value: "agente" },
      ]);
      return;
    }
    if (session.step === "menu_flotante") {
      addMessage("Por favor, selecciona una opción de la barra flotante.", "bot");
      return;
    }
    if (session.step === "continuar_pedido_flotante") {
      addMessage("Por favor, selecciona una opción para continuar con tu pedido.", "bot");
      return;
    }
    if (session.step === "seleccionar_departamento_envio") {
      addMessage("Por favor, selecciona un departamento de la lista.", "bot");
      return;
    }
    if (session.step === "seleccionar_municipio_envio") {
      addMessage("Por favor, selecciona un municipio de la lista.", "bot");
      return;
    }
    if (session.step === "seleccionar_tipo_entrega") {
      addMessage("Por favor, selecciona una de las opciones de entrega disponibles.", "bot");
      return;
    }
    if (session.step === "punto_referencia") {
      addMessage("Por favor, ingresa tu punto de referencia para la entrega.", "bot");
      return;
    }
    if (session.step === "metodo_pago") {
      addMessage("Por favor, selecciona un método de pago.", "bot", [
        { label: "💵 Contra entrega", value: "contra_entrega" },
        { label: "💳 Transferencia", value: "transferencia" },
      ]);
      return;
    }
    if (session.step === "subir_comprobante") {
      addMessage("Por favor, sube el comprobante de transferencia o selecciona una opción.", "bot");
      return;
    }
    if (session.step === "confirmar") {
      addMessage("Por favor, confirma o cancela tu pedido.", "bot", [
        { label: "✅ Confirmar y enviar pedido", value: "confirmar_pedido" },
        { label: "❌ Cancelar y empezar de nuevo", value: "cancelar" },
      ]);
      return;
    }
    if (session.step === "finalizado") {
      addMessage("Tu pedido ya fue confirmado. Si tienes otra consulta, por favor contacta a un agente.", "bot", [
        { label: "📞 Contactar agente", value: "agente" },
      ]);
      return;
    }

    // Mensaje de fallback si el paso no es reconocido
    addMessage("No entendí tu mensaje. Por favor, selecciona una de las opciones disponibles.", "bot");
  };

  // ===================================
  //        MANEJO DE OPCIONES
  // ===================================
  const handleOptionClick = (value) => {
    setInput(value);
    processMessage(value);
  };

  // ===================================
  //       RENDERIZADO DEL CHATBOT
  // ===================================

  const filtered = getFilteredCatalog();
  const currentProduct = filtered[carouselIndex];

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* HEADER */}
      <div className="bg-purple-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">GyS ChatBot 🤖</h1>
        <div className="flex items-center gap-2">
          {sessionData.carrito.length > 0 && (
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              🛒 {sessionData.carrito.length}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full pb-20">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-purple-500 text-white"
                  : "bg-white text-gray-800"
              } rounded-2xl px-4 py-3 shadow-md`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.options && (
                <div
                  className={`mt-3 ${
                    msg.options.length > 6 ? "max-h-96 overflow-y-auto" : ""
                  }`}
                >
                  <div
                    className={`grid ${
                      msg.options.length > 6 ? "grid-cols-2" : "grid-cols-1"
                    } gap-2`}
                  >
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt.value)}
                        className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-purple-600 transition-all text-sm font-medium text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* COMPONENTE TOAST (Notificación Temporal) */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className={`bg-white text-gray-800 rounded-xl shadow-2xl p-3 flex items-center gap-2 border ${toastMessage.includes("⚠️") ? "border-yellow-500" : "border-green-500"}`}>
              <span className="text-lg">{toastMessage.includes("⚠️") ? "⚠️" : "✅"}</span>
              <span className="font-medium">{toastMessage.replace(/⚠️|✅/g, "").trim()}</span>
            </div>
          </div>
        )}

        {loadingEncomiendas && (
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
              <span className="text-gray-700">Buscando opciones...</span>
            </div>
          </div>
        )}

        {showCarousel && (
          <div className="bg-white rounded-xl shadow-lg p-4 mx-auto max-w-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">🛍️ Catálogo</h3>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCarouselIndex(0);
                  cargarCatalogo(e.target.value);
                }}
                className="px-3 py-1 border rounded-lg text-sm"
              >
                <option value="todos">Todos</option>
                {categoriasDinamicas.map((cat, i) => (
                  <option key={i} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
            </div>

            {loadingCatalog ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              </div>
            ) : currentProduct ? (
              <div className="relative">
                <img
                  src={(() => {
                    let url =
                      currentProduct.FOTO ||
                      currentProduct["FOTO LINK"] ||
                      "https://via.placeholder.com/300";
                    if (url.includes("drive.google.com/uc?export=view")) {
                      const id = url.split("id=")[1];
                      if (id) {
                        url = `https://drive.google.com/thumbnail?id=${id}&sz=w500`;
                      }
                    }
                    return url;
                  })()}
                  alt={currentProduct.DESCRIPCION}
                  className="w-full h-64 object-cover rounded-lg mb-3"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=Sin+Imagen";
                  }}
                />

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg capitalize">
                    {currentProduct.DESCRIPCION}
                  </h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Color: {currentProduct.COLOR}
                    </span>
                    <span className="font-bold text-purple-600 text-lg">
                      ${currentProduct.PRECIO_UNIDAD}
                    </span>
                  </div>

                  {currentProduct.TALLAS_DISPONIBLES &&
                    currentProduct.TALLAS_DISPONIBLES.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Talla:
                        </label>
                        <select
                          value={selectedTalla}
                          onChange={(e) => setSelectedTalla(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="">Selecciona talla</option>
                          {currentProduct.TALLAS_DISPONIBLES.map((t, i) => (
                            <option key={i} value={t.etiqueta}>
                              {t.etiqueta} (Stock: {t.stock})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cantidad:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCantidad(val === "" ? "" : parseInt(val) || 1);
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <button
                    onClick={agregarAlCarrito}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Agregar al carrito
                  </button>
                </div>

                <button
                  onClick={() => handleCarouselNav("prev")}
                  className="absolute left-2 top-28 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleCarouselNav("next")}
                  className="absolute right-2 top-28 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="text-center text-sm text-gray-500 mt-2">
                  {carouselIndex + 1} / {filtered.length}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay productos disponibles
              </div>
            )}
          </div>
        )}

        {showEncomiendaCarousel && encomiendistas.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 mx-auto max-w-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">
                {sessionData.tipo_entrega === "PUNTO FIJO"
                  ? "📍 Puntos Fijos"
                  : "📦 Casilleros"}
              </h3>
            </div>
            {(() => {
              const enc = encomiendistas[encomiendaIndex];
              if (!enc) return null;

              let fotoUrl = enc.FOTO_REFERENCIA || "";
              if (fotoUrl.includes("drive.google.com/uc?export=view")) {
                const id = fotoUrl.split("id=")[1];
                if (id) {
                  fotoUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w500`;
                }
              }

              return (
                <div className="relative">
                  {fotoUrl && (
                    <img
                      src={fotoUrl}
                      alt={enc.ENCOMIENDISTA}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300?text=Sin+Foto";
                      }}
                    />
                  )}

                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-xl text-purple-600">
                      {enc.ENCOMIENDISTA}
                    </h4>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold">
                          {enc.DEPARTAMENTO} - {enc.MUNICIPIO}
                        </span>
                      </div>
                      {enc.PUNTO_REFERENCIA && (
                        <div className="flex items-start gap-2">
                          <Package className="w-4 h-4 text-gray-500 mt-0.5" />
                          <span>{enc.PUNTO_REFERENCIA}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600 text-lg">
                          ${enc.COSTO_ENVIO}
                        </span>
                      </div>
                      {enc.DIA_ENTREGA && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{enc.DIA_ENTREGA}</span>
                        </div>
                      )}
                      {enc.HORA_ENTREGA && (
                        <div className="flex items-center gap-2 ml-6">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{enc.HORA_ENTREGA}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={seleccionarEncomienda}
                      className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all"
                    >
                      Seleccionar
                    </button>
                  </div>

                  <button
                    onClick={() => handleEncomiendaNav("prev")}
                    className="absolute left-2 top-28 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleEncomiendaNav("next")}
                    className="absolute right-2 top-28 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="text-center text-sm text-gray-500 mt-2">
                    {encomiendaIndex + 1} / {encomiendistas.length}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* FOOTER (INPUT) */}
      <div className="p-4 bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-4xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              processMessage(input.trim());
              setInput("");
            }
          }}
          className="flex gap-2"
        >
          {/* Input de archivo para comprobante de pago */}
          {sessionData.step === "subir_comprobante" && (
            <label className="flex items-center justify-center bg-green-500 text-white p-3 rounded-full cursor-pointer hover:bg-green-600 transition-all">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <Package className="w-6 h-6" />
            </label>
          )}

          {/* Input de texto normal */}
          {sessionData.step !== "subir_comprobante" && (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                sessionData.step === "inicio"
                  ? "Escribe tu nombre completo..."
                  : sessionData.step === "telefono"
                  ? "Escribe tu número de teléfono..."
                  : "Escribe tu mensaje o selecciona una opción..."
              }
              className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={
                sessionData.step === "menu" ||
                sessionData.step === "menu_flotante" ||
                sessionData.step === "continuar_pedido_flotante" ||
                sessionData.step === "seleccionar_departamento_envio" ||
                sessionData.step === "seleccionar_municipio_envio" ||
                sessionData.step === "seleccionar_tipo_entrega" ||
                sessionData.step === "metodo_pago" ||
                sessionData.step === "confirmar" ||
                sessionData.step === "finalizado"
              }
            />
          )}

          {/* Botón de enviar */}
          <button
            type="submit"
            className="bg-purple-500 text-white p-3 rounded-full hover:bg-purple-600 transition-all"
            disabled={
              !input.trim() && sessionData.step !== "subir_comprobante"
            }
          >
            <Send className="w-6 h-6" />
          </button>
        </form>

        {/* Floating Action Bar (FAB) para el menú principal */}
        {sessionData.step === "menu_flotante" && (
          <div className="fixed bottom-20 right-4 flex flex-col gap-2">
            <button
              onClick={() => handleOptionClick("ver_carrito")}
              className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-all"
              title="Ver Carrito"
            >
              <ShoppingBag className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleOptionClick("continuar_pedido")}
              className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
              title="Continuar Pedido"
            >
              <Truck className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
