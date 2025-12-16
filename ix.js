//  Cargar JSON
Promise.all([
  fetch('periodistas.json').then(r => r.json()),
  fetch('mandriles.json').then(r => r.json()),
]).then(([periodistas, mandriles]) => {
  journalists = periodistas;
  monos = mandriles;

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