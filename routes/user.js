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
    if(req.session.user){
        res.redirect('home');
    }else{
        res.render('login',{'loginError':req.session.userloginError})
        req.session.userloginError = false;
    }
    
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
        res.redirect('home')
    }
    console.log(req.session.user);
});

router.post('/login',((req,res)=>{
    userhelper.doLogin(req.body).then((response)=>{
        //console.log(response);
        if(response.status){
            req.session.user = response.user;
            req.session.user.loggedIn = true;
            res.redirect('home')
        }else{
            req.session.userloginError = 'Invalid Email or Password';
            res.redirect('login');
        }
        
    })
    
}));

router.get('/home',((req,res)=>{
    res.render('user-home');
}))




module.exports = router;