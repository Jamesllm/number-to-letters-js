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

module.exports = { MONEDAS };