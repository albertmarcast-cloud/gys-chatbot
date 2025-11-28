import React, { useState, useEffect, useRef } from 'react';
import { Send, ShoppingBag, Package, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyOHi4qZyxwvdGy826isCABC7JQqeEGvZ8kFT9FzbVi_s5NYKFkHZFVrtoQB6r9NpM/exec";
const WHATSAPP_NEGOCIO = "50375936319";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [catalogo, setCatalogo] = useState([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [sessionData, setSessionData] = useState({
    step: 'inicio',
    nombre: '',
    telefono: '',
    carrito: [],
    municipio: '',
    direccion: '',
    punto_referencia: '',
    tipo_entrega: '',
    metodo_pago: '',
    encomiendista: '',
    costo_envio: 0
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
      FOTO: currentProduct["FOTO_LINK"] || currentProduct.FOTO || currentProduct["FOTO  PRODUCTO"] || ""
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
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      });

      addMessage(`✅ ¡Pedido enviado exitosamente!`, 'bot');
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
    mensaje += `🚚 Envío: $${sessionData.costo_envio.toFixed(2)}\n`;
    mensaje += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;
    
    mensaje += `🚚 *ENTREGA:* ${sessionData.tipo_entrega}\n`;
    if (sessionData.tipo_entrega !== 'TIENDA') {
      mensaje += `📍 ${sessionData.municipio}\n`;
      mensaje += `🏠 ${sessionData.direccion}\n`;
      mensaje += `📌 ${sessionData.punto_referencia}\n`;
    }
    mensaje += `💳 *Pago:* ${sessionData.metodo_pago}\n\n`;
    mensaje += `✨ _Pedido desde chatbot automático_`;

    const url = `https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(mensaje)}`;
    
    addMessage("Abriendo WhatsApp para confirmar tu pedido... 📱", 'bot');
    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
  };

  const processMessage = (userInput) => {
    addMessage(userInput, 'user');
    
    const input = userInput.toLowerCase().trim();
    const session = sessionData;

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

    if (input === 'catalogo') {
      setShowCarousel(true);
      setCarouselIndex(0);
      cargarCatalogo(selectedCategory);
      return;
    }

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

    if (input === 'continuar_pedido') {
      if (session.carrito.length === 0) {
        addMessage("⚠️ Tu carrito está vacío. Agrega productos primero.", 'bot');
        return;
      }
      setShowCarousel(false);
      setSessionData(prev => ({ ...prev, step: 'tipo_entrega' }));
      addMessage("¿Cómo deseas recibir tu pedido?", 'bot', [
        { label: "🚚 Envío a domicilio", value: "envio" },
        { label: "🏪 Retiro en tienda", value: "retiro" }
      ]);
      return;
    }

    if (input === 'envio') {
      setSessionData(prev => ({ ...prev, tipo_entrega: 'DOMICILIO', step: 'municipio' }));
      addMessage("Perfecto 🚚\n\n¿En qué municipio te encuentras?", 'bot');
      return;
    }

    if (input === 'retiro') {
      setSessionData(prev => ({ 
        ...prev, 
        tipo_entrega: 'TIENDA',
        municipio: 'San Salvador',
        direccion: 'Centro Histórico',
        punto_referencia: 'Retiro en tienda',
        costo_envio: 0,
        step: 'metodo_pago'
      }));
      addMessage("¡Excelente! 🏪\n\n📍 Tienda: Centro Histórico, San Salvador\n⏰ Lun-Sáb 9AM-6PM\n\n¿Cómo deseas pagar?", 'bot', [
        { label: "💵 Efectivo en tienda", value: "efectivo_tienda" },
        { label: "💳 Transferencia", value: "transferencia" }
      ]);
      return;
    }

    if (session.step === 'municipio') {
      setSessionData(prev => ({ ...prev, municipio: userInput.trim(), step: 'direccion' }));
      addMessage(`Entendido, ${userInput.trim()} 📍\n\n¿Cuál es tu dirección completa?`, 'bot');
      return;
    }

    if (session.step === 'direccion') {
      setSessionData(prev => ({ ...prev, direccion: userInput.trim(), step: 'referencia' }));
      addMessage("Perfecto 🏠\n\n¿Algún punto de referencia? (Ejemplo: frente a gasolinera Shell)", 'bot');
      return;
    }

    if (session.step === 'referencia') {
      setSessionData(prev => ({ 
        ...prev, 
        punto_referencia: userInput.trim(),
        costo_envio: 3.50,
        step: 'metodo_pago'
      }));
      addMessage("Gracias 📌\n\nCosto de envío: $3.50\n\n¿Cómo deseas pagar?", 'bot', [
        { label: "💵 Contra entrega", value: "contra_entrega" },
        { label: "💳 Transferencia", value: "transferencia" }
      ]);
      return;
    }

    if (input === 'contra_entrega' || input === 'efectivo_tienda') {
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
    resumen += `🚚 Envío: $${sessionData.costo_envio.toFixed(2)}\n`;
    resumen += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;
    
    resumen += `🚚 ${sessionData.tipo_entrega}\n`;
    if (sessionData.tipo_entrega !== 'TIENDA') {
      resumen += `📍 ${sessionData.municipio}\n${sessionData.direccion}\n`;
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
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt.value)}
                      className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-purple-600 transition-all text-sm font-medium"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
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
                  src={currentProduct.FOTO || 'https://via.placeholder.com/300'}
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
