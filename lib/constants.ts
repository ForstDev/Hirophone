/**
 * Identidad estática del sitio. El número de WhatsApp, el mensaje de
 * cotización y el correo de contacto YA NO viven acá: son editables desde
 * /admin/ajustes y se leen en runtime con `readSettings()` (ver lib/store.ts).
 * Estas dos constantes solo sirven de semilla inicial para esos ajustes.
 */
export const WHATSAPP_NUMBER = "51913699836";
export const WHATSAPP_LABEL = "913 699 836";

export const SITE = {
  name: "Hirophone",
  claim: "Celulares en cuotas, sin planes post pago",
  // Verificado en hirophone.com / Instagram. Facebook y TikTok no se
  // confirmaron durante la investigación: agrega el enlace real aquí cuando
  // el cliente lo confirme y aparecerán solos en el footer.
  instagram: "https://www.instagram.com/hirophone.pe/",
  facebook: "",
  tiktok: "",
  hours: "Todos los días, 10:00 a.m. – 10:00 p.m.",
  branchesCount: "40 tiendas",
};
