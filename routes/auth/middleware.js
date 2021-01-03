const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const userCheck = (req, res, next) => {
    const verifytoken = req.cookies.jwt;
    if (verifytoken) {
        jwt.verify(verifytoken, keys.secrect, (err, decodedtoken) => {
            if (err) {
                console.log(err.message);
                next();
            }
            else{
                User.findById(decodedtoken.id)
                    .then(user => {
                        next();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }else{
        console.log('You a gest user');
        next();
    }
}

const requireAuth = (req, res, next) => {
    const verifytoken = req.cookies.jwt
    jwt.verify(verifytoken, keys.secrect, (err, decodedtoken) => {
        if (err) {
            console.log(err.message);
            res.redirect('/login');
        }else{
            next()
        }
    })
}

module.exports = {userCheck, requireAuth};