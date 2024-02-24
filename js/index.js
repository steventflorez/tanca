
let info;
let encabezadoTabla;
let repartidor;
let cuerpoTabla;
let infoRutaSimple ;
let infoGeneral ;
let infoRuta = {
    codRuta : '',
    codPostal: '',
    nombreRepartidor: '',
    proveedor: '',
    supervisor: '',
    rampa:''
}








document.addEventListener('DOMContentLoaded',()=>{

    const loader = document.querySelector('.loader');
    encabezadoTabla = document.getElementById('encabezadoTabla');
    repartidor = document.getElementById('repartidor');
    cuerpoTabla = document.getElementById('cuerpoTabla');
    document.getElementById('cargando').style.visibility ='hidden';


    loader.classList.add("loader-hidden");

    cuerpoTabla.addEventListener('click', (e)=>{
       
        let ruta = e.target.parentNode.parentNode.children[0].textContent.trim()
        let clase = e.target.className
        enrutadorClicks(clase, ruta)
    })
   
    document.getElementById('FormularioBusqueda').addEventListener('submit', (e)=>{
        e.preventDefault();
        
        document.getElementById('cargando').style.visibility ='visible';
        console.log(loader)
        const ruta = document.getElementById('ruta').value
        const inf = document.getElementById('info').value.toUpperCase()
        rutaPeticion(ruta, inf)
    })
})




/**
 * enrutador de clicks
 */

async function enrutadorClicks(clas,ruta){

    switch(clas){
        case 'btn btn-info mas':
            infoRutaSimple = await getInfoRuta(ruta)
            infoRuta.codRuta = ruta
            infoRuta.nombreRepartidor = infoRutaSimple[2]
            infoRuta.proveedor = infoRutaSimple[1]
            infoRuta.supervisor = infoRutaSimple[3]

            pintarInfoRuta()
            
           console.log(infoRuta)


    }

}

/**
 * mostrar info de rutas
 */
function pintarInfoRuta(){
    document.getElementById('cargando').style.visibility ='hidden';
   
    encabezadoTabla.innerHTML = `<tr>
    <th scope="col">Codigo de repartidor</th>
    <th scope="col">Proveedor</th>
    <th scope="col">Repartidor</th>
    <th scope="col">Supervisor</th>
    <th scope="col">Rampa</th>
  </tr>`

  cuerpoTabla.innerHTML = `<tr class="table-success">
  <th scope="row">${infoRuta.codRuta}</th>
  <th scope="row">${infoRuta.proveedor}</th>
  <th scope="row">${infoRuta.nombreRepartidor}</th>
  <th scope="row">${infoRuta.supervisor}</th>
  <th scope="row">25p3</th>
  
  
  </tr>`
    



}

/**
 * funcion que busca dependiendo lo que se seleccione en el desplegable
 */

async function  rutaPeticion(ruta, inf){

    switch (ruta){
        case 'cod. Postal':
           
            info = await getRepartidores(inf)
            infoRuta.codPostal = inf
            codPostalList(info)

            break;

         case 'Cod. Repartidor':
            infoRutaSimple = await getInfoRuta(inf)
            infoRuta.codRuta = inf
            infoRuta.nombreRepartidor = infoRutaSimple[2]
            infoRuta.proveedor = infoRutaSimple[1]
            infoRuta.supervisor = infoRutaSimple[3]

            pintarInfoRuta()
            break;

        case 'Cod. Paquete':
                console.log("paquete")
            
            infoGeneral = await getGeneral(inf);
            info = await getRepartidores(infoGeneral.codPostal);
            codPostalList(info)
            pintarRepartidor(infoGeneral)

            console.log(infoGeneral);

            break;

            
            

    }

}

function pintarRepartidor(value){
    document.getElementById('cargando').style.visibility ='hidden';

    repartidor.innerHTML = `<div class="card border-primary mb-3" style="max-width: 20rem;">
    <div class="card-header">${value.codRepartidor}</div>
    <div class="card-body">
      
      <div class = "row">

      <div class = "col-6">
      <p class="card-text"> <strong>Cod. Postal: </strong> ${value.codPostal}</p>
      </div>
      </div>
     
    </div>
  </div>`
    


}

//pinta en el dom todos los repartidores con el mismo codigo portal


function codPostalList(values){
    let colorRow = "active"
    document.getElementById('cargando').style.visibility ='hidden';
    
   
    encabezadoTabla.innerHTML = `<tr class = "table-success">
    <th scope="col">Cod. repartidor</th>
    <th scope="col"># Envios</th>
    <th scope="col">Supervisor</th>
    <th scope="col">Repartidor</th>
    <th scope="col"></th>
  </tr>`
  cuerpoTabla.innerHTML = '';
   values.forEach(element => {
    
    cuerpoTabla.innerHTML += `<tr class="table-${colorRow}">
  <th scope="row">${element.element}</th>
  <th scope="row">${element.contador}</th>
  <th scope="row">${element.infoSuper}</th>
  <th scope="row">${element.nombreRepartidor}</th>
  <td><button type="button" class="btn btn-info mas">=></button></td>
  
  </tr>`
  if(colorRow == "active")colorRow = "default" ; else colorRow = "active"
  console.log(colorRow)
    
   });
  

}

