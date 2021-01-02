
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.singupGetControler = (req, res, next) =>{

    res.render('pages/auth/singup',{title:"Create a new account"})
}

exports.singupPostControler = async (req, res, next) =>{
    const {username, email, password, password2} = req.body
    
    try{
        let hashPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email, 
            password, 
        })
        let createdUser = await user.save()
        console.log('user Loged in success fully');
        console.log(createdUser);
    }catch(e){
        console.log(e);
        next(e)
    }
   
    res.render('pages/auth/singup',{title:"Create a new account"})

}

exports.loginGetControler = (req, res, next) =>{
   
    res.render('pages/auth/login',{title:"Login to your account"})

}

exports.loginPostControler =async (req, res, next) =>{
    const {email, password} = req.body

    try{

        let userEmail = await User.findOne({email})
        if(!userEmail){
            return res.json({
                message:"invalid username or password"
            })
        }
        let passMatch = await bcrypt.compare(password, userEmail.password)
        console.log(passMatch, "promise");
        if (!passMatch){
            return res.json({
                message:"invalid username or password"
            })
        }

        console.log("success fully loged in");
        res.render('pages/auth/login',{title:"Login to your account"})


    }catch(e){
        console.log(e);
        next(e)
    }


    res.render('pages/auth/login',{title:"Login to your account"})
    return res
}

exports.logout = (req, res,  next) =>{

}