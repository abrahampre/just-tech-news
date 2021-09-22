const express = require('express');
const routes = require('./controllers');
const sequalize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs =exphbs.create({});



const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
//lecture 14
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public'))); //The express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets. This is useful for front-end specific files like images, style sheets, and JavaScript files
app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars')


app.use(routes);

//turn on connection to db and server

sequalize.sync({force:true}).then(()=>{
    app.listen(PORT,() => console.log('Now Listening'))
})

