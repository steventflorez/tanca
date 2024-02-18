
let info;
let encabezadoTabla;
let cuerpoTabla;
let infoRutaSimple ;
let infoRuta = {
    codRuta : '',
    codPostal: '',
    nombreRepartidor: '',
    proveedor: '',
    supervisor: '',
    rampa:''
}








document.addEventListener('DOMContentLoaded',()=>{
    encabezadoTabla = document.getElementById('encabezadoTabla');
    cuerpoTabla = document.getElementById('cuerpoTabla');

    cuerpoTabla.addEventListener('click', (e)=>{
       
        let ruta = e.target.parentNode.parentNode.children[0].textContent.trim()
        let clase = e.target.className
        enrutadorClicks(clase, ruta)
    })
   
    document.getElementById('FormularioBusqueda').addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const ruta = document.getElementById('ruta').value
        const inf = document.getElementById('info').value
        
        rutaPeticion(ruta, inf)
    })
})


console.log('info')

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

    }

}

function codPostalList(values){
    

    encabezadoTabla.innerHTML = `<tr>
    <th scope="col">Codigo de repartidor</th>
    <th scope="col">Numero de Envios</th>
    <th scope="col"></th>
  </tr>`
  cuerpoTabla.innerHTML = '';
   values.forEach(element => {
    cuerpoTabla.innerHTML += `<tr class="table-primary">
  <th scope="row">${element.element}</th>
  <th scope="row">${element.contador}</th>
  <td><button type="button" class="btn btn-info mas">=></button></td>
  
  </tr>`

    
   });
  

}

