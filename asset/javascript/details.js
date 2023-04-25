
const detail = document.querySelector('#details');

async function getEventos(){
  await fetch('../amazing.json')
      .then(response => response.json())
      .then(data =>{
      const queryString = location.search;
      const params = new URLSearchParams(queryString);
      const detailId = params.get('id');
      const detailEvent = data.events.find(event => event._id == detailId);

      createDetails(detailEvent, detail);
  })
}getEventos()

function createDetails(item, contenedor){
    let details = document.createElement('div');
    details.classList.add('detail')
    details.innerHTML =`<div class="row g-1">
    <div class="col-1 col-sm-3">
      <img src="${item.image}" class="card-img-top img-fluid w-100 img-thumbnail" alt="card-horizontal-image">
    </div>
    <div class="col-7 col-sm-9">
      <div class="card-body img-thumbnail">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">${item.description}</p>               
            <ul class="lista_simple">
            <li>${item.name}</li>
            <li>${item.data}</li>
            <li>${item.description}</li>                
            <li>Category:${item.category}</li>
            <li>Place:${item.place}</li>
            <li>Capacity:${item.capacity}</li>
            <li>assistance:${item.assistance}</li>
            <li>$:${item.price}</li>
            </ul>              
        </div>
    </div>
  </div>`
   contenedor.appendChild(details)
}



















