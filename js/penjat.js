function penjat() {
  const paraulaInicial = prompt("Digues una paraula");
  let barras = "";
  let victoria = false;
  let letraJugador = "";
  let vides = 6;
  let palabraJugada = "";
  let letrasDichas = "";
  let palabraMal = "";

  //For para mostrar las _
  for(let largoParaula = 0; largoParaula <= paraulaInicial.length-1; largoParaula++) {
    barras+= "_ ";
  }
  console.log(barras);
  while(!victoria) {
    letraJugador = prompt("Digues una lletra");
    //COMPROBAR LA LETRA
    if(letraLimpia(letraJugador)){
      if(!repetida(letraJugador,letrasDichas)) {
        letrasDichas = letrasDichas + letraJugador;
        if(esCorrecta(paraulaInicial,letraJugador)){
          palabraJugada = palabraJugada + letraJugador; 
        } else {
          vides--;
          palabraMal = palabraMal + letrasDichas;
        }
        //Compruebo victoria
        if(palabraJugada === paraulaInicial) {
          victoria = true;
        }
        if(vides <= 0) {
          break;
        }
        console.log(`Correctes ${palabraJugada}`);
        console.log(`Incorrectes ${palabraMal}`)
      }
    }
  }
  if(victoria){
    console.log(`VICTORIA, LA PARAULA ERA: ${paraulaInicial}`);
  } else {
    console.log(`DERROTA, LA PARAULA ERA: ${paraulaInicial}`)
  }

}

function letraLimpia(letra) {
  if (letra !== null) {
    if (letra.length !== 1 || !esLetra(letra)) {
      return false;
    }
    return true;
  }
  return false;
}

function esLetra(caracter){
  return /^[a-zA-Z]$/.test(caracter);
}

function repetida(letraJugador,letrasDichas) {
  for(let i = 0; i < letrasDichas.length; i++){
    if(letraJugador === letrasDichas[i]){
      return true;
    }
  }
  return false;
}


function esCorrecta(paraulaInicial, letraJugador){
  for(let i = 0; i < paraulaInicial.length; i++) {
    //Si la letra es correcta
    if(paraulaInicial[i] === letraJugador) {
      console.log("letra correcta");
      return true;
    } else {
      console.log("letra incorrecta");
      return false;
    }
  }
}
