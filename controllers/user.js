const User = require("../models/user");


module.exports.renderSignupForm = (req, res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async(req,res) =>{
    try{
     const {username, password, email} = req.body;
     const newUser = new User({username,email});
     const registeredUser= await User.register(newUser, password);
     console.log(registeredUser);
 
     req.login(registeredUser,(err)=>{
         if(err){
             return next(err);
         }
         req.flash("success", "Welcome to Wanderlust!");
         res.redirect("/listings");
     });
 
    
    }catch(e){
     req.flash("error", e.message);
     res.redirect("/signup");
    }
 }

 module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.Login = async (req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");

    let redirectUrl= res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.Logout = (req, res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
}