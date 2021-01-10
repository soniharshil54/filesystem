const Config = require("./configs/constant/config")
const SeederService = require("./services/seeder")
let config = new Config()

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const bodyParser = require("body-parser")

//app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

SeederService.seedAllConfigs()
var routes = require('./routes')(app)
global.io = io; //added
require('./configs/socket')(io)

const port = config.server_port;

app.get('/', function (req, res) {
    res.sendfile('./test/socket-test/index.html');
});

var server = http.listen(port, () => {
    console.log(server.address().address)
    console.log(`server started on localhost:${port}`)
});