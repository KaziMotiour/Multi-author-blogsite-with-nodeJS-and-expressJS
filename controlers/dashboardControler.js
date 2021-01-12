const Profile = require('../models/Profile');
const {validationResult} = require('express-validator')
const User = require('../models/User');

exports.dashboardControler = async (req, res, next) =>{
    try{
        const profile = await Profile.findOne({user:req.user._id})
        if (profile){
            return res.render('pages/dashboard/dashboard',  {title:"dashboard"})
        }
        res.redirect('/create-profile')
    }catch(e){
        next(e)
    }
    
}

exports.createProfileGetControler = async (req, res, next) =>{
    
    try{
        const profile = await Profile.findOne({user:req.user._id})
        if (profile){
            return res.redirect('/edit-profile')
        }
        res.render('pages/dashboard/create-profile', {title:'create your profile', error:{}})
    }catch(e){

    }

}  


exports.createProfilePostControler = async (req, res, next) =>{
    const error  = validationResult(req)
    const formatter = (error) => error.msg 
    let errors = error.formatWith(formatter).mapped()
    if(!error.isEmpty()){
        res.render('pages/dashboard/create-profile', {title:'create your profile', error:errors})
    }

    
    let {name, title, bio, website, facebook, twitter, github} = req.body
    try{
        let createProfile = new Profile({
            user:req.user._id,
            name,
            title,
            bio,
            profilepics:req.user.profilepics,
            links:{
                website:website || '',
                facebook:facebook || '',
                twitter: twitter || '',
                github:github || '',
            },
            post: [],
            bookmarks:[],
        })
        let createprofile = await createProfile.save()
        await User.findOneAndUpdate(
            {_id:req.user._id},
            { $set: {profile: createProfile._id}}
        )
        console.log('hello');

        res.render('pages/dashboard/dashboard',  {title:"dashboard"})


    }catch(e){

        next(e)
    }

}


exports.editProfileGetControler = async (req, res, next) =>{

    try{
        const profile = await Profile.findOne({user:req.user._id})
        if (!profile){
            return res.redirect('/create-profile')  
        }
        console.log(profile.links.website);

        res.render('pages/dashboard/edit-profile', {title:'edit your profile', profile:profile, error:{}})
    }catch(e){
        next(e)
    }
    

    
}


exports.editProfilePostControler = async (req, res, next) =>{
    const error  = validationResult(req)
    const formatter = (error) => error.msg 
    let errors = error.formatWith(formatter).mapped()

    let {name, title, bio, website, facebook, twitter, github} = req.body

    if(!error.isEmpty()){
        
        res.render('pages/dashboard/edit-profile', {title:'create your profile', error:errors,
        
        profile:{
            name, title, bio,
            links:{
                website,
                facebook,
                twitter,
                github ,
            },
        
        }
        })
    }


    next()
}