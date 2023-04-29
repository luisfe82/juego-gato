const listaBotones = document.querySelector(".letter-section");
const nuevoJuego = document.querySelector(".nuevo");
const imagenAhorcado = document.querySelector(".image-section");

const MAX_INTENTOS=8;
var totalLetras = 0,
  totalIntentos = 1,
  b=0;
// Creamos un arreglo con 20 palabras
var palabras = [
  "computadora",
  "programacion",
  "javascript",
  "html",
  "css",
  "nodejs",
  "mongodb",
  "mysql",
  "python",
  "java",
  "php",
  "typescript",
  "angular",
  "react",
  "vue",
  "django",
  "flask",
  "express",
  "jquery",
  "bootstrap",
];

// Seleccionamos una palabra al azar
var palabraAdivinar =
  palabras[Math.floor(Math.random() * palabras.length)].split("");

console.log(palabraAdivinar);

// Creamos un arreglo para guardar las letras adivinadas
var letrasAdivinadas = new Array(palabraAdivinar.length).fill("_");;

cargarEventListeners();
imprimirLetras();
imprimirPalabra();

function cargarEventListeners() {
  listaBotones.addEventListener("click", inhabilitarBoton);

  nuevoJuego.addEventListener("click", crearNuevoJuego);
}

function inhabilitarBoton(e) {
  e.preventDefault();
  if (e.target.classList.contains("letter-button")) {
    e.target.disabled = true;
    b=0;
    verificarLetra(e.target.innerHTML);
  }
}

function verificarLetra(letra) {
  const palabraBuscar = document.querySelector(".word-section");
  
  palabraAdivinar.forEach((le, indice) => {
    if (letra === le) {
      palabraBuscar.children[indice].innerHTML = letra;
      totalLetras++;
      b=1;
      if (totalLetras == palabraAdivinar.length) {
        mensaje("Felicidades Ganaste?","success");
      }
    }
  });

  if (b == 0) {
    imagenAhorcado.children[totalIntentos].classList.toggle("visible")
    totalIntentos++;
    b=0;    
  }
  if (totalIntentos == MAX_INTENTOS) {
    mensaje("Has perdido!!","error");
  }
}

function imprimirLetras() {
  // Recorremos el arreglo y creamos los botones
  for (var i = 97; i < 122; i++) {
    var boton = document.createElement("button");
    boton.innerHTML = String.fromCharCode(i);
    boton.classList.add("letter-button");
    document
      .querySelector(".letter-section")
      .appendChild(boton).disabled = false;
  }
}

function imprimirPalabra() {
  // Recorremos la palabra a adivinar y agregamos un div por cada letra
  for (var i = 0; i < palabraAdivinar.length; i++) {
    var div = document.createElement("button");
    div.innerHTML = letrasAdivinadas[i];
    document.querySelector(".word-section").appendChild(div);
  }
}

function crearNuevoJuego() {
    mensaje("Juego del Ahorcado","warning");
  }

  function mensaje(texto,tipo) {
    Swal.fire({
        title: `${texto}`,
        text: "¿Deseas jugar de nuevo?",
        icon: `${tipo}`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, un nuevo Juego!",
        denyButtonText: "No!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        } else if (result.isDenied) {
          Swal.fire(
            "Excelente!",
            "Te esperamos en la proxima partida",
            "success"
          );
        }
      });
}
