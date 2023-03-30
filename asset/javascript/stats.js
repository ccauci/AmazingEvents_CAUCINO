import {
  lowestPercentageAttendance,
  highestPercentageAttendance,
  categories,
  revenues,
  attendance, calculateProjectedTotalRevenue
} from "./function.js";

let eventosList = [];

function largestCapacity(array) {
  let eventWithLargestCapacity = array.reduce((prevEvent, actualEvent) => {
    return prevEvent.capacity > actualEvent.capacity ? prevEvent : actualEvent;
  }).name;
  return eventWithLargestCapacity;
}

function showAttendanceStatistics(array) {
  let table1 = document.getElementById("tabla1");
  let row = document.createElement("tr");
  row = `
  <th width="308">${highestPercentageAttendance(array)}</th>
  <th width="308">${lowestPercentageAttendance(array)}</th>
  <th width="308">${largestCapacity(array)}</th>`;
  table1.innerHTML = row;
}

function showRevenueStatistics(array) {
  let table2 = document.getElementById("tabla2");
  let row = document.createElement("tr");
  row = `          
  <th width="308">${categories(array)}</th>
  <th width="308">${revenues(array)}</th>
  <th width="308">${attendance(array)}</th>`;
  table2.innerHTML = row;
}

async function getEventos() {
  await fetch("../amazing.json")
    .then((response) => response.json())
    .then((data) => {
      eventosList = data.events;
      console.log(eventosList);
      showAttendanceStatistics(eventosList);
      console.log(eventosList);
      showRevenueStatistics(array);
      calculateProjectedTotalRevenue(array);
    });
}
getEventos();
