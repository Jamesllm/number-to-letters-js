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

const UNIDADES = [
  "cero",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
];

const DECENAS = [
  "diez",
  "once",
  "doce",
  "trece",
  "catorce",
  "quince",
  "dieciséis",
  "diecisiete",
  "dieciocho",
  "diecinueve",
];

const DIEZ_DIEZ = [
  "cero",
  "diez",
  "veinte",
  "treinta",
  "cuarenta",
  "cincuenta",
  "sesenta",
  "setenta",
  "ochenta",
  "noventa",
];

const CIENTOS = [
  "_",
  "ciento",
  "doscientos",
  "trescientos",
  "cuatrocientos",
  "quinientos",
  "seiscientos",
  "setecientos",
  "ochocientos",
  "novecientos",
];

module.exports = { UNIDADES, DECENAS, DIEZ_DIEZ, CIENTOS };
