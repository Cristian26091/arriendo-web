const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/arriendoWeb';
//const URI = 'mongodb+srv://banda2609:umEjs9y8x9uoEj2N@roomatch.kwpz9he.mongodb.net/?retryWrites=true&w=majority'

async function connect(){
    try{
        await mongoose.connect(URI)
        console.log("DB is connected");
    } catch(error){
        console.error(error);
    }
}

connect();

module.exports = mongoose;