const User = require("../models/user");


module.exports.renderSignupForm = (req, res) =>{
    res.render("users/signup.ejs");
};
module.exports.signup = async(req, res, next) =>{
    try{
    let { username, email, password } = req.body;
    let newUser = new User({username, email});
    let registeredUser = await User.register(newUser , password);
    console.log(registeredUser);
    console.log(req.body);
    req.login(registeredUser, (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    });

     }catch(e){
        req.flash("error", e.message);
        res.render("users/signup");
       
     }
    };

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res )=>{
        res.redirect(res.locals.redirectUrl || "/listings");
    };



module.exports.logout = (req, res , next) => {
   req.logout((err) =>{
    if(err) {
        return next(err);
    }
    res.redirect("/listings");
   }); 
}