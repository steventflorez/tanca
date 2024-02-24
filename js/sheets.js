const hoja = "BD";
const hoja2 = "info"
let informacionRura;

let datosGenerales = {
  codRepartidor: "",
  codEnvio: "",
  direccion: "",
  poblacion: "",
  codPostal: ""
}

async function getInfoRuta(r){
  console.log(r)
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja2 + "!A:D"
      
    });

   
  } catch (err) {
    console.log(err.message)
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById("content").innerText = "No values found.";
    return;
  }

  

  //console.log(range.values)
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    //console.log(fila)
  
    if(fila[0] == r){
     
      informacionRura = fila
      
    }

 
  });

 

  return(informacionRura)
 // Imprimir los resultados

  
}
//GUARDAR LOS DATOS
function appendValues( ) {
  let values = [
    [
      "460P6666",
      "460S0524"
    ],
    // Additional rows ...
  ];
 
  const body = {
    values: values,
  };
  try {
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!A:A",
      valueInputOption: "USER_ENTERED",
      resource: body,
    }).then((response) => {
      const result = response.result;
      console.log(`${result.updates.updatedCells} cells appended.`);
      
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
  
}
//LLAMAR POR CODIGO DE PAQUETE

async function getGeneral(cod){

  console.log(cod)
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!A:E"
    });
  } catch (err) {
    console.log(err.message)
    return;
  }
  const range = response.result;
  
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById("content").innerText = "No values found.";
    return;
  }
  
  range.values.forEach((fila) => {
    
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    //console.log(fila)
    if(fila[1] == cod){
     
      datosGenerales.codRepartidor = fila[0]
      datosGenerales.codEnvio = fila[1]
      datosGenerales.codPostal = fila[4]
      datosGenerales.poblacion = fila[3]
      datosGenerales.direccion = fila[2]
    }

    
  
  });

  return datosGenerales
  
}

//LLAMAR por codigo portal
async function getRepartidores(cp) {
    
    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET,
        range: hoja + "!A:E"
      });
    } catch (err) {
      console.log(err.message)
      return;
    }
    const range = response.result;
    
    if (!range || !range.values || range.values.length == 0) {
      document.getElementById("content").innerText = "No values found.";
      return;
    }
  
    rutas = [];
    repetidor = [];
    poblacion = {};
   
    //console.log(range.values)
    range.values.forEach((fila) => {
      if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
      //console.log(fila)
      if(fila[4] == cp){
        if(rutas.includes(fila[0])){
           repetidor.push(fila[0])
        }else{
          
          repetidor.push(fila[0])
          rutas.push(fila[0])
            poblacion[fila[0]] = fila[3]
        }
      }

      

      
     /* const nuevoTurno = {
        id: fila[0],
        cliente: fila[1],
        email: fila[2],
        modelo: fila[3],
        problema: fila[4],
        fecha_terminado: fila[5],
        comentario: fila[6]
        
      };*/
       // console.log(fila[3])
     // turnos.push(nuevoTurno);
    });

    var contador = {};
    let element = []
    repetidor.forEach(function(elemento) {
      // Si el elemento ya existe en el objeto contador, incrementa su contador
      if (contador[elemento]) {
        contador[elemento]++;
      } else {
        // Si el elemento no existe en el objeto contador, inicializa su contador en 1
        contador[elemento] = 1;
        
      }
    });


  
   // Imprimir los resultados
   console.log("Número de repeticiones de cada elemento:");
    for (var elemento in contador) {
      let infoSuper = await getInfoRuta(elemento)
     
      element.push(
        {
            element: elemento,
            contador:  contador[elemento],
            infoSuper: infoSuper[3],
            nombreRepartidor: infoSuper[2],
            poblacion: poblacion[elemento]

        }
    )
  
}
   
    return element
    
  }
//GUARDAR LOS DATOS
  function appendValues( ) {
    let values = [
      [
        "460P6666",
        "460S0524"
      ],
      // Additional rows ...
    ];
   
    const body = {
      values: values,
    };
    try {
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET,
        range: hoja + "!A:A",
        valueInputOption: "USER_ENTERED",
        resource: body,
      }).then((response) => {
        const result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`);
        
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }
  }