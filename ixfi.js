//  Cargar JSON
Promise.all([
  fetch('retweets.json').then(r => r.json()),
  fetch('tweets.json').then(r => r.json()),
  fetch('mandriles.json').then(r => r.json()),
]).then(([retweets, tweets, mandriles]) => {
  retuits = retweets;
  monos = mandriles;
  tuits = tweets.map(t => ({
    ...t,
    textoLower: t.texto?.toLowerCase() || "",
    fechaObj: new Date(t.fecha)
}));
const malasPalabras = ['aberrante','abominable','adermicina','alcahuete','alienado','amoral','anormal','atorrante','basura','berreta','bestia','bilis','bobo','bolita','boludo','borrego','bosta','brujo','bruto','buchon','buitre','burro','cagador','cagon','calumniador','caradura','carancho','careta','carnicero','casta','castrar','cerdo','chanta','chorro','choto','chupamedia','chupapauta','chupapija','cianuro','cipayo','cobarde','complice','concha','conspiranoico','cornudo','corrupto','criminal','cucaracha','cuervo','culo','deforme','degenerado','degradante','delincuente','demente','deplorable','descarado','deshonesto','despreciable','desquiciado','domado','domar','econochanta','enano','enemigo','enfermizo','ensobrado','envenenado','envidioso','esbirro','esclavo','escoria','esperpento','estupido','eunuco','excremento','extorsionador','facho','fanboy','fantasma','farsante','fascista','fecal','flema','forro','fracasado','gallina','garca','gato','gay','gil','gordo','gorila','grotesco','gusano','hedor','hereje','hipocrita','horrendo','horrible','idiota','ignorante','imbecil','impresentable','incestuoso','inepto','inmoral','inmundicia','inodoro','insidioso','inutil','jodido','kuka','lacra','ladron','larva','lepra','letrina','liliputiense','loco','mafioso','malaria','malicioso','maligno','malnacido','maloliente','mamarracho','mandril','manipulador','mantequita','marica','maricon','meado','mediocre','mentiroso','mercenario','mierda','miserable','mitomano','mogolico','mono','monstruo','mugroso','mutilar','nazi','nefasto','obeso','ogt','ojete','oligarca','operadora','paja','pajero','paloma','parasito','pautero','pavo','pavote','payaso','pedofilo','pelotudo','pendejo','periosobre','pestilente','pija','piojo','piojoso','pitonisa','planero','podrido','profano','progre','psicopata','pus','puta','puto','putrefacto','rabioso','rancio','rata','raton','repugnante','repulsivo','resentido','ridiculo','ruin','sabandija','salame','sanatero','sanguijuela','satrapa','sida','siniestro','sobrelli','sorete','subnormal','tarado','terrorista','teta','tirano','tirapiedra','tonto','torturador','traidor','trolo','vaca','vaselina','vendehumo','vendepatria','veneno','venenoso','verdugo','verga','versero','vil','villano','villero','violento','virulencia','vomitivo','woke','yegua','zorro','zurdo'];

// Para armar los tuits de mandril
  const tweMandril = document.getElementById('tweMandril');
  monos.forEach(m => {
    const palabra = m.palabra;
    const emisor = m.emisor;
    const tipo = m.tipo_mensaje;
    const texto = m.texto;
    const fecha = m.fecha_primera_aparicion;

    const fechaTwe = new Date(fecha);
    const dia = String(fechaTwe.getDate()).padStart(2, '0'); // Asegura dos dígitos (ej: 01, 10)
    const mes = String(fechaTwe.getMonth() + 1).padStart(2, '0'); // Meses son 0-11, sumamos 1
    const anio = fechaTwe.getFullYear();
    const horas = String(fechaTwe.getHours()).padStart(2, '0');
    const minutos = String(fechaTwe.getMinutes()).padStart(2, '0');
    const segundos = String(fechaTwe.getSeconds()).padStart(2, '0');

    // Formatear la fecha y hora
    const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    
    if (tipo == "R"){
      tweMandril.innerHTML += `
        <div class="cardTwe">
          <img class="twe" src="./retwe.svg" alt="${palabra}">
          <h5><span>palabra:</span> ${palabra}</h5>
          <div class="usFe">
            <h6><span>usuario:</span> ${emisor}</h6>
            <p class="fecTwe">${fechaFormateada}</p>
          </div>
          <p class="texTwe">${texto}</p>
        </div>`;
    } else {
      tweMandril.innerHTML += `
        <div class="cardTwe mi">
          <img class="twe mi" src="./twe.svg" alt="${palabra}">
          <h5><span>palabra:</span> ${palabra}</h5>
          <div class="usFe mi">
            <h6><span>usuario:</span> ${emisor}</h6>
            <p class="fecTwe">${fechaFormateada}</p>
          </div>
          <p class="texTwe">${texto}</p>
        </div>`;
    }
  });

const select = document.getElementById("insultoSelect");
const textoInput = document.getElementById("textoInput");
const fechaDesdeInput = document.getElementById("fechaDesde");
const fechaHastaInput = document.getElementById("fechaHasta");
const results = document.getElementById("results");
const contador = document.getElementById("contador");

// Poblar select
malasPalabras.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  select.appendChild(opt);
});

