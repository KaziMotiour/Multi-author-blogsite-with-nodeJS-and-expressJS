
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {validationResult} = require('express-validator')

exports.singupGetControler = (req, res, next) =>{

    res.render('pages/auth/singup',{title:"Create a new account", error:{}, value:{}})
}

exports.singupPostControler = async (req, res, next) =>{
    const {username, email, password, password2} = req.body
    let error = validationResult(req)
    
    
    if (error.isEmpty()){
    try{
        let hashPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email, 
            password:hashPassword, 
        })

        let createdUser = await user.save()
        console.log('user Loged in success fully');
        console.log(createdUser);
    }catch(e){
        console.log(e);
        next(e)
    }
    return res.render('pages/auth/singup',{title:"Create a new account", error:{}, value:{}})
    }else{
        const formatter = (error) => error.msg 
        let errors = error.formatWith(formatter).mapped()
        return  res.render('pages/auth/singup',{title:"Create a new account", error:errors, value:req.body})

    }
   

}

exports.loginGetControler = (req, res, next) =>{
   
    res.render('pages/auth/login',{title:"Login to your account", value:{}})

}

exports.loginPostControler =async (req, res, next) =>{
    const {email, password} = req.body

    try{

        let userEmail = await User.findOne({email})
        if(!userEmail){
            return res.render('pages/auth/login',{title:"Login to your account", value:{error:"Invalid username or password"}})
        }
        let passMatch = await bcrypt.compare(password, userEmail.password)
        console.log(passMatch, "promise");
        if (!passMatch){
            return res.render('pages/auth/login',{title:"Login to your account", value:{error:"Invalid username or password"}})
        }

        console.log("success fully loged in");
       return res.render('pages/auth/login',{title:"Login to your account", value:{}})


    }catch(e){
        console.log(e);
        next(e)
    }


    res.render('pages/auth/login',{title:"Login to your account", value:{}})
    return res
}

exports.logout = (req, res,  next) =>{

}