const router = require('express').Router();
const { userControllers } = require('../controllers');
const { verifyToken } = require('../middleware/auth');

router.post('/register', userControllers.register)
router.get('/', userControllers.getAll)
router.post('/login', userControllers.login)
router.get('/keep',verifyToken, userControllers.keepLogin)
router.patch('/verify',verifyToken, userControllers.verify)





module.exports = router