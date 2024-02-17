
let info;
let encabezadoTabla;
let cuerpoTabla;








document.addEventListener('DOMContentLoaded',()=>{
    encabezadoTabla = document.getElementById('encabezadoTabla');
    cuerpoTabla = document.getElementById('cuerpoTabla');
   
    document.getElementById('FormularioBusqueda').addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const ruta = document.getElementById('ruta').value
        const inf = document.getElementById('info').value
        
        rutaPeticion(ruta, inf)
    })
})


console.log('info')

async function  rutaPeticion(ruta, inf){

    switch (ruta){
        case 'cod. Postal':
           
            info = await getRepartidores(inf)

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
  <td><button type="button" class="btn btn-info">mas</button></td>
  
  </tr>`

    
   });
  

}