
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
  const numero_grupo = e.target.id ?? "01";
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
    <img class="panoleta-img" src=${grupo_seleccionado.logo_manada || "../img/Logos/logo_manada_default.png"} alt="" />
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
        <p class="group-info-name">${grupo_seleccionado.nombre || ""}</p>
    </div>
  </div>
  <div class="group-info-card ">
    <p class="panoleta-significado">Significado: ${grupo_seleccionado.significado_panoleta || ""}</p>
    <img class="panoleta-img" src=${grupo_seleccionado.imagen_panoleta || "../img/Pañoletas/panoleta_default.jpg" } alt="" />
  </div>
  <h2 class="group-info-title">Ramas activas</h2>
  `;

  grupo_container.appendChild(card_manada)
  grupo_container.appendChild(card_tropa)
  grupo_container.appendChild(card_caminantes)
  grupo_container.appendChild(card_clan)



  // Definir las coordenadas del nuevo lugar
  var nuevaLatitud = 19.453066372838396; //, -70.69274045767158
  var nuevaLongitud = -70.69274045767158;

  // Generar el código HTML del iframe con las nuevas coordenadas
  var iframeCodigo = `
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.3070984555106!2d${nuevaLongitud}!3d${nuevaLatitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1cf6f0a95c9f9%3A0x77ca6ffcce6b71a3!2sEdificio%20Padre%20Arroyo!5e0!3m2!1ses!2sdo!4v1666205630950!5m2!1ses!2sdo"
          loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  `;

  // Insertar el código HTML generado en el documento
  document.getElementById('map_container').innerHTML = `
      <h2 class="text-primary-100 font-bold font-graphie-bold md:mb-10 mb-8">Ubícanos</h2>
      ${iframeCodigo}
  `;
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
})


carrousel_numeros.addEventListener('click', (e) => print_group(e));



// document.addEventListener("DOMContentLoaded", function () {


//   function checkVisibility() {
//     const groupInfoCards = document.querySelectorAll(".group-info-card");
//     const windowHeight = window.innerHeight;

//     groupInfoCards.forEach((card) => {
//       const cardTop = card.getBoundingClientRect().top;

//       if (cardTop < windowHeight * 0.5) {
//         card.classList.add("show");
//       } else {
//         card.classList.remove("show");
//       }
//     });
//   }

//   window.addEventListener("scroll", function () {
//     checkVisibility();
//   });

//   // Verificar visibilidad al cargar la página
//   checkVisibility();
// // });
