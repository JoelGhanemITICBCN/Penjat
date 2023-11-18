//globales
let timer; //Para que se meustren las ale5rtas con delay
let barras = ""; //Muestra de la longitud de la palabra
let letraJugador = ""; //Letra jugada en ese momento
let fallos = 0;
let palabraJugada = ""; //Palabra con las letras correctas dichas por el jugador
let letrasDichas = ""; //Todas las letras dichas
let palabraMal = ""; //Palabra con las letras Incorrectas dichas por  el jugador
let paraulaInicial = ""; //Palabra a adivinar
let enJuego = false; //Para que no se acepte iniciar partida en la misam partida
let repetida = false; //Es para que no vuelva a mostrar las letras al reiniciar en medio de una partida

//inicio una partida
function novaPartida() {
  if(!enJuego) {
    enJuego = true;
    paraulaInicial = prompt("Digues una paraula"); //Palabra del principio
    while (paraulaInicial == "") {
    paraulaInicial = prompt("Has de dir una paraula"); //Palabra del principio
    }
    paraulaInicial = paraulaInicial.toLowerCase(); //Lo paso a minusculas
    guardaP();
    imatges();
    muestraBarras();
    if (!repetida) { letras(paraulaInicial);}
  } else {
    restart();
  }

}

//muestro todos los botones 
function letras() {
  let abecedario = "abcdefghijklmnopqrstuvwxyz".split('');
  let abecedarioButton = document.getElementById("abecedari");
  for (let i = 0; i < abecedario.length; i++) {
    let boton = document.createElement("button"); //creo cada boton con la letra correspondiente

    boton.textContent = abecedario[i];
    boton.id = abecedario[i];
    boton.setAttribute("onclick", `clickBoton('${abecedario[i]}', jocPenjat)`); //hago que al ser clikado vaya a la funcion para que siga el curso 
    boton.innerHTML = abecedario[i];

    abecedarioButton.appendChild(boton);
  }
}

//Determino los pasos a seguir al preisonar un boton
function clickBoton(lletra) { 
  let palabraActual = "";
  if (esCorrecta(lletra)) {
    palabraJugada += lletra;
    bloquea(lletra);
  } else {
    if(fallos < 6){
      fallos++;
      imatges();
      bloquea(lletra);
      palabraMal = palabraMal + lletra;
    }else {
      repetida = false;
      guardaD();
      derrota();
    }
  }

  palabraActual.innerHTML = actualizarBarras(paraulaInicial, palabraJugada);
}

//compruebo si la letra es correcta
function esCorrecta(letraJugador) {
  let letraCorrecta = false;  // Inicialmente asumimos que la letra no es correcta
  for (let i = 0; i < paraulaInicial.length; i++) {
    if (paraulaInicial[i] === letraJugador) {
      letraCorrecta = true;  // Si encontramos la letra en la palabra, marcamos como correcta
    }
  }
  return letraCorrecta;  // Devolvemos true si la letra es correcta, de lo contrario, false
}

//Compruebo si he ganado la partida
function hasGanado() {
  const letrasPalabra1 = paraulaInicial.split(''); // Convierte la primera palabra en un array de letras
  let letrasPalabra2 = palabraJugada.split(''); // Convierte la segunda palabra en un array de letras

  for (let letra of letrasPalabra1) {
    let index = letrasPalabra2.indexOf(letra);
    if (index === -1) {

      return false; // Si alguna letra de la primera palabra no está en la segunda palabra, retorna falso.
    }
    // Si la letra está en la segunda palabra, quítala para evitar contarla dos veces
    letrasPalabra2.splice(index, 1);
  }

  return true; // Si todas las letras de la primera palabra están en la segunda palabra, retorna verdadero.
}

//Actualizo la palabra por adivinar
function actualizarBarras() {
  let barras = "";
  for (let letra of paraulaInicial) {
    if (palabraJugada.includes(letra)) {
      barras += letra;

    } else {
      barras += "_ ";
    }
  }
  if(hasGanado()) {
    repetida = false;
    guardaV();
    victoria();
  }
  document.getElementById("jocPenjat").innerHTML = barras;
  return barras;
}

//muestro las estadistiques
function estadistiques() {
  if(localStorage.getItem('pTotales') > 0) {
    let pGanadas = `Partidas guanyades (${((Number(localStorage.getItem('pGanadas')) / Number(localStorage.getItem('pTotales'))) * 100).toFixed(2)}%): ${localStorage.getItem('pGanadas')}`;
    let pPerdidas = `Partidas perdudes (${((Number(localStorage.getItem('pPerdidas')) / Number(localStorage.getItem('pTotales'))) * 100).toFixed(2)}%): ${localStorage.getItem('pPerdidas')}`;
    let pTotales =`TOTAL DE PARTIDES: ${localStorage.getItem('pTotales')}`;

    // Muestro y recupero elementos del localStorage
    document.getElementById("stats").innerHTML = `${pTotales}`;
    document.getElementById("stats").innerHTML += `<br> ${pGanadas}`;
    document.getElementById("stats").innerHTML += `<br> ${pPerdidas}`;
  } else {
    document.getElementById("stats").innerHTML = `Encara no has jugat cap partida`;
  }
}

