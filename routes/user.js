var express = require('express');
var router = express.Router();
var userhelper = require('../controllers/user-helpers');


router.get('/',((req,res)=>{
    res.render('home')
}));

router.get('/login',((req,res)=>{
    res.render('login')
}))

router.get('/signup',((req,res)=>{
    res.render('signup')
}))

router.post('/signup',((req,res)=>{
    userhelper.doSignUp(req.body).then((response)=>{
        console.log(response);  
    })
    .catch((err)=>{
        res.status(500).send('Signup failed');
    })
    req.session.user = response;
    req.session.user.loggedIn = true;
    res.render('userhome')
}))




module.exports = router;