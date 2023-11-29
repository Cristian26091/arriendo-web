
export const environment = {
    production: false,
    mapBoxToken: 'pk.eyJ1IjoicGFuZGEyNjA5IiwiYSI6ImNsb2N4eTVwNTAyY24ycW11emltd3pzZDEifQ.EEfpiZzkXGPKoTutR0x8Rw',
    // uri: 'http://127.0.0.1:3000',
    uri: 'https://34.176.106.128:3000',
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