// Evento cambio
// [select, fechaDesdeInput, fechaHastaInput].forEach(el =>
//   el.addEventListener("input", filtrar)
// );
function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
// textoInput.addEventListener("input", debounce(filtrar, 300));
select.addEventListener("change", filtrar);
fechaDesdeInput.addEventListener("change", filtrar);
fechaHastaInput.addEventListener("change", filtrar);
// Texto con debounce
textoInput.addEventListener("input", debounce(filtrar, 300));

function filtrar1() {
//   const insultosSel = Array.from(select.selectedOptions).map(o => o.value);
  const insultosSel = Array.from(select.selectedOptions).forEach(p => {
  const opt = document.createElement("option");
  opt.value = p;
  opt.textContent = p;
  select.appendChild(opt);
});
  const textoLibre = textoInput.value.trim().toLowerCase();
  const FECHA_MIN = new Date("2023-12-10T00:00:00");
  const FECHA_MAX = new Date("2025-09-15T23:59:59");
  const fechaDesde = fechaDesdeInput.value ? new Date(fechaDesdeInput.value + "T00:00:00") : null;
  const fechaHasta = fechaHastaInput.value ? new Date(fechaHastaInput.value + "T23:59:59") : null;

  const hayFiltroInsultos = insultosSel.length > 0;
  const hayFiltroTexto = textoLibre.length > 0;
  const hayFiltroFecha = fechaDesde || fechaHasta;

  results.innerHTML = "";
  contador.textContent = "";

  // Regex insultos solo si hace falta
  let regexInsultos = null;
  if (hayFiltroInsultos) {
    regexInsultos = new RegExp(`\\b(${insultosSel.join("|")})\\b`, "i");
  }

  const filtrados = tuits.filter(t => {
    let match = false;

    // 1️⃣ Insultos
    if (hayFiltroInsultos && regexInsultos.test(t.textoLower)) {
      match = true;
    }

    // 2️⃣ Texto libre
    if (hayFiltroTexto && t.textoLower.includes(textoLibre)) {
      match = true;
    }

    // 3️⃣ Fecha
    if (hayFiltroFecha) {
    //   const fecha = t.fechaObj;

    //   if (
    //     (!fechaDesde || fecha >= fechaDesde) &&
    //     (!fechaHasta || fecha <= new Date(fechaHasta.setHours(23,59,59,999)))
    //   ) {
    //     match = true;
    //   }
        const fecha = t.fechaObj;

        // Clamp defensivo (por si llega algo raro)
        if (fecha < FECHA_MIN || fecha > FECHA_MAX) {
            return false;
        }

        if (fechaDesde && fecha < fechaDesde) {
            return false;
        }

        if (fechaHasta && fecha > fechaHasta) {
            return false;
        }

        match = true;
    }

    // Si no hay filtros activos → mostrar todo
    if (!hayFiltroInsultos && !hayFiltroTexto && !hayFiltroFecha) {
      return true;
    }

    return match;
  });

  contador.textContent = `${filtrados.length} tweets encontrados`;

  // Highlight
  let highlightRegex = null;
  const highlightTerms = [];

  if (hayFiltroInsultos) highlightTerms.push(...insultosSel);
  if (hayFiltroTexto) highlightTerms.push(textoLibre);

  if (highlightTerms.length) {
    highlightRegex = new RegExp(`(${highlightTerms.join("|")})`, "gi");
  }

  filtrados.forEach(t => {
    let texto = t.texto;

    if (highlightRegex) {
      texto = texto.replace(highlightRegex, m =>
        `<span class="highlight">${m}</span>`
      );
    }
    
    const div = document.createElement("div");
    div.className = "tweet";
    div.innerHTML = `
      <small>${t.fechaObj.toLocaleString("es-AR")} · RT ${t.retweets} · Replies ${t.replies}</small>
      <p class="texTwee">${texto}</p>
    `;
    results.appendChild(div);
  });
}

