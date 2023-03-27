let eventosList = [];

async function getEventos(){
    await fetch('../amazing.json')
        .then(response => response.json())
        .then(data =>{
            eventosList = data.events   
            console.log(eventosList); 
            showAttendanceStatistics(eventosList);
            showRevenueStatistics(eventosList); 
    })
}

function highestPercentageAttendance(eventosList) {
  let highest = eventosList[0];
  let highestPercentage = calculatorPercentageAttendance(eventosList[0]);

  for(let i=1; i<eventosList.length; i++) {
    let percentage = calculatorPercentageAttendance(eventosList[i]);

    if(percentage > highestPercentage) {
      highest = eventosList[i];
      highestPercentage = percentage;
    }
  }

  return `${highest.name} (${highestPercentage}%)`;
}

function lowestPercentageAttendance(eventosList) {
  let lowest = eventosList[0];
  let lowestPercentage = calculatorPercentageAttendance(eventosList[0]);

  for(let i=1; i<eventosList.length; i++) {
    let percentage = calculatorPercentageAttendance(eventosList[i]);

    if(percentage < lowestPercentage) {
      lowest = eventosList[i];
      lowestPercentage = percentage;
    }
  }

  return `${lowest.name} (${lowestPercentage}%)`;
}

function largestCapacity(eventosList) {
  let largest = eventosList[0];

  for(let i=1; i<eventosList.length; i++) {
    if(eventosList[i].capacity > largest.capacity) {
      largest = eventosList[i];
    }
  }

  return `${largest.name} (${largest.capacity} personas)`;
}

function categories(eventosList) {
  let categoriesList = eventosList.map(evento => evento.category);
  let uniqueCategoriesList = [...new Set(categoriesList)];
  return uniqueCategoriesList.join(", ");
}

function revenues(eventosList) {
  let totalRevenues = 0;
  for (let evento of eventosList) {
    for (let ticket of evento.tickets) {
      totalRevenues += ticket.price * ticket.soldTickets;
    }
  }
  return `$${totalRevenues.toFixed(2)}`;
}

function attendance(eventosList) {
  let totalAttendance = 0;
  eventosList.forEach(evento => {
    totalAttendance += evento.asistentes;
  });
  return totalAttendance;
}

function showAttendanceStatistics() {
  let table = document.getElementById("tableEvents");
  let tbody = table.querySelector("tbody");
  let row = "";
  row = `<tr>
  <td width="308">${highestPercentageAttendance(eventosList)}</td>
  <td width="308">${lowestPercentageAttendance(eventosList)}</td>
  <td width="308">${largestCapacity(eventosList)}</td>
</tr>`;
  tbody.innerHTML = row;
}


function showRevenueStatistics() {
  let table = document.getElementById("tableEvents");
  let tbody = table.querySelector("tbody");
  let row = "";
  row = `<tr>          
  <td width="308">${categories(eventosList)}</td>
  <td width="308">${revenues(eventosList)}</td>
  <td width="308">${attendance(eventosList)}</td>
</tr>`;
  tbody.innerHTML = row;
}


function calculatorPercentageAttendance(array){
  let attendance = 0;
  let capacity = 0;
  array.forEach(evento => {
    capacity += evento.capacity;
    attendance += evento.assistance ? evento.assistance : evento.estimate;
  });
  return ((attendance/capacity) * 100).toFixed(2);
}



window.addEventListener('load', () => {
  getEventos().then(eventosList => {
    
    showAttendanceStatistics(eventosList);
    showRevenueStatistics(eventosList);
  })
});













