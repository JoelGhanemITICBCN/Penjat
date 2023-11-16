let ganadas = 0;
let jugadas = 0;
let perdidas = 0;

function letras() {
  let abecedario = "abcdefghijklmnopqrstuvwxyz".split('');
  let abecedarioButton = document.getElementById("abecedari");
  for (let i = 0; i < abecedario.length; i++) {
    let boton = document.createElement("button");

    boton.textContent = abecedario[i];
    boton.id = abecedario[i];
    boton.setAttribute("onclick", `clickBoton('${abecedario[i]}', jocPenjat)`);
    boton.innerHTML = abecedario[i];

    abecedarioButton.appendChild(boton);
  }
}
/*
function juego() {

}
*/
//globales
let timer;
let barras = ""; //Muestra de la longitud de la palabra
let letraJugador = ""; //Letra jugada en ese momento
let fallos = 0;
let palabraJugada = ""; //Palabra con las letras correctas dichas por el jugador
let letrasDichas = ""; //Todas las letras dichas
let palabraMal = ""; //Palabra con las letras Incorrectas dichas por  el jugador
let paraulaInicial = "";
function novaPartida() {
  paraulaInicial = prompt("Digues una paraula"); //Palabra del principio
  jugadas++;
  imatges();
  letras(paraulaInicial);
  //For para mostrar las _
  for (let largoParaula = 0; largoParaula <= paraulaInicial.length - 1; largoParaula++) {
    barras += "_ ";
  }
}

function esCorrecta(letraJugador) {
  let letraCorrecta = false;  // Inicialmente asumimos que la letra no es correcta
  for (let i = 0; i < paraulaInicial.length; i++) {
    if (paraulaInicial[i] === letraJugador) {
      letraCorrecta = true;  // Si encontramos la letra en la palabra, marcamos como correcta
    }
  }
  return letraCorrecta;  // Devolvemos true si la letra es correcta, de lo contrario, false
}

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
    timer =setTimeout(victoria,1000);
  }
  return barras;
}

function estadistiques() {
let Pganadas = `Partidas guanyades (${((ganadas / jugadas) * 100).toFixed(2)}%): ${ganadas}`;
let Pperdidas = `Partidas perdudes (${((perdidas / jugadas) * 100).toFixed(2)}%): ${perdidas}`;
 let Ptotales =`TOTAL DE PARTIDES: ${jugadas}`;
}
function imatges() {
  let imagen = document.getElementById("imatgePenjat");
  imagen.src = "../img/penjat_" + fallos + ".png";
}

function clickBoton(lletra) { 
  let palabraActual = "";
  if (esCorrecta(lletra)) {
    palabraJugada += lletra;
    actualizarBarras();
  } else {
    if(fallos < 6){
    fallos++;
    imatges();
    palabraMal = palabraMal + lletra;
    }else {
     timer = setTimeout(derrota,1000);
    }
  }

  palabraActual.innerHTML = actualizarBarras(paraulaInicial, palabraJugada);
}

function derrota() {
  bloqueaTodo();
  alert (`Has perdido la palabra era ${paraulaInicial}`);
}
function victoria() {
  bloqueaTodo();
  alert (`HAS GANADO, LA PALABRA ERA: ${paraulaInicial}`);
}
function bloqueaTodo() {
  let abecedario = "abcdefghijklmnopqrstuvwxyz".split('');
  let boton = document.getElementById("abecedari");

   for (let i = 0; i < abecedario.length; i++) {
    boton.textContent = abecedario[i];
    boton.id = abecedario[i];
    boton.innerHTML = abecedario[i];
   boton.disabled = true;

  }
}