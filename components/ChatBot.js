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
export default function ChatBot( ) {
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
        if (items.length > 0 && categoriasDinamicas.length === 0) {
          const categorias = [
            ...new Set(
              items.map((item) => item.CATEGORIA).filter(Boolean)
            ),
          ];
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
        let mostrar = false;
        if (targetQty === 2 && remaining === 1) mostrar = true;
        if (targetQty === 6 && (remaining === 1 || remaining === 2))
          mostrar = true;
        if (targetQty === 12 && (remaining === 1 || remaining === 2))
          mostrar = true;
        if (targetQty === 30 && remaining <= 10) mostrar = true;

        if (mostrar) {
          texto += `💡 *¡Aprovecha en ${group.categoria}!*`;
          texto += `\nSolo ${remaining} piezas más para llegar a ${targetName}.`;
          texto += `\n¡El precio bajará automáticamente a $${targetPrice.toFixed(
            2
          )} c/u! 🔥\n\n`;
        }
      }
    });

    texto += `💰 *SUBTOTAL: $${subtotal.toFixed(2)}*`;

    addMessage(texto, "bot");
  };

  // Helper para calcular precio con una cantidad específica (necesario para el incentivo)
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

    const subtotal = sessionData.carrito.reduce((sum, item) => {
      const precio = calcularPrecioItem(item, metodo);
      return sum + precio * item.CANTIDAD;
    }, 0);

    const total = subtotal + sessionData.costo_envio;

    let resumen = `📋 *RESUMEN DE TU PEDIDO*\n\n`;
    resumen += `👤 ${sessionData.nombre.toUpperCase()}\n`;
    resumen += `📱 ${sessionData.telefono.toUpperCase()}\n\n`;

    resumen += `📦 *Productos (${sessionData.carrito.length}):*\n\n`;
    sessionData.carrito.forEach((item, idx) => {
      const precio = calcularPrecioItem(item, metodo);
      const subItem = precio * item.CANTIDAD;
      // Formato corto para el resumen (tipo carrito)
      resumen += `${idx + 1}. ${item.DESCRIPCION} (${item.TALLA})\n`;
      resumen += `   Cantidad: ${item.CANTIDAD} → $${subItem.toFixed(2)}\n\n`;
    });

    resumen += `💰 subtotal: $${subtotal.toFixed(2)}\n`;
    resumen += `💵 costo_envio: $${sessionData.costo_envio.toFixed(2)}\n\n`;
    resumen += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;

    // DETALLES DEL ENVÍO (Nuevo orden solicitado)
    resumen += `*DETALLES DEL ENVÍO:*\n\n`;

    let tipoEnvioTexto = sessionData.tipo_entrega;
    if (tipoEnvioTexto === "PERSONALIZADO") tipoEnvioTexto = "🏠 PERSONALIZADO";
    if (tipoEnvioTexto === "PUNTO FIJO") tipoEnvioTexto = "📍 PUNTO FIJO";
    if (tipoEnvioTexto === "CASILLERO") tipoEnvioTexto = "📦 CASILLERO";
    if (tipoEnvioTexto === "RETIRO EN TIENDA") tipoEnvioTexto = "🏪 RETIRO EN TIENDA";

    resumen += `🚚 envío: ${tipoEnvioTexto}\n`;

    if (sessionData.tipo_entrega !== "RETIRO EN TIENDA") {
      resumen += `📍 departamento: ${sessionData.departamento}\n`;

      let ubicacionAgrupada = sessionData.municipio;
      if (sessionData.punto_referencia) {
        ubicacionAgrupada += ` - ${sessionData.punto_referencia}`;
      }
      resumen += `📍 ${ubicacionAgrupada}\n`;
    }

    if (
      sessionData.encomiendista_nombre &&
      sessionData.tipo_entrega !== "PERSONALIZADO" &&
      sessionData.tipo_entrega !== "RETIRO EN TIENDA"
    ) {
      resumen += `🚛 encomendista: ${sessionData.encomiendista_nombre}\n`;
    }

    let tiempoAgrupado = "";
    if (sessionData.dia_entrega) {
      tiempoAgrupado += `📅 ${sessionData.dia_entrega}`;
    }
    if (sessionData.hora_entrega) {
      tiempoAgrupado += ` | ⏰ ${sessionData.hora_entrega}`;
    }
    if (tiempoAgrupado) {
      resumen += `${tiempoAgrupado}\n\n`;
    }

    resumen += `💳 método_pago: ${sessionData.metodo_pago}\n\n`;

    resumen += `¿Todo correcto?`;

    addMessage(resumen, "bot", [
      { label: "✅ Confirmar pedido", value: "confirmar_pedido" },
      { label: "❌ Cancelar", value: "cancelar" },
    ]);
  };

  // ===================================
  //     SUBIR COMPROBANTE DESPUÉS
  // ===================================
  const subirComprobanteDespuesDeFactura = async (factura) => {
    if (!sessionData.foto_comprobante_base64) return;
    try {
      await fetch(`${SCRIPT_URL}?route=uploadComprobante`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          factura,
          base64: sessionData.foto_comprobante_base64,
        }),
      });
      addMessage("📤 Tu comprobante fue guardado correctamente ✔️", "bot");
    } catch (e) {
      addMessage(
        "⚠️ No se pudo guardar el comprobante. El asesor lo agregará manualmente.",
        "bot"
      );
    }
  };

  // ===================================
  //      CREAR PEDIDO + COMPROBANTE
  // ===================================
  const crearPedidoConComprobante = async () => {
    const metodo = sessionData.metodo_pago || "Contra entrega";

    const subtotal = sessionData.carrito.reduce((sum, item) => {
      const precio = calcularPrecioItem(item, metodo);
      return sum + precio * item.CANTIDAD;
    }, 0);

    const total = subtotal + sessionData.costo_envio;

    // Recalcular precios por producto para enviar limpios al backend
    const productos = sessionData.carrito.map((item) => {
      const precio = calcularPrecioItem(item, metodo);
      const subItem = precio * item.CANTIDAD;
      return {
        ...item,
        PRECIO_APLICADO: precio,
        SUBTOTAL_ITEM: subItem,
      };
    });

    const pedido = {
      telefono: sessionData.telefono,
      nombre: sessionData.nombre,
      departamento: sessionData.departamento,
      municipio: sessionData.municipio,
      direccion: sessionData.direccion,
      punto_referencia: sessionData.punto_referencia,
      metodo_pago: sessionData.metodo_pago,
      tipo_entrega: sessionData.tipo_entrega,
      encomiendista: sessionData.encomiendista,
      costo_envio: sessionData.costo_envio,
      subtotal,
      descuento: 0,
      total,
      productos,
    };

    try {
      const res = await fetch(`${SCRIPT_URL}?route=crearPedido`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      const data = await res.json();

      if (data.success) {
        addMessage(`✅ ¡Pedido #${data.factura} creado exitosamente!`, "bot");
        setSessionData((prev) => ({
          ...prev,
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

    // 4) CONTINUAR PEDIDO
    if (input === "continuar_pedido") {
      if (session.carrito.length === 0) {
        addMessage(
          "⚠️ Tu carrito está vacío. Agrega productos primero.",
          "bot"
        );
        return;
      }
      setShowCarousel(false);
      setSessionData((prev) => ({ ...prev, step: "continuar_pedido_flotante" })); // Desactivar FAB

      const totalProductos = session.carrito.reduce(
        (sum, item) => sum + item.CANTIDAD,
        0
      );

      if (totalProductos >= 3) {
        setSessionData((prev) => ({ ...prev, step: "tipo_envio_3mas" }));
        addMessage(
          "📦 Tienes 3 o más productos\n\n¿Cómo deseas recibir tu pedido?",
          "bot",
          [
            { label: "🏠 PERSONALIZADO ($3.50)", value: "tipo_personalizado" },
            { label: "📦 CASILLERO", value: "tipo_casillero" },
            { label: "🏪 RETIRO EN TIENDA ($0.00)", value: "tipo_retiro_tienda" },
          ]
        );
      } else {
        setSessionData((prev) => ({ ...prev, step: "tipo_envio" }));
        addMessage("📦 ¿Cómo deseas recibir tu pedido?", "bot", [
          { label: "🏠 PERSONALIZADO ($3.50)", value: "tipo_personalizado" },
          { label: "📍 PUNTO FIJO", value: "tipo_punto_fijo" },
          { label: "📦 CASILLERO", value: "tipo_casillero" },
          { label: "🏪 RETIRO EN TIENDA ($0.00)", value: "tipo_retiro_tienda" },
        ]);
      }
      return;
    }

    // 5) TIPO DE ENTREGA
    if (input === "tipo_personalizado") {
      setSessionData((prev) => ({
        ...prev,
        tipo_entrega: "PERSONALIZADO",
        costo_envio: 3.5,
        step: "departamento_personalizado",
      }));
      addMessage(
        "🏠 Envío PERSONALIZADO - $3.50\n\n📍 ¿De qué departamento eres?",
        "bot",
        Object.keys(DEPARTAMENTOS_MUNICIPIOS).map((dep) => ({
          label: dep,
          value: `dep_pers_${dep}`,
        }))
      );
      return;
    }

    if (input === "tipo_punto_fijo") {
      setSessionData((prev) => ({
        ...prev,
        tipo_entrega: "PUNTO FIJO",
        step: "cargando_puntos_fijos",
      }));
      addMessage("📍 Buscando puntos fijos disponibles... 🔍", "bot");
      const resultado = await cargarEncomiendistas("PUNTO FIJO");
      if (resultado.success && resultado.items.length > 0) {
        setEncomiendaIndex(0);
        setShowEncomiendaCarousel(true);
        addMessage(
          `✨ Encontré ${resultado.items.length} punto(s) fijo(s) disponible(s).\n\nUsa las flechas para navegar:`,
          "bot"
        );
      } else {
        addMessage("⚠️ No hay puntos fijos disponibles", "bot", [
          {
            label: "🏠 Cambiar a PERSONALIZADO",
            value: "tipo_personalizado",
          },
          { label: "📦 Ver CASILLEROS", value: "tipo_casillero" },
          { label: "📞 Contactar agente", value: "agente" },
        ]);
      }
      return;
    }

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

    if (input === "tipo_casillero") {
      setSessionData((prev) => ({
        ...prev,
        tipo_entrega: "CASILLERO",
        step: "cargando_casilleros",
      }));
      addMessage("📦 Buscando casilleros disponibles... 🔍", "bot");
      const resultado = await cargarEncomiendistas("CASILLERO");
      if (resultado.success && resultado.items.length > 0) {
        setEncomiendaIndex(0);
        setShowEncomiendaCarousel(true);
        addMessage(
          `✨ Encontré ${resultado.items.length} casillero(s) disponible(s).\n\nUsa las flechas para navegar:`,
          "bot"
        );
      } else {
        addMessage("⚠️ No hay casilleros disponibles", "bot", [
          {
            label: "🏠 Cambiar a PERSONALIZADO",
            value: "tipo_personalizado",
          },
          { label: "📍 Ver PUNTOS FIJOS", value: "tipo_punto_fijo" },
          { label: "📞 Contactar agente", value: "agente" },
        ]);
      }
      return;
    }

    // 6) PERSONALIZADO: DPTO / MUNICIPIO / REFERENCIA
    if (input.startsWith("dep_pers_")) {
      const departamentoInput = input.replace("dep_pers_", "");
      const departamentoKey = Object.keys(DEPARTAMENTOS_MUNICIPIOS).find(
        (k) => k.toLowerCase() === departamentoInput.toLowerCase()
      );
      const departamento = departamentoKey || departamentoInput;
      const municipios = DEPARTAMENTOS_MUNICIPIOS[departamento] || [];

      if (!municipios.length) {
        addMessage(
          `⚠️ No se encontraron municipios para ${departamentoInput}.`,
          "bot",
          [{ label: "📞 Contactar agente", value: "agente" }]
        );
        return;
      }

      setSessionData((prev) => ({
        ...prev,
        departamento,
        step: "municipio_personalizado",
      }));
      addMessage(
        `${departamento} 📍\n\n¿De qué municipio?`,
        "bot",
        municipios.map((muni) => ({
          label: muni,
          value: `muni_pers_${muni}`,
        }))
      );
      return;
    }

    if (input.startsWith("muni_pers_")) {
      const municipio = input.replace("muni_pers_", "");
      setSessionData((prev) => ({
        ...prev,
        municipio,
        step: "punto_referencia_personalizado",
      }));
      addMessage(
        `📍 ${session.departamento} - ${municipio}\n\n¿Cuál es tu punto de referencia?\n(Ej: Frente a gasolinera Shell)`,
        "bot"
      );
      return;
    }

    if (session.step === "punto_referencia_personalizado") {
      setSessionData((prev) => ({
        ...prev,
        punto_referencia: userInput.trim(),
        direccion: userInput.trim(),
        encomiendista: "PERSONALIZADO",
        encomiendista_nombre: "Envío Personalizado",
        step: "metodo_pago",
      }));

      // --- INCENTIVO TRANSFERENCIA (3) ---
      const costoEnvio = 3.5; // Costo fijo para envío personalizado
      const totalContraEntrega = calcularTotalCarrito(
        "Contra entrega",
        session.carrito,
        costoEnvio
      );
      const totalTransferencia = calcularTotalCarrito(
        "Transferencia",
        session.carrito,
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
        `🏠 Punto de referencia registrado\n💵 Costo de envío: $3.50\n\n¿Cómo deseas pagar?${incentivoTexto}`,
        "bot",
        [
          { label: "💵 Contra entrega", value: "contra_entrega" },
          { label: "💳 Transferencia", value: "transferencia" },
        ]
      );
      return;
    }

    // 7) MÉTODO DE PAGO
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

    // 8) CONFIRMAR / CANCELAR
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
  //      HANDLERS DE INPUT / BOTONES
  // ===================================
  const handleSend = () => {
    if (!input.trim()) return;
    processMessage(input);
    setInput("");
  };

  const handleOptionClick = (value) => {
    processMessage(value);
  };

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

  const filtered = getFilteredCatalog();
  const currentProduct = filtered[carouselIndex];

  // ===================================
  //               UI
  // ===================================
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">GyS Importadora</h1>
              <p className="text-sm opacity-90">Ropa y accesorios 💚</p>
            </div>
          </div>
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
            <div
              className={`bg-white text-gray-800 rounded-xl shadow-2xl p-3 flex items-center gap-2 border ${
                toastMessage.includes("⚠️")
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <span className="text-lg">
                {toastMessage.includes("⚠️") ? "⚠️" : "✅"}
              </span>
              <span className="font-medium">
                {toastMessage.replace(/⚠️|✅/g, "").trim()}
              </span>
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
                  <option key={i} value={cat.toLowerCase()}>
                    {cat}
                  </option>
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
                    if (url.includes("drive.google.com/uc?export=view" )) {
                      const id = url.split("id=")[1];
                      if (id) {
                        url = `https://drive.google.com/thumbnail?id=${id}&sz=w500`;
                      }
                    }
                    return url;
                  } )()}
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
                          onChange={(e ) => setSelectedTalla(e.target.value)}
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
                      onError={(e ) => {
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
                          <span className="text-gray-600">
                            ⏰ {enc.HORA_ENTREGA}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={seleccionarEncomienda}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Truck className="w-5 h-5" />
                      Elegir esta opción
                    </button>
                  </div>

                  <button
                    onClick={() => handleEncomiendaNav("prev")}
                    className="absolute left-2 top-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleEncomiendaNav("next")}
                    className="absolute right-2 top-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <div className="text-center text-sm text-gray-500 mt-2">
                    Opción {encomiendaIndex + 1} de {encomiendistas.length}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* BARRA DE ACCIONES FLOTANTE (FAB) */}
      {(sessionData.step === "menu_flotante" || sessionData.step === "menu") && (
        <div className="fixed bottom-20 left-0 right-0 z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-3 rounded-xl shadow-2xl flex justify-around gap-2 border border-purple-200">
              <button
                onClick={() => handleOptionClick("agregar_mas")}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                ➕ Agregar más
              </button>
              <button
                onClick={() => handleOptionClick("ver_carrito")}
                className="flex-1 bg-purple-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-all"
              >
                🛒 Ver Carrito
              </button>
              <button
                onClick={() => handleOptionClick("continuar_pedido")}
                className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
              >
                ✅ Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER INPUT */}
      <div className="bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-2 items-center">
          {/* Input de texto */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500"
          />

          {/* Input de archivo oculto */}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />

          {/* Botón cámara */}
          <label
            htmlFor="fileInput"
            className="bg-purple-500 text-white p-3 rounded-full cursor-pointer hover:bg-purple-600 transition-all"
          >
            📷
          </label>

          {/* Botón enviar */}
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

