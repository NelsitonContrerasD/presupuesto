//crear variables 

const formulario = document.querySelector(".agregar-gastos");
const listagasto = document.querySelector("#gastos ul");
//eventos


function cargarpagina()
{
     document.addEventListener("DOMContentLoaded", preguntar);
     formulario.addEventListener('submit',agregarGasto);
     listagasto.addEventListener('click',eliminarGasto)
}

cargarpagina()
//clases
class Presupuesto
{
    
 constructor(presupuesto)
 {
    this.presupuesto = Number(presupuesto);
    this.disponible = Number(presupuesto);
    this.gastos = []}
    ;
    nuevoGasto(gasto)
    {
        this.gastos = [...this.gastos,gasto]
        this.dinerorestante()
    };
    eliminargasto(id)
    {
        const gastado = this.gastos.filter(gasto => gasto.id.toString()!== id);
        this.dinerorestante();
    }
    dinerorestante(){
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.Valor, 0);
        this.disponible = this.presupuesto - gastado;
    }
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
            
        }else(tipo === "bien")
        {
            
            divmensaje.classList.add("alert-success");
            
        }

        //mensaje error

        divmensaje.textContent= mensaje;

        // se inserte en DOM

        document.querySelector(".contenido1").insertBefore(divmensaje,formulario);

        setTimeout(() => {
            divmensaje.remove();
          }, 3000);
        
    }
    agergarlistadogasto(gastos)
    {   
        this.limpiar();
        gastos.forEach(gasto => { 
            const{Nombre,Valor,id}= gasto;
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between aling-item-center';
            nuevoGasto.dataset.id = id;
            nuevoGasto.innerHTML=`${Nombre}<span class="badge  badge-pill"> ${Valor}</span>`
            //boton borrar

            const btnborrar = document.createElement('button');

            btnborrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            
            btnborrar.textContent='borrar';

            nuevoGasto.appendChild(btnborrar);

            //insertart gasto

            listagasto.appendChild(nuevoGasto);
        
        
        });
        //crear presupuesto

        

         
        


        
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
      }
comprobarPresupuesto(presupuestoObj){

    const{presupuesto,restante} = presupuestoObj;

    const restanteDiv = document.querySelector('#restante');

    console.log(restanteDiv);
    console.log(presupuesto);
}

limpiar(){
    while(listagasto.fristChild){
        listagasto.removeChild(listagasto.fristChild);
    }
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
       
    }
    presupuesto = new Presupuesto(presupuestousu);
    inte.insertardinero(presupuesto);
};
function agregarGasto(e)
{
    e.preventDefault();
    const Nombre = document.querySelector("#gasto").value;
    const Valor = Number(document.querySelector("#cantidad").value);
    if(Nombre === "" || Valor === "")
    {
        inte.imprimiralerta("los campos son obligatorios ", "error");
    }else if (Valor <= 0 ||  isNaN (Valor))
    {
        inte.imprimiralerta('cantidad no valida', "error");
    } 
    else{
        inte.imprimiralerta("se agregaron los valores corectamente","bien");
        const gasto = {Nombre,Valor,id:Date.now()};
        presupuesto.nuevoGasto(gasto);
        inte.imprimiralerta("correcto","es valido")
        const {gastos} = presupuesto;
        inte.agergarlistadogasto([gasto]);

        //comprobar

        inte.comprobarPresupuesto(presupuesto);

        const{restante}=presupuesto;

        inte.actualizarRestante(restante);

        formulario.reset();

    }
}
function eliminarGasto(e) {
    if (e.target.classList.contains("borrar-gasto")) {
      const { id } = e.target.parentElement.dataset;
      presupuesto.eliminargasto(id);
      inte.comprobarPresupuesto(presupuesto);
  
      const { restante } = presupuesto;
      inte.actualizarRestante(restante);
  
      e.target.parentElement.remove();
    }
  };