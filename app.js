const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const keys = require('./config/keys');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

const allroute = require('./routes/allroutes');
const {userCheck, requireAuth} = require('./routes/auth/middleware');

const app = express();

// @middleware  data
// @resone      set middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


// @Ejs     view engine
// @resone  for fontend
app.set('view engine', 'ejs')

// @mongoose    MongoDB
// @resone      To connect database     
mongoose.connect(keys.mongdbURL, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
    .then(success => app.listen(3000, console.log('app running at 3000')))
    .catch(err => console.log(err));






// @routes  express
// @resone  to route every path
app.get('*', userCheck);

app.get('/', (req, res) => {
     res.render('home');
})

app.use(allroute);

// =================\\
// ==================>>
// =================//

// @route   account
// @reasion to view account



app.get('/account', requireAuth, userCheck, (req, res) => {
    res.render('account');
})




