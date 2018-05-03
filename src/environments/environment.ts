// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD2f1CqoyF3XhEuIPBXidqfXWTKPFyueIY&libraries=places',

  firebase: {
    apiKey: 'AIzaSyBeZeVzu-ZcmnOzzm_uhW6nx2qqNpGT-Ns',
    authDomain: 'foodz9data.firebaseapp.com',
    databaseURL: 'https://foodz9data.firebaseio.com',
    projectId: 'foodz9data',
    storageBucket: 'foodz9data.appspot.com',
    messagingSenderId: '1009750637734'
  }
};
