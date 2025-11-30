import React, { useState, useEffect, useRef } from 'react';
import { Send, ShoppingBag, Package, ChevronLeft, ChevronRight, Loader2, Truck, MapPin, Image as ImageIcon } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyOHi4qZyxwvdGy826isCABC7JQqeEGvZ8kFT9FzbVi_s5NYKFkHZFVrtoQB6r9NpM/exec";
const WHATSAPP_NEGOCIO = "50375936319";

// Departamentos y municipios de El Salvador
const DEPARTAMENTOS_MUNICIPIOS = {
  "Ahuachapán": ["Ahuachapán", "Apaneca", "Atiquizaya", "Concepción de Ataco", "El Refugio", "Guaymango", "Jujutla", "San Francisco Menéndez", "San Lorenzo", "San Pedro Puxtla", "Tacuba", "Turín"],
  "Cabañas": ["Sensuntepeque", "Cinquera", "Dolores", "Guacotecti", "Ilobasco", "Jutiapa", "San Isidro", "Tejutepeque", "Victoria"],
  "Chalatenango": ["Chalatenango", "Agua Caliente", "Arcatao", "Azacualpa", "Cancasque", "Citalá", "Comalapa", "Concepción Quezaltepeque", "Dulce Nombre de María", "El Carrizal", "El Paraíso", "La Laguna", "La Palma", "La Reina", "Las Vueltas", "Nombre de Jesús", "Nueva Concepción", "Nueva Trinidad", "Ojos de Agua", "Potonico", "San Antonio de la Cruz", "San Antonio Los Ranchos", "San Fernando", "San Francisco Lempa", "San Francisco Morazán", "San Ignacio", "San Isidro Labrador", "San Luis del Carmen", "San Miguel de Mercedes", "San Rafael", "Santa Rita", "Tejutla"],
  "Cuscatlán": ["Cojutepeque", "Candelaria", "El Carmen", "El Rosario", "Monte San Juan", "Oratorio de Concepción", "San Bartolomé Perulapía", "San Cristóbal", "San José Guayabal", "San Pedro Perulapán", "San Rafael Cedros", "San Ramón", "Santa Cruz Analquito", "Santa Cruz Michapa", "Suchitoto", "Tenancingo"],
  "La Libertad": ["Santa Tecla", "Antiguo Cuscatlán", "Chiltiupán", "Ciudad Arce", "Colón", "Comasagua", "Huizúcar", "Jayaque", "Jicalapa", "La Libertad", "Nuevo Cuscatlán", "Quezaltepeque", "Sacacoyo", "San José Villanueva", "San Juan Opico", "San Matías", "San Pablo Tacachico", "Tamanique", "Talnique", "Teotepeque", "Tepecoyo", "Zaragoza"],
  "La Paz": ["Zacatecoluca", "Cuyultitán", "El Rosario", "Jerusalén", "Mercedes La Ceiba", "Olocuilta", "Paraíso de Osorio", "San Antonio Masahuat", "San Emigdio", "San Francisco Chinameca", "San Juan Nonualco", "San Juan Talpa", "San Juan Tepezontes", "San Luis La Herradura", "San Luis Talpa", "San Miguel Tepezontes", "San Pedro Masahuat", "San Pedro Nonualco", "San Rafael Obrajuelo", "Santa María Ostuma", "Santiago Nonualco", "Tapalhuaca"],
  "La Unión": ["La Unión", "Anamorós", "Bolívar", "Concepción de Oriente", "Conchagua", "El Carmen", "El Sauce", "Intipucá", "Lislique", "Meanguera del Golfo", "Nueva Esparta", "Pasaquina", "Polorós", "San Alejo", "San José", "Santa Rosa de Lima", "Yayantique", "Yucuaiquín"],
  "Morazán": ["San Francisco Gotera", "Arambala", "Cacaopera", "Chilanga", "Corinto", "Delicias de Concepción", "El Divisadero", "El Rosario", "Gualococti", "Guatajiagua", "Joateca", "Jocoaitique", "Jocoro", "Lolotiquillo", "Meanguera", "Osicala", "Perquín", "San Carlos", "San Fernando", "San Isidro", "San Simón", "Sensembra", "Sociedad", "Torola", "Yamabal", "Yoloaiquín"],
  "San Miguel": ["San Miguel", "Carolina", "Chapeltique", "Chinameca", "Chirilagua", "Ciudad Barrios", "Comacarán", "El Tránsito", "Lolotique", "Moncagua", "Nueva Guadalupe", "Nuevo Edén de San Juan", "Quelepa", "San Antonio del Mosco", "San Gerardo", "San Jorge", "San Luis de la Reina", "San Rafael Oriente", "Sesori", "Uluazapa"],
  "San Salvador": ["San Salvador", "Aguilares", "Apopa", "Ayutuxtepeque", "Cuscatancingo", "Delgado", "El Paisnal", "Guazapa", "Ilopango", "Mejicanos", "Nejapa", "Panchimalco", "Rosario de Mora", "San Marcos", "San Martín", "Santiago Texacuangos", "Santo Tomás", "Soyapango", "Tonacatepeque"],
  "San Vicente": ["San Vicente", "Apastepeque", "Guadalupe", "San Cayetano Istepeque", "San Esteban Catarina", "San Ildefonso", "San Lorenzo", "San Sebastián", "Santa Clara", "Santo Domingo", "Tecoluca", "Tepetitán", "Verapaz"],
  "Santa Ana": ["Santa Ana", "Candelaria de la Frontera", "Chalchuapa", "Coatepeque", "El Congo", "El Porvenir", "Masahuat", "Metapán", "San Antonio Pajonal", "San Sebastián Salitrillo", "Santa Rosa Guachipilín", "Santiago de la Frontera", "Texistepeque"],
  "Sonsonate": ["Sonsonate", "Acajutla", "Armenia", "Caluco", "Cuisnahuat", "Izalco", "Juayúa", "Nahuizalco", "Nahulingo", "Salcoatitán", "San Antonio del Monte", "San Julián", "Santa Catarina Masahuat", "Santa Isabel Ishuatán", "Santo Domingo de Guzmán", "Sonzacate"],
  "Usulután": ["Usulután", "Alegría", "Berlín", "California", "Concepción Batres", "El Triunfo", "Ereguayquín", "Estanzuelas", "Jiquilisco", "Jucuapa", "Jucuarán", "Mercedes Umaña", "Nueva Granada", "Ozatlán", "Puerto El Triunfo", "San Agustín", "San Buenaventura", "San Dionisio", "San Francisco Javier", "Santa Elena", "Santa María", "Santiago de María", "Tecapán"]
};

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [catalogo, setCatalogo] = useState([]);
  const [encomiendistas, setEncomiendistas] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [loadingEncomiendas, setLoadingEncomiendas] = useState(false);
  const [sessionData, setSessionData] = useState({
    step: 'inicio',
    nombre: '',
    telefono: '',
    carrito: [],
    departamento: '',
    municipio: '',
    direccion: '',
    punto_referencia: '',
    tipo_entrega: '', // PERSONALIZADO o PUNTO_FIJO
    metodo_pago: '',
    encomiendista: '',
    encomiendista_nombre: '',
    encomiendista_telefono: '',
    costo_envio: 0,
    dia_entrega: '',
    hora_entrega: ''
  });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedTalla, setSelectedTalla] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    addMessage("¡Hola! 💚 Bienvenido/a a GyS Importadora ✨\n\nPor favor, dime tu NOMBRE COMPLETO:", 'bot');
  }, []);

  const addMessage = (text, sender, options = null) => {
    setMessages(prev => [...prev, { text, sender, options, timestamp: new Date() }]);
  };

  const cargarCatalogo = async (categoria = '') => {
    setLoadingCatalog(true);
    try {
      let url = `${SCRIPT_URL}?route=catalog&limit=100`;
      if (categoria && categoria !== 'todos') {
        url += `&categoria=${categoria}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        addMessage("❌ Error al cargar el catálogo. Intenta de nuevo.", 'bot');
        setCatalogo([]);
      } else {
        setCatalogo(data.items || []);
        if (data.items && data.items.length > 0) {
          addMessage(`✨ Encontré ${data.items.length} productos disponibles. Usa las flechas para navegar:`, 'bot');
        } else {
          addMessage("No encontré productos en esta categoría 😔", 'bot');
        }
      }
    } catch (error) {
      addMessage("❌ Error de conexión. Verifica tu internet.", 'bot');
      setCatalogo([]);
    }
    setLoadingCatalog(false);
  };

  const cargarEncomiendistas = async (municipio, tipoEntrega) => {
    setLoadingEncomiendas(true);
    try {
      const url = `${SCRIPT_URL}?route=encomiendas&municipio=${encodeURIComponent(municipio)}&tipo_entrega=${tipoEntrega.toLowerCase()}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        addMessage("❌ Error al buscar encomiendistas. Intenta de nuevo.", 'bot');
        setEncomiendistas([]);
        return false;
      } else {
        const items = data.items || [];
        setEncomiendistas(items);
        return items.length > 0;
      }
    } catch (error) {
      addMessage("❌ Error de conexión. Verifica tu internet.", 'bot');
      setEncomiendistas([]);
      return false;
    } finally {
      setLoadingEncomiendas(false);
    }
  };

  const mostrarEncomiendistasConFoto = () => {
    if (encomiendistas.length === 0) return;

    const opciones = encomiendistas.slice(0, 5).map((enc, idx) => ({
      label: `${idx + 1}. ${enc.ENCOMIENDISTA} - $${enc.COSTO_ENVIO}`,
      value: `encomiendista_${idx}`,
      extra: {
        foto: enc.FOTO_REFERENCIA,
        telefono: enc.TELEFONO_ENCOMIENDISTA,
        dia: enc.DIA_ENTREGA,
        hora: enc.HORA_ENTREGA,
        punto: enc.PUNTO_REFERENCIA
      }
    }));

    addMessage(`📦 Encontré ${encomiendistas.length} opciones de envío:`, 'bot', opciones);
  };

  const getFilteredCatalog = () => {
    if (selectedCategory === 'todos') return catalogo;
    return catalogo.filter(item => 
      (item.CATEGORIA || '').toLowerCase().includes(selectedCategory.toLowerCase())
    );
  };

  const handleCarouselNav = (direction) => {
    const filtered = getFilteredCatalog();
    if (direction === 'next') {
      setCarouselIndex((prev) => (prev + 1) % filtered.length);
    } else {
      setCarouselIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }
    setSelectedTalla('');
    setCantidad(1);
  };

  const agregarAlCarrito = () => {
    const filtered = getFilteredCatalog();
    const currentProduct = filtered[carouselIndex];
    
    if (!currentProduct) return;
    if (!selectedTalla && currentProduct.TALLAS_DISPONIBLES?.length > 0) {
      addMessage("⚠️ Por favor selecciona una talla", 'bot');
      return;
    }

    const precio = calcularPrecio(currentProduct, cantidad);
    const item = {
      CODIGO_INTERNO: currentProduct.CODIGO_INTERNO,
      CODIGO: currentProduct.CODIGO,
      CATEGORIA: currentProduct.CATEGORIA,
      DESCRIPCION: currentProduct.DESCRIPCION,
      TALLA: selectedTalla || currentProduct.TALLA_SIMPLE || 'N/A',
      COLOR: currentProduct.COLOR,
      CANTIDAD: cantidad,
      PRECIO_UNITARIO: currentProduct.PRECIO_UNIDAD,
      PRECIO_APLICADO: precio,
      DESCUENTO_POR_CANTIDAD: 0,
      SUBTOTAL_ITEM: precio * cantidad,
      FOTO: currentProduct.FOTO || ""
    };

    setSessionData(prev => ({
      ...prev,
      carrito: [...prev.carrito, item]
    }));

    addMessage(`✅ Agregado: ${item.DESCRIPCION} (${item.TALLA}) x${cantidad} = $${(precio * cantidad).toFixed(2)}`, 'bot');
    addMessage("¿Qué deseas hacer?", 'bot', [
      { label: "➕ Agregar más productos", value: "agregar_mas" },
      { label: "🛒 Ver mi carrito", value: "ver_carrito" },
      { label: "✅ Continuar con el pedido", value: "continuar_pedido" }
    ]);

    setSelectedTalla('');
    setCantidad(1);
  };

  const calcularPrecio = (producto, cant) => {
    if (cant >= 30) return producto.PRECIO_CAJA_MAYOR30 || producto.PRECIO_UNIDAD;
    if (cant >= 12) return producto.PRECIO_DOCENA || producto.PRECIO_UNIDAD;
    if (cant >= 6) return producto.PRECIO_MEDIADOCENA || producto.PRECIO_UNIDAD;
    if (cant >= 2) return producto.PRECIO_PAR || producto.PRECIO_UNIDAD;
    return producto.PRECIO_UNIDAD;
  };

  const mostrarCarrito = () => {
    if (sessionData.carrito.length === 0) {
      addMessage("🛒 Tu carrito está vacío", 'bot');
      return;
    }

    let texto = "🛒 *TU CARRITO:*\n\n";
    let subtotal = 0;
    
    sessionData.carrito.forEach((item, idx) => {
      texto += `${idx + 1}. ${item.DESCRIPCION}\n`;
      texto += `   Talla: ${item.TALLA} | Cant: ${item.CANTIDAD}\n`;
      texto += `   $${item.PRECIO_APLICADO} x ${item.CANTIDAD} = $${item.SUBTOTAL_ITEM.toFixed(2)}\n\n`;
      subtotal += item.SUBTOTAL_ITEM;
    });

    texto += `💰 *SUBTOTAL: $${subtotal.toFixed(2)}*`;
    addMessage(texto, 'bot');
  };

  const crearPedidoEnSheet = async () => {
    const subtotal = sessionData.carrito.reduce((sum, item) => sum + item.SUBTOTAL_ITEM, 0);
    const total = subtotal + sessionData.costo_envio;

    const pedido = {
      telefono: sessionData.telefono,
      nombre: sessionData.nombre,
      municipio: sessionData.municipio,
      direccion: sessionData.direccion,
      punto_referencia: sessionData.punto_referencia,
      metodo_pago: sessionData.metodo_pago,
      tipo_entrega: sessionData.tipo_entrega,
      encomiendista: sessionData.encomiendista,
      costo_envio: sessionData.costo_envio,
      subtotal: subtotal,
      descuento: 0,
      total: total,
      productos: sessionData.carrito
    };

    try {
      const response = await fetch(`${SCRIPT_URL}?route=crearPedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      });

      const data = await response.json();
      
      if (data.success) {
        addMessage(`✅ ¡Pedido #${data.factura} creado exitosamente!`, 'bot');
      }
      
      enviarWhatsApp(subtotal, total);
    } catch (error) {
      addMessage("⚠️ Enviando pedido por WhatsApp...", 'bot');
      enviarWhatsApp(subtotal, total);
    }
  };

  const enviarWhatsApp = (subtotal, total) => {
    let mensaje = `🛍️ *NUEVO PEDIDO - GyS Importadora*\n\n`;
    mensaje += `👤 *Cliente:* ${sessionData.nombre}\n`;
    mensaje += `📱 *Teléfono:* ${sessionData.telefono}\n\n`;
    
    mensaje += `📦 *PRODUCTOS:*\n`;
    sessionData.carrito.forEach((item, idx) => {
      mensaje += `${idx + 1}. ${item.DESCRIPCION} (${item.TALLA})\n`;
      mensaje += `   Cant: ${item.CANTIDAD} x $${item.PRECIO_APLICADO} = $${item.SUBTOTAL_ITEM.toFixed(2)}\n`;
    });
    
    mensaje += `\n💰 Subtotal: $${subtotal.toFixed(2)}\n`;
    mensaje += `🚚 Envío (${sessionData.tipo_entrega}): $${sessionData.costo_envio.toFixed(2)}\n`;
    mensaje += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;
    
    mensaje += `📍 *UBICACIÓN:*\n`;
    mensaje += `Departamento: ${sessionData.departamento}\n`;
    mensaje += `Municipio: ${sessionData.municipio}\n`;
    
    if (sessionData.tipo_entrega === 'PUNTO_FIJO') {
      mensaje += `\n🚚 *PUNTO FIJO - $3.50*\n`;
      mensaje += `📦 Punto de entrega: ${sessionData.punto_referencia}\n`;
    } else if (sessionData.tipo_entrega === 'PERSONALIZADO') {
      mensaje += `\n🚚 *ENVÍO PERSONALIZADO*\n`;
      mensaje += `🏠 Dirección: ${sessionData.direccion}\n`;
      mensaje += `📌 Referencia: ${sessionData.punto_referencia}\n`;
      mensaje += `🚛 Encomienda: ${sessionData.encomiendista_nombre}\n`;
      if (sessionData.dia_entrega) {
        mensaje += `📅 ${sessionData.dia_entrega} | ⏰ ${sessionData.hora_entrega}\n`;
      }
    }
    
    mensaje += `\n💳 *Pago:* ${sessionData.metodo_pago}\n\n`;
    mensaje += `✨ _Pedido desde chatbot automático_`;

    const url = `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(mensaje)}`;
    
    addMessage("Abriendo WhatsApp para confirmar tu pedido... 📱", 'bot');
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
  };

  const processMessage = async (userInput) => {
    addMessage(userInput, 'user');
    
    const input = userInput.toLowerCase().trim();
    const session = sessionData;

    // PASO: Nombre
    if (session.step === 'inicio') {
      const palabras = userInput.trim().split(/\s+/);
      if (palabras.length >= 2) {
        setSessionData(prev => ({ ...prev, nombre: userInput.trim(), step: 'telefono' }));
        addMessage(`Gracias ${userInput.trim()} 😊\n\nAhora, ¿cuál es tu número de teléfono?`, 'bot');
      } else {
        addMessage("Por favor, necesito tu nombre completo (nombre y apellido) 😊", 'bot');
      }
      return;
    }

    // PASO: Teléfono
    if (session.step === 'telefono') {
      const telefono = userInput.replace(/[^0-9]/g, '');
      if (telefono.length >= 8) {
        setSessionData(prev => ({ ...prev, telefono: telefono, step: 'menu' }));
        addMessage("Perfecto 📱 ¿Qué deseas hacer?", 'bot', [
          { label: "🛍️ Ver catálogo", value: "catalogo" },
          { label: "👤 Hablar con agente", value: "agente" }
        ]);
      } else {
        addMessage("Por favor, ingresa un número de teléfono válido (8 dígitos)", 'bot');
      }
      return;
    }

    // Ver catálogo
    if (input === 'catalogo') {
      setShowCarousel(true);
      setCarouselIndex(0);
      cargarCatalogo(selectedCategory);
      return;
    }

    // Hablar con agente
    if (input === 'agente') {
      const msg = `Hola, soy ${session.nombre} y necesito ayuda con un pedido`;
      const url = `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(msg)}`;
      addMessage("Conectándote con un asesor... 👋", 'bot');
      setTimeout(() => window.open(url, '_blank'), 1000);
      return;
    }

    if (input === 'agregar_mas') {
      setShowCarousel(true);
      return;
    }

    if (input === 'ver_carrito') {
      mostrarCarrito();
      return;
    }

    // NUEVO: Continuar con pedido según cantidad
    if (input === 'continuar_pedido') {
      if (session.carrito.length === 0) {
        addMessage("⚠️ Tu carrito está vacío. Agrega productos primero.", 'bot');
        return;
      }
      
      setShowCarousel(false);
      const totalProductos = session.carrito.reduce((sum, item) => sum + item.CANTIDAD, 0);

      if (totalProductos >= 3) {
        // 3+ productos: Solo PERSONALIZADO
        setSessionData(prev => ({ ...prev, tipo_entrega: 'PERSONALIZADO', step: 'departamento' }));
        addMessage("📦 Tienes 3 o más productos.\n\n🚚 Envío PERSONALIZADO\n\n📍 ¿De qué departamento eres?", 'bot', 
          Object.keys(DEPARTAMENTOS_MUNICIPIOS).map(dep => ({
            label: dep,
            value: `dep_${dep}`
          }))
        );
      } else {
        // 1-2 productos: Elegir tipo de envío
        setSessionData(prev => ({ ...prev, step: 'tipo_envio' }));
        addMessage("¿Cómo deseas recibir tu pedido?", 'bot', [
          { label: "🚚 Envío PERSONALIZADO (a tu dirección)", value: "personalizado" },
          { label: "📍 PUNTO FIJO ($3.50)", value: "punto_fijo" }
        ]);
      }
      return;
    }

    // Elegir PERSONALIZADO
    if (input === 'personalizado') {
      setSessionData(prev => ({ ...prev, tipo_entrega: 'PERSONALIZADO', step: 'departamento' }));
      addMessage("📍 ¿De qué departamento eres?", 'bot',
        Object.keys(DEPARTAMENTOS_MUNICIPIOS).map(dep => ({
          label: dep,
          value: `dep_${dep}`
        }))
      );
      return;
    }

    // Elegir PUNTO FIJO
    if (input === 'punto_fijo') {
      setSessionData(prev => ({ 
        ...prev, 
        tipo_entrega: 'PUNTO_FIJO',
        costo_envio: 3.50,
        step: 'departamento_punto_fijo'
      }));
      addMessage("📍 PUNTO FIJO - $3.50\n\n¿De qué departamento eres?", 'bot',
        Object.keys(DEPARTAMENTOS_MUNICIPIOS).map(dep => ({
          label: dep,
          value: `dep_pf_${dep}`
        }))
      );
      return;
    }

    // Seleccionar departamento (PERSONALIZADO)
    if (input.startsWith('dep_') && !input.startsWith('dep_pf_')) {
      const departamento = input.replace('dep_', '');
      const municipios = DEPARTAMENTOS_MUNICIPIOS[departamento] || [];
      
      setSessionData(prev => ({ ...prev, departamento: departamento, step: 'municipio' }));
      addMessage(`Seleccionaste: ${departamento} 📍\n\n¿De qué municipio?`, 'bot',
        municipios.map(muni => ({
          label: muni,
          value: `muni_${muni}`
        }))
      );
      return;
    }

    // Seleccionar departamento (PUNTO FIJO)
    if (input.startsWith('dep_pf_')) {
      const departamento = input.replace('dep_pf_', '');
      const municipios = DEPARTAMENTOS_MUNICIPIOS[departamento] || [];
      
      setSessionData(prev => ({ ...prev, departamento: departamento, step: 'municipio_punto_fijo' }));
      addMessage(`Seleccionaste: ${departamento} 📍\n\n¿De qué municipio?`, 'bot',
        municipios.map(muni => ({
          label: muni,
          value: `muni_pf_${muni}`
        }))
      );
      return;
    }

    // Seleccionar municipio (PERSONALIZADO)
    if (input.startsWith('muni_') && !input.startsWith('muni_pf_')) {
      const municipio = input.replace('muni_', '');
      setSessionData(prev => ({ ...prev, municipio: municipio, step: 'buscando_encomiendistas' }));
      
      addMessage(`Buscando opciones en ${municipio}... 🔍`, 'bot');
      
      const hayEncomiendas = await cargarEncomiendistas(municipio, 'PERSONALIZADO');
      
      if (hayEncomiendas) {
        setSessionData(prev => ({ ...prev, step: 'seleccionar_encomiendista' }));
        mostrarEncomiendistasConFoto();
      } else {
        addMessage(`⚠️ No encontré encomiendistas para ${municipio}\n\n¿Deseas contactar un agente?`, 'bot', [
          { label: "📞 Contactar agente", value: "agente" },
          { label: "🔙 Cambiar municipio", value: "cambiar_municipio" }
        ]);
      }
      return;
    }

    // Seleccionar municipio (PUNTO FIJO)
    if (input.startsWith('muni_pf_')) {
      const municipio = input.replace('muni_pf_', '');
      setSessionData(prev => ({ 
        ...prev, 
        municipio: municipio, 
        tipo_entrega: 'PUNTO_FIJO',
        costo_envio: 3.50,
        step: 'direccion_punto_fijo' 
      }));
      
      addMessage(`📍 ${municipio} - PUNTO FIJO\n💵 Costo: $3.50\n\n¿Cuál es tu punto de entrega? (Ejemplo: Gasolinera Shell, Tienda La Económica, etc.)`, 'bot');
      return;
    }

    // Cambiar a personalizado (desde inicio si no hay cobertura)
    if (input === 'cambiar_a_personalizado') {
      setSessionData(prev => ({ ...prev, tipo_entrega: 'PERSONALIZADO', step: 'departamento' }));
      addMessage("📍 ¿De qué departamento eres?", 'bot',
        Object.keys(DEPARTAMENTOS_MUNICIPIOS).map(dep => ({
          label: dep,
          value: `dep_${dep}`
        }))
      );
      return;
    }

    if (input === 'cambiar_municipio') {
      setSessionData(prev => ({ ...prev, step: 'municipio' }));
      const municipios = DEPARTAMENTOS_MUNICIPIOS[session.departamento] || [];
      addMessage("¿De qué municipio?", 'bot',
        municipios.map(muni => ({
          label: muni,
          value: `muni_${muni}`
        }))
      );
      return;
    }

    // Seleccionar encomiendista
    if (input.startsWith('encomiendista_')) {
      const idx = parseInt(input.split('_')[1]);
      const encomiendista = encomiendistas[idx];
      
      if (encomiendista) {
        setSessionData(prev => ({ 
          ...prev, 
          encomiendista: encomiendista.ID_ENCOMENDISTA,
          encomiendista_nombre: encomiendista.ENCOMIENDISTA,
          encomiendista_telefono: encomiendista.TELEFONO_ENCOMIENDISTA,
          costo_envio: session.tipo_entrega === 'PUNTO_FIJO' ? 3.50 : encomiendista.COSTO_ENVIO,
          dia_entrega: encomiendista.DIA_ENTREGA || '',
          hora_entrega: encomiendista.HORA_ENTREGA || '',
          punto_referencia: encomiendista.PUNTO_REFERENCIA || '',
          step: session.tipo_entrega === 'PUNTO_FIJO' ? 'metodo_pago' : 'direccion'
        }));
        
        if (session.tipo_entrega === 'PUNTO_FIJO') {
          addMessage(`✅ Punto fijo: ${encomiendista.ENCOMIENDISTA}\n📍 ${encomiendista.PUNTO_REFERENCIA}\n💵 Costo: $3.50\n\n¿Cómo deseas pagar?`, 'bot', [
            { label: "💵 Contra entrega", value: "contra_entrega" },
            { label: "💳 Transferencia", value: "transferencia" }
          ]);
        } else {
          addMessage(`✅ Encomienda: ${encomiendista.ENCOMIENDISTA}\n💵 Costo: $${encomiendista.COSTO_ENVIO}\n\n¿Cuál es tu dirección completa?`, 'bot');
        }
      }
      return;
    }

    // Dirección de PUNTO FIJO
    if (session.step === 'direccion_punto_fijo') {
      setSessionData(prev => ({ 
        ...prev, 
        punto_referencia: userInput.trim(),
        direccion: userInput.trim(),
        encomiendista: 'PUNTO_FIJO',
        encomiendista_nombre: 'Punto Fijo',
        step: 'metodo_pago'
      }));
      
      addMessage(`✅ Punto de entrega: ${userInput.trim()}\n💵 Costo: $3.50\n\n¿Cómo deseas pagar?`, 'bot', [
        { label: "💵 Contra entrega", value: "contra_entrega" },
        { label: "💳 Transferencia", value: "transferencia" }
      ]);
      return;
    }

    // Dirección (PERSONALIZADO)
    if (session.step === 'direccion') {
      setSessionData(prev => ({ ...prev, direccion: userInput.trim(), step: 'referencia' }));
      addMessage("Perfecto 🏠\n\n¿Algún punto de referencia?", 'bot');
      return;
    }

    // Punto de referencia
    if (session.step === 'referencia') {
      setSessionData(prev => ({ 
        ...prev, 
        punto_referencia: userInput.trim(),
        step: 'metodo_pago'
      }));
      addMessage(`Gracias 📌\n\n¿Cómo deseas pagar?`, 'bot', [
        { label: "💵 Contra entrega", value: "contra_entrega" },
        { label: "💳 Transferencia", value: "transferencia" }
      ]);
      return;
    }

    // Método de pago
    if (input === 'contra_entrega') {
      setSessionData(prev => ({ ...prev, metodo_pago: 'Contra entrega', step: 'confirmar' }));
      mostrarResumen();
      return;
    }

    if (input === 'transferencia') {
      setSessionData(prev => ({ ...prev, metodo_pago: 'Transferencia', step: 'confirmar' }));
      mostrarResumen();
      return;
    }

    if (input === 'confirmar_pedido') {
      crearPedidoEnSheet();
      return;
    }

    addMessage("No entendí esa opción 😅 Usa los botones disponibles.", 'bot');
  };

  const mostrarResumen = () => {
    const subtotal = sessionData.carrito.reduce((sum, item) => sum + item.SUBTOTAL_ITEM, 0);
    const total = subtotal + sessionData.costo_envio;

    let resumen = `📋 *RESUMEN DE TU PEDIDO*\n\n`;
    resumen += `👤 ${sessionData.nombre}\n`;
    resumen += `📱 ${sessionData.telefono}\n\n`;
    
    resumen += `📦 *Productos (${sessionData.carrito.length}):*\n`;
    sessionData.carrito.forEach((item, idx) => {
      resumen += `${idx + 1}. ${item.DESCRIPCION} (${item.TALLA}) x${item.CANTIDAD}\n`;
    });
    
    resumen += `\n💰 Subtotal: $${subtotal.toFixed(2)}\n`;
    resumen += `🚚 Envío (${sessionData.tipo_entrega}): $${sessionData.costo_envio.toFixed(2)}\n`;
    resumen += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;
    
    resumen += `📍 ${sessionData.departamento} - ${sessionData.municipio}\n`;
    
    if (sessionData.tipo_entrega === 'PUNTO_FIJO') {
      resumen += `📦 Punto de entrega: ${sessionData.punto_referencia}\n`;
    } else if (sessionData.tipo_entrega === 'PERSONALIZADO') {
      resumen += `🏠 ${sessionData.direccion}\n`;
      resumen += `📌 ${sessionData.punto_referencia}\n`;
      resumen += `🚛 ${sessionData.encomiendista_nombre}\n`;
      if (sessionData.dia_entrega) {
        resumen += `📅 ${sessionData.dia_entrega} | ⏰ ${sessionData.hora_entrega}\n`;
      }
    }
    
    resumen += `💳 ${sessionData.metodo_pago}\n\n`;
    resumen += `¿Todo correcto?`;

    addMessage(resumen, 'bot', [
      { label: "✅ Confirmar pedido", value: "confirmar_pedido" },
      { label: "❌ Cancelar", value: "cancelar" }
    ]);
  };

  const handleSend = () => {
    if (input.trim()) {
      processMessage(input);
      setInput('');
    }
  };

  const handleOptionClick = (value) => {
    processMessage(value);
  };

  const filtered = getFilteredCatalog();
  const currentProduct = filtered[carouselIndex];

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

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'} rounded-2xl px-4 py-3 shadow-md`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.options && (
                <div className="flex flex-col gap-2 mt-3">
                  {msg.options.map((opt, i) => (
                    <div key={i}>
                      <button
                        onClick={() => handleOptionClick(opt.value)}
                        className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-purple-600 transition-all text-sm font-medium"
                      >
                        {opt.label}
                      </button>
                      {opt.extra?.foto && (
                        <img 
                          src={opt.extra.foto} 
                          alt={opt.label}
                          className="w-full h-32 object-cover rounded-lg mt-2"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      {opt.extra?.punto && (
                        <p className="text-xs text-gray-600 mt-1">📍 {opt.extra.punto}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

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
                <option value="pantalones">Pantalones</option>
                <option value="blusas">Blusas</option>
                <option value="zapatos">Zapatos</option>
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
                    let url = currentProduct?.FOTO || currentProduct?.["FOTO LINK"] || 'https://via.placeholder.com/300';
                    if (url.includes('drive.google.com/uc?export=view')) {
                      const id = url.split('id=')[1];
                      url = `https://drive.google.com/thumbnail?id=${id}&sz=w500`;
                    }
                    return url;
                  })()}
                  alt={currentProduct.DESCRIPCION}
                  className="w-full h-64 object-cover rounded-lg mb-3"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=Sin+Imagen'}
                />
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg capitalize">{currentProduct.DESCRIPCION}</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Color: {currentProduct.COLOR}</span>
                    <span className="font-bold text-purple-600 text-lg">${currentProduct.PRECIO_UNIDAD}</span>
                  </div>
                  
                  {currentProduct.TALLAS_DISPONIBLES && currentProduct.TALLAS_DISPONIBLES.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Talla:</label>
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
                    <label className="block text-sm font-medium mb-2">Cantidad:</label>
                    <input
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
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
                  onClick={() => handleCarouselNav('prev')}
                  className="absolute left-2 top-28 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleCarouselNav('next')}
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
        
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500"
          />
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
