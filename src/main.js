const MAX_PUNTUACION = 7.5;
let puntuacionActual = 0;
let gameOver = false;
let simulacionUsada = false; // Variable para controlar el uso de simulación

// Listado de cartas y sus valores
const cartas = [
  {
    value: 1,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg",
  },
  {
    value: 2,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg",
  },
  {
    value: 3,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg",
  },
  {
    value: 4,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg",
  },
  {
    value: 5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg",
  },
  {
    value: 6,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg",
  },
  {
    value: 7,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg",
  },
  {
    value: 0.5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg",
  },
  {
    value: 0.5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg",
  },
  {
    value: 0.5,
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg",
  },
];

// DOM elements
const scoreElement = document.getElementById("puntuacion");
const cardImage = document.getElementById("img-cartas");
const messageElement = document.getElementById("mensaje");
const btnPedir = document.getElementById("btn-pedir");
const btnPlantarse = document.getElementById("btn-plantarse");
const btnNuevaPartida = document.getElementById("btn-nueva-partida");
const btnVerQuePasaba = document.getElementById("btn-ver-que-pasaba");

// Función para generar una carta aleatoria
const dameCarta = () => cartas[Math.floor(Math.random() * cartas.length)];

// Mostrar mensaje
const mostrarMensaje = (mensaje, color = "#ff0000") => {
  messageElement.style.color = color;
  messageElement.textContent = mensaje;
};

// Actualizar puntuación
const actualizarPuntuacion = (valor) => {
  puntuacionActual += valor;
  scoreElement.textContent = puntuacionActual.toFixed(1);
};

// Mostrar carta
const mostrarCarta = (carta) => {
  cardImage.src = carta.img;
};

// Comenzar nueva partida
const nuevaPartida = () => {
  puntuacionActual = 0;
  gameOver = false;
  simulacionUsada = false; //Reinicia el estado de la simulación
  btnPedir.disabled = false;
  btnPlantarse.disabled = false;
  btnNuevaPartida.hidden = true;
  btnVerQuePasaba.hidden = true;
  mostrarCarta({
    img: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg",
  });
  actualizarPuntuacion(0);
  mostrarMensaje("¡Nueva partida! ¡Buena suerte!", "#000");
};

// Manejo del botón "Pedir Carta"
btnPedir.addEventListener("click", () => {
  if (gameOver) return;

  const carta = dameCarta();
  mostrarCarta(carta);
  actualizarPuntuacion(carta.value);

  if (puntuacionActual > MAX_PUNTUACION) {
    mostrarMensaje("¡Game Over! Te has pasado de 7.5 puntos.");
    btnPedir.disabled = true;
    btnPlantarse.disabled = true;
    btnNuevaPartida.hidden = false;
    gameOver = true;
  }
});

// Manejo del botón "Plantarse"
btnPlantarse.addEventListener("click", () => {
  if (gameOver) return;

  let mensaje = "";
  switch (true) {
    case puntuacionActual < 4:
      mensaje = "Has sido muy conservador.";
      break;
    case puntuacionActual === 5:
      mensaje = "Te ha entrado el canguelo, ¿eh?";
      break;
    case puntuacionActual < 7.5:
      mensaje = "Casi, casi...";
      break;
    case puntuacionActual === 7.5:
      mensaje = "¡Lo has clavado! ¡Enhorabuena!";
      break;
  }

  mostrarMensaje(mensaje, "#007bff");
  btnPedir.disabled = true;
  btnPlantarse.disabled = true;
  btnNuevaPartida.hidden = false;
  if (!simulacionUsada) {
    btnVerQuePasaba.hidden = false;
  }
  gameOver = true;
});

// Función para mostrar qué habría pasado
const verQueHabriaPasado = () => {
  const carta = dameCarta(); // Obtener una carta aleatoria
  mostrarCarta(carta); // Mostrar la carta
  actualizarPuntuacion(carta.value); // Actualizar puntuación visual

  if (puntuacionActual > MAX_PUNTUACION) {
    mostrarMensaje("Te has pasado. ¡Ahora lo sabes!", "#800080");
    btnPedir.disabled = true; // Deshabilitar el botón "Pedir Carta"
    btnPlantarse.disabled = true; // Deshabilitar "Plantarse" si el jugador se pasa
    btnVerQuePasaba.hidden = true; // Ocultar botón tras pasarse
    simulacionUsada = true; //Confirma que ya se usó la simulación
  } else {
    mostrarMensaje(
      `Has sacado una carta de simulación. Puedes seguir pidiendo o plantarte.`,
      "#007bff"
    );
    btnPedir.disabled = false; // Rehabilitar el botón "Pedir Carta"
    btnPlantarse.disabled = false; // Mantener habilitado "Plantarse"
    gameOver = false; //Así el juego no terminaa tfas la simulación
  }
};

// Manejo del botón "Ver qué habría pasado"
btnVerQuePasaba.addEventListener("click", () => {
  if (simulacionUsada) return; //Evita aque se use más de una vez
  simulacionUsada = true; //Registra que ya se usó
  btnVerQuePasaba.hidden = true; // Ocultar el botón al hacer clic
  btnPedir.disabled = true; // Deshabilitar inicialmente "Pedir Carta"
  verQueHabriaPasado(); // Mostrar una carta
});

// Manejo del botón "Nueva Partida"
btnNuevaPartida.addEventListener("click", nuevaPartida);

// Iniciar partida inicial
nuevaPartida();
