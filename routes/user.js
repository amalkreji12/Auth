var express = require('express');
var router = express.Router();
var userhelper = require('../controllers/user-helpers');


router.get('/',((req,res)=>{
    if(req.session.user){
        res.redirect('login');
    }else{
        res.render('home')
    }
    // res.render('home')
}));

router.get('/login',((req,res)=>{
    res.render('login')
}));

router.get('/signup',((req,res)=>{
    if(req.session.user){
        res.render('signup-confirm')
    }else{
        res.render('signup')
    }
    
}));

router.post('/signup',((req,res)=>{
    userhelper.doSignUp(req.body).then((response)=>{
        //console.log(response);  
        req.session.user = response;
        req.session.user.loggedIn = true;
        res.redirect('signup-confirm')
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send('Signup failed');
    })
}));

router.get('/signup-confirm',(req,res)=>{
    if(req.session.user){
        res.render('signup-confirm')
    }else{
        res.redirect('signup')
    }
    console.log(req.session.user);
})




module.exports = router;