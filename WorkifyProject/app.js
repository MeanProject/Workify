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

















// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const passport = require('passport');
// const mongoose = require('mongoose');
// const config = require('./config/database');

// // Connect To Database (NEW) But not working!!!!!!!!!! (because of secret in db.js!!!!!)
// //const db = require('./config/database');
// // Map global promise - get rid of warning
// //mongoose.Promise = global.Promise;
// // Connect to mongoose
// //mongoose.connect(db.mongoURI, {
//     //useMongoClient: true
// //})
// //.then(() => console.log('MongoDB Connected...'))
// //.catch(err => console.log(err));


// // Connect To Database (OLD CODE)
// mongoose.connect(config.database, { useMongoClient: true});
// // On Connection
// mongoose.connection.on('connected', () => {
//   console.log('Connected to Database '+config.database);
// });
// // On Error
// mongoose.connection.on('error', (err) => {
//   console.log('Database error '+err);
// });

// const app = express();

// const users = require('./routes/users');

// // Port Number
// const port = process.env.PORT || 8080;

// // CORS Middleware
// app.use(cors());

// // Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Body Parser Middleware
// app.use(bodyParser.json());

// // Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

// app.use('/users', users);

// // Index Route
// app.get('/', (req, res) => {
//   res.send('invaild endpoint');
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// // Start Server
// app.listen(port, () => {
//   console.log('Server started on port '+port);
// });
