

//link de google sheets
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

//autorizacion 
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';


let tokenClient;
let gapiInited = false;
let gisInited = false;

//botones de autenticacion
document.getElementById('authorize_button').style.visibility = 'hidden';

document.getElementById('root').style.display = 'none';

//la solicitud de autenticacion de google
document.getElementById("gapi").addEventListener("load",gapiLoaded);
  document.getElementById("gis").addEventListener("load",gisLoaded);



  //si la autenticacion sale bien deja continuar con la apliccion

  /**
   * esta es para la API KEY
   */
  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  /**
   * Y ESTA ES PARA LA CLIENTE KEY ID
   */

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
  }

  //PARA MOSTRAR LOS BOTONES DE LOGIN
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
      document.getElementById('root').style.visibility = 'visible';

    }
  }

  //SI LA RESPUESTA ES POSITIVA ARRANCA CON LA PETICION
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      
      document.getElementById('root').style.display = 'block';
      document.getElementById('authorize_button').style.visibility = 'hidden';
      //await getTurnos();
      
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  //LO QUE SE EJECUTA CUANDO SE CIERRA SESION 
  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      document.getElementById('content').innerText = '';
      document.getElementById('authorize_button').innerText = 'Authorize';
      document.getElementById('signout_button').style.visibility = 'hidden';
    }
  }