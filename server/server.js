require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const api = require('./routes/api');

app.use(cors())

//Database Configuration
const db = process.env.MONGODB_URI;
console.log(db);
//Establish connection to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, })
  		.then(() => console.log("Database successfully connected."))
  		.catch(err => console.log(err));

//API routes
app.use('/api', api);

//Incorrect API call
app.use('*', (req, res) => {
	res.send('Error');
});

//Set port for server to listen on
const port = process.env.PORT || 9000;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});