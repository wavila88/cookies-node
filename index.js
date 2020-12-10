var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.get('/cookie1', (req, res) => {
    res.cookie('test' , 'cookie_value').send('Cookie is set');
});

app.get('/cookie2', (req, res) => {
     res.cookie('secureCookie', '1234', {
         maxAge: 86_400_000,
         httpOnly: true
         }).send('Cooki is set');
 });

 app.get('/deleteCookie',(req,res ) => {
    res.clearCookie('secureCookie').send('Cookie deleted');    
 });

app.listen(3000, () =>{
    console.log("Escuchando en puerto 3000");
})

