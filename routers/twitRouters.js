const router = require('express').Router()
const {twitControllers} = require('../controllers')
const { verifyToken } = require('../middleware/auth')
const { multerUpload } = require('../middleware/multer')

router.post('/posting',verifyToken,multerUpload('./public', 'tweet').single('file'), twitControllers.createPost)
router.get('/allPost', twitControllers.getAll)
router.post('/likeTweet', verifyToken, twitControllers.likeTweet)


module.exports = router