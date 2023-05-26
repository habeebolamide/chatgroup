const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
const mongoose =  require('mongoose')
const group = require('./routes/groups');
const user = require('./routes/users');
const express = require('express');
const app = express();


app.use(express.json());
app.use('/api/user', user);
app.use('/api/group', group);


mongoose.connect('mongodb://localhost/chat').then(() => {
    console.log('Connected Successfully');
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));