// Guardo las stats en localStorage
// partida
function guardaP() {
  let cantidad = Number(localStorage.getItem('pTotales'));
  cantidad++;
  localStorage.setItem('pTotales', cantidad);
}
//victoria
function guardaV() {
  let cantidad = Number(localStorage.getItem('pGanadas'));
  cantidad++;
  localStorage.setItem('pGanadas', cantidad);
}
//derrota
function guardaD() {
  let cantidad = Number(localStorage.getItem('pPerdidas'));
  cantidad++;
  localStorage.setItem('pPerdidas', cantidad);
}

//modifica la imgen segun los fallos
function imatges() {
  let imagen = document.getElementById("imatgePenjat");
  imagen.src = "../img/penjat_" + fallos + ".png";
}

//funcion que bloquea el boton presionado
function bloquea(lletra) {
  let boton = document.getElementById(lletra);
  boton.disabled = true;
}

function muestraBarras() {
  //For para mostrar las _
  for (let largoParaula = 0; largoParaula <= paraulaInicial.length - 1; largoParaula++) {
    barras += "_ ";
  }
  document.getElementById("jocPenjat").innerHTML = barras;
}

function esborra() {
  localStorage.setItem('pPerdidas', 0);
  localStorage.setItem('pGanadas', 0);
  localStorage.setItem('pTotales', 0);
}


function restart() {
  timer; //Para que se meustren las ale5rtas con delay
  barras = ""; //Muestra de la longitud de la palabra
  letraJugador = ""; //Letra jugada en ese momento
  fallos = 0;
  palabraJugada = ""; //Palabra con las letras correctas dichas por el jugador
  letrasDichas = ""; //Todas las letras dichas
  palabraMal = ""; //Palabra con las letras Incorrectas dichas por  el jugador
  paraulaInicial = ""; //Palabra a adivinar
  enJuego = false; //Para que no se acepte iniciar partida en la misam partida
  repetida = true;
  desbloqueaTodo();
  novaPartida();
}

function desbloqueaTodo() {
  let abecedario = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < abecedario.length; i++) {
    let boton = document.getElementById(abecedario.charAt(i));
    boton.disabled = false;

  }
}

//comprobar derrota
function derrota() {
  bloqueaTodo() ;
  timer = setTimeout(function() {alert (`Has perdido la palabra era ${paraulaInicial}`)},1000);
  setTimeout(function(){window.location.reload()},2000);
}

//comprobar victoria
function victoria() {
  bloqueaTodo();
  timer = setTimeout(function() {alert (`HAS GANADO, LA PALABRA ERA: ${paraulaInicial}`)},1000);
  setTimeout(function(){window.location.reload()},2000);
}
//funcion que bloquea todos los botones
function bloqueaTodo() {
  let abecedario = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < abecedario.length; i++) {
    let boton = document.getElementById(abecedario.charAt(i));
    boton.disabled = true;

  }
}

//funcion que bloquea el boton presionado
function bloquea(lletra) {
  let boton = document.getElementById(lletra);
  boton.disabled = true;
}

function muestraBarras() {
  //For para mostrar las _
  for (let largoParaula = 0; largoParaula <= paraulaInicial.length - 1; largoParaula++) {
    barras += "_ ";
  }
  document.getElementById("jocPenjat").innerHTML = barras;
}

function esborra() {
  localStorage.setItem('pPerdidas', 0);
  localStorage.setItem('pGanadas', 0);
  localStorage.setItem('pTotales', 0);
}


function restart() {
  //reinicio todas las estadisticas de la partida
  timer; //Para que se meustren las ale5rtas con delay
  barras = ""; //Muestra de la longitud de la palabra
  letraJugador = ""; //Letra jugada en ese momento
  fallos = 0;
  palabraJugada = ""; //Palabra con las letras correctas dichas por el jugador
  letrasDichas = ""; //Todas las letras dichas
  palabraMal = ""; //Palabra con las letras Incorrectas dichas por  el jugador
  paraulaInicial = ""; //Palabra a adivinar
  enJuego = false; //Para que no se acepte iniciar partida en la misam partida
  repetida = true;
  desbloqueaTodo();
  novaPartida();
}

function desbloqueaTodo() {
  let abecedario = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < abecedario.length; i++) {
    let boton = document.getElementById(abecedario.charAt(i));
    boton.disabled = false;

  }
}
