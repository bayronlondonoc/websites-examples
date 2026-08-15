# Hotel Tres Altares — notas de la propuesta

Sitio **multipágina** (7 páginas), estático, sin build ni npm. Referencia de calidad: Casa Los Curazaos.

---

## Línea gráfica: de dónde salió

No la inventé. La extraje del código del sitio real (`tresaltares.com`):

| | Marca real del hotel | En esta propuesta |
|---|---|---|
| Color primario | `#a5745d` arcilla | `--clay` |
| Secundario | `#a6895b` / `#7f6947` oro | `--gold` / `--gold-deep` |
| Fondos | `#f8f4ec` `#fbf8f2` `#e7ddd0` crema y arena | `--bg` `--paper` `--bg-3` |
| Tinta | `#2f2a24` `#3c342c` | `--ink` `--ink-soft` |
| Display | **Steelfish** (condensada) | **Oswald** — equivalente libre |
| Cuerpo | **Americane** (slab) | **Bitter** — equivalente libre |
| Símbolo | Tres arcos (los tres altares) | Motivo gráfico de todo el sitio |

Steelfish y Americane son fuentes comerciales (el hotel usa versiones *trial*). Oswald y Bitter son
los equivalentes libres más cercanos. **Van auto-hospedadas** en `assets/fonts/` — no dependen del CDN
de Google, así que el sitio no se rompe si Google Fonts falla o está bloqueado.

Los **tres arcos** del logo son la firma visual: aparecen en el logo del nav, el splash, el footer,
los iconos de amenidades, los marcos de imagen (`.arch-frame`) y los placeholders de foto.

---

## Estructura

```
index.html          Portada
habitaciones.html   Las 20 habitaciones + galería
experiencias.html   Los 6 tours reales del hotel
sabaneta.html       El pueblo: parque, Santa Ana, gastronomía, fiestas
reservar.html       Motor Cloudbeds + WhatsApp + por qué directo
contacto.html       Datos, formulario, FAQ
creditos.html       Créditos fotográficos
```

---

## Datos reales usados (verificados en el sitio oficial)

- Dirección: **Calle 70 Sur #43B-21, Sabaneta, Antioquia**
- WhatsApp: **+57 304 290 4188** (el mismo número que usa su web)
- Correo: **reservas@tresaltares.com**
- Motor de reservas: **Cloudbeds** `us2.cloudbeds.com/reservation/jF58wS` (el suyo, real)
- Instagram: **@tresaltareshotel**
- 20 habitaciones · desayuno incluido
- Los 6 tours son los que ellos publican: Comuna 13, Tour del Café, Cultura Silletera,
  El Peñol y Guatapé, Turismo Religioso, Pueblito Paisa.
- Tagline tomado de su bio de Instagram: *"Sabaneta tiene alma. Aquí la vas a sentir."*

---

## Pendientes antes de enviársela al hotel

### 1. Fotos del hotel (lo más importante)
Las fotos de **espacios propios del hotel** están como placeholders con el motivo de arcos —
a propósito. Poner stock genérico de habitaciones de hotel se nota y quema el pitch.

Lo que hace falta que les pidas o saques de su Instagram:
- Fachada del hotel
- Recepción / lobby
- 3 habitaciones (sencilla, doble, familiar)
- Baño
- Comedor / zona de desayuno
- Alguna zona común o patio

Van en `assets/img/`. Los placeholders están marcados con la clase `.arch-ph` — se reemplazan
por un `<img>` y listo.

### 2. Categorías de habitación
El sitio actual **no publica** tipos ni tarifas. Puse sencilla / doble / familiar como estructura,
y lo digo explícitamente en la página. Confirmar con el hotel los nombres y capacidades reales.

### 3. Tiempos y distancias
No inventé minutos. La sección de entorno usa "a pie" / "en carro" con los lugares que sí
menciona su web. Cuando confirmen los tiempos exactos, se cambian en `lib/manifest.js` → `entorno`.

### 4. Fiestas de Sabaneta
La tarjeta de "Fiestas de Sabaneta" está genérica porque su web no detalla fechas. Su blog tiene
material sobre el Día de las Velitas y los buñuelos gigantes; se puede desarrollar.

---

## Fotos de contexto (temporales, con licencia)

7 imágenes de Antioquia/Colombia con licencia Creative Commons verificada, acreditadas en
`creditos.html` y en `assets/credits.json`. Son de contexto real (Comuna 13, Guatapé, café,
silletero, bandeja paisa, Pueblito Paisa, pueblo antioqueño) — no fingen ser el hotel.

---

## Cómo verla

```bash
npx http-server "C:\Users\Windows\Downloads\Proyectos\Websites Examples\hotel-tres-altares" -p 8781 -c-1
```

Luego abrir `http://127.0.0.1:8781/`. También funciona con doble clic en `index.html`
(solo la lista de créditos necesita servidor, porque lee un JSON).

---

## Qué está mal en el sitio actual (para el pitch)

1. **Imágenes rotas**: varios bloques muestran placeholders SVG grises en vez de fotos.
2. **Contenido duplicado**: habitaciones y tours repiten la misma información en varias secciones.
3. **Sin jerarquía**: no hay un recorrido claro de "conocer → elegir → reservar".
4. **La marca no se usa**: tienen una paleta y un símbolo (los tres arcos) buenos, y el sitio
   casi no los aprovecha.
5. **WordPress pesado**: LiteSpeed + plugins para un sitio que puede ser estático e instantáneo.
