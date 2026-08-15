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
los iconos de amenidades y los marcos de imagen (`.arch-frame`).

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

## Fotografía

El sitio ya no tiene placeholders: todas las imágenes son fotos reales con licencia libre.
Se dividen en dos grupos, y solo uno hay que reemplazar.

### Grupo A — Antioquia real (se quedan)
Lugares y cosas que existen de verdad, en su mayoría de Jardín y Medellín. No se tocan.

| Archivo | Qué es | Licencia |
|---|---|---|
| `pueblo.jpg` | Casa colonial de Jardín, Antioquia — **es la foto del hero** | Dominio público |
| `parque.jpg` | Parque de Jardín con balcones y montaña | Dominio público |
| `iglesia.jpg` | Basílica de Jardín | Dominio público |
| `bandeja.jpg` | Bandeja paisa | CC BY-SA |
| `pueblito.jpg` | Alumbrados navideños de Medellín | CC BY-SA |
| `guatape.jpg` | Calle de Guatapé con zócalos | CC BY |
| `comuna13.jpg` | Comuna 13, Medellín | CC BY |
| `flowers.jpg` | Silletero | CC BY |
| `coffee.jpg` | Finca cafetera | CC BY |

### Grupo B — Interiores de hotel (reemplazar con fotos del hotel)
Stock profesional CC0 de StockSnap y Rawpixel. Se ven bien y están en la paleta correcta,
pero **no son el Hotel Tres Altares**. Estas son las que hay que cambiar:

| Archivo | Qué muestra ahora | Qué foto pedirles |
|---|---|---|
| `recepcion.jpg` | Lobby con baldosa y vegetación | Recepción / zona común |
| `habitacion-1.jpg` | Habitación con piso de madera | Habitación sencilla |
| `habitacion-2.jpg` | Habitación con dos camas | Habitación doble |
| `habitacion-3.jpg` | Habitación con sala y balcón | Habitación familiar |
| `bano.jpg` | Baño moderno en piedra | Baño |
| `comedor.jpg` | Mesa servida en restaurante | Comedor / desayuno |

Para cambiarlas: sobrescribir el archivo en `assets/img/` con el mismo nombre y borrar su
entrada en `assets/credits.json`. No hay que tocar el HTML.

**Falta una foto de la fachada real del hotel.** Ahora mismo el hero usa una casa colonial de
Jardín; funciona como imagen de contexto paisa, pero lo ideal es la fachada de Tres Altares.

### Categorías de habitación
El sitio actual **no publica** tipos ni tarifas. Puse sencilla / doble / familiar como estructura,
y lo digo explícitamente en la página. Confirmar con el hotel los nombres y capacidades reales.

### Tiempos y distancias
No inventé minutos. La sección de entorno usa "a pie" / "en carro" con los lugares que sí
menciona su web. Cuando confirmen los tiempos exactos, se cambian en `lib/manifest.js` → `entorno`.

### Fiestas de Sabaneta
La tarjeta de "Fiestas de Sabaneta" está genérica porque su web no detalla fechas. Su blog tiene
material sobre el Día de las Velitas y los buñuelos gigantes; se puede desarrollar.

---

## Cómo verla

```bash
npx http-server "C:\Users\Windows\Downloads\Proyectos\Websites Examples\hotel-tres-altares" -p 8790 -c-1
```

Luego abrir `http://127.0.0.1:8790/`. También funciona con doble clic en `index.html`
(solo la lista de créditos necesita servidor, porque lee un JSON).

---

## Qué está mal en el sitio actual (para el pitch)

1. **Imágenes rotas**: varios bloques muestran placeholders SVG grises en vez de fotos.
2. **Contenido duplicado**: habitaciones y tours repiten la misma información en varias secciones.
3. **Sin jerarquía**: no hay un recorrido claro de "conocer → elegir → reservar".
4. **La marca no se usa**: tienen una paleta y un símbolo (los tres arcos) buenos, y el sitio
   casi no los aprovecha.
5. **WordPress pesado**: LiteSpeed + plugins para un sitio que puede ser estático e instantáneo.
