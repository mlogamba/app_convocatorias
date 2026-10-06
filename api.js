// Sostituisce google.script.run: l'HTML resta identico, cambia solo il trasporto verso Apps Script.
var API_URL = 'https://script.google.com/macros/s/AKfycbwltB1aHPcrYVwQqgqVv2fAfMo_L4qiCe_oLXUm3xtL8Cd3Otj0PW8rUVt6ncToWt0TzA/exec';
var URL_LOGO = 'https://drive.google.com/thumbnail?id=1e4q_Gu_lq1GaxHk5bsF4VfCqteqUDKsV&sz=w300';
var URL_FONDO = 'https://drive.google.com/thumbnail?id=10STBS_hRABI8lOFf6-L3vN2ysmL1NVpk&sz=w1600';

(function () {
  function crea(ok, ko) {
    return new Proxy({}, {
      get: function (_, nome) {
        if (nome === 'withSuccessHandler') return function (h) { return crea(h, ko); };
        if (nome === 'withFailureHandler') return function (h) { return crea(ok, h); };
        return function () {
          var args = Array.prototype.slice.call(arguments);
          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ fn: nome, args: args })
          })
            .then(function (r) { return r.json(); })
            .then(function (j) { if (j.error) throw new Error(j.error); if (ok) ok(j.data); })
            .catch(function (e) { if (ko) ko(e); else console.error(e); });
        };
      }
    });
  }
  window.google = { script: { run: crea(null, null) } };
})();
