const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000

app.use('/api/clients', require('./routes/clients.routes'));

var server = app.listen(PORT, function(){
    console.log('The server is working on port ' + PORT)
})