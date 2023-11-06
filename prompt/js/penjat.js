let ganadas = 0;
let jugadas = 0;
let perdidas = 0;
function inicia() {
  const opcio = prompt('1. Iniciar un joc\n2. Estadístiques\n3. Sortir');
  if (opcio == 1) {
    console.log("Bona sort");
    penjat();
  } else if (opcio == 2) {
    console.log("Les teves estadistiques son:");
    estadistiques();
  } else {
    console.log("Has sortit");
  }
}
function penjat() {
  jugadas++;
  const paraulaInicial = prompt("Digues una paraula"); //Palabra del jugador
  let barras = ""; //Muestra de la longitud de la palabra
  let victoria = false;
  let letraJugador = ""; //Letra jugada en ese momento
  let vides = 6;
  let palabraJugada = ""; //Palabra con las letras correctas dichas por el jugador
  let letrasDichas = ""; //Todas las letras dichas
  let palabraMal = ""; //Palabra con las letras Incorrectas dichas por  el jugador


  //For para mostrar las _
  for(let largoParaula = 0; largoParaula <= paraulaInicial.length-1; largoParaula++) {
    barras+= "_ ";
  }
  console.log(barras);
  while(!victoria && vides>0) {
    letraJugador = prompt("Digues una lletra");
    //COMPROBAR LA LETRA

    if(letraLimpia(letraJugador) && !repetida(letraJugador,letrasDichas)) {
      letrasDichas = letrasDichas + letraJugador;
      if(esCorrecta(paraulaInicial,letraJugador)){
        palabraJugada += letraJugador; 
        barras = actualizarBarras(paraulaInicial,palabraJugada);
      } else {
        vides--;
        palabraMal = palabraMal + letraJugador;
      }
      console.log(`Incorrectes ${palabraMal}`);
      console.log(barras);
    }
    if (barras === paraulaInicial) {
      victoria = true;
    }
  }
  if (victoria) {
    console.log(`VICTORIA, LA PARAULA ERA: ${paraulaInicial}`);
    ganadas++;
  } else {
    console.log(`DERROTA, LA PARAULA ERA: ${paraulaInicial}`);
    perdidas++;
  }
}

function letraLimpia(letra) {
  if (letra !== null) {
    if (letra.length !== 1 || !esLetra(letra)) { //Si hay mas de 1 caracter no es una letra solo
      console.log("Nomes una paraula");
      return false;
    }
    return true;
  }
  return false;
}

function esLetra(caracter){
  return /^[a-zA-Z]$/.test(caracter); //Operador para comprobar que es una letra
}

function repetida(letraJugador,letrasDichas) {
  for(let i = 0; i < letrasDichas.length; i++){
    if(letraJugador === letrasDichas[i]){ //Si la letra del jugador se encuentra en las letras diches esta repetida
      return true;
    }
  }
  return false;
}

function esCorrecta(paraulaInicial, letraJugador) {
  let letraCorrecta = false;  // Inicialmente asumimos que la letra no es correcta
  for (let i = 0; i < paraulaInicial.length; i++) {
    if (paraulaInicial[i] === letraJugador) {
      console.log("letra correcta");
      letraCorrecta = true;  // Si encontramos la letra en la palabra, marcamos como correcta
    }
  }
  return letraCorrecta;  // Devolvemos true si la letra es correcta, de lo contrario, false
}

function hasGanado(paraulaInicial, palabraJugada) {
  const letrasPalabra1 = paraulaInicial.split(''); // Convierte la primera palabra en un array de letras
  const letrasPalabra2 = palabraJugada.split(''); // Convierte la segunda palabra en un array de letras

  for (let letra of letrasPalabra1) {
    const index = letrasPalabra2.indexOf(letra);
    if (index === -1) {
      return false; // Si alguna letra de la primera palabra no está en la segunda palabra, retorna falso.
    }
    // Si la letra está en la segunda palabra, quítala para evitar contarla dos veces
    letrasPalabra2.splice(index, 1);
  }

  return true; // Si todas las letras de la primera palabra están en la segunda palabra, retorna verdadero.
}
function actualizarBarras(palabra, palabraJugada) {
  let barras = "";
  for (let letra of palabra) {
    if (palabraJugada.includes(letra)) {
      barras += letra;
    } else {
      barras += "_";
    }
  }
  return barras;
}
function estadistiques() {

  console.log(`TOTAL DE PARTIDES: ${jugadas}`);
  console.log(`Partidas guanyades (${((ganadas / jugadas) * 100).toFixed(2)}%): ${ganadas}`);
  console.log(`Partidas perdudes (${((perdidas / jugadas) * 100).toFixed(2)}%): ${perdidas}`);
}

