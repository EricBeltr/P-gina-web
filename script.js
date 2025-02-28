// Elementos HTML
const chat = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Memoria del bot
let botMemory = JSON.parse(localStorage.getItem('botMemory')) || {};
let history = JSON.parse(localStorage.getItem('history')) || [];

// Función para mostrar los mensajes
function showMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `${sender}: ${message}`;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

// Función para guardar la memoria en el almacenamiento local
function saveMemory() {
    localStorage.setItem('botMemory', JSON.stringify(botMemory));
    localStorage.setItem('history', JSON.stringify(history));
}

// Función para aprender y almacenar datos
function learn(input) {
    // Detecta el nombre
    if (input.toLowerCase().includes("mi nombre es")) {
        let name = input.split("mi nombre es")[1].trim();
        botMemory["nombre"] = name;
        return `Encantado de conocerte, ${name}. ¿Cómo te puedo ayudar hoy?`;
    }

    // Detecta la edad
    else if (input.toLowerCase().includes("mi edad es")) {
        let age = input.split("mi edad es")[1].trim();
        botMemory["edad"] = age;
        return `¡Qué interesante! Tienes ${age} años. ¿Te gustaría aprender algo nuevo hoy?`;
    }

    // Detecta el día de la semana
    else if (input.toLowerCase().includes("qué día es hoy")) {
        const today = new Date();
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return `Hoy es ${days[today.getDay()]}.`;
    }

    // Responde el mes actual
    else if (input.toLowerCase().includes("qué mes estamos")) {
        const today = new Date();
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return `Estamos en el mes de ${months[today.getMonth()]}.`;
    }

    // Responde el año actual
    else if (input.toLowerCase().includes("qué año es este")) {
        const today = new Date();
        return `Este es el año ${today.getFullYear()}.`;
    }

    // Responde si le pides qué día será mañana
    else if (input.toLowerCase().includes("qué día será mañana")) {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return `Mañana será ${days[today.getDay()]}.`;
    }

    // Responde si le preguntas sobre meses
    else if (input.toLowerCase().includes("cuáles son los meses del año")) {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return `Los meses del año son: ${months.join(", ")}.`;
    }

    return null;
}

// Función para obtener la respuesta del bot
function getBotResponse(input) {
    input = input.toLowerCase();
    let response = "";

    // Intentamos aprender de lo que se ha dicho
    let learnResponse = learn(input);
    if (learnResponse) {
        response = learnResponse;
    }

    // Si no hay respuesta aprendida, usamos una predeterminada
    else if (input.includes("hola")) {
        response = `¡Hola! ¿Cómo te llamas?`;
    } else if (input.includes("adiós")) {
        response = `¡Adiós! Espero que hablemos pronto.`;
    } else {
        response = "Lo siento, no entiendo esa pregunta. ¿Puedes intentar de nuevo?";
    }

    return response;
}

// Función para manejar la entrada del usuario
sendBtn.addEventListener("click", function() {
    const userText = userInput.value;
    if (userText.trim() !== "") {
        // Mostrar mensaje del usuario
        showMessage(userText, "Tú");
        
        // Guardamos lo que se dijo para memoria futura
        history.push(userText);
        
        // Obtener respuesta del bot
        const botResponse = getBotResponse(userText);
        
        // Mostrar respuesta del bot
        showMessage(botResponse, "Bot");
        
        // Limpiar entrada del usuario
        userInput.value = "";
        
        // Guardamos el historial y la memoria
        saveMemory();
    }
});

// Permitir enviar mensaje con la tecla Enter
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});

// Mostrar mensaje de bienvenida
if (!history.length) {
    showMessage("¡Hola! Soy tu asistente personal. ¿Cómo te llamas?", "Bot");
}