const User = require('../models/User')
exports.bindUserWithRequest = () =>{
    return async (req, res, next) =>{
        if (!req.session.isLoggedIn){
            return next()
        }

        try{

            let user = await User.findOne(req.session.user._id)
            req.user = user
            next()
        }catch(e){
            console.log(e);
            next(e)
        }

    }
}

exports.isAuthenticate = (req, res, next) =>{
    if (!req.session.isLoggedIn){
        res.redirect('/auth/login')
    }
    return next()
}

exports.isLoggedInUser = (req, res, next) =>{
    if (req.session.isLoggedIn){
        res.redirect('/')
    }
    return next()
}