const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const {userCheck, requireAuth} = require('./auth/middleware');
// const login = require('./controler/login');
// const register = require('./controler/register');

const router = Router();


// @route   register
// @reasion to view registerpage and register
router.get('/register', (req, res) => {
    res.render('signup');
});


router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // 
    User.findOne({ email })
        .then(user => {
            // @check user already registered?
            if (user) {
                console.log('user already registered');
                res.render('signup', {msg: 'user already registered'})
            }else{
                
                // @user create 
                const newuser = new User({
                    name,
                    email,
                    password
                });
                // @Encrypt encrypting password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newuser.password, salt, (err, hash) => {
                        if (err) {
                            throw err
                        }else{
                            newuser.password = hash;
                            newuser.save()
                                .then(user => {
                                    console.log('new user created');
                                    // @creating jwt token
                                    const payload = {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    };
                                    jwt.sign(payload, keys.secrect, { expiresIn: 3600 }, (err, token) => {
                                        res.cookie('jwt', token, { maxAge: 3600 * 1000 });
                                        console.log(token);
                                        res.redirect('/')
                                    })
                                    
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    })
                })
                

            }
        })
        .catch(err => {
            console.log(err);
        });
});


// =================\\
// ==================>>
// =================//

// @route   login
// @reasion to view loginpage and login
router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
    .then(user => {
        if(!user) {
            console.log('user not found');
        }else{
            bcrypt.compare(password, user.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        };
                        jwt.sign(payload, keys.secrect, { expiresIn: 3600 }, (err, token) => {
                            res.cookie('jwt', token, {httpOnly: true, maxAge: 3600 * 1000 });
                            res.redirect('/')
                        })
                        
                    }else{
                        console.log('password incorrect');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
    .catch(err => {
        console.log(err);
    });

})


// @route   logout
// @reasion to logout
router.get('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
});


// @route   /account/profile
// @reasion privet user information
router.get('/account/profile', requireAuth, userCheck, (req,res) => {
    const verifytoken = req.cookies.jwt;
    if (verifytoken) {
        jwt.verify(verifytoken, keys.secrect, (err, decodedtoken) => {
            if (err) {
                console.log(err);
            }
            else{
                User.findById(decodedtoken.id)
                    .then(user => {
                        res.render('profile', {userinfo: user})
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }else{
        res.redirect('/login');
    }
})

module.exports = router;