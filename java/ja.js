// Crear variables
const formulario = document.querySelector(".agregar-gastos");
const listaGasto = document.querySelector("#gastos ul");

// Eventos
function cargarPagina() {
  document.addEventListener("DOMContentLoaded", preguntar);
  formulario.addEventListener("submit", agregarGasto);
  listaGasto.addEventListener("click", eliminarGasto);
}

cargarPagina();

// Clases
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.disponible = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.dineroRestante();
  }

  eliminarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id.toString() !== id);
    this.dineroRestante();
  }

  dineroRestante() {
    const gastado = this.gastos.reduce((total, gasto) => total + gasto.valor, 0);
    this.disponible = this.presupuesto - gastado;
  }
}

class Interfaz {
  insertarPresupuesto(valor) {
    const { presupuesto, disponible } = valor;
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = disponible;
  }

  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else if (tipo === "bien") {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.textContent = mensaje;

    document
      .querySelector(".contenido1")
      .insertBefore(divMensaje, formulario);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  agregarListaGasto(gastos) {
    this.limpiarLista();
    gastos.forEach(gasto => {
      const { nombre, valor, id } = gasto;
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between aling-item-center";
      nuevoGasto.dataset.id = id;
      nuevoGasto.innerHTML = `${nombre}<span class="badge badge-pill">${valor}</span>`;

      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      btnBorrar.textContent = "Borrar";
      nuevoGasto.appendChild(btnBorrar);

      listaGasto.appendChild(nuevoGasto);
    });
  }

  actualizarDineroRestante(restante) {
    document.querySelector("#restante").textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj) {
    const { presupuesto, disponible } = presupuestoObj;
    const restanteDiv = document.querySelector("#restante");

    
  }

  limpiarLista() {
    while (listaGasto.firstChild) {
      listaGasto.removeChild(listaGasto.firstChild);
    }
  }
}

// Variables
let presupuesto;
const interfaz = new Interfaz();

// Funciones
function preguntar() {
  const presupuestoUsuario = prompt("Ingrese su presupuesto");

  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUsuario);
  interfaz.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
  e.preventDefault();

  const nombre = document.querySelector("#gasto").value;
  const valor = Number(document.querySelector("#cantidad").value);

  if (nombre === "" || valor === "") {
    interfaz.imprimirAlerta("Los campos son obligatorios", "error");
  } else if (valor <= 0 || isNaN(valor)) {
    interfaz.imprimirAlerta("Cantidad no válida", "error");
  } else {
    interfaz.imprimirAlerta("Se agregaron los valores correctamente", "bien");

    const gasto = { nombre, valor, id: Date.now() };
    presupuesto.nuevoGasto(gasto);
    interfaz.agregarListaGasto([gasto]);

    const { disponible } = presupuesto;
    interfaz.actualizarDineroRestante(disponible);
    interfaz.comprobarPresupuesto(presupuesto);

    formulario.reset();
  }
}

function eliminarGasto(e) {
  if (e.target.classList.contains("borrar-gasto")) {
    const { id } = e.target.parentElement.dataset;
    presupuesto.eliminarGasto(id);
    interfaz.actualizarDineroRestante(presupuesto.disponible);
    interfaz.comprobarPresupuesto(presupuesto);

    e.target.parentElement.remove();
  }
}
