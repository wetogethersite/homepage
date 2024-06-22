const express = require("express");

const app = express();

const session = require('express-session');

const passport = require("passport");

var path = require('path');

app.set("view engine" , "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}))

var LocalStrategy = require('passport-local').Strategy;

// app.use(express.json());

app.use(session({
    secret: "duck",
    resave: false ,
    saveUninitialized: true ,
}))

app.use(passport.initialize());
app.use(passport.session());

authUser = (username,password , done) => {
    const users = ['HARSH',"ANUJ","DABBA","SANKALP","SHIKHAR","TARUN","TANMAY","ANUGRAH","DHEERAJ","ADARSH","ABHAY","SAKSHAM","PRIYANSHU"];
    username = username.toUpperCase();
    for(let name of users) {
        if(username === name){
            return done(null, {name: username});
        } 
    }
    
    return done(null, false)
}

passport.use(new LocalStrategy (authUser));

passport.serializeUser( (user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done (null, user )
})

app.get("/login" , function(req , res){
    res.render('index');
})

app.post("/login", passport.authenticate("local" ,{
    successRedirect: "/homepage",
    failureRedirect: "/login",
}));

app.get('/homepage' ,isLoggedIn, function(req , res){
    res.sendFile(path.join(__dirname, '/homepage', 'index.html'));
});

function isLoggedIn(req , res , next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(5000);
