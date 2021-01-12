const User = require('../models/User');
const Profile = require('../models/Profile');



const uploadProfilePics = async (req, res, next) =>{
  
    if(req.file){
        try{
        let profile = await Profile.findOne({user:req.user._id})
        let profilepics = `/uploads/${req.file.filename}`
        if(profile){
            await Profile.findOneAndUpdate(
                {user: req.user._id},
                {$set: {profilepics}}
                
            )
        } 

        await User.findOneAndUpdate(
            {_id : req.user._id},
            {$set: {profilepics}}
        )
        res.status(200).json({
            profilepics
        })

        }catch(e){

            res.status(500).json({
                profilepics: req.user.profilepics
            })
    

        }
    }else{
        res.status(500).json({
            profilepics: req.user.profilepics
        })

    }
}

module.exports = uploadProfilePics