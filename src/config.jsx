// Initialize Firebase
import * as  firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyAobz_loG7pYYUwP7xgXAuQ_u9UVkR53wQ",
    authDomain: "simuladordp-f80da.firebaseapp.com",
    databaseURL: "https://simuladordp-f80da.firebaseio.com",
    projectId: "simuladordp-f80da",
    storageBucket: "simuladordp-f80da.appspot.com",
    messagingSenderId: "84504185022"
  };
  firebase.initializeApp(config);
  
  export function saveproceso ( id , objeto) {
    console.log(id,objeto);
    const ref = firebase.database().ref().child("procesos/"+id)
    ref.set(objeto);
    
  }
 