const selectedOptions = Array.from(select.selectedOptions);
const ningunoSeleccionado = selectedOptions.some(o => o.value === "");

function filtrar() {
  // 🔹 Insultos seleccionados (sin "Ninguno")
  const insultosSel = Array.from(select.selectedOptions)
    .map(o => o.value)
    .filter(v => v);

  // 🔹 Texto libre
  const textoLibre = textoInput.value.trim().toLowerCase();

  // 🔹 Fechas
  const fechaDesde = fechaDesdeInput.value
    ? new Date(fechaDesdeInput.value + "T00:00:00")
    : null;

  const fechaHasta = fechaHastaInput.value
    ? new Date(fechaHastaInput.value + "T23:59:59")
    : null;

//   const hayInsultos = insultosSel.length > 0;
//   const hayTexto = textoLibre.length > 0;
//   const hayFecha = fechaDesde || fechaHasta;
  const hayInsultos = insultosSel.length > 0;
  const hayFiltroNinguno = ningunoSeleccionado;
  const hayTexto = textoLibre.length > 0;
  const hayFecha = fechaDesde || fechaHasta;

  results.innerHTML = "";
  contador.textContent = "";
    // contador.textContent = "Seleccioná al menos un filtro para ver resultados";


  // Regex insultos solo si hace falta
  let regexInsultos = null;
  if (hayInsultos) {
    regexInsultos = new RegExp(`\\b(${insultosSel.join("|")})\\b`, "i");
  }

  const filtrados = tuits.filter(t => {
    // Si no hay filtros activos → NO mostrar tuits y el mensaje SI
    if (!hayInsultos && !hayTexto && !hayFecha && hayFiltroNinguno) {
        // return false;
        contador.textContent = "Seleccioná al menos un filtro para ver resultados";
        return;
    }

    let match = false;

    // Insultos
    if (hayInsultos && regexInsultos.test(t.textoLower)) {
      match = true;
    }

    //  Ninguno (tweets SIN insultos)
    if (hayFiltroNinguno && !t.esFiltrado) {
        match = true;
    }

    // Texto libre
    if (hayTexto && t.textoLower.includes(textoLibre)) {
      match = true;
    }

    // Fecha
    if (hayFecha) {
      const f = t.fechaObj;
      if (
        (!fechaDesde || f >= fechaDesde) &&
        (!fechaHasta || f <= fechaHasta)
      ) {
        match = true;
      }
    }

    return match;
  });
    
  contador.textContent = `${filtrados.length} tweets encontrados`;

//   if(filtrados.length == 0){
//     contador.textContent = `${filtrados.length} tweets encontrados`;
// } else if (filtrados.length > 0){
//       contador.textContent = `${filtrados.length} tweets encontrados`;
//   } else {
//       contador.textContent = "Seleccioná al menos un filtro para ver resultados";
//   }

  // 🔹 Highlight
  let highlightRegex = null;
  const highlightTerms = [];

  if (hayInsultos) highlightTerms.push(...insultosSel);
  if (hayTexto) highlightTerms.push(textoLibre);

  if (highlightTerms.length) {
    highlightRegex = new RegExp(`(${highlightTerms.join("|")})`, "gi");
  }

  filtrados.forEach(t => {
    let texto = t.texto;

    if (highlightRegex) {
      texto = texto.replace(highlightRegex, m =>
        `<span class="highlight">${m}</span>`
      );
    }

    const div = document.createElement("div");
    div.className = "tweet";
    div.innerHTML = `
      <small>${t.fechaObj.toLocaleString("es-AR")} · RT ${t.retweets} · Replies ${t.replies}</small>
      <p class="texTwee">${texto}</p>
    `;
    results.appendChild(div);
  });
}



