const multer = require('multer')
module.exports = {
    multerUpload: (directory = "./public", name = "PIMG") => {

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, directory)
            },
            filename: (req, file, cb) => {
                // console.log(file)
                cb(null, 
                    name +
                    "-" +
                    Date.now() +
                    Math.round(Math.random() * 100000) +
                    "." +
                    file.mimetype.split('/')[1]
                )
                //PIMG-202310192820289.jpg
            }
        })
        
        const fileFilter = (req, file, cb) => {
            const extFilter = ['jpg', 'png', 'jpeg']
            const checkExt = extFilter.includes(file.mimetype.split('/')[1].toLowerCase())
        
            if (!checkExt) {
                cb(new Error("Your file ext denied"), false)
            } else {
                cb(null, true)
            }
        }

        return multer({ storage, fileFilter })
    }
}