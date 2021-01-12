var multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({ 
    destination: (req, file, cb)=>{
        cb(null, 'public/uploads/')
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now()+ '-' + file.originalname)
    }
 })

const upload = multer({
    storage,
    limits:{
        fileSize: 1204 * 1204 *5 
    },
    fileFilter:(req, file, cb)=>{
        const types = /jpeg|jpg|png|jfif|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mineType = types.test(file.mimetype)
        console.log(file.originalname);
        if(extName && mineType){
            cb(null, true)
        }else{
            cb(new Error('Only Support images'))
        }
    }
})

module.exports = upload