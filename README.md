# websites-examples

Propuestas de rediseño web para negocios reales. Cada carpeta es un proyecto independiente,
estático (HTML + CSS + JS, sin build, sin npm) y listo para subir a cualquier hosting.

**Ver en vivo:** https://bayronlondonoc.github.io/websites-examples/

## Proyectos

| Proyecto | Negocio | Estado | Link |
|---|---|---|---|
| [`hotel-tres-altares`](hotel-tres-altares/) | Hotel Tres Altares — Sabaneta, Antioquia | Fotos del hotel pendientes | [Ver](https://bayronlondonoc.github.io/websites-examples/hotel-tres-altares/) |

## Cómo agregar un proyecto

1. Crear una carpeta nueva en la raíz: `nombre-del-negocio/`
2. Dentro va el sitio completo, con su `index.html`
3. Agregar una tarjeta en el `index.html` de la raíz y una fila en esta tabla

## Cómo verlo en local

```bash
npx http-server . -p 8781 -c-1
```

Y abrir http://127.0.0.1:8781/

## Aviso

Estas páginas son **propuestas independientes creadas como muestra de trabajo**. No están
afiliadas ni administradas por los negocios que aparecen en ellas y no sustituyen a sus sitios
oficiales. Todas llevan `noindex` y `robots.txt` restrictivo para no competir con ellos en
buscadores. Las fotografías de terceros usan licencias Creative Commons y se acreditan en cada
proyecto.