// select.addEventListener("change", () => {
//   const seleccionados = Array.from(select.selectedOptions).map(o => o.value);

//   results.innerHTML = "";
//   contador.textContent = "";

//   if (seleccionados.length === 0) return;

//   // Regex combinada
//   const regex = new RegExp(`\\b(${seleccionados.join("|")})\\b`, "gi");

//   const filtrados = tuits.filter(t =>
//     t.texto && regex.test(t.texto)
//   );

//   contador.textContent = `${filtrados.length} tweets encontrados`;

//   filtrados.forEach(t => {
//     const textoResaltado = t.texto.replace(regex, match =>
//       `<span class="highlight">${match}</span>`
//     );

//     const usu = textoResaltado.replace(/@[^\s]+/g, match => `<span class="usu">${match}</span>`);
//     console.log(usu);
    
//     const fecha = new Date(t.fecha);
//     const dia = String(fecha.getDate()).padStart(2, '0'); // Asegura dos dígitos (ej: 01, 10)
//     const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses son 0-11, sumamos 1
//     const anio = fecha.getFullYear();
//     const horas = String(fecha.getHours()).padStart(2, '0');
//     const minutos = String(fecha.getMinutes()).padStart(2, '0');
//     const segundos = String(fecha.getSeconds()).padStart(2, '0');
//     const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

//     const div = document.createElement("div");
//     div.className = "tweet";
//     div.innerHTML = `
//         <div class="cardTwe">
//             <div class="usFe">
//                 <p class="texTwe">${usu}</p>
//                 <small>${fechaFormateada}<br> · RT ${t.retweets} · Replies ${t.replies}</small>
//             </div>
//         </div>
//     `;
//     results.appendChild(div);
//   });
// });


  // Para metodologia
  const puntos = document.querySelectorAll("p.punto");

  puntos.forEach(punto => {
    const meto = punto.nextElementSibling;

    // Agrega flecha 
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "▼";
    punto.appendChild(arrow);

    // Ocultar meto al inicio
    if (meto && meto.classList.contains("meto")) {
      meto.style.display = "none";
    }

    punto.addEventListener("click", () => {
      const isOpen = meto.style.display === "block";

      // Cerrar todos
      document.querySelectorAll("p.meto").forEach(m => {
        m.style.display = "none";
      });
      document.querySelectorAll("p.punto .arrow").forEach(a => {
        a.textContent = "▼";
      });

      // Abrir solo si no estaba abierto
      if (!isOpen) {
        meto.style.display = "block";
        arrow.textContent = "▲";
      }
    });
  });

}).catch(err => {
  console.error("Error cargando GeoJSONs:", err);
});