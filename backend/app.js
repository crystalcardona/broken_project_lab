const express = require('express');
const cors = require('cors');
const app = express(); 
const bodyParser = require('body-parser');

const PORT = 3000; 
const carsRouter = require('./queries/cars/cars');
const usersRouter = require('./routes/users/users');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/cars', carsRouter);
app.use('/users', usersRouter);
app.use(cors);

app.use((err, req, res, next) => {
    res.status(500).json({
        err
    })
})




app.listen(PORT, () => console.log("Listening"));
 