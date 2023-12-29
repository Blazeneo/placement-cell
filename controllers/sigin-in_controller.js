const User =require('../models/users')

module.exports.sigin= async function(req,res){

    console.log('sigini controller loaded');
        return res.render('sign',{title:"sigin"});
    }


    module.exports.signup= async function(req,res){

        console.log('sigini controller loaded');
            return res.render('signup',{title:"sigup"});
        }

    
//creating sigin and user session

module.exports.session= async function(req,res){

    console.log('session controller loaded');
        return res.redirect('/home');
    }

module.exports.create =function(req,res){
    console.log('sigin');
   console.log(req.body);
if(req.body.password != req.body.confirm_password){
    console.log('password doesnt match');
    
    return res.redirect('back');
}
User.findOne({email: req.body.email}).then(
    function(user){
        if(!user){
            User.create(req.body).then(
                function(user){
                   console.log('user created');
                    return res.redirect('/users/sigin');
                }
            ).catch(
                function(err){
                    if(err){
                        console.log('error in crteating the user while signing up',err); 
                        
                        return res.status(400).json({ error: 'Validation Error', messages: err});
                    }
                }
            )
        }
        else{
            console.log('user is there');
            return res.redirect('/users/sigin');
        
        }
        
        
        }
).catch(
   
       function(err){
        
            console.log('error in creating user',err);
            return res.redirect('back');
        
       }
    
    );


};

module.exports.destroySession =function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    res.redirect('/');
}