const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//connnect to database
const config = require('./config/database');
mongoose.connect(config.database, { useMongoClient:true });

mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();
const users=require('./routes/users');
const projects=require('./routes/projects');
const tasks=require('./routes/tasks');

const port=process.env.PORT || 3000;

// CORS Middleware:allows requests from any domain i.e making it public
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));//current directory +foldername

//routes
app.use('/users',users);
app.use('/projects',projects);
app.use('/tasks',tasks);

app.get('/',(req,res)=>{
    res.send("hello");
});

app.listen(port, () => {
    console.log('Server started on port '+port);
  });



//angular
//npm install @angular/cli --save
//ng new angular-src
//ng serve    to run inside angular-src dir

//ng g component navbar




