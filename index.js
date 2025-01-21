/******************************************************
 *_____________________________________________________
 *
 * Autor       :  Jamesllm
 * ____________________________________________________
 * 
 * Este paquete es una herramienta útil para convertir 
 * números a su representación textual. Ideal para 
 * aplicaciones que requieren formatos específicos en 
 * documentos como boletas y facturas.
 *
 ******************************************************/

const { MONEDAS } = require("./monedas.js");
const { UNIDADES, DECENAS, DIEZ_DIEZ, CIENTOS } = require("./unidades.js");

const leerDecenas = (numero) => {
  if (numero < 10) return UNIDADES[numero];
  let [decena, unidad] = [Math.floor(numero / 10), numero % 10];
  if (numero < 20) return DECENAS[unidad];
  if (numero < 30) return unidad === 0 ? "veinte" : `veinti${UNIDADES[unidad]}`;
  let resultado = DIEZ_DIEZ[decena];
  if (unidad > 0) resultado += ` y ${UNIDADES[unidad]}`;
  return resultado;
};

const leerCentenas = (numero) => {
  let [centena, resto] = [Math.floor(numero / 100), numero % 100];
  if (resto === 0) return CIENTOS[centena];
  return `${CIENTOS[centena]} ${leerDecenas(resto)}`;
};

const leerMiles = (numero) => {
  let [millar, resto] = [Math.floor(numero / 1000), numero % 1000];
  let resultado =
    millar === 1 ? "un" : millar <= 9 ? UNIDADES[millar] : leerDecenas(millar);
  resultado += " mil";
  if (resto > 0)
    resultado += ` ${resto <= 99 ? leerDecenas(resto) : leerCentenas(resto)}`;
  return resultado;
};

const leerMillones = (numero) => {
  let [millon, resto] = [Math.floor(numero / 1000000), numero % 1000000];
  let resultado =
    millon === 1 ? "un millón de" : `${leerDecenas(millon)} millones de`;
  if (resto > 0) resultado += ` ${leerMiles(resto)}`;
  return resultado;
};

// const leerMillardos = (numero) => {
//   let [millardo, millon] = [Math.floor(numero / 1000000)];
// };

const numeroALetras = (numero) => {
  let entero = Math.floor(numero);
  if (entero < 100) return leerDecenas(entero);
  if (entero < 1000) return leerCentenas(entero);
  if (entero < 1000000) return leerMiles(entero);
  return leerMillones(entero);
};

const convertirNumeroLetras = (numero, codigoMoneda) => {
  const moneda = MONEDAS[codigoMoneda];
  if (!moneda) throw new Error(`Código de moneda inválido: ${codigoMoneda}`);

  const entero = Math.floor(numero);
  const decimal = Math.round((numero - entero) * 100);
  const letrasEntero = numeroALetras(entero).toUpperCase();
  const monedaNombre =
    entero === 1 ? moneda.singular.toUpperCase() : moneda.plural.toUpperCase();
  const letrasDecimal =
    decimal > 0
      ? `Y ${decimal
          .toString()
          .padStart(2, "0")}/100 ${moneda.centimos_plural.toUpperCase()}`
      : "Y 00/100 CÉNTIMOS";
  return `${letrasEntero} ${monedaNombre} ${letrasDecimal}`;
};

const getTest = () => {
  return console.log("test number to letters library 🚀");
};

module.exports = { getTest, convertirNumeroLetras, numeroALetras };

// console.log(convertirNumeroLetras(120, "PEN"));
// console.log(convertirNumeroLetras(200, "PEN"));
// console.log(convertirNumeroLetras(300, "PEN"));
// console.log(convertirNumeroLetras(400, "PEN"));
// console.log(convertirNumeroLetras(500, "PEN"));
// console.log(convertirNumeroLetras(600, "PEN"));
// console.log(convertirNumeroLetras(700, "PEN"));
// console.log(convertirNumeroLetras(800, "PEN"));
// console.log(convertirNumeroLetras(900, "PEN"));
// console.log(convertirNumeroLetras(9000.0, "PEN"));
// console.log(convertirNumeroLetras(90000.0, "PEN"));
// console.log(convertirNumeroLetras(900000.0, "PEN"));
// console.log(convertirNumeroLetras(9000000.0, "PEN"));
// console.log(convertirNumeroLetras(90000000.0, "PEN"));
// console.log(convertirNumeroLetras(900000000.0, "PEN"));
// console.log("hello");
