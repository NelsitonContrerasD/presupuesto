//crear variables 

const formulario = document.querySelector(".agregar-gastos");
const listagasto = document.querySelector(".gastos ul");
//eventos


function cargarpagina()
{
     document.addEventListener("DOMContentLoaded", preguntar);
     formulario.addEventListener("submit",agregarGasto);
}

cargarpagina()
//clases
class Presupuesto
{
 constructor(presupuesto)
 {
    this.presupuesto = Number(presupuesto);
    this.disponible = Number(presupuesto);
    this.gastos = [];
 };
};
class interfaz 
{
    insertardinero(valor)
    {
        const {presupuesto,disponible}= valor;
        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = disponible;
    }
    imprimiralerta(mensaje,tipo)
    {
        const divmensaje = document.createElement(`div`);
        divmensaje.classList.add("text-center","alert");
        if(tipo === "error")
        {
            divmensaje.classList.add("alert-danger");
        }else
        {
            divmensaje.classList.add("alert-succes");
        }
        //mensaje error

        divmensaje.textContent= mensaje;

        // se inserte en DOM

        document.querySelector(".contenido1").insertBefore(divmensaje,formulario);
        
    }
};
let presupuesto;
const inte = new interfaz();
//funciones
function preguntar()
{  
    const presupuestousu = prompt("ingrese su presupuesto");
    console.log(presupuestousu)
    if(presupuestousu ===" "|| presupuestousu === null || isNaN(presupuestousu)||presupuestousu<=0)
    {
        window.location.reload()
        return;
    }
    presupuesto = new Presupuesto(presupuestousu);
    inte.insertardinero(presupuesto);
};
function agregarGasto(e)
{
    e.preventDefault();
    const Nombre = document.querySelector("#gasto").value;
    const Valor = Number(document.querySelector("#cantidad").value);
    if(Nombre === " " || Valor === " ")
    {
        inte.imprimiralerta("los campos son obligatorios ","error");
    }
}
