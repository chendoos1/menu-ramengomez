// 1. Base de datos de nuestros platillos en un Objeto estructurado
const menuRamen = {
    platillo1: {
        id: "1",
        nombre: "Tonkotsu Ramen",
        precioBase: 160,
        inventario: true,
        diaPromocion: "Monday",
        descuento: 0.15, // 15% OFF
        textoPromo: "Promo de Lunes: 15% OFF"
    },
    platillo2: {
        id: "2",
        nombre: "Miso Ramen",
        precioBase: 170,
        inventario: false, // ¡Simulemos que este se agotó en cocina!
        diaPromocion: "Wednesday", // Su promo será los miércoles
        descuento: 0.10, // 10% OFF
        textoPromo: "Miércoles de Miso: 10% OFF"
    }
};

// 2. Función inteligente para procesar y renderizar cada platillo de forma independiente
function aplicarLogicaMenu(datosPlatillo) {
    // Obtenemos los elementos visuales usando el ID único de cada uno
    const tarjeta = document.getElementById(`platillo-${datosPlatillo.id}`);
    const etiquetaEstado = document.getElementById(`status-${datosPlatillo.id}`);
    const etiquetaPrecio = tarjeta.querySelector(".price");

    // A) Si el inventario está en false, lo marcamos como AGOTADO de inmediato
    if (datosPlatillo.inventario === false) {
        etiquetaEstado.innerText = "🔴 Agotado por hoy";
        etiquetaEstado.style.backgroundColor = "#c0392b";
        tarjeta.style.opacity = "0.5";
        return; // Detiene el código aquí para este platillo
    }

    // B) Si está disponible, revisamos las promociones por día de la semana
    const diasSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const hoyEnLetras = diasSemana[new Date().getDay()]; // Detecta el día actual del sistema

    if (hoyEnLetras === datosPlatillo.diaPromocion) {
        // Hacemos el cálculo matemático del descuento asignado
        const precioFinal = datosPlatillo.precioBase * (1 - datosPlatillo.descuento);
        
        // Renderizamos los dos precios (el tachado y el dorado con descuento)
        etiquetaPrecio.innerHTML = `<span style="text-decoration: line-through; color: #aaa; font-size: 0.9rem; margin-right: 5px;">$${datosPlatillo.precioBase}</span> $${precioFinal}`;
        
        etiquetaEstado.innerText = `🟢 ${datosPlatillo.textoPromo}`;
        etiquetaEstado.style.backgroundColor = "#d35400"; // Naranja de promoción
    } else {
        // Si no es su día de promo, muestra el precio normal limpio
        etiquetaPrecio.innerText = `$${datosPlatillo.precioBase}`;
    }
}

// 3. Ejecutamos la función mágica para cada uno de nuestros platillos
aplicarLogicaMenu(menuRamen.platillo1);
aplicarLogicaMenu(menuRamen.platillo2);

// 4. Lógica para el botón de WhatsApp (Pedir la cuenta)
const numeroTelefono = "527225452036"; // 👈 REEMPLAZA AQUÍ: Pon tu número con código de país (ej. 52 para México) sin espacios ni el signo +
const numeroMesa = "Mesa 5"; // 👈 Aquí simularíamos el identificador de la mesa

const botonCuenta = document.getElementById("btn-cuenta");

// Creamos el texto automático que le llegará al dueño del restaurante
const mensajeWhatsApp = encodeURIComponent(`%2C%20ya%20tengo%20mi%20orden!%0AQuiero%20lo%20siguiente%3A 🍜💳`);

// Construimos el enlace oficial de la API de WhatsApp


botonCuenta.href ='https://api.whatsapp.com/send?phone=' + numeroTelefono + '&text=' + mensajeWhatsApp;



