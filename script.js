
const ramos = [
  { id: 1, nombre: "Introducción a las Ciencias Veterinarias", nivel: 1, prereqs: [] },
  { id: 2, nombre: "Fundamentos de la Química", nivel: 1, prereqs: [] },
  { id: 3, nombre: "Biología Celular y Molecular", nivel: 1, prereqs: [] },
  { id: 4, nombre: "Matemática", nivel: 1, prereqs: [] },
  { id: 5, nombre: "Zoología", nivel: 1, prereqs: [] },
  { id: 6, nombre: "Fundamentos de la Física", nivel: 1, prereqs: [] },
  { id: 7, nombre: "Anatomía Animal I", nivel: 2, prereqs: [5] },
  { id: 8, nombre: "Praderas y Especies Forrajeras", nivel: 2, prereqs: [3] },
  { id: 9, nombre: "Fundamentos de Bioquímica", nivel: 2, prereqs: [2] },
  { id: 10, nombre: "Histoembriología Veterinaria", nivel: 2, prereqs: [3] },
  { id: 11, nombre: "Ecología", nivel: 2, prereqs: [4, 5] },
  { id: 12, nombre: "Electivo 1", nivel: 2, prereqs: [] }
];

const estado = {}; // Guarda el estado aprobado de los ramos
const container = document.getElementById("malla");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.dataset.id = ramo.id;
  div.innerText = ramo.nombre;
  actualizarEstado(div, ramo);
  div.addEventListener("click", () => {
    estado[ramo.id] = !estado[ramo.id];
    actualizarMalla();
  });
  return div;
}

function actualizarEstado(div, ramo) {
  const completado = estado[ramo.id];
  const prereqsCumplidos = ramo.prereqs.every(id => estado[id]);

  div.classList.remove("aprobado", "cursando", "bloqueado");
  if (completado) {
    div.classList.add("aprobado");
  } else if (prereqsCumplidos || ramo.nivel === 1) {
    div.classList.add("cursando");
  } else {
    div.classList.add("bloqueado");
  }
}

function actualizarMalla() {
  container.innerHTML = "";
  ramos.forEach(r => {
    const div = crearRamo(r);
    container.appendChild(div);
  });
}

actualizarMalla();
