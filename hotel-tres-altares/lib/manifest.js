/* Hotel Tres Altares — datos de marca.
   Todo lo de aquí sale del sitio oficial o del Instagram del hotel.
   IIFE clásica, sin import/export. */
(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Tres Altares",
    fullName: "Hotel Tres Altares",
    tagline: "Sabaneta tiene alma. Aquí la vas a sentir.",
    claim: "Tu hotel en Sabaneta con tradición y confort",

    /* --- Contacto real --- */
    address: "Calle 70 Sur #43B-21, Sabaneta, Antioquia",
    addressShort: "Cl. 70 Sur #43B-21 · Sabaneta",
    email: "reservas@tresaltares.com",
    phoneDisplay: "+57 304 290 4188",
    whatsapp: { number: "573042904188", link: "https://api.whatsapp.com/send/?phone=573042904188" },
    instagram: "https://www.instagram.com/tresaltareshotel",
    booking: "https://us2.cloudbeds.com/reservation/jF58wS",
    maps: "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent("Hotel Tres Altares, Calle 70 Sur 43B-21, Sabaneta, Antioquia"),

    /* --- Tours reales publicados por el hotel --- */
    tours: [
      {
        id: "comuna13",
        num: "01",
        name: "Graffiti Tour — Comuna 13",
        tagline: "Murales, escaleras eléctricas y una historia que cambió de rumbo.",
        text: "Uno de los barrios más vibrantes de Medellín: arte urbano a cielo abierto, las escaleras eléctricas más famosas de la ciudad y el relato de cómo un territorio se reinventó.",
        img: "assets/img/comuna13.jpg",
        alt: "Vista panorámica de la Comuna 13 en Medellín"
      },
      {
        id: "cafe",
        num: "02",
        name: "Tour del Café",
        tagline: "De la semilla a la taza, contado por quien lo siembra.",
        text: "Un recorrido por finca cafetera para entender el proceso completo de producción y cerrar con una cata guiada. El café de Antioquia, explicado donde nace.",
        img: "assets/img/coffee.jpg",
        alt: "Recolectores de café en una finca cafetera colombiana"
      },
      {
        id: "silletera",
        num: "03",
        name: "Tour Cultura Silletera",
        tagline: "La tradición que carga flores en la espalda.",
        text: "Visita a fincas tradicionales para conocer a los silleteros, armar tu propia silleta y entender de dónde viene una de las tradiciones más queridas de la región.",
        img: "assets/img/flowers.jpg",
        alt: "Silletero cargando una silleta de flores"
      },
      {
        id: "guatape",
        num: "04",
        name: "El Peñol y Guatapé",
        tagline: "740 escalones y el pueblo más colorido de Antioquia.",
        text: "Subir la Piedra del Peñol por sus 740 escalones para la vista panorámica del embalse, y después caminar las calles de Guatapé entre zócalos pintados a mano.",
        img: "assets/img/guatape.jpg",
        alt: "Calle empedrada de Guatapé con zócalos de colores"
      },
      {
        id: "religioso",
        num: "05",
        name: "Turismo Religioso",
        tagline: "Templos y santuarios de la Antioquia devota.",
        text: "Un recorrido por los destinos religiosos más representativos de la región. Empieza en la Iglesia de Santa Ana, a pocas cuadras del hotel.",
        img: "assets/img/iglesia.jpg",
        alt: "Iglesia de pueblo antioqueño con sus torres y la fuente del atrio"
      },
      {
        id: "pueblito",
        num: "06",
        name: "Pueblito Paisa",
        tagline: "La Antioquia de postal, sobre el Cerro Nutibara.",
        text: "Arquitectura colonial reconstruida, iglesia, artesanías y una panorámica completa de Medellín desde lo alto del Cerro Nutibara.",
        img: "assets/img/pueblito.jpg",
        alt: "Pueblito Paisa iluminado durante el alumbrado navideño"
      }
    ],

    /* --- Lo que el hotel confirma en su web --- */
    amenities: [
      { t: "Desayuno incluido", d: "Cada estadía arranca con desayuno servido en la casa." },
      { t: "20 habitaciones", d: "Decoradas reflejando la tradición antioqueña, con comodidades modernas." },
      { t: "A pasos del parque", d: "El Parque de Sabaneta y la Iglesia de Santa Ana, caminando." },
      { t: "Tours a la medida", d: "Coordinamos Comuna 13, Guatapé, fincas de café y más desde recepción." }
    ],

    /* --- Alrededores. Lugares tomados del sitio oficial del hotel.
           Los tiempos exactos están pendientes de confirmar con el hotel. --- */
    entorno: [
      { mode: "A pie", place: "Parque de Sabaneta", note: "El corazón del pueblo" },
      { mode: "A pie", place: "Iglesia de Santa Ana", note: "Centro histórico" },
      { mode: "En carro", place: "Santafé y Oviedo", note: "Centros comerciales" },
      { mode: "En carro", place: "Pueblito Paisa y Comuna 13", note: "Medellín" }
    ],

    faqs: [
      { q: "¿El desayuno está incluido?", a: "Sí. Todas las reservas incluyen desayuno, sin costo adicional." },
      { q: "¿Cómo reservo?", a: "Directo por el motor de reservas del hotel, o escribiéndonos por WhatsApp al +57 304 290 4188 si prefieres coordinar por chat." },
      { q: "¿Qué tan cerca está del Parque de Sabaneta?", a: "Caminando. La Iglesia de Santa Ana y la zona de restaurantes quedan en el mismo radio." },
      { q: "¿Organizan tours?", a: "Sí. Desde recepción coordinamos Comuna 13, Tour del Café, Cultura Silletera, El Peñol y Guatapé, turismo religioso y Pueblito Paisa." },
      { q: "¿Cómo llego desde el aeropuerto?", a: "Desde el Aeropuerto José María Córdova (Rionegro) llegas en carro. Si nos avisas con tiempo te ayudamos a coordinar el traslado." },
      { q: "¿Reciben grupos o estadías largas?", a: "Sí. Para grupos o estadías de varias semanas, escríbenos por WhatsApp y armamos una tarifa a la medida." }
    ],

    keywords: ["SABANETA", "TRADICIÓN", "FE", "CAFÉ", "MONTAÑA", "ALMA PAISA", "SANTA ANA", "HOGAR"]
  };
})();
