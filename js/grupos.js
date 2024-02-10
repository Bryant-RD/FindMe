
function ordenarPorNumeroGrupo(grupos) {
    return grupos.sort((a, b) => {
        // Convierte los números de grupo a enteros y compara
        const numeroGrupoA = parseInt(a.numero_grupo);
        const numeroGrupoB = parseInt(b.numero_grupo);

        return numeroGrupoA - numeroGrupoB;
    });
}
const formatListAsHTML = (lista) => lista.map(item => `<li>${item}</li>`).join('');  


  const http = new XMLHttpRequest();
  const carrousel_numeros = document.getElementById('carrousel')
  const grupo_container = document.getElementById("info_groups_container");

  let datos;

http.onreadystatechange = () => {
  if (http.readyState == 4 && http.status == 200) {
    datos = JSON.parse(http.response)
  }
}


http.open('get', '../data/grupos.json', false);

http.send();



grupos_ordenados = ordenarPorNumeroGrupo(datos);


grupos_ordenados.map((grupo) => {
  const num = document.createElement('a');
  num.id = grupo.numero_grupo;
  num.classList.add('button-date')
  num.innerText = grupo.numero_grupo;
  carrousel_numeros.appendChild(num)      
})


const print_group = (e) => {
  const numero_grupo = e.target.id ?? "01";

  const grupo_seleccionado = grupos_ordenados.find(grupo => grupo.numero_grupo === numero_grupo);
  console.log(grupo_seleccionado);

  const card_manada = document.createElement('div');
  const card_tropa = document.createElement('div');
  const card_caminantes = document.createElement('div');
  const card_clan = document.createElement('div');
  const mapa = document.createElement('div');
 console.log(mapa);
  if (grupo_seleccionado.ramas.includes('manada') && grupo_seleccionado.seisenas) {
    
    card_manada.classList.add("group-info-card")
    // Supongamos que 'grupo_' es tu objeto del grupo
    card_manada.innerHTML = 
    `
    <img class="panoleta-img" src=${grupo_seleccionado.logo_manada || "../img/Logos/logo_manada_default.png"} alt="" />
        <div class="group-info-panoleta">
            <h3>Manada</h3>
            <ul>
              ${formatListAsHTML(grupo_seleccionado.seisenas)}
            </ul>
        </div>
    `;
  }
  if (grupo_seleccionado.ramas.includes('tropa') && grupo_seleccionado.patrullas_tropa) {
    card_tropa.classList.add("group-info-card")
    // Supongamos que 'grupo_' es tu objeto del grupo
    card_tropa.innerHTML = 
    `
        <div class="group-info-panoleta">
            <h3>Patrullas</h3>
            <ul>
              ${formatListAsHTML(grupo_seleccionado.patrullas_tropa)}
            </ul>
        </div>
        <img class="panoleta-img" src=${grupo_seleccionado.logo_tropa || "../img/Logos/logo_tropa_default.jpg"} alt="" />
    `;
  }
  if (grupo_seleccionado.comunidad_caminantes) {
    card_caminantes.classList.add("group-info-card")
    card_caminantes.innerHTML = `
      <img class="panoleta-img" src=${grupo_seleccionado.logo_caminantes || "../img/Logos/logo_caminantes_default.svg"} alt="" />
      <div>
          <h2>Comunidad de caminantes <h2/>
          <h3>${grupo_seleccionado.comunidad_caminantes}</h3>
      </div>
    `
  }
  if (grupo_seleccionado.clan) {
    card_clan.classList.add("group-info-card")
    card_clan.innerHTML = `
      <img class="panoleta-img" src=${grupo_seleccionado.logo_clan || "../img/Logos/logo_clan_default.jpg"} alt="" />
      <div>
          <h2>Clan Rover <h2/>
          <h3>${grupo_seleccionado.clan}</h3>
      </div>
    `
  }


  grupo_container.innerHTML = `
  <div class="group-info-card">
    <img class="panoleta-img" src=${grupo_seleccionado.logo_grupo || "../img/Logos/logo_grupo_default.png"} alt="">
    <div>
        <h1 class="group-info-title">GRUPO SCOUT ${grupo_seleccionado.numero_grupo}</h1>
        <p class="group-info-name">${grupo_seleccionado.nombre || ""}</p>
    </div>
  </div>
  <div class="group-info-card ">
    <p class="panoleta-significado">Significado: ${grupo_seleccionado.significado_panoleta || ""}</p>
    <img class="panoleta-img" src=${grupo_seleccionado.imagen_panoleta || "../img/Pañoletas/panoleta_default.jpg" } alt="" />
  </div>
  <h2 class="group-info-title">Ramas activas</h2>
  `;

  mapa.innerHTML = `
  <h2 class="group-info-title">Ubicacion</h2>
  <div id="map"></div>
  `



  grupo_container.appendChild(card_manada)
  grupo_container.appendChild(card_tropa)
  grupo_container.appendChild(card_caminantes)
  grupo_container.appendChild(card_clan)
  grupo_container.appendChild(mapa);


  let zoom = grupo_seleccionado.coordenadas.latitud == null ? 8 : 15


  var map = L.map('map').setView([grupo_seleccionado.coordenadas.latitud || 19.0543902157619 ,grupo_seleccionado.coordenadas.longitud || -71.00575078105187], zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  var marker = L.marker([grupo_seleccionado.coordenadas.latitud || 19.453292125578553 ,grupo_seleccionado.coordenadas.longitud || -70.69261710343795]).addTo(map);

  let text_popup = `<b>Grupo Scout #${grupo_seleccionado.numero_grupo}</b><br>${grupo_seleccionado.nombre || ""}`
  if (grupo_seleccionado.coordenadas.latitud == null) {
    text_popup = `<b>Oficina Scout Regional Norte</b>`
    var marker_sd = L.marker([18.46635983443715, -69.89406495557179]).addTo(map);
    marker_sd.bindPopup(`<b>Asociacion de Scouts Dominicanos</b>`).openPopup();
  }

  marker.bindPopup(text_popup).openPopup();
}


document.addEventListener("DOMContentLoaded", (e) => {
  print_group(e)
  var scrollToEventsButton = document.querySelector('.scroll-to-events');
  var eventsSection = document.querySelector('.events-section');

  scrollToEventsButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevenir el comportamiento por defecto del enlace

      // Obtener la posición de la sección de eventos
      var eventsSectionTop = eventsSection.offsetTop;

      // Realizar el desplazamiento suave
      window.scrollTo({
          top: eventsSectionTop,
          behavior: 'smooth'
      });
  });
});


carrousel_numeros.addEventListener('click', (e) => print_group(e));

