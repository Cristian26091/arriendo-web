// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapBoxToken: 'pk.eyJ1IjoicGFuZGEyNjA5IiwiYSI6ImNsb2N4eTVwNTAyY24ycW11emltd3pzZDEifQ.EEfpiZzkXGPKoTutR0x8Rw',
  uri:'',
  secretToken: 'mysecrettoken',
  estado: {
    pendiente: 'pendiente',
    confirmada: 'confirmada',
    cancelada: 'cancelada',
    finalizada: 'finalizada',
  },
  ocupations: [
    'Estudiante',
    'Trabajador(a) a tiempo completo',
    'Trabajador(a) a tiempo parcial',
    'Desempleado(a)',
    'Jubilado(a)',
    'Empresario(a)',
    'Profesional(a)',
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
