const MONEDAS = {
  PEN: {
    codigo_moneda: "PEN",
    descripcion: "Nuevo Sol",
    mn_short_dsc: "S/.",
    singular: "sol",
    plural: "soles",
    centimos_singular: "céntimo",
    centimos_plural: "céntimos",
  },
  USD: {
    codigo_moneda: "USD",
    descripcion: "US Dollar",
    mn_short_dsc: "$",
    singular: "dólar",
    plural: "dólares",
    centimos_singular: "centavo",
    centimos_plural: "centavos",
  },
  EUR: {
    codigo_moneda: "EUR",
    descripcion: "Euro",
    mn_short_dsc: "€",
    singular: "euro",
    plural: "euros",
    centimos_singular: "céntimo",
    centimos_plural: "céntimos",
  },
};

const MAX_NUMERO = 999999999999;

const UNIDADES =
  ("cero",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve");

const DECENAS =
  ("diez",
  "once",
  "doce",
  "trece",
  "catorce",
  "quince",
  "dieciséis",
  "diecisiete",
  "dieciocho",
  "diecinueve");

const DIEZ_DIEZ =
  ("cero",
  "diez",
  "veinte",
  "treinta",
  "cuarenta",
  "cincuenta",
  "sesenta",
  "setenta",
  "ochenta",
  "noventa");

const CIENTOS =
  ("_",
  "ciento",
  "doscientos",
  "trescientos",
  "cuatrocientos",
  "quinientos",
  "seiscientos",
  "setecientos",
  "ochocientos",
  "novecientos");

function numeroALetras(number) {
  let numeroEntero = parseInt(number);
  let resultado = "";

  if (numeroEntero > MAX_NUMERO) {
    throw new Error("Número demasiado alto");
  }

  if (numeroEntero < 0) {
    return `menos ${numeroALetras(Math.abs(number))}`;
  }

  let letras_decimales;
  let parte_decimal = parseInt(
    Math.round((Math.abs(numero) - Math.abs(numeroEntero)) * 100)
  );

  if (parte_decimal > 9) {
    letras_decimal = `con ${numeroALetras(parte_decimal)}`;
  } else if (parte_decimal > 0) {
    letras_decimales = `con cero ${numeroALetras(parte_decimal)}`;
  }

  if (numeroEntero <= 99) {
    resultado = leerDecenas(numeroEntero);
  } else if (numeroEntero <= 999) {
    resultado = leerCentenas(numeroEntero);
  } else if (numeroEntero <= 999999) {
    resultado = leerMiles(numeroEntero);
  } else if (numeroEntero <= 999999999) {
    resultado = leerMillones(numeroEntero);
  } else {
    resultado = leerMillardos(numero_entero);
  }

  resultado = resultado.replace("uno mil", "un mil");
  resultado = resultado.replace("ciento uno", "ciento un");
  resultado = resultado.replace("cientos uno", "cientos un");
  resultado = resultado.replace("quinientos uno", "quinientos un");
  resultado = resultado.strip();
  resultado = resultado.replace(" _ ", " ");
  resultado = resultado.replace("  ", " ");
  if (parte_decimal > 0) {
    resultado = `${resultado} ${letras_decimal}`;
  }
  return resultado;
}

function convertirNumeroLetras(numero, codigoMoneda) {
  const moneda = MONEDAS[codigoMoneda];
  if (!moneda) {
    throw new Error(`Código de moneda inválido: ${codigoMoneda}`);
  }

  const numeroEntero = Math.floor(numero);
  const parteDecimal = Math.round(
    (Math.abs(numero) - Math.abs(numeroEntero)) * 100
  );
  const centimos =
    parteDecimal === 1 ? moneda.centimos_singular : moneda.centimos_plural;
  const monedaNombre = numeroEntero === 1 ? moneda.singular : moneda.plural;

  let letras = numeroALetras(numeroEntero);
  letras = letras.replace("uno", "un");

  // Si la parte decimal es 0, se muestra como "00/100"
  const letrasDecimal =
    parteDecimal > 0
      ? `Y ${parteDecimal.toString().padStart(2, "0")}/100 ${centimos}`
      : "Y 00/100";

  return `${letras.toUpperCase()} ${monedaNombre.toUpperCase()} ${letrasDecimal.toUpperCase()}`.trim();
}

function leerDecenas(numero) {
  if (numero < 10) {
    return UNIDADES[numero];
  }
  const decena = Math.floor(numero / 10);
  const unidad = numero % 10;

  let resultado;
  if (numero <= 19) {
    resultado = DECENAS[unidad];
  } else if (numero <= 29) {
    resultado = `veinti${UNIDADES[unidad]}`;
  } else {
    resultado = DIEZ_DIEZ[decena];
    if (unidad > 0) {
      resultado = `${resultado} y ${UNIDADES[unidad]}`;
    }
  }

  return resultado;
}

function leerCentenas(numero) {
  const centena = Math.floor(numero / 100);
  const decena = numero % 100;

  let resultado;
  if (decena == 0) {
    resultado = "cien";
  } else {
    resultado = CIENTOS[centena];
    if (decena > 0) {
      resultado = `${resultado} ${leerDecenas(decena)}`;
    }
  }
  return resultado;
}

function leerMiles(numero) {
  const millar = Math.floor(numero / 1000);
  const centena = numero % 1000;
  let resultado = "";

  if (millar === 1) {
    resultado = "";
  } else if (millar >= 2 && millar <= 9) {
    resultado = UNIDADES[millar];
  } else if (millar >= 10 && millar <= 99) {
    resultado = leerDecenas(millar);
  } else if (millar >= 100 && millar <= 999) {
    resultado = leerCentenas(millar);
  }

  resultado = `${resultado} mil`;
  if (centena > 0) {
    resultado = `${resultado} ${leerCentenas(centena)}`;
  }

  return resultado;
}

function leerMillones(numero) {
  const millon = Math.floor(numero / 1000000);
  const millar = numero % 1000000;
  let resultado = "";

  if (millon === 1) {
    resultado = "un millón";
  } else if (millon >= 2 && millon <= 9) {
    resultado = UNIDADES[millon];
  } else if (millon >= 10 && millon <= 99) {
    resultado = leerDecenas(millon);
  } else if (millon >= 100 && millon <= 999) {
    resultado = leerCentenas(millon);
  }

  if (millon > 1) {
    resultado = `${resultado} millones`;
  }

  if (millar > 0 && millar <= 999) {
    resultado = `${resultado} ${leerCentenas(millar)}`;
  } else if (millar >= 1000 && millar <= 999999) {
    resultado = `${resultado} ${leerMiles(millar)}`;
  }

  return resultado;
}

function leerMillardos(numero) {
  const millardo = Math.floor(numero / 1000000);
  const millon = numero % 1000000;

  return `${leerMiles(millardo)} millones ${leerMillones(millon)}`;
}

const getTest = () => {
  return console.log("test number to letters library 🚀");
};

module.exports = { getTest, convertirNumeroLetras, numeroALetras };
