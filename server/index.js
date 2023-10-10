const express = require('express');
const morgan = require('morgan');
const cors = require('cors');



const app = express();
const { mongoose } = require('./database');


//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
// Configura CORS para permitir solicitudes desde el servidor Angular
app.use(cors());

//ROUTES
app.use('/api', require('./routes/roomatch.routes'))

//STARTING THE SERVER
app.listen(app.get('port'), ()=> {
    console.log('Server on port ', app.get('port'));
});