// ========================================
// CONFIGURACIÓN DE LA FECHA DEL EVENTO
// ======================================== 
// IMPORTANTE: Cambia esta fecha según tu evento
const eventDate = new Date('2026-01-17T19:00:00'); // 17 de enero de 2026, 7:00 PM

// ========================================
// CUENTA REGRESIVA
// ========================================
function updateCountdown() {
    const now = new Date();
    const difference = eventDate - now;

    if (difference > 0) {
        // Calcular días, horas, minutos y segundos
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Actualizar el DOM
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        // Si la fecha ya pasó
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
    }
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);
// Llamar inmediatamente al cargar
updateCountdown();

// ========================================
// NAVEGACIÓN SUAVE
// ========================================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        // Cerrar menú móvil si está abierto
        closeMobileMenu();
    }
}

// ========================================
// MENÚ MÓVIL
// ========================================
function toggleMenu() {
    const navMobile = document.getElementById('nav-mobile');
    const menuIcon = document.getElementById('menu-icon');
    
    if (navMobile.classList.contains('hidden')) {
        navMobile.classList.remove('hidden');
        menuIcon.textContent = '✕';
    } else {
        navMobile.classList.add('hidden');
        menuIcon.textContent = '☰';
    }
}

function closeMobileMenu() {
    const navMobile = document.getElementById('nav-mobile');
    const menuIcon = document.getElementById('menu-icon');
    navMobile.classList.add('hidden');
    menuIcon.textContent = '☰';
}

// ========================================
// CONFIGURACIÓN DE WHATSAPP
// ========================================
// IMPORTANTE: Cambia este número por el tuyo (incluye código de país sin + ni espacios)
// Ejemplo Colombia: 573001234567
// Ejemplo México: 525512345678
const WHATSAPP_NUMBER = '573215142158'; // REEMPLAZA CON TU NÚMERO

// ========================================
// FORMULARIO DE CONFIRMACIÓN - ENVÍO A WHATSAPP
// ========================================
function submitForm() {
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const attending = document.querySelector('input[name="attending"]:checked').value;
    const message = document.getElementById('message').value;

    // Validar que el nombre no esté vacío
    if (!name.trim()) {
        alert('Por favor, escribe tu nombre.');
        return;
    }

    // Crear mensaje para WhatsApp
    const attendingText = attending === 'si' ? 'SÍ asistiré ✅' : 'NO podré asistir ❌';
    
    let whatsappMessage = `🎉 *CONFIRMACIÓN DE ASISTENCIA* 🎉\n\n`;
    whatsappMessage += `👤 *Nombre:* ${name}\n`;
    whatsappMessage += `📋 *Asistencia:* ${attendingText}\n`;
    
    if (message.trim()) {
        whatsappMessage += `💌 *Mensaje:* ${message}\n`;
    }
    
    whatsappMessage += `\n_Confirmación para Mis 15 Años - María Paulina_`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
    
    // Mostrar mensaje de éxito
    showSuccessMessage();
    
    // Log para verificar (puedes eliminarlo en producción)
    console.log('Confirmación enviada a WhatsApp:', {
        name: name,
        attending: attending,
        message: message
    });
}

function showSuccessMessage() {
    // Ocultar formulario
    document.getElementById('form-container').classList.add('hidden');
    
    // Mostrar mensaje de éxito
    document.getElementById('success-message').classList.remove('hidden');
    
    // Opcional: Resetear formulario después de 4 segundos
    setTimeout(() => {
        document.getElementById('form-container').classList.remove('hidden');
        document.getElementById('success-message').classList.add('hidden');
        
        // Limpiar campos
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
        document.querySelector('input[name="attending"][value="si"]').checked = true;
    }, 4000);
}

// ========================================
// EFECTOS AL HACER SCROLL
// ========================================
// Detectar cuando los elementos entran en la pantalla
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observar todas las secciones con animación
window.addEventListener('DOMContentLoaded', () => {
    const animatedSections = document.querySelectorAll('.fade-in');
    animatedSections.forEach(section => {
        observer.observe(section);
    });
});

// ========================================
// CAMBIO DE ESTILO DEL HEADER AL SCROLL
// ========================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Agregar sombra más pronunciada cuando se hace scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========================================
// CERRAR MENÚ AL HACER CLICK FUERA
// ========================================
document.addEventListener('click', (event) => {
    const navMobile = document.getElementById('nav-mobile');
    const menuToggle = document.querySelector('.menu-toggle');
    
    // Si el menú está abierto y el click no fue en el menú ni en el botón
    if (!navMobile.classList.contains('hidden') && 
        !navMobile.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        closeMobileMenu();
    }
});

// ========================================
// PREVENIR COMPORTAMIENTO POR DEFECTO
// ========================================
// Prevenir el envío tradicional del formulario si usas Formspree
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            submitForm();
        });
    }
});

// ========================================
// CONSOLE LOG (Opcional - para desarrollo)
// ========================================
console.log('🎉 Invitación de 15 Años - María Paulina');
console.log('📅 Fecha del evento:', eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
}));


// Musica 

function activarMusica() {
    const musica = document.getElementById('musicaFondo');
    const boton = document.getElementById('btnMusica');

    if (musica.paused) {
        musica.play();
        boton.classList.add('activo');
    } else {
        musica.pause();
        boton.classList.remove('activo');
    }
}
