const express = require("express");
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const {CreateUser , GetUsers, GetUserbyid , deleteUserbyId} = require("../Controllers/UserController")


router.post('/Create', upload.single('ProfilePic'), CreateUser);
router.get('/Get',  GetUsers);
router.get('/GetUserbyid/:id', GetUserbyid);
router.delete('/deleteUserbyId/:id', deleteUserbyId);




module.exports = router;