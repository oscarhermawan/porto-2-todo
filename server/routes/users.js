var express = require('express')
var api = require('../controllers/userController')
var router = express.Router();

router.get('/', api.getAllUsers)
router.post('/', api.insertUser)


module.exports = router
