(function () {
  "use strict";
  const list = document.querySelector("[data-credits]");
  if (!list) return;

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function render(credits) {
    const rows = Object.entries(credits);
    if (!rows.length) { fallback(); return; }
    list.innerHTML = rows.map(([id, c]) => `
      <li>
        <strong>${esc(c.title)}</strong> — foto de
        ${c.creator_url
          ? `<a href="${esc(c.creator_url)}" target="_blank" rel="noopener">${esc(c.creator)}</a>`
          : esc(c.creator)}
        ${c.source ? `(${esc(c.source)})` : ""} ·
        <a href="${esc(c.license_url)}" target="_blank" rel="noopener">CC ${esc(String(c.license).toUpperCase())} ${esc(c.license_version || "")}</a>
        ${c.foreign_landing_url ? ` · <a href="${esc(c.foreign_landing_url)}" target="_blank" rel="noopener">ver original ↗</a>` : ""}
      </li>`).join("");
  }

  function fallback() {
    list.innerHTML =
      '<li>Para ver la lista de créditos, abre esta página desde un servidor web ' +
      '(no con doble clic en el archivo). Los datos están en <strong>assets/credits.json</strong>.</li>';
  }

  fetch("assets/credits.json")
    .then(r => r.ok ? r.json() : Promise.reject(new Error(r.status)))
    .then(render)
    .catch(fallback);
})();
