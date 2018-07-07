const path = require('path');

// express
var express = require('express');
var app = express();

// bodyparser - to redirect user information
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// server
var port = 5000;
const server = app.listen(port)

// session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

// install socket
const io = require('socket.io')(server);

var count = 0;

io.on('connection', function(socket){
    console.log("you're connected"); //User is successfully connected

    // create the add function when the button is clicked
    socket.on('theCount', function(){
        count += 1;
        socket.emit('addedCount', count);
    });

    // create the delete function when the button is clicked
    socket.on('delete', function(){
        count = 0;
        socket.emit('updated', count);
    });    
})

// render the html page
app.get('/', function(req, res){
    res.render('index');
})