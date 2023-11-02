function penjat() {
  const paraulaInicial = prompt("Digues una paraula");
  let barras = "";
  let victoria = false;
  let letraJugador = "";
  let vides = 6;
  let lletraValida = /\w/;
  let palabraJugada = "";
  for(let largoParaula = 0; largoParaula <= paraulaInicial.length-1; largoParaula++) {
    barras+= "_";
  }
  console.log(barras);
  while(!victoria) {
    letraJugador = prompt("Digues una lletra");
    //COMPROBAR LA LETRA
    if(letraLimpia(letraJugador)){
      palabraJugada+=letraJugador;
      if(palabraJugada == paraulaInicial) {
        victoria = true;
      }
    }
  }
  if(victoria){
    console.log(`VICTORIA, LA PARAULA ERA: ${paraulaInicial}`);
  }

}

function letraLimpia(letra) {
  if(!letra=== null) {
    if(letra.length > 1) {
      letra= prompt("Només una");
      return false;
    } else if(!lletraValida.test(letra)) {
      letra= prompt("Has de dir una lletra vàlida");
      return false;
    }
    return true;
  }
  return false;
}
