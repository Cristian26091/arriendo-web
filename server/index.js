const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const angular_route = 'http://127.0.0.1:4200';
const server_route = 'http://127.0.0.1:3000';

const app = express();

const { mongoose } = require('./database');

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//ROUTES
app.use('/api', require('./routes/roomatch.routes'))

//STARTING THE SERVER
app.listen(app.get('port'), ()=> {
    console.log('Server on port ', app.get('port'));
});