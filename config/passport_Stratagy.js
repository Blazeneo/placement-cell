const passport = require("passport");
const LocalStrategy= require("passport-local").Strategy;
const User = require('../models/users');
//auth using passport local
passport.use(new LocalStrategy(
    {usernameField:'email'},
    function(email, password, done) {
      // User.findOne({ email: email }, function (err, user) {
      //   if (err) {console.log("error in pasport");
      //    return done(err); }
      //   // if (!user || user.password != password) {
      //   //      return done(null, false); }
      //   if (!user.verifyPassword(password)) {
      //       console.log("err password");
      //       return done(null, false); }
      //   return done(null, user);
      // });
      User.findOne({ email: email }).then(function(user){
        if (!user || user.password != password){
          console.log('Invalid Username/Password');
          return done(null, false);
      }

      return done(null, user);
      }).catch((err)=>{
        console.log('Error in finding user --> Passport');
                return done(err);
      })



    }
  ));
//serilizing the to which key to be kept in cookies
  passport.serializeUser(function(user,done){
    done(null,user.id);
  })

  //deserilizing the user from the key in the cookies

  passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
       
        return done(null,user);
    }
    
    ).catch((err)=>{
      
        console.log("error in deserialize",err);
        return done(err);

    
    })
  })

  passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
      return next();

    }
    return res.redirect('/users/sigin');
  }

  passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){

      res.locals.user = req.user;
      

    }
    return next();

  }