
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
    // console.log(datos);
  }
}


http.open('get', '../data/grupos.json', false);

http.send();

console.log(datos);


grupos_ordenados = ordenarPorNumeroGrupo(datos);


grupos_ordenados.map((grupo) => {
  const num = document.createElement('a');
  num.id = grupo.numero_grupo;
  num.classList.add('button-date')
  num.innerText = grupo.numero_grupo;
  carrousel_numeros.appendChild(num)      
})


const print_group = (e) => {
  const numero_grupo = e.target.id ?? "1";
  console.log(numero_grupo);

  const grupo_seleccionado = grupos_ordenados.find(grupo => grupo.numero_grupo === numero_grupo);
  console.log(grupo_seleccionado);

  const card_manada = document.createElement('div');
  const card_tropa = document.createElement('div');
  const card_caminantes = document.createElement('div')
  const card_clan = document.createElement('div')

  if (grupo_seleccionado.ramas.includes('manada') && grupo_seleccionado.seisenas) {
    
    card_manada.classList.add("group-info-card")
    // Supongamos que 'grupo_' es tu objeto del grupo
    card_manada.innerHTML = 
    `
    <img class="panoleta-img" src=${grupo_seleccionado.logo_tropa || "../img/Logos/logo_tropa_default.jpg"} alt="" />
        <div class="group-info-panoleta">
            <h3>Manada</h3>
            <ul>
              ${formatListAsHTML(grupo_seleccionado.seisenas)}
            </ul>
        </div>
    `;

    console.log(grupo_seleccionado.seisenas);

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

    console.log(grupo_seleccionado.patrullas_tropa);
  }
  if (grupo_seleccionado.comunidad_caminantes) {
    card_caminantes.classList.add("group-info-card")
    card_caminantes.innerHTML = `
      <img class="panoleta-img" src=${grupo_seleccionado.logo_caminantes || "../img/Logos/logo_tropa_default.jpg"} alt="" />
      <div>
          <h2>Comunidad de caminantes <h2/>
          <h3>${grupo_seleccionado.comunidad_caminantes}</h3>
      </div>
    `
  }
  if (grupo_seleccionado.clan) {
    card_clan.classList.add("group-info-card")
    card_clan.innerHTML = `
      <img class="panoleta-img" src=${grupo_seleccionado.logo_clan || "../img/Logos/logo_tropa_default.jpg"} alt="" />
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
        <p class="group-info-name">${grupo_seleccionado.nombre}</p>
        <span class="group-info-horario">2:00-5:00 PM</span>
    </div>
  </div>
  <div class="group-info-card ">
    <p class="panoleta-significado">Significado: ${grupo_seleccionado.significado_panoleta || ""}</p>
    <img class="panoleta-img" src=${grupo_seleccionado.imagen_panoleta || "../img/Pañoletas/panoleta_default.jpg" } alt="" />
  </div>
  <h2 class="group-info-title">Ramas activas</h2>
  
  `

  grupo_container.appendChild(card_manada)
  grupo_container.appendChild(card_tropa)
  grupo_container.appendChild(card_caminantes)
  grupo_container.appendChild(card_clan)
}


document.addEventListener("DOMContentLoaded", () => {
  print_group(e)
})

carrousel_numeros.addEventListener('click', print_group(e));



// document.addEventListener("DOMContentLoaded", function () {


  function checkVisibility() {
    const groupInfoCards = document.querySelectorAll(".group-info-card");
    const windowHeight = window.innerHeight;

    console.log(groupInfoCards);

    groupInfoCards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < windowHeight * 0.8) {
        card.classList.add("show");
      } else {
        card.classList.remove("show");
      }
    });
  }

  window.addEventListener("scroll", function () {
    checkVisibility();
  });

  // Verificar visibilidad al cargar la página
  checkVisibility();
